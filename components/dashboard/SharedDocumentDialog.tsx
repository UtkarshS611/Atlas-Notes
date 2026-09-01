"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserPlus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ShareDocumentDialogProps {
    documentId: string;
}

export default function ShareDocumentDialog({ documentId }: ShareDocumentDialogProps) {

    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Enter an email address.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "/api/documents/members",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentId,
                        email: email.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.error || "Unable to add member."
                );
                return;
            }

            setMessage("Member added successfully.");
            setEmail("");

            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch {
            setMessage("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className={`${buttonVariants({ variant: "default" })} w-full`}>
                <UserPlus className="size-4" />
                Share Document
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        Add someone by email. They will be
                        able to edit this document.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="member-email"
                            className="text-sm font-medium"
                        >
                            Email address
                        </label>

                        <Input
                            id="member-email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            disabled={loading}
                        />
                    </div>

                    {message && (
                        <p className="text-sm text-muted-foreground">
                            {message}
                        </p>
                    )}

                    <button
                        className={`w-full ${buttonVariants({ variant: "default" })}`}
                        disabled={loading}
                    >
                        {loading
                            ? "Adding..."
                            : "Add member"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}