import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { ArrowRight, Star, Users, Briefcase, BarChart } from "lucide-react";
import { servicesData } from "../data/services";
import { useApiRequest } from "../hooks/useApiRequest";

const Home: React.FC = () => {
  // Use the custom hook for trainings
  const {
    request: fetchTrainingsApi,
    data: trainingsData,
    loading: trainingsLoading,
    error: trainingsError,
  } = useApiRequest<any[]>();

  // Use the custom hook for blogs
  const {
    request: fetchBlogsApi,
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useApiRequest<any[]>();

  const [trainings, setTrainings] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchTrainings();
    fetchBlogs();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await fetchTrainingsApi({
        method: "GET",
        url: "/trainings",
      });

      // Ensure we have an array
      const trainingsArray = Array.isArray(data) ? data : [];
      setTrainings(trainingsArray);
    } catch (err) {
      console.error("Failed to fetch trainings:", err);
      setTrainings([]);
    }
  };

  const fetchBlogs = async () => {
    try {
      const data = await fetchBlogsApi({
        method: "GET",
        url: "/blogs",
      });

      // Ensure we have an array and filter only published blogs
      const blogsArray = Array.isArray(data) ? data : [];
      const publishedBlogs = blogsArray.filter(
        (blog) => blog.publishedAt !== null,
      );
      setBlogs(publishedBlogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]);
    }
  };

  const featuredCourses = trainings.slice(0, 3);
  const latestPosts = blogs.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Shimmer loading component for training cards
  const TrainingCardShimmer = () => (
    <Card className="h-full flex flex-col animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
      </div>
    </Card>
  );

  // Shimmer loading component for blog cards
  const BlogCardShimmer = () => (
    <Card className="animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
      </div>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>MTMKay IT Training & Consultancy - Home</title>
        <meta
          name="description"
          content="Welcome to MTMKay, a leading center for IT training and consultancy. Explore our courses in web development, data science, and more."
        />
        <link rel="canonical" href="https://www.mtmkay.com/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/Communication backgrounds set….jpeg')`,
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Unlock Your Future in Tech.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Your gateway to a thriving career in IT. MTMKay offers
              comprehensive IT consulting, cybersecurity, and certification
              training to drive digital transformation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asLink to="/trainings" size="lg" variant="primary">
                Explore Trainings
              </Button>
              <Button
                asLink
                to="/services"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-dark"
              >
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Why Choose MTMKay?</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We are committed to providing the best learning experience and
            tangible results for your career and business.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: Star,
                title: "Expert Instructors",
                text: "Learn from industry veterans with real-world experience.",
              },
              {
                icon: Briefcase,
                title: "Practical Curriculum",
                text: "Hands-on projects that build a job-ready portfolio.",
              },
              {
                icon: Users,
                title: "Career Support",
                text: "Guidance on resumes, interviews, and job placements.",
              },
              {
                icon: BarChart,
                title: "Proven Results",
                text: "Join our alumni who now work at top tech companies.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 h-full">
                  <div className="flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-full mx-auto mb-4">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Trainings</h2>
            <p className="text-lg text-gray-600">
              Start your learning journey with our most popular courses.
            </p>
          </div>

          {trainingsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <TrainingCardShimmer key={i} />
              ))}
            </div>
          ) : trainingsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{trainingsError}</p>
              <Button onClick={fetchTrainings} variant="outline">
                Try Again
              </Button>
            </div>
          ) : trainings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No trainings available yet.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featuredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <h3 className="text-xl font-bold">{course.title}</h3>
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-primary">
                          {course.category || "IT Training"}
                        </span>
                        {course.price && course.price > 0 && (
                          <span className="text-sm font-bold text-gray-800">
                            {course.price.toLocaleString()} XAF
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 flex-grow line-clamp-3">
                        {course.summary || "No description available."}
                      </p>
                      <Link
                        to={`/trainings/${course.slug}`}
                        className="mt-4 inline-flex items-center font-semibold text-primary hover:underline"
                      >
                        Learn More <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Button asLink to="/trainings" variant="secondary" size="lg">
              View All Trainings
            </Button>
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">IT Consultancy Services</h2>
            <p className="text-lg text-gray-300">
              Driving business growth with strategic technology solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="text-center p-6 bg-primary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 bg-white/10 text-white rounded-full mx-auto mb-4">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">From Our Blog</h2>
            <p className="text-lg text-gray-600">
              Insights, trends, and news from the world of IT.
            </p>
          </div>

          {blogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <BlogCardShimmer key={i} />
              ))}
            </div>
          ) : blogsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{blogsError}</p>
              <Button onClick={fetchBlogs} variant="outline">
                Try Again
              </Button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-lg font-bold">{post.title}</h3>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      {post.author && (
                        <>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                        </>
                      )}
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content
                        ? post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."
                        : "No content available."}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="font-semibold text-primary hover:underline inline-flex items-center"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {blogs.length > 3 && (
            <div className="text-center mt-12">
              <Button asLink to="/blog" variant="outline" size="lg">
                Read All Articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
