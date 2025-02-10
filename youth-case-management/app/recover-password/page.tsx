"use client";
import { useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function RecoverPassword() {
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Username, Step 2: Answer Security Question, Step 3: Reset Password

  // 🔹 Step 1: Fetch Security Question
  const fetchSecurityQuestion = async () => {
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      // ✅ Ensure the document exists before accessing its data
      if (!userSnap.exists()) {
        setMessage("❌ User not found.");
        return;
      }

      setSecurityQuestion(userSnap.data().securityQuestion);
      setStep(2);
    } catch  (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  // 🔹 Step 2: Verify Security Answer
  const verifySecurityAnswer = async () => {
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setMessage("❌ User not found.");
        return;
      }

      const userData = userSnap.data();

      if (userData.securityAnswer !== securityAnswer) {
        setMessage("❌ Incorrect answer.");
        return;
      }

      setStep(3);
    } catch  (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  // 🔹 Step 3: Reset Password
  const resetPassword = async () => {
    try {
      const userRef = doc(db, "users", username);
      await updateDoc(userRef, { password: newPassword });

      setMessage("✅ Password successfully reset!");
      setStep(1);
    } catch  (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">🔑 Password Recovery</h1>
      
      {step === 1 && (
        <>
          <p>Enter your username to recover your password.</p>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="border p-2 m-2"/>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={fetchSecurityQuestion}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Security Question: {securityQuestion}</p>
          <input type="text" placeholder="Answer" onChange={(e) => setSecurityAnswer(e.target.value)} className="border p-2 m-2"/>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={verifySecurityAnswer}>Verify</button>
        </>
      )}

      {step === 3 && (
        <>
          <p>Enter your new password:</p>
          <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className="border p-2 m-2"/>
          <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={resetPassword}>Reset Password</button>
        </>
      )}

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
