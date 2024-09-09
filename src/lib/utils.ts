import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertTagsToArray = (tags: string | undefined) =>
  tags?.toLowerCase()?.replace(" ", "").split(",") || [];

export function parsePublishedDate(publishedString: string): string {
  const publishedDate = parseISO(publishedString);

  return formatDistanceToNowStrict(publishedDate, { addSuffix: true });
}
