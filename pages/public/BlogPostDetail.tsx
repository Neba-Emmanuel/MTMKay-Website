import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPostsData } from "../../data/blog";
import NotFound from "./NotFound";
import { User, Calendar } from "lucide-react";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPostsData.find((p) => p.id === id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - MTMKay Blog</title>
        <meta name="description" content={post.intro} />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </header>

          <img
            src={post.thumbnail.replace("/400/250", "/800/400")}
            alt={post.title}
            className="w-full rounded-lg shadow-lg mb-8"
          />

          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
};

export default BlogPostDetail;
