import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trainingsData } from "../data/trainings";
import NotFound from "./NotFound";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import {
  Target,
  UserCheck,
  BookOpen,
  Briefcase,
  Box,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { CourseModule } from "../../types";

const TrainingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const training = trainingsData.find((t) => t.id === id);

  if (!training) {
    return <NotFound />;
  }

  const courseOutlineItems = training.outline.map((module: CourseModule) => ({
    id: module.id,
    title: `${module.title} (${module.duration})`,
    content: (
      <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600">
        {module.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    ),
  }));

  return (
    <>
      <Helmet>
        <title>{training.title} - MTMKay</title>
        <meta name="description" content={training.shortDescription} />
        <meta property="og:title" content={training.title} />
        <meta property="og:description" content={training.shortDescription} />
        <meta property="og:image" content={training.bannerImage} />
        <link
          rel="canonical"
          href={`https://www.mtmkay.com/trainings/${training.id}`}
        />
      </Helmet>

      {/* Banner */}
      <header
        className="relative bg-cover bg-center h-64 md:h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(29, 78, 216, 0.7), rgba(29, 78, 216, 0.7)), url(${training.bannerImage})`,
        }}
      >
        <div className="text-center px-4">
          <p className="text-lg font-semibold tracking-wider uppercase">
            {training.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
            {training.title}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              {training.shortDescription}
            </p>

            {/* Objectives */}
            <div className="mb-12">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <Target className="mr-3 text-primary" /> Objectives
              </h3>
              <ul className="space-y-2 list-disc list-inside pl-4 text-gray-700">
                {training.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <UserCheck className="mr-3 text-primary" /> Eligibility
                Requirements
              </h3>
              <ul className="space-y-2 list-disc list-inside pl-4 text-gray-700">
                {training.eligibility.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Course Outline */}
            <div className="mb-12">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <BookOpen className="mr-3 text-primary" /> Course Outline
              </h3>
              <Accordion items={courseOutlineItems} />
            </div>

            {/* Job Opportunities */}
            <div className="mb-12">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <Briefcase className="mr-3 text-primary" /> Job Opportunities
              </h3>
              <div className="flex flex-wrap gap-2">
                {training.jobOpportunities.map((job, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold flex items-center mb-4">
                <Box className="mr-3 text-primary" /> Training Resources
              </h3>
              <ul className="space-y-2 list-disc list-inside pl-4 text-gray-700">
                {training.resources.map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-bold mb-4">
                Available Training Slots
              </h3>
              <div className="space-y-4">
                {training.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="border border-gray-200 p-4 rounded-md"
                  >
                    <p className="flex items-center text-gray-700 mb-1">
                      <Calendar size={16} className="mr-2 text-primary" />{" "}
                      {new Date(slot.startDate).toLocaleDateString()} -{" "}
                      {new Date(slot.endDate).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-gray-700 mb-1">
                      <Clock size={16} className="mr-2 text-primary" />{" "}
                      {slot.schedule}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <Users size={16} className="mr-2 text-primary" />{" "}
                      {slot.availableSeats} / {slot.seats} seats left
                    </p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() =>
                  navigate("/register", { state: { trainingId: training.id } })
                }
                size="lg"
                className="w-full mt-6"
              >
                Register Now
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default TrainingDetail;
