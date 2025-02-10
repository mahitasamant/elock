"use client";
import { useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function YouthSignup() {
  const [username, setUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || userSnap.data().tempPassword !== tempPassword) {
        setMessage("❌ Invalid temporary credentials.");
        return;
      }

      await updateDoc(userRef, {
        tempPassword: null,
        password: newPassword,
        securityQuestion,
        securityAnswer,
      });

      setMessage("✅ Account successfully created!");
    } catch  (error: unknown) {
        setMessage(`❌ Error: ${(error as Error).message}`);
      }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Complete Youth Signup</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="border p-2 m-2"/>
      <input type="text" placeholder="Temporary Password" onChange={(e) => setTempPassword(e.target.value)} className="border p-2 m-2"/>
      <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className="border p-2 m-2"/>
      <input type="text" placeholder="Security Question" onChange={(e) => setSecurityQuestion(e.target.value)} className="border p-2 m-2"/>
      <input type="text" placeholder="Security Answer" onChange={(e) => setSecurityAnswer(e.target.value)} className="border p-2 m-2"/>
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSignup}>Complete Signup</button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}


