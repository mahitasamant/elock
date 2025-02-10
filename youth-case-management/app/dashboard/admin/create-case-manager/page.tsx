"use client";
import { useState } from "react";
import { db } from "../../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreateCaseManager() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateCaseManager = async () => {
    try {
      if (!username || !password) {
        setMessage("❌ Username and password are required.");
        return;
      }

      const userRef = doc(collection(db, "users"), username);
      await setDoc(userRef, {
        username,
        password,
        role: "case_manager",
        createdBy: "admin"
      });

      setMessage("✅ Case Manager account created successfully!");
      setUsername("");
      setPassword("");
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">➕ Create Case Manager</h1>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 m-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 m-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreateCaseManager}>
        Create Case Manager
      </button>
      {message && <p className="mt-4">{message}</p>}

      <button className="mt-4 text-blue-500" onClick={() => router.push("/dashboard/admin")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
