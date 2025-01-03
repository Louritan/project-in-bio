"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";
import { randomUUID } from "crypto";

interface ProjectData {
  profileId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  file: File;
}

export async function createProject({
  profileId,
  projectName,
  projectDescription,
  projectUrl,
  file,
}: ProjectData) {
  const session = await auth();

  if (!session || !session.user) {
    return false;
  }

  const generatedId = randomUUID();
  const storageRef = storage.file(`projects-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);

  try {
    await db.collection("projects").doc(profileId).collection("projects").doc(generatedId).set({
      userId: session.user.id,
      projectName,
      projectDescription,
      projectUrl,
      imagePath: storageRef.name,
      createdAt: Timestamp.now().toMillis(),
    });
    return true;
  } catch (error) {
    return false;
  }
}
