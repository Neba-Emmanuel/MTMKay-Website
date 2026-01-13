import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import sweetAlert from "../utils/alerts";
import { useApiRequest } from "../hooks/useApiRequest";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { request } = useApiRequest();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await request({
        method: "POST",
        url: "/contact/form",
        data: formData,
      });

      // Check if response already has a data property
      if (response && typeof response === "object" && response.data) {
        // Handle if hook already parsed JSON
        const data = response.data;

        if (response.success === false) {
          throw new Error(data.message || "Failed to send message");
        }

        sweetAlert({
          icon: "success",
          title: data.message || "Message sent successfully!",
        });

        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
        return;
      }

      // If it's a standard Fetch Response
      if (response && typeof response.json === "function") {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send message");
        }

        sweetAlert({
          icon: "success",
          title: data.message || "Message sent successfully!",
        });

        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        // If response is already parsed data
        const data = response;
        if (data.success === false) {
          throw new Error(data.message || "Failed to send message");
        }

        sweetAlert({
          icon: "success",
          title: data.message || "Message sent successfully!",
        });

        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MTMKay IT Training & Consultancy</title>
        <meta
          name="description"
          content="Get in touch with MTMKay for inquiries about our courses, services, or any other questions."
        />
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            We'd love to hear from you. Let's talk about your future in tech.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-green-800 font-medium">
                      Message sent successfully!
                    </p>
                    <p className="text-green-600 text-sm">
                      We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="text-red-500 mr-3" size={24} />
                  <div>
                    <p className="text-red-800 font-medium">
                      Error sending message
                    </p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  id="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="subject"
                  label="Subject"
                  placeholder="Inquiry about Web Development Course"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin
                    className="text-primary mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <p className="text-gray-600">Southwest Region, Cameroon</p>
                    <p className="text-gray-600">
                      Opposite Alaska Street Buea Road Kumba
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail
                    className="text-primary mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a
                      href="mailto:support@mtmkay.com"
                      className="text-gray-600 hover:text-primary"
                    >
                      support@mtmkay.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone
                    className="text-primary mt-1 mr-4 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a
                      href="tel:+237671128616"
                      className="text-gray-600 hover:text-primary"
                    >
                      (+237) 671 128 616
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=4.628342802301623,9.453579782474664&z=16&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
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
