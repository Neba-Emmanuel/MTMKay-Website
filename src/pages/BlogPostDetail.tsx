import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Meta } from "../components/marketing/Elements";
import ArticleCard, {
  plainText,
  type Post,
} from "../components/marketing/ArticleCard";
import DetailState from "../components/marketing/DetailState";
import { usePublicResource } from "../hooks/usePublicResource";
import { site } from "../data/site";

export function BlogPostContent({
  blog,
  related = [],
}: {
  blog: Post;
  related?: Post[];
}) {
  const text = plainText(blog.content || "");
  const readTime = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  const author = blog.author || "MTMKay Team";
  const url = `${site.origin}/blog/${blog.slug}`;
  const shareUrl = encodeURIComponent(url);
  const otherPosts = related
    .filter((post) => post.slug !== blog.slug && Boolean(post.publishedAt))
    .slice(0, 3);
  return (
    <div className="editorial-page resource-page">
      <Meta
        title={blog.title}
        path={`/blog/${blog.slug}`}
        description={text.slice(0, 160)}
      />
      <Helmet>
        <meta property="og:type" content="article" />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
        {blog.publishedAt && (
          <meta property="article:published_time" content={blog.publishedAt} />
        )}
        <meta name="author" content={author} />
      </Helmet>
      <article>
        <header className="site-container detail-header article-header">
          <Link className="text-link" to="/blog">
            All insights
          </Link>
          <p className="eyebrow">IDEAS & PERSPECTIVES</p>
          <h1>{blog.title}</h1>
          <div className="article-byline">
            <span>By {author}</span>
            {blog.publishedAt && (
              <time dateTime={blog.publishedAt}>
                {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <span>{readTime} min read</span>
          </div>
        </header>
        {blog.imageUrl && (
          <div className="site-container">
            <img
              className="detail-cover article-cover"
              src={blog.imageUrl}
              alt={blog.title}
              decoding="async"
              onError={(event) => {
                const fallback = "/images/marketing/mtmkay-collaboration.jpg";
                if (!event.currentTarget.src.endsWith(fallback))
                  event.currentTarget.src = fallback;
              }}
            />
          </div>
        )}
        <div className="site-container article-layout">
          <aside className="article-margin">
            <p className="eyebrow">IN GOOD COMPANY</p>
            <p>Ideas are better shared.</p>
            <nav className="article-share" aria-label="Share this article">
              <a
                className="text-link"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                LinkedIn
              </a>
              <a
                className="text-link"
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
              >
                X / Twitter
              </a>
              <a
                className="text-link"
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                Facebook
              </a>
            </nav>
          </aside>
          <div className="article-reading">
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
            <footer className="article-author">
              <p className="eyebrow">WRITTEN BY</p>
              <p>{author}</p>
              <Link className="text-link" to="/blog">
                More insights from MTMKay
              </Link>
            </footer>
          </div>
        </div>
      </article>
      {otherPosts.length > 0 && (
        <section className="resource-band">
          <div className="site-container resource-section">
            <div className="resource-heading">
              <div>
                <p className="eyebrow">KEEP EXPLORING</p>
                <h2>Another perspective.</h2>
              </div>
              <Link className="text-link" to="/blog">
                All insights
              </Link>
            </div>
            <div className="resource-grid">
              {otherPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="site-container community-section">
        <div>
          <p className="eyebrow">FROM IDEAS TO ACTION</p>
          <h2>What are you working on?</h2>
        </div>
        <div>
          <p>If this sparked a question or an idea, we’d like to hear it.</p>
          <Link className="text-link" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
export default function BlogPostDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const {
    data: blog,
    status,
    retry,
  } = usePublicResource<Post>(`/blogs/${encodeURIComponent(slug)}`);
  const { data: related } = usePublicResource<Post[]>("/blogs");
  if (status !== "success" || !blog)
    return (
      <DetailState
        kind="article"
        status={status === "success" ? "missing" : status}
        retry={retry}
      />
    );
  if (!blog.publishedAt)
    return <DetailState kind="article" status="missing" retry={retry} />;
  return (
    <BlogPostContent
      key={blog.slug}
      blog={blog}
      related={Array.isArray(related) ? related : []}
    />
  );
}
