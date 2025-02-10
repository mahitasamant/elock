"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function CreateYouthProfile() {
  const router = useRouter();
  const [youthData, setYouthData] = useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    tempPassword: "",
    documents: {
      birthCertificate: null,
      proofOfFosterCare: null,
    },
    role: "", // Setting role as "youth"
    createdBy: ""
  });

  const [message, setMessage] = useState<string>("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYouthData({
      ...youthData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle document uploads
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const storage = getStorage();
      const fileRef = ref(storage, `youth-documents/${docType}/${Date.now()}`);
      try {
        await uploadBytes(fileRef, file);
        setYouthData({
          ...youthData,
          documents: {
            ...youthData.documents,
            [docType]: fileRef.fullPath, // Storing the file path in Firestore
          },
        });
        setMessage("✅ Document uploaded successfully!");
      } catch (error) {
        setMessage(`❌ Error: ${(error as Error).message}`);
      }
    }
  };

  // Handle form submission to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usersRef = collection(db, "users");
      const newUser = {
        ...youthData,
        role: "youth", // Setting role as "youth"
        createdBy: "case_manager", // Can be Case Manager or Admin
      };

      await addDoc(usersRef, newUser);
      setMessage("✅ Youth profile created successfully!");
      router.push("/dashboard/case-manager"); // Redirect to case manager dashboard
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">Create Youth Profile</h1>
      {message && <p className="mt-4">{message}</p>}
      <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={youthData.name}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
          required
        />
        <input
          type="date"
          name="dob"
          value={youthData.dob}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={youthData.address}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={youthData.phone}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={youthData.email}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
        />

        <input
          type="password"
          name="tempPassword"
          placeholder="Temporary Password"
          value={youthData.tempPassword}
          onChange={handleChange}
          className="border p-2 my-2 w-full"
          required
        />

        <div className="mt-4">
          <div className="mb-2">Upload Documents:</div>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "birthCertificate")}
            className="border p-2 my-2 w-full"
          />
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "proofOfFosterCare")}
            className="border p-2 my-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
        >
          Create Profile
        </button>
      </form>
      <button
        className="mt-4 text-blue-500"
        onClick={() => router.push("/dashboard/case-manager")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
