import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression, { Options } from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
  if (!link) return "";
  return link
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
    .toLocaleLowerCase();
}

const compressOptions: Options = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 900,
  useWebWorker: true,
  fileType: "image/jpeg",
};

export async function compressFiles(files: File[]) {
  const compressPromises = files.map(async (file) => {
    try {
      return await imageCompression(file, compressOptions);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  return (await Promise.all(compressPromises)).filter(file => !!file);
}
