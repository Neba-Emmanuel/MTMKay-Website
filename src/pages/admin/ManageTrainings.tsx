import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Edit, Trash, PlusCircle } from "lucide-react";
import { useApiRequest } from "../../hooks/useApiRequest";
import sweetAlert from "@/src/utils/alerts";
import { showConfirmationDialog } from "@/src/utils/alerts";
import TrainingForm, {
  TrainingFormData,
} from "../../components/admin/TrainingForm";
import { mapTrainingPayload } from "../../utils/mapTrainingPayload";

const ManageTrainings: React.FC = () => {
  const { request, data: trainings, loading, error } = useApiRequest();
  const [showForm, setShowForm] = useState(false);
  const [editingTraining, setEditingTraining] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    request({
      method: "GET",
      url: "/trainings",
    });
  };

  const handleAddNew = () => {
    setEditingTraining(null);
    setShowForm(true);
  };

  const handleEdit = (training: any) => {
    setEditingTraining(training);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: TrainingFormData) => {
    setFormLoading(true);

    try {
      const payload = new FormData();

      const mapped = mapTrainingPayload(formData, {
        existingSlug: editingTraining?.slug,
      });

      Object.entries(mapped).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, String(value));
        }
      });

      await request({
        method: editingTraining ? "PUT" : "POST",
        url: editingTraining
          ? `/trainings/${editingTraining.id}`
          : "/trainings",
        data: payload,
      });

      sweetAlert({
        icon: "success",
        title: editingTraining
          ? "Training updated successfully"
          : "Training created successfully",
      });

      setShowForm(false);
      fetchTrainings();
    } catch (err) {
      sweetAlert({ icon: "error", title: "Operation failed" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmationDialog(
      "Delete Training?",
      "This action cannot be undone",
    );

    if (!result.isConfirmed) return;

    try {
      await request({
        method: "DELETE",
        url: `/trainings/${id}`,
      });

      sweetAlert({
        icon: "success",
        title: "Training deleted successfully",
      });

      fetchTrainings();
    } catch {
      sweetAlert({
        icon: "error",
        title: "Failed to delete training",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Trainings - MTMKay Admin</title>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Trainings</h1>
          <Button onClick={handleAddNew}>
            <PlusCircle size={20} className="mr-2" />
            Add New Training
          </Button>
        </div>

        <Card>
          {loading && <p className="p-4 text-gray-500">Loading trainings…</p>}
          {error && (
            <p className="p-4 text-red-600">Failed to load trainings</p>
          )}

          {!loading && trainings && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Slots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {trainings.map((training: any) => (
                    <tr key={training.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {training.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {training.price.toLocaleString()} XAF
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {training.slots}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(training.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(training)}
                          className="text-primary mr-4 hover:text-primary-dark"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(training.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {showForm && (
          <TrainingForm
            training={editingTraining}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingTraining(null);
            }}
            loading={formLoading}
            uploadProgress={uploadProgress}
          />
        )}
      </div>
    </>
  );
};

export default ManageTrainings;
