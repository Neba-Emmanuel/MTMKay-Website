import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Briefcase,
  CheckCircle,
  FileText,
  Users,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Lock,
  TrendingUp,
  Code,
  Server,
  Network,
  HardDrive,
  AlertOctagon,
  Target,
  UserCheck,
  Zap,
  DollarSign,
  ArrowRight,
  Download,
  Printer,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Capabilities = () => {
  const handleDownloadPDF = () => {
    window.print();
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const competencies = [
    {
      category: "Cybersecurity & Compliance",
      items: [
        "Cybersecurity assessments & vulnerability scanning",
        "ACAS / Nessus operations and reporting",
        "DoD cybersecurity readiness support",
        "Cybersecurity evaluations and risk identification",
        "Vulnerability remediation guidance",
        "Audit-ready compliance documentation",
      ],
      icon: Shield,
    },
    {
      category: "IT Infrastructure & Support",
      items: [
        "IT support and technical program administration",
        "Network troubleshooting and optimization",
        "Server and systems administration",
        "Hardware/software deployment and maintenance",
        "Help desk and end-user support",
        "Cloud infrastructure management",
      ],
      icon: Server,
    },
    {
      category: "Program Management & Consulting",
      items: [
        "Technology integration and digital transformation",
        "Program management and technical documentation",
        "Technology consulting and modernization support",
        "Process improvement and workflow optimization",
        "Strategic IT planning and roadmap development",
        "Quality assurance and control",
      ],
      icon: Briefcase,
    },
  ];

  const differentiators = [
    {
      icon: Award,
      title: "Service-Disabled Veteran-Owned",
      description:
        "SDVOSB certified with proven military discipline and mission-focused approach",
      color: "blue",
    },
    {
      icon: Shield,
      title: "DoD Systems Expertise",
      description:
        "ACAS / Nessus certified with hands-on experience in defense environments",
      color: "green",
    },
    {
      icon: Target,
      title: "Military-Grade Precision",
      description:
        "Aviation maintenance and QAR oversight background ensuring zero-defect execution",
      color: "purple",
    },
    {
      icon: Lock,
      title: "Security-First Approach",
      description:
        "Compliance-focused solutions built on top secret cleared experience",
      color: "red",
    },
  ];

  const certifications = [
    { name: "SAM Registered", icon: FileText },
    { name: "Top Secret Security Clearance", icon: Lock },
    { name: "CompTIA Security+", icon: Shield },
    { name: "CompTIA A+", icon: HardDrive },
    { name: "CompTIA Network+", icon: Network },
    { name: "ACAS Certified", icon: AlertOctagon },
    { name: "DoD Cybersecurity Certified", icon: UserCheck },
  ];

  const naicsCodes = [
    "541512",
    "541513",
    "541519",
    "541611",
    "541690",
    "561210",
    "611430",
    "611519",
    "721199",
  ];

  // Function to handle smooth scroll to core competencies section
  const scrollToCoreCompetencies = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("core-competencies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Capabilities Statement | MTMKay - SDVOSB IT & Cybersecurity Solutions
        </title>
        <meta
          name="description"
          content="MTMKay is a Service-Disabled Veteran-Owned Small Business (SDVOSB) delivering secure, reliable IT and cybersecurity solutions for government and commercial clients. ACAS, Nessus, DoD certified."
        />
        <meta
          name="keywords"
          content="SDVOSB, IT consulting, cybersecurity, ACAS, Nessus, DoD, veteran-owned, government contracting"
        />
        <link
          rel="canonical"
          href="https://mtmkay.com/capabilities-statement"
        />
      </Helmet>

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-primary-dark to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award size={16} />
              <span className="text-sm font-medium">
                Service-Disabled Veteran-Owned Small Business
              </span>
            </div> */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Capabilities Statement
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Delivering secure, reliable IT and cybersecurity solutions
              strengthened by military precision and DoD expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asLink
                to="/contact"
                size="lg"
                variant="secondary"
                className="text-white hover:bg-gray-100"
              >
                Request Capabilities Package
              </Button>
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>

            {/* SDVOSB Badge */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Star size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">
                  SDVOSB Certified • CAGE: 9V6S7 • UEI: N6TVP1A8K7J1
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Company Overview
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  <span className="font-bold text-gray-900">MTMKay</span> is a
                  Service-Disabled Veteran-Owned Small Business (SDVOSB)
                  providing reliable IT and cybersecurity support grounded in
                  hands-on U.S. Navy experience. With a foundation in aviation
                  maintenance oversight, enterprise IT environments, and quality
                  assurance, we deliver structured and dependable technology
                  solutions.
                </p>
                <p>
                  Based in Florida, MTMKay supports organizations with secure,
                  efficient technology services with a strong focus on accuracy,
                  accountability, and mission alignment. Through innovation and
                  strong industry partnerships, we help organizations modernize,
                  improve performance, and adapt to evolving technology demands.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-primary/10 to-blue-50 p-8 rounded-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award size={20} className="text-primary" />
                    SDVOSB Certification
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">UEI</span>
                      <span className="font-mono font-semibold">
                        N6TVP1A8K7J1
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">CAGE Code</span>
                      <span className="font-mono font-semibold">9V6S7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Business Type</span>
                      <span className="font-semibold text-primary">SDVOSB</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Competencies - Enhanced */}
      <section id="core-competencies" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Core Competencies
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive IT and cybersecurity capabilities backed by DoD
              expertise
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {competencies.map((competency, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                        <competency.icon size={24} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{competency.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {competency.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="text-green-500 flex-shrink-0 mt-1"
                        />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiators - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Our Differentiators
            </h2>
            <p className="text-lg text-gray-600">
              What sets MTMKay apart in the federal and commercial marketplace
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {differentiators.map((item, index) => {
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                red: "bg-red-100 text-red-600",
              };

              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-8 h-full flex items-start gap-6 hover:shadow-lg transition-shadow">
                    <div
                      className={`flex-shrink-0 h-14 w-14 rounded-xl flex items-center justify-center ${colorClasses[item.color as keyof typeof colorClasses]}`}
                    >
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certifications & NAICS - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award size={28} className="text-primary" />
                Licenses & Certifications
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0">
                      <cert.icon size={20} className="text-primary" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {cert.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Government Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-primary" />
                </div>
                <span>Government Information</span>
              </h2>

              <Card className="p-0 overflow-hidden">
                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* UEI & CAGE - Side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        {/* <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">
                            UEI
                          </span>
                        </div> */}
                        <span className="text-sm font-medium text-gray-500">
                          Unique Entity ID
                        </span>
                      </div>
                      <div className="font-mono text-xl font-bold text-gray-900 tracking-wider bg-white p-2 rounded border border-gray-200">
                        N6TVP1A8K7J1
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        SAM Registered • Active
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        {/* <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">
                            CAGE
                          </span>
                        </div> */}
                        <span className="text-sm font-medium text-gray-500">
                          Commercial & Government Entity
                        </span>
                      </div>
                      <div className="font-mono text-xl font-bold text-gray-900 tracking-wider bg-white p-2 rounded border border-gray-200">
                        9V6S7
                      </div>
                      <p className="text-xs text-gray-400 mt-2">DLA Verified</p>
                    </div>
                  </div>

                  {/* NAICS Codes */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {/* <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-xs">
                            NAICS
                          </span>
                        </div> */}
                        <h4 className="font-bold text-gray-700">NAICS Codes</h4>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {naicsCodes.length} Codes
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {naicsCodes.map((code, index) => (
                        <div key={index} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative bg-white border border-gray-200 hover:border-primary rounded-lg p-2 transition-all hover:shadow-md">
                            <div className="font-mono text-sm font-bold text-primary text-center">
                              {code}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notable Clients */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users size={28} className="text-primary" />
              Notable Clientele
            </h2>

            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Proud to serve and support mission-critical operations
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <img
                      src="/netc.webp"
                      alt="NETC Logo"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  <div className="text-left">
                    <p className="text-lg font-bold">
                      NETC – Pensacola, Florida
                    </p>
                    <p className="text-gray-600 text-sm">
                      Naval Education and Training Command
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      IT Support & Cybersecurity Readiness
                    </p>
                  </div>
                </div>
              </Card>

              {/* Placeholder for future clients */}
              <Card className="p-8 border-dashed border-2 border-gray-200 bg-white">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users size={30} className="text-gray-400" />
                  </div>

                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-500">
                      Additional Clients
                    </p>
                    <p className="text-gray-400 text-sm">
                      More partnerships coming soon
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Partner with MTMKay?
              </h2>
              <p className="text-xl text-gray-200">
                Contact our government POC to discuss your requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <UserCheck size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Government POC
                    </h3>
                    <p className="text-white/80">Michael Mbu</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Phone size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a
                      href="tel:+16122241176"
                      className="text-white/80 hover:text-white"
                    >
                      +1 (612) 224-1176
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:mbu.michael@mtmkay.com"
                      className="text-white/80 hover:text-white break-all"
                    >
                      mbu.michael@mtmkay.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Globe size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Website</h3>
                    <a
                      href="https://mtmkay.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white"
                    >
                      https://mtmkay.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button
                asLink
                to="/contact"
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Request Full Capabilities Package
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Capabilities;
