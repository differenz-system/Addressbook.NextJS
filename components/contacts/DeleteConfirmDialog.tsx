"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type Props = {
  open: boolean;
  contactName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmDialog({
  open,
  contactName,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal open={open} onCancel={onCancel}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900">
            Delete Contact
          </h3>

          <p className="text-sm text-neutral-600">
            {contactName ? (
              <>
                Are you sure you want to delete{" "}
                <span className="font-medium text-neutral-900">
                  {contactName}
                </span>
                ? This action cannot be undone.
              </>
            ) : (
              "Are you sure you want to delete this contact? This action cannot be undone."
            )}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
