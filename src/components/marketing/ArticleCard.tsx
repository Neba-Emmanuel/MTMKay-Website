import { Link } from "react-router-dom";

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  publishedAt: string | null;
};
const fallbackImage = "/images/marketing/mtmkay-collaboration.jpg";
export const plainText = (content: string) =>
  content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export default function Article({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const content = plainText(post.content || "");
  const limit = featured ? 230 : 150;
  const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
  return (
    <article className={`resource-card ${featured ? "featured-article" : ""}`}>
      <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <img
          className="resource-cover"
          src={post.imageUrl || fallbackImage}
          alt=""
          loading="lazy"
          onError={(event) => {
            if (!event.currentTarget.src.endsWith(fallbackImage))
              event.currentTarget.src = fallbackImage;
          }}
        />
      </Link>
      <div className="resource-card-body">
        <p className="eyebrow">
          {featured ? "FEATURED PERSPECTIVE" : "INSIGHTS"}
        </p>
        <div className="resource-meta">
          <time dateTime={post.publishedAt!}>
            {new Date(post.publishedAt!).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{post.author || "MTMKay Team"}</span>
        </div>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>
          {content.length > limit
            ? `${content.slice(0, limit).trim()}…`
            : content}
        </p>
        <div className="resource-card-bottom">
          <span>{readTime} min read</span>
          <Link className="text-link" to={`/blog/${post.slug}`}>
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
