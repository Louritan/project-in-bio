"use server";

import { db } from "../lib/firebase";

export async function isLinkTaken(link: string) {
  const { exists } = await db.collection("profiles").doc(link).get();
  return exists;
}
