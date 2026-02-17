"use client";

import { Contact } from "@/lib/validation/contact.schema";
import { Button } from "@/components/ui/Button";
import Input from "../ui/Input";

type Props = {
  contacts: Contact[];
  sortKey: keyof Contact;
  onSort: (key: keyof Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  search: string;
  onSearch: (value: string) => void;
  editingId: string | null;
  sortDirection: "asc" | "desc";
};

export default function ContactsTable({
  contacts,
  sortKey,
  onSort,
  onEdit,
  onDelete,
  search,
  onSearch,
  editingId,
  sortDirection,
}: Props) {
  const columns: (keyof Contact)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
  ];

  if (!contacts.length) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center text-sm text-neutral-500">
        No contacts found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <h4 className="text-sm font-medium text-neutral-700">All Contacts</h4>

        <div className="w-64">
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-neutral-100 text-neutral-700">
          <tr>
            {columns.map((key) => (
              <th
                key={key}
                onClick={() => onSort(key)}
                className="cursor-pointer px-4 py-3 font-medium"
              >
                {key}
                {sortKey === key && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr
              key={c.id}
              className={`border-t transition hover:bg-neutral-50 ${
                editingId === c.id ? "bg-neutral-50" : ""
              }`}
            >
              <td className="px-4 py-3">{c.firstName}</td>
              <td className="px-4 py-3">{c.lastName}</td>
              <td className="px-4 py-3">{c.email}</td>
              <td className="px-4 py-3">{c.phone}</td>
              <td className="px-4 py-3 space-x-2">
                {editingId === c.id ? (
                  <Button variant="secondary" disabled>
                    Editing
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={() => onEdit(c)}>
                    Edit
                  </Button>
                )}
                <Button variant="danger" onClick={() => onDelete(c)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
