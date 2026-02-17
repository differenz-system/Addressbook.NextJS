"use client";

import { useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import ContactForm from "@/components/contacts/ContactForm";
import ContactsTable from "@/components/contacts/ContactsTable";
import DeleteConfirmDialog from "@/components/contacts/DeleteConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Contact } from "@/lib/validation/contact.schema";

export default function ContactsPage() {
  const {
    contacts,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    sortKey,
    handleSort,
    sortDirection,
    editingId,
    save,
    remove,
    startEdit,
  } = useContacts();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  function handleEdit(contact: Contact) {
    const values = startEdit(contact);
    setFormValues(values);
  }

  function confirmDelete() {
    if (!selectedContact) return;
    remove(selectedContact.id);
    setSelectedContact(null);
  }

  return (
    <section className="flex flex-1 justify-center px-6 py-12">
      <div className="w-full max-w-4xl space-y-10">
        <h2 className="text-2xl font-semibold text-neutral-900">Contacts</h2>

        <ContactForm
          initialValues={formValues}
          isEditing={!!editingId}
          onSubmit={(data) => {
            const result = save(data);
            if (result.success) {
              setFormValues({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
              });
            }
            return result;
          }}
        />

        <ContactsTable
          contacts={contacts}
          sortKey={sortKey}
          onSort={handleSort}
          sortDirection={sortDirection}
          onEdit={handleEdit}
          onDelete={(contact) => setSelectedContact(contact)}
          search={search}
          onSearch={setSearch}
          editingId={editingId}
        />

        {totalPages > 1 && (
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "primary" : "secondary"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}

        <DeleteConfirmDialog
          open={!!selectedContact}
          contactName={selectedContact?.firstName}
          onConfirm={confirmDelete}
          onCancel={() => setSelectedContact(null)}
        />
      </div>
    </section>
  );
}
