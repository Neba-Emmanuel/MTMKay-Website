import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPostsData } from "../data/blog";
import Card from "../components/ui/Card";
import { ArrowRight } from "lucide-react";

const Blog: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Blog - MTMKay IT Training & Consultancy</title>
        <meta
          name="description"
          content="Read the latest articles, insights, and news from the IT world on the MTMKay blog."
        />
        <link rel="canonical" href="https://www.mtmkay.com/blog" />
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">MTMKay Blog</h1>
          <p className="mt-2 text-lg">
            Insights, trends, and tutorials from our IT experts.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPostsData.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <Link to={`/blog/${post.id}`}>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.publishDate} &bull; {post.author}
                  </p>
                  <h2 className="text-xl font-bold mb-3 flex-grow">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.intro}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="font-semibold text-primary hover:underline self-start"
                  >
                    Read More <ArrowRight size={16} className="inline" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          {/* Pagination could be added here */}
        </div>
      </section>
    </>
  );
};

export default Blog;
