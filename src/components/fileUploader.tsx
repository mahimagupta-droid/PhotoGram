import { useUserContext } from "@/context/userAuthContext";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

type FileUploaderProps = {
  onUploadComplete: (url: string) => void
}

export default function FileUploader({onUploadComplete}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext()

  const handleUpload = async () => {
    if( file==null || user==null) return;
    try {
      setLoading(true);
      const docRef = ref(storage, `posts/${user.uid}/${Date.now()}-${file.name}`);
      await uploadBytes(docRef, file);
      const imgURL = await getDownloadURL(docRef);
      onUploadComplete(imgURL)
      setFile(null)
      alert("photo uploaded successfully!")
    } catch(error) {
      console.log("error uploading image", error)
      alert("image not uploaded")
    } finally {
      setLoading(false)
    };
  };
  console.log("USER:", user);

  return (
  <div className="flex flex-col gap-4">
    {/* Hidden native input */}
    <input
      type="file"
      accept="image/*"
      id="file-input"
      className="hidden"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />

    {/* Custom button */}
    <label
      htmlFor="file-input"
      className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-300 transition"
    >
      {file ? file.name : "Choose Photo"}
    </label>

    {/* Upload button */}
    <button
      onClick={handleUpload}
      disabled={!file || loading}
      className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Uploading..." : "Upload Photo"}
    </button>
  </div>
);

}