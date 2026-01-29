export async function uploadImage(
  file: File,
  type: "blog" | "training",
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const res = await fetch("https://mtmkay-backend.vercel.app/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data.url;
}
