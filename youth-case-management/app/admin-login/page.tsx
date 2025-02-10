"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      // Fetch admin credentials from Firestore
      const adminRef = doc(db, "users", "admin");
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists() || adminSnap.data().password !== password) {
        setMessage("❌ Incorrect password.");
        return;
      }

      // Store admin session locally
      localStorage.setItem("admin_authenticated", "true");

      setMessage("✅ Login successful!");
      router.push("/dashboard/admin");
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">🔑 Admin Login</h1>
      <input
        type="password"
        placeholder="Enter Admin Password"
        className="border p-2 m-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>
        Login
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
