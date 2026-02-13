import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  Coffee,
  Calendar,
  Clock,
  Award,
  Sun,
} from "lucide-react";
import sweetAlert from "../utils/alerts";
import { useApiRequest } from "../hooks/useApiRequest";

const Contact: React.FC = () => {
  const location = useLocation();
  const navigationState = location.state as {
    source?: string;
    plan?: {
      name: string;
      price?: string;
      period?: string;
      features?: string[];
    };
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [selectedPlan, setSelectedPlan] = useState(
    navigationState?.plan || null,
  );
  const [showPlanSummary, setShowPlanSummary] = useState(
    !!navigationState?.plan,
  );

  const { request } = useApiRequest();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill form based on selected plan
  useEffect(() => {
    if (navigationState?.source === "work-cafe" && navigationState?.plan) {
      const plan = navigationState.plan;

      // Set subject based on plan
      let subject = "";
      let message = "";

      if (plan.name === "General Inquiry") {
        subject = "Work Café Booking Inquiry";
        message = `Hi, I'm interested in booking a spot at the Work Café. Please provide more information about availability and how to book.`;
      } else {
        subject = `Work Café - ${plan.name} Booking`;

        // Build message with plan details
        message = `Hi, I'm interested in the ${plan.name} for Work Café.\n\n`;
        message += `Plan Details:\n`;
        message += `- Plan: ${plan.name}\n`;
        if (plan.price && plan.period) {
          message += `- Price: ${plan.price} FCFA/${plan.period}\n`;
        }
        if (plan.features && plan.features.length > 0) {
          message += `- Features:\n`;
          plan.features.slice(0, 3).forEach((feature) => {
            message += `  • ${feature}\n`;
          });
        }
        message += `\nPlease contact me with more information about booking this plan.`;
      }

      setFormData((prev) => ({
        ...prev,
        subject: subject,
        message: message,
      }));
    }
  }, [navigationState]);

  // Get icon for plan
  const getPlanIcon = (planName: string) => {
    if (planName.includes("Hourly")) return Clock;
    if (planName.includes("Day")) return Sun;
    if (planName.includes("Weekly")) return Calendar;
    if (planName.includes("Monthly")) return Award;
    return Coffee;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const clearPlanSelection = () => {
    setSelectedPlan(null);
    setShowPlanSummary(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Add plan information to the submission
      const submissionData = {
        ...formData,
        source: navigationState?.source || "direct",
        plan: selectedPlan || navigationState?.plan || null,
      };

      const response = await request({
        method: "POST",
        url: "/contact/form",
        data: submissionData,
      });

      // Handle response...
      if (response && typeof response === "object" && response.data) {
        const data = response.data;

        if (response.success === false) {
          throw new Error(data.message || "Failed to send message");
        }

        let successMessage = data.message || "Message sent successfully!";
        if (selectedPlan) {
          successMessage = `Your ${selectedPlan.name} inquiry has been sent! We'll contact you shortly.`;
        }

        sweetAlert({
          icon: "success",
          title: successMessage,
        });

        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSelectedPlan(null);
        setShowPlanSummary(false);
        setTimeout(() => setSuccess(false), 5000);
        return;
      }

      // Handle other response types...
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
        <link rel="canonical" href="https://www.mtmkay.com/contact" />
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            {selectedPlan
              ? `Complete your ${selectedPlan.name} inquiry`
              : "We'd love to hear from you. Let's talk about your future in tech."}
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {/* Plan Summary Banner */}
              {showPlanSummary && selectedPlan && (
                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {React.createElement(getPlanIcon(selectedPlan.name), {
                            size: 20,
                            className: "text-primary",
                          })}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {selectedPlan.name} - Work Café
                        </h3>
                        {selectedPlan.price && selectedPlan.period && (
                          <p className="text-primary font-bold">
                            {selectedPlan.price} FCFA/{selectedPlan.period}
                          </p>
                        )}
                        {selectedPlan.features &&
                          selectedPlan.features.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600 mb-1">
                                Includes:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-0.5">
                                {selectedPlan.features
                                  .slice(0, 3)
                                  .map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center gap-1"
                                    >
                                      <CheckCircle
                                        size={12}
                                        className="text-green-500"
                                      />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                    <button
                      onClick={clearPlanSelection}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-6">
                {selectedPlan
                  ? `Book Your ${selectedPlan.name}`
                  : "Send Us a Message"}
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-green-800 font-medium">
                      {selectedPlan
                        ? `${selectedPlan.name} inquiry sent!`
                        : "Message sent successfully!"}
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
                  ) : selectedPlan ? (
                    `Submit ${selectedPlan.name} Inquiry`
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

              {/* Work Café Quick Links */}
              {!selectedPlan && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">
                    Quick Book Work Café
                  </h3>
                  <div className="space-y-2">
                    <Button
                      asLink
                      to="/work-cafe"
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Coffee size={16} className="mr-2" />
                      View All Work Café Plans
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
