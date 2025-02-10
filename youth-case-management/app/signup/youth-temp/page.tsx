"use client";
import { useState } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function CreateYouth() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const generateTempPassword = () => Math.random().toString(36).slice(-8);

  const handleCreateYouth = async () => {
    try {
      const tempPassword = generateTempPassword();

      await setDoc(doc(db, "users", username), {
        username,
        role: "youth",
        tempPassword,
        createdBy: "case_manager001"
      });

      setMessage(`Temporary password: ${tempPassword}`);
    } catch  (error: unknown) {
        setMessage(`❌ Error: ${(error as Error).message}`);
      }
  };

  return (
    <div className="p-4">
      <h1>Create Youth</h1>
      <input type="text" placeholder="Youth Username" onChange={(e) => setUsername(e.target.value)} className="border p-2 m-2"/>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleCreateYouth}>Generate</button>
      {message && <p>{message}</p>}
    </div>
  );
}
