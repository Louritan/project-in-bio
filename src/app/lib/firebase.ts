import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

// certificado
export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
});

// instancia do app
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = getFirestore();
export const storage = getStorage().bucket();

export async function getDownloadURLFromPath(path?: string) {
  if (!path) {
    return null;
  }
  
  const file = storage.file(path);
  
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  return url;
}

