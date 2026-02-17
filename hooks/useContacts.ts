"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Contact,
  ContactInput,
  ContactInputSchema,
  ContactSchema,
} from "@/lib/validation/contact.schema";
import { loadContacts, saveContacts } from "@/lib/contactsStorage";

const PAGE_SIZE = 5;

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Contact>("firstName");
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const raw = loadContacts();
    const parsed = raw.filter((item) => ContactSchema.safeParse(item).success);
    setContacts(parsed);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  function handleSort(key: keyof Contact) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function persist(data: Contact[]) {
    saveContacts(data);
    setContacts(data);
  }

  function save(form: ContactInput) {
    const result = ContactInputSchema.safeParse(form);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errors[i.path[0] as string] = i.message;
      });
      return { success: false, errors };
    }

    if (editingId) {
      const updated = contacts.map((c) =>
        c.id === editingId ? { ...c, ...form } : c,
      );
      persist(updated);
      setEditingId(null);
    } else {
      const newContact: Contact = {
        id: crypto.randomUUID?.() ?? String(Date.now()),
        ...form,
      };
      persist([newContact, ...contacts]);
    }

    return { success: true, errors: null };
  }

  function remove(id: string) {
    persist(contacts.filter((c) => c.id !== id));
  }

  function startEdit(contact: Contact): ContactInput {
    setEditingId(contact.id);
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    };
  }


  const filtered = useMemo(() => {
    if (!search.trim()) return contacts;

    const lower = search.toLowerCase();

    return contacts.filter((c) =>
      `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`
        .toLowerCase()
        .includes(lower),
    );
  }, [contacts, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aValue = String(a[sortKey]).toLowerCase();
      const bValue = String(b[sortKey]).toLowerCase();

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, safePage]);

  return {
    contacts: paginated,
    totalPages,
    page: safePage,
    setPage,
    search,
    setSearch,
    sortKey,
    sortDirection,
    handleSort,
    editingId,
    save,
    remove,
    startEdit,
  };
}
