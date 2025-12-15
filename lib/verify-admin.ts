import { adminAuth } from "./firebase-admin";

export async function verifyAdmin(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);

  if (!decoded.admin) {
    throw new Error("Not an admin");
  }

  return decoded;
}
