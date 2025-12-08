import React from "react";
import { Helmet } from "react-helmet-async";
import Card from "../../components/ui/Card";
import { Registration } from "../../types";

const mockRegistrations: Registration[] = [
  {
    id: "reg1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "111-222-3333",
    trainingId: "web-development-bootcamp",
    trainingTitle: "Full-Stack Web Development Bootcamp",
    slotId: "slot1",
    registrationDate: "2024-07-20",
    status: "Confirmed",
  },
  {
    id: "reg2",
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "444-555-6666",
    trainingId: "data-science-mastery",
    trainingTitle: "Data Science & Machine Learning Mastery",
    slotId: "dsslot1",
    registrationDate: "2024-07-19",
    status: "Pending",
  },
  {
    id: "reg3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "777-888-9999",
    trainingId: "web-development-bootcamp",
    trainingTitle: "Full-Stack Web Development Bootcamp",
    slotId: "slot2",
    registrationDate: "2024-07-18",
    status: "Cancelled",
  },
];

const ManageRegistrations: React.FC = () => {
  const getStatusBadge = (status: Registration["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Registrations - MTMKay Admin</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Registrations
        </h1>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Training
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="relative px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRegistrations.map((reg) => (
                  <tr key={reg.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {reg.name}
                      </div>
                      <div className="text-sm text-gray-500">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.trainingTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reg.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          reg.status
                        )}`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-primary hover:text-primary-dark"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ManageRegistrations;
