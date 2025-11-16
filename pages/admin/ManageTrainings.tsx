
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { trainingsData } from '../../data/trainings';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Edit, Trash, PlusCircle } from 'lucide-react';

const ManageTrainings: React.FC = () => {
    // In a real app, this would use state and API calls.
    // const [trainings, setTrainings] = useState(trainingsData);

  return (
    <>
      <Helmet>
        <title>Manage Trainings - MTMKay Admin</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Trainings</h1>
            <Button>
                <PlusCircle size={20} className="mr-2" />
                Add New Training
            </Button>
        </div>
        
        <Card>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {trainingsData.map((training) => (
                            <tr key={training.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{training.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{training.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {training.slots.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-dark mr-4">
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800">
                                        <Trash size={18} />
                                    </button>
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

export default ManageTrainings;
