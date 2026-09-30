import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CTA, Meta, PageIntro } from "../components/marketing/Elements";
import { useApiRequest } from "../hooks/useApiRequest";

import Article, { type Post } from "../components/marketing/ArticleCard";

export default function Blog() {
  const { request, data, loading, error } = useApiRequest<Post[]>();
  const [ready, setReady] = useState(false);
  const fetchBlogs = useCallback(async () => {
    try {
      await request({ method: "GET", url: "/blogs" });
    } catch {
      /* Display the request error below. */
    } finally {
      setReady(true);
    }
  }, [request]);
  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);
  const posts = (Array.isArray(data) ? data : []).filter((post) =>
    Boolean(post.publishedAt),
  );
  return (
    <div className="editorial-page resource-page">
      <Meta
        title="Insights"
        path="/blog"
        description="Ideas, practical guides, and perspectives on technology, learning, and building useful digital products from MTMKay."
      />
      <PageIntro
        label="INSIGHTS & IDEAS"
        title="A little perspective. A useful next step."
        text="Thoughts on technology, practical lessons, and ideas worth exploring. From the people doing the work."
      />
      <section
        className="site-container resource-section"
        aria-labelledby="insights-title"
      >
        <div className="resource-heading">
          <div>
            <p className="eyebrow">FROM OUR NOTEBOOK</p>
            <h2 id="insights-title">Thinking out loud.</h2>
          </div>
          <p>Technology. People. Possibilities.</p>
        </div>
        {loading || !ready ? (
          <div className="resource-state" role="status">
            Loading insights…
          </div>
        ) : error ? (
          <div className="resource-state" role="alert">
            <h3>We couldn’t load the articles.</h3>
            <p>Please try again in a moment.</p>
            <button className="solid-link" onClick={fetchBlogs}>
              Try again
            </button>
          </div>
        ) : posts.length ? (
          <>
            <Article post={posts[0]} featured />
            {posts.length > 1 && (
              <>
                <div className="resource-heading articles-heading">
                  <h2>More to explore.</h2>
                  <p>
                    {posts.length - 1} more{" "}
                    {posts.length === 2 ? "article" : "articles"}
                  </p>
                </div>
                <div className="resource-grid">
                  {posts.slice(1).map((post) => (
                    <Article key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="resource-state insights-empty">
            <p className="eyebrow">WATCH THIS SPACE</p>
            <h3>Good ideas take a little time.</h3>
            <p>
              Our next insights are on the way. In the meantime, explore how we
              approach the work.
            </p>
            <Link className="text-link" to="/services">
              Explore our services
            </Link>
          </div>
        )}
      </section>
      <CTA />
    </div>
  );
}
