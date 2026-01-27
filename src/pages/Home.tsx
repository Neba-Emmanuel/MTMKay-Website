import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { trainingsData } from "../data/trainings";
import { blogPostsData } from "../data/blog";
import { ArrowRight, Star, Users, Briefcase, BarChart } from "lucide-react";
import { servicesData } from "../data/services";

const Home: React.FC = () => {
  const featuredCourses = trainingsData.slice(0, 3);
  const latestPosts = blogPostsData.slice(0, 3);

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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card className="h-full flex flex-col">
                  <img
                    src={course.bannerImage.replace("/1200/400", "/400/225")}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-sm font-semibold text-primary mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 flex-grow">
                      {course.shortDescription}
                    </p>
                    <Link
                      to={`/trainings/${course.id}`}
                      className="mt-4 inline-flex items-center font-semibold text-primary hover:underline"
                    >
                      Learn More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
                className="text-center p-6 bg-primary rounded-lg shadow-lg"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.id}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.publishDate} &bull; {post.author}
                  </p>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.intro}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    Read More <ArrowRight size={16} className="inline" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
