
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you shortly!');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MTMKay IT Training & Consultancy</title>
        <meta name="description" content="Get in touch with MTMKay for inquiries about our courses, services, or any other questions." />
      </Helmet>
      
      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">We'd love to hear from you. Let's talk about your future in tech.</p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input id="name" label="Full Name" placeholder="John Doe" required />
                <Input id="email" label="Email Address" type="email" placeholder="you@example.com" required />
                <Input id="subject" label="Subject" placeholder="Inquiry about Web Development Course" required />
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            </div>
            
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-primary mt-1 mr-4 flex-shrink-0" size={24}/>
                    <div>
                        <h3 className="font-semibold">Our Office</h3>
                        <p className="text-gray-600">123 Tech Avenue, Silicon Valley, CA 94000, USA</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <Mail className="text-primary mt-1 mr-4 flex-shrink-0" size={24}/>
                    <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <a href="mailto:info@mtmkay.com" className="text-gray-600 hover:text-primary">info@mtmkay.com</a>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <Phone className="text-primary mt-1 mr-4 flex-shrink-0" size={24}/>
                    <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <a href="tel:+1234567890" className="text-gray-600 hover:text-primary">+1 (234) 567-890</a>
                    </div>
                  </div>
              </div>
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.332306346453!2d-122.08620868469418!3d37.42206597982544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba024251f9d7%3A0x271f45a68731057!2sGoogleplex!5e0!3m2!1sen!2sus!4v1628892837324!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="MTMKay Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
