import React from "react";
import { Helmet } from "react-helmet-async";
import Card from "../../components/ui/Card";
import { Payment } from "../../types";

const mockPayments: Payment[] = [
  {
    id: "pay1",
    registrationId: "reg1",
    amount: 500,
    currency: "USD",
    method: "MTN Mobile Money",
    transactionRef: "MTM-REF-12345",
    paymentDate: "2024-07-20",
    status: "Success",
  },
  {
    id: "pay2",
    registrationId: "reg2",
    amount: 800,
    currency: "USD",
    method: "Orange Money",
    transactionRef: "MTM-REF-67890",
    paymentDate: "2024-07-19",
    status: "Pending",
  },
  {
    id: "pay3",
    registrationId: "reg4",
    amount: 500,
    currency: "USD",
    method: "MTN Mobile Money",
    transactionRef: "MTM-REF-11223",
    paymentDate: "2024-07-18",
    status: "Failed",
  },
];

const ViewPayments: React.FC = () => {
  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>View Payments - MTMKay Admin</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">View Payments</h1>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transaction Ref
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Method
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
                {mockPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {payment.transactionRef}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount} {payment.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-primary hover:text-primary-dark"
                      >
                        View Receipt
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

export default ViewPayments;
