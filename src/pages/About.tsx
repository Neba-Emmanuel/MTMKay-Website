import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { teamData } from "../data/team";
import Card from "../components/ui/Card";
import {
  Target,
  Eye,
  Award,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const About: React.FC = () => {
  // Partners data
  const partners = [
    { id: 1, name: "Cisco", logo: "/cisco.png", alt: "Cisco Partner" },
    {
      id: 2,
      name: "CompTIA",
      logo: "/comptia.png",
      alt: "CompTIA Partner",
    },
    {
      id: 3,
      name: "Microsoft",
      logo: "/microsoft.png",
      alt: "Microsoft Partner",
    },
    {
      id: 4,
      name: "Palo Alto",
      logo: "/paloalto.jpg",
      alt: "Palo Alto Networks Partner",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - MTMKay IT Training & Consultancy</title>
        <meta
          name="description"
          content="Learn about MTMKay's mission, vision, and the expert team dedicated to your success in the IT industry."
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
            About MTMKay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg"
          >
            Pioneering Excellence in IT Education and Solutions
          </motion.p>
        </div>
      </header>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/learning.jpg"
                alt="Team working"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                MTMKay Technology Solutions combines technical expertise,
                strategic partnerships with top technology providers, and a
                commitment to bridging the digital divide. Our team delivers
                tailored IT solutions that drive business success. At MTMKay
                Technology Solutions, our mission is to empower businesses and
                individuals through innovative IT solutions, advanced
                CyberSecurity, and industry-leading training programs. We are
                committed to driving digital transformation and fostering growth
                within our community and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Target className="text-primary mr-4" size={40} />
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-600">
              To provide accessible, high-quality IT education and consultancy
              that equips our clients with practical skills and strategic
              advantages, fostering innovation and driving career and business
              growth.
            </p>
          </Card>
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Eye className="text-primary mr-4" size={40} />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-600">
              To be a leading global IT hub recognized for creating a new
              generation of tech leaders and for transforming businesses through
              technology.
            </p>
          </Card>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with industry leaders to bring you certified
              training and cutting-edge solutions
            </p>
          </div>

          {/* Carousel/Grid for Partners */}
          <div className="relative">
            {/* Carousel Navigation (for future implementation) */}
            {/* <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg">
              <ChevronRight size={24} className="text-gray-700" />
            </button> */}

            {/* Partners Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-gray-50 rounded-xl p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-24 flex items-center justify-center mb-3">
                      <img
                        src={partner.logo}
                        alt={partner.alt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {partner.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dots indicator for carousel (for future implementation) */}
            {/* <div className="flex justify-center mt-8 space-x-2">
              {partners.slice(0, partners.length - 2).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div> */}
          </div>

          {/* Partner Benefits */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">
              Benefits of Our Partnerships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Official Certification
                </h4>
                <p className="text-gray-600 text-sm">
                  Provide official certification paths for all major technology
                  vendors
                </p>
              </div>
              <div className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Latest Curriculum
                </h4>
                <p className="text-gray-600 text-sm">
                  Access to the most up-to-date training materials and exam
                  objectives
                </p>
              </div>
              <div className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Industry Recognition
                </h4>
                <p className="text-gray-600 text-sm">
                  Certifications recognized globally by employers and
                  organizations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Train at MTMKay */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Train With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Award size={48} className="mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Industry-Recognized</h3>
              <p className="text-gray-600">
                Our certifications are valued by employers worldwide.
              </p>
            </div>
            <div className="p-6">
              <Users size={48} className="mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Small Class Sizes</h3>
              <p className="text-gray-600">
                Personalized attention to ensure you grasp every concept.
              </p>
            </div>
            <div className="p-6">
              <Briefcase size={48} className="mx-auto text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Career Focused</h3>
              <p className="text-gray-600">
                We don't just teach, we prepare you for your next career move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600">
              The driving force behind our success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <Card key={member.id} className="text-center py-6">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                {/* <p className="text-gray-600 text-sm">{member.bio}</p> */}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
