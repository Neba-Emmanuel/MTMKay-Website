import React from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen, PenSquare, Users, CreditCard } from "lucide-react";
import Card from "../../components/ui/Card";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Trainings",
      value: "4",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Total Blog Posts",
      value: "3",
      icon: PenSquare,
      color: "text-green-500",
    },
    {
      title: "New Registrations",
      value: "12",
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Total Revenue",
      value: "$6,000",
      icon: CreditCard,
      color: "text-purple-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - MTMKay Admin</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 flex items-center">
              <stat.icon className={`${stat.color} h-10 w-10 mr-4`} />
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
            {/* Placeholder for recent registrations list */}
            <p className="text-gray-500">No new registrations to show.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            {/* Placeholder for quick actions */}
            <p className="text-gray-500">Quick actions coming soon.</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
