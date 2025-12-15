import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { trainingsData } from "../data/trainings";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { ArrowRight, Search } from "lucide-react";

const Trainings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(trainingsData.map((t) => t.category))),
  ];

  const filteredTrainings = useMemo(() => {
    return trainingsData.filter((training) => {
      const matchesSearch =
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "All" || training.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  return (
    <>
      <Helmet>
        <title>All Trainings - MTMKay IT Training & Consultancy</title>
        <meta
          name="description"
          content="Browse our comprehensive list of IT trainings. Find the perfect course in web development, data science, cybersecurity, and more."
        />
      </Helmet>

      {/* Page Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Our Trainings</h1>
          <p className="mt-2 text-lg">
            Find the perfect course to launch or advance your IT career.
          </p>
        </div>
      </header>

      {/* Filters Section */}
      <section className="py-8 bg-gray-100 sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                id="search"
                type="text"
                placeholder="Search for a training..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Trainings Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredTrainings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainings.map((course) => (
                <Card key={course.id} className="h-full flex flex-col">
                  <img
                    src={course.bannerImage.replace("/1200/400", "/400/225")}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-sm font-semibold text-primary mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 flex-grow">
                      {course.shortDescription}
                    </p>
                    <Link
                      to={`/trainings/${course.id}`}
                      className="mt-4 inline-flex items-center font-semibold text-primary hover:underline"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-800">
                No Trainings Found
              </h2>
              <p className="text-gray-600 mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
          {/* Pagination could be added here */}
        </div>
      </section>
    </>
  );
};

export default Trainings;
