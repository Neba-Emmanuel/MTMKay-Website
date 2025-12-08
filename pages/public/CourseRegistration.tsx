import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trainingsData } from "../../data/trainings";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
import { CheckCircle } from "lucide-react";

const CourseRegistration: React.FC = () => {
  const location = useLocation();
  const preselectedTrainingId = location.state?.trainingId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trainingId, setTrainingId] = useState(preselectedTrainingId || "");
  const [slotId, setSlotId] = useState("");
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Confirmation

  const selectedTraining = trainingsData.find((t) => t.id === trainingId);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone && trainingId && slotId) {
      setStep(2);
    } else {
      alert("Please fill all fields");
    }
  };

  const handlePaymentConfirm = () => {
    // In a real app, this would involve API calls to a payment gateway
    setStep(3);
  };

  const PaymentUI = () => (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Complete Your Payment</h3>
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <p className="text-gray-600">Training:</p>
        <p className="font-bold text-lg">{selectedTraining?.title}</p>
        <p className="text-3xl font-bold text-primary mt-4">Amount: $500</p>
      </div>
      <Tabs
        tabs={[
          {
            label: "MTN Mobile Money",
            content: (
              <div>
                <Input
                  id="momo-phone"
                  label="Phone Number"
                  placeholder="Enter your MoMo number"
                />
                <p className="text-sm text-gray-500 mt-2">
                  A payment prompt will be sent to your phone.
                </p>
              </div>
            ),
          },
          {
            label: "Orange Money",
            content: (
              <div>
                <Input
                  id="orange-phone"
                  label="Phone Number"
                  placeholder="Enter your Orange Money number"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Follow the instructions on your phone to complete payment.
                </p>
              </div>
            ),
          },
        ]}
      />
      <p className="mt-6 text-center text-gray-600">
        Transaction Reference:{" "}
        <span className="font-mono bg-gray-200 p-1 rounded">MTM-REF-12345</span>
      </p>
      <Button onClick={handlePaymentConfirm} className="w-full mt-4" size="lg">
        Confirm Payment
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Course Registration - MTMKay</title>
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Course Registration</h1>
          <p className="mt-2 text-lg">
            Secure your spot in one of our expert-led trainings.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {step === 1 && (
              <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-bold mb-6">
                  Registration Details
                </h2>
                <div className="space-y-6">
                  <Input
                    id="name"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <div>
                    <label
                      htmlFor="training"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select Training
                    </label>
                    <select
                      id="training"
                      value={trainingId}
                      onChange={(e) => {
                        setTrainingId(e.target.value);
                        setSlotId("");
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">-- Choose a training --</option>
                      {trainingsData.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedTraining && (
                    <div>
                      <label
                        htmlFor="slot"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Schedule
                      </label>
                      <select
                        id="slot"
                        value={slotId}
                        onChange={(e) => setSlotId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">-- Choose a schedule --</option>
                        {selectedTraining.slots.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.schedule} (Starts:{" "}
                            {new Date(s.startDate).toLocaleDateString()})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full mt-8" size="lg">
                  Proceed to Payment
                </Button>
              </form>
            )}

            {step === 2 && <PaymentUI />}

            {step === 3 && (
              <div className="text-center py-10">
                <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Registration Complete!</h2>
                <p className="text-gray-600 mt-2">
                  Thank you for registering. A confirmation email has been sent
                  to you with further details.
                </p>
                <Button asLink to="/trainings" className="mt-8">
                  Explore More Trainings
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseRegistration;
