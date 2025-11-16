
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { teamData } from '../../data/team';
import Card from '../../components/ui/Card';
// Fix: Import missing 'Users' and 'Briefcase' icons.
import { Target, Eye, Award, Users, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - MTMKay IT Training & Consultancy</title>
        <meta name="description" content="Learn about MTMKay's mission, vision, and the expert team dedicated to your success in the IT industry." />
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
              <img src="https://picsum.photos/seed/about/600/400" alt="Team working" className="rounded-lg shadow-xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                MTMKay IT Training & Consultancy Center was founded with a simple yet powerful mission: to empower individuals and organizations with the knowledge and skills needed to thrive in the digital age. We are a team of passionate industry experts, educators, and innovators dedicated to delivering top-tier IT training and strategic consultancy services. Our approach is hands-on, practical, and always aligned with the latest industry trends.
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
            <p className="text-gray-600">To provide accessible, high-quality IT education and consultancy that equips our clients with practical skills and strategic advantages, fostering innovation and driving career and business growth.</p>
          </Card>
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Eye className="text-primary mr-4" size={40} />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-600">To be a leading global IT hub recognized for creating a new generation of tech leaders and for transforming businesses through technology.</p>
          </Card>
        </div>
      </section>

      {/* Why Train at MTMKay */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Train With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                    <Award size={48} className="mx-auto text-secondary mb-4"/>
                    <h3 className="text-xl font-bold mb-2">Industry-Recognized</h3>
                    <p className="text-gray-600">Our certifications are valued by employers worldwide.</p>
                </div>
                 <div className="p-6">
                    <Users size={48} className="mx-auto text-secondary mb-4"/>
                    <h3 className="text-xl font-bold mb-2">Small Class Sizes</h3>
                    <p className="text-gray-600">Personalized attention to ensure you grasp every concept.</p>
                </div>
                 <div className="p-6">
                    <Briefcase size={48} className="mx-auto text-secondary mb-4"/>
                    <h3 className="text-xl font-bold mb-2">Career Focused</h3>
                    <p className="text-gray-600">We don't just teach, we prepare you for your next career move.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600">The driving force behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <Card key={member.id} className="text-center p-6">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
