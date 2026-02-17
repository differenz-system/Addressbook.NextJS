"use client";

import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { Contact } from "@/lib/validation/contact.schema";

type SubmitResult = {
  success: boolean;
  errors: Record<string, string> | null;
};

type Props = {
  initialValues: Omit<Contact, "id">;
  isEditing: boolean;
  onSubmit: (data: Omit<Contact, "id">) => SubmitResult;
};

export default function ContactForm({
  initialValues,
  isEditing,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  function handleChange(
    field: keyof Omit<Contact, "id">,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit() {
    const result = onSubmit(form);

    if (!result.success && result.errors) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
      <h3 className="mb-8 text-lg font-semibold text-neutral-900">
        {isEditing ? "Edit Contact" : "Add Contact"}
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(e) =>
            handleChange("firstName", e.target.value)
          }
        />
        <Input
          label="Last Name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(e) =>
            handleChange("lastName", e.target.value)
          }
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
        <Input
          label="Phone"
          value={form.phone}
          error={errors.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit}>
          {isEditing ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
}
