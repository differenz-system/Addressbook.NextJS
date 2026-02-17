import type { Contact } from "@/lib/validation/contact.schema";

const STORAGE_KEY = "contacts";

export function loadContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
  return raw ? JSON.parse(raw) : [];
} catch {
  return [];
}
}

export function saveContacts(data: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
