import { useApiRequest } from "../hooks/useApiRequest";

export async function uploadImage(file: File, type: "blog" | "training") {
  const { request } = useApiRequest();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const res = await request({
    method: "POST",
    url: "https://mtmkay.com/api/upload.php",
    data: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return res.json();
}
