"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "users", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      const role = docSnap.data()?.role;

      if (role === "admin") router.push("/admin");
      if (role === "agent") router.push("/agent");
      if (role === "customer") router.push("/customer");
    } catch (err) {
      setError("Invalid email or password");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">SmartServe</h1>
          <p className="text-gray-500 mt-1">AI-Powered Customer Care System</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login as
            </label>
            <select
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="customer">Customer</option>
              <option value="agent">Support Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-between text-sm">
            <label className="flex gap-2 items-center">
              <input type="checkbox" /> Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
