"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function CaseManagerLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage("❌ User not found.");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.password !== password) {
        setMessage("❌ Incorrect password.");
        return;
      }

      // Store login status in localStorage
      localStorage.setItem("case_manager_authenticated", "true");

      setMessage("✅ Login successful!");

      // Redirect to Case Manager Dashboard
      router.push("/dashboard/case-manager");
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Case Manager Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleLogin}
      >
        Login
      </button>
      {message && <p className="mt-4">{message}</p>}
      <p
        className="mt-2 text-blue-500 cursor-pointer"
        onClick={() => router.push("/recover-password")}
      >
        Forgot Password?
      </p>
    </div>
  );
}
