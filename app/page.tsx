"use client";
import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
// import Dashboard from "./dashboard/page";

export default function Home() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
    return unsubscribe;
  }, []);

  async function handleAuth(e) {
    e.preventDefault();
    try {
      if (mode === "login")
        await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleAuth}
          className="p-8 bg-white rounded shadow w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">
            {mode === "login" ? "Agent Login" : "Create Agent"}
          </h2>
          <input
            className="w-full p-2 border rounded mb-3"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
              {mode === "login" ? "Login" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-indigo-600"
            >
              {mode === "login" ? "Sign up" : "Back to login"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <Dashboard user={user} />;
}
