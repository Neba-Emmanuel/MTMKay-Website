import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { servicesData } from "../../data/services";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Services: React.FC = () => {
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
    },
  };

  return (
    <>
      <Helmet>
        <title>Our Services - MTMKay IT Training & Consultancy</title>
        <meta
          name="description"
          content="Explore our range of IT consulting and training services designed to empower your business and career."
        />
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg max-w-3xl mx-auto"
          >
            We provide comprehensive IT solutions and training programs to help
            you navigate the complexities of the digital landscape.
          </motion.p>
        </div>
      </header>

      {/* Services List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicesData.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="p-8 h-full flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-lg">
                      <service.icon size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise can help you achieve your goals.
            Schedule a free consultation with our experts today.
          </p>
          <Button asLink to="/contact" size="lg" variant="primary">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;
