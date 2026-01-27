import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { X, Info } from "lucide-react";

interface TrainingFormProps {
  training?: any;
  onSubmit: (data: TrainingFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  uploadProgress?: number;
}

export interface TrainingSlot {
  id: string;
  startDate: string;
  endDate: string;
  schedule: string;
  seats: number;
  availableSeats: number;
}

export interface TrainingFormData {
  title: string;
  summary: string;
  objectives: string;
  eligibility: string;
  outline: string;
  resources: string;
  slots: TrainingSlot[];
  price: number;
  image?: File | null;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
  training,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    training?.image || null,
  );

  const [formData, setFormData] = useState<TrainingFormData>({
    title: training?.title || "",
    summary: training?.summary || "",
    objectives: training?.objectives || "",
    eligibility: training?.eligibility || "",
    outline: training?.outline || "",
    resources: training?.resources || "",
    slots: training?.slots || [
      {
        id: "1",
        startDate: "",
        endDate: "",
        schedule: "",
        seats: 20,
        availableSeats: 20,
      },
    ],
    price: training?.price || 0,
    image: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<string>("basic");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.slots.length < 1) {
      newErrors.slots = "Must have at least 1 slot";
    }

    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (formData.slots.length < 1) {
      newErrors.slots = "Must have at least 1 slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSlot = () => {
    setFormData((prev) => ({
      ...prev,
      slots: [
        ...prev.slots,
        {
          id: crypto.randomUUID(),
          startDate: "",
          endDate: "",
          schedule: "",
          seats: 20,
          availableSeats: 20,
        },
      ],
    }));
  };

  const updateSlot = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      slots: prev.slots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot,
      ),
    }));
  };

  const removeSlot = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      slots: prev.slots.filter((slot) => slot.id !== id),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);
  };

  const sections = [
    { id: "basic", label: "Basic Info" },
    { id: "description", label: "Description" },
    { id: "content", label: "Course Content" },
    { id: "logistics", label: "Logistics" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-6xl my-8">
        <Card className="relative p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {training ? "Edit Training" : "Add New Training"}
              </h2>
              <p className="text-gray-600 mt-1">
                Fill in the details below to create a new training program
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300"
                style={{
                  width: `${
                    (sections.findIndex((s) => s.id === activeSection) + 1) * 25
                  }%`,
                }}
              ></div>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`relative z-10 flex flex-col items-center ${
                    activeSection === section.id
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="min-h-[500px]">
              {/* Section 1: Basic Information */}
              {activeSection === "basic" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info
                        className="text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-blue-700 text-sm">
                        Start with the basic details. Title, price, and slots
                        are required fields.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          errors.title
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="e.g., Advanced React Development Workshop"
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (XAF) *
                      </label>
                      <div className="relative">
                        {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          XAF
                        </span> */}
                        <input
                          type="number"
                          name="price"
                          min="0"
                          step="100"
                          value={formData.price}
                          onChange={handleChange}
                          className={`w-full px-4 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            errors.price
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.price}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Enter 0 if the training is free
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brief Summary
                      </label>
                      <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-gray-400"
                        placeholder="A short description that will appear in training listings..."
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Keep it concise - 2-3 sentences maximum
                      </p>
                    </div>

                    {/* Training Image */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training Cover Image
                      </label>

                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all
                          ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}
                        `}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />

                        {!imagePreview ? (
                          <p className="text-gray-500 text-sm">
                            Drag & drop an image here, or click to select
                          </p>
                        ) : (
                          <div className="space-y-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="mx-auto h-40 rounded-lg object-cover border"
                            />

                            <div className="flex justify-center gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  document
                                    .querySelector<HTMLInputElement>(
                                      'input[type="file"]',
                                    )
                                    ?.click()
                                }
                              >
                                Replace Image
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                className="text-red-600 border-red-300"
                                onClick={removeImage}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Upload Progress */}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploading… {uploadProgress}%
                          </p>
                        </div>
                      )}

                      <p className="mt-2 text-xs text-gray-500">
                        JPG / PNG • Recommended 1200×600px
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Description */}
              {activeSection === "description" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info
                        className="text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-blue-700 text-sm">
                        Describe what participants will learn and who should
                        attend.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Objectives */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Objectives
                      </label>
                      <textarea
                        name="objectives"
                        value={formData.objectives}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-gray-400"
                        placeholder="• Understand React fundamentals
• Build scalable applications
• Implement best practices
..."
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Use bullet points (start each line with •) for better
                        readability
                      </p>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Who Should Attend?
                      </label>
                      <textarea
                        name="eligibility"
                        value={formData.eligibility}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-gray-400"
                        placeholder="• Junior to mid-level developers
• Basic JavaScript knowledge required
• Familiarity with web development concepts
..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Course Content */}
              {activeSection === "content" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info
                        className="text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-blue-700 text-sm">
                        Outline the course structure and topics to be covered.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Outline
                    </label>
                    <textarea
                      name="outline"
                      value={formData.outline}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-gray-400 font-mono text-sm"
                      placeholder="Module 1: Introduction
• What is React?
• Why use React?

Module 2: Core Concepts
• Components and Props
• State and Lifecycle

Module 3: Advanced Topics
• Hooks
• Context API
..."
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Structure with modules or sections for better organization
                    </p>
                  </div>
                </div>
              )}

              {/* Section 4: Logistics */}
              {activeSection === "logistics" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info
                        className="text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <p className="text-blue-700 text-sm">
                        List any materials or resources participants need.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Resources/Materials
                    </label>
                    <textarea
                      name="resources"
                      value={formData.resources}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-gray-400"
                      placeholder="• Laptop with Node.js installed
• Modern web browser
• Text editor (VS Code recommended)
• Internet connection
..."
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Be specific about software versions and hardware
                      requirements
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Training Slots
                      </h3>
                      <Button type="button" onClick={addSlot}>
                        + Add Slot
                      </Button>
                    </div>

                    {formData.slots.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No slots added yet. Add at least one training slot.
                      </p>
                    )}

                    {formData.slots.map((slot, index) => (
                      <div
                        key={slot.id}
                        className="border rounded-lg p-4 space-y-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Slot {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeSlot(slot.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={slot.startDate}
                              onChange={(e) =>
                                updateSlot(slot.id, "startDate", e.target.value)
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={slot.endDate}
                              onChange={(e) =>
                                updateSlot(slot.id, "endDate", e.target.value)
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-sm font-medium">
                              Schedule
                            </label>
                            <input
                              type="text"
                              placeholder="Mon, Wed - 6 PM to 9 PM"
                              value={slot.schedule}
                              onChange={(e) =>
                                updateSlot(slot.id, "schedule", e.target.value)
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Seats</label>
                            <input
                              type="number"
                              min={1}
                              value={slot.seats}
                              onChange={(e) =>
                                updateSlot(
                                  slot.id,
                                  "seats",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">
                              Available Seats
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={slot.availableSeats}
                              onChange={(e) =>
                                updateSlot(
                                  slot.id,
                                  "availableSeats",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Preview</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <span className="font-medium">Title:</span>{" "}
                        {formData.title || "Not provided"}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span>
                        {formData.price.toLocaleString()} XAF
                      </p>
                      <p>
                        <span className="font-medium">Slots:</span>{" "}
                        {formData.slots.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t mt-8">
              <div>
                {activeSection !== "basic" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection,
                      );
                      setActiveSection(sections[currentIndex - 1].id);
                    }}
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>

                {activeSection !== "logistics" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection,
                      );
                      setActiveSection(sections[currentIndex + 1].id);
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {training ? "Update Training" : "Create Training"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TrainingForm;
