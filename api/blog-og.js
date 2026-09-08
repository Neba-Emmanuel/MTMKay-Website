// Vercel serverless function: injects Open Graph / Twitter meta tags into the
// SPA's index.html for /blog/:slug requests so social shares (WhatsApp,
// Facebook, X, LinkedIn) display the blog's real image, title, and excerpt.
//
// Crawlers don't run JavaScript, so react-helmet-async can't help them. This
// function returns pre-rendered HTML with the correct tags, while real users
// still get the full SPA that hydrates normally.

const SITE_URL = "https://www.mtmkay.com";
const API_URL = "https://mtmkay-backend.vercel.app/api";
const DEFAULT_IMAGE = `${SITE_URL}/mtmkay_logo.png`;

// Escape values before placing them inside HTML attributes.
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip HTML tags and collapse whitespace to build a plain-text excerpt.
function buildDescription(content) {
  if (!content) return "Read this article on the MTMKay blog.";
  const plain = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 160) return plain;
  return plain.substring(0, 157) + "...";
}

// Replace (or insert) a meta tag identified by property/name in the <head>.
function upsertMeta(html, attr, key, value) {
  const escapedValue = escapeHtml(value);
  const tag = `<meta ${attr}="${key}" content="${escapedValue}" />`;
  // Match an existing tag with the same property/name and replace it.
  const pattern = new RegExp(
    `<meta[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i"
  );
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  // Otherwise insert right before </head>.
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

export default async function handler(req, res) {
  try {
    // Vercel passes the matched slug via the rewrite; fall back to parsing URL.
    const slug =
      (req.query && req.query.slug) ||
      (req.url || "").split("?")[0].replace(/^\/blog\//, "").replace(/\/$/, "");

    // Fetch the base index.html from the deployed static site.
    const htmlRes = await fetch(`${SITE_URL}/index.html`);
    let html = await htmlRes.text();

    // Fetch the blog data.
    let blog = null;
    if (slug) {
      try {
        const apiRes = await fetch(`${API_URL}/blogs/${encodeURIComponent(slug)}`);
        if (apiRes.ok) {
          blog = await apiRes.json();
        }
      } catch (e) {
        // Ignore fetch errors; we'll fall back to defaults below.
      }
    }

    const pageUrl = `${SITE_URL}/blog/${slug}`;
    const title = blog?.title ? `${blog.title} - MTMKay Blog` : "MTMKay Blog";
    const description = buildDescription(blog?.content);
    const image =
      blog?.imageUrl && /^https?:\/\//i.test(blog.imageUrl)
        ? blog.imageUrl
        : DEFAULT_IMAGE;

    // Update <title>.
    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(title)}</title>`
    );

    // Primary + Open Graph + Twitter tags.
    html = upsertMeta(html, "name", "description", description);
    html = upsertMeta(html, "property", "og:type", "article");
    html = upsertMeta(html, "property", "og:title", title);
    html = upsertMeta(html, "property", "og:description", description);
    html = upsertMeta(html, "property", "og:url", pageUrl);
    html = upsertMeta(html, "property", "og:image", image);
    html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
    html = upsertMeta(html, "name", "twitter:title", title);
    html = upsertMeta(html, "name", "twitter:description", description);
    html = upsertMeta(html, "name", "twitter:image", image);

    // Update canonical link.
    html = html.replace(
      /<link[^>]*rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Cache at the edge so repeated crawler hits are fast; allow quick refresh.
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
    );
    res.status(200).send(html);
  } catch (err) {
    // On any failure, redirect to the SPA so users are never blocked.
    res.setHeader("Location", "/");
    res.status(302).end();
  }
}
