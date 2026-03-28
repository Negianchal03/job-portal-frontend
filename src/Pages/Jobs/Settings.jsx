import { useState, useEffect } from "react";
import { User } from "lucide-react";
import api from "../../Services/axiosConfig";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load saved data
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedName = localStorage.getItem("fileName");

    if (savedImage) setImageUrl(savedImage);
    if (savedName) setFileName(savedName);
  }, []);

  // File select
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);

    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }

    setError("");
    setSuccess("");
  };

  // Upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(res.data.message || "Uploaded successfully!");

      // Save image + name
      setImageUrl(res.data.url);
      localStorage.setItem("profileImage", res.data.url);
      localStorage.setItem("fileName", file.name);

      // ✅ Sync with Header
      window.dispatchEvent(new Event("profileUpdated"));

      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImageUrl(null);
    setPreview(null);
    setFile(null);
    setFileName("");

    localStorage.removeItem("profileImage");
    localStorage.removeItem("fileName");

    // ✅ Sync with Header
    window.dispatchEvent(new Event("profileUpdated"));
  };

  // Auto hide messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="px-12 py-10 min-h-screen bg-black text-white">
      
      <h1 className="text-3xl font-bold mb-10">
        Account <span className="text-purple-400">Settings</span>
      </h1>

      <div className="grid grid-cols-3 gap-8 justify-items-center">
        
        <div className="col-span-1 w-full max-w-sm bg-zinc-900/70 border border-purple-800/30 p-6 rounded-2xl backdrop-blur-lg hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-xl transition duration-300">
          
          {/* Profile Image */}
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={50} className="text-gray-500" />
            )}

          </div>

          {/* File Name */}
          {(file || fileName) ? (
            <p className="text-zinc-400 text-sm mb-3 text-center">
              {file ? file.name : fileName}
            </p>
          ) : (
            <p className="text-zinc-500 text-sm mb-3 text-center">
              No file selected
            </p>
          )}

          {/* Choose File Button */}
          <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white text-sm inline-block mb-3 w-full text-center">
            Choose File
            <input
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Error */}
          {error && (
            <p className="bg-gradient-to-r from-red-700 to-purple-900 text-sm text-center mb-2">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="bg-gradient-to-r from-green-700 to-purple-900 text-sm text-center mb-2">
              {success}
            </p>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg font-medium"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          {/* Remove Button */}
          {imageUrl && (
            <button
              onClick={handleRemoveImage}
              className="mt-2 w-full bg-gradient-to-r from-red-700 to-purple-900 transition py-2 rounded-lg font-medium"
            >
              Remove Image
            </button>
          )}

        </div>

      </div>
    </div>
  );
}