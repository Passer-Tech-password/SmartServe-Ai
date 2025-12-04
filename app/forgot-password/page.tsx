"use client";

import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      alert("Failed to send reset email");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h2>

        {sent ? (
          <p className="text-green-600 text-center">
            Password reset link sent to your email ✅
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
            <button
              disabled={loading}
              className="w-full bg-gray-800 text-white py-2 rounded-lg"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-6">
          Back to{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
// File: smartserve/app/forgot-password/page.tsx