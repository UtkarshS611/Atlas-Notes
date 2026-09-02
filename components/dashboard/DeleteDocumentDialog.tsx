"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


interface DeleteDocumentDialogProps {
    documentId: string;
    documentTitle?: string;
}

export default function DeleteDocumentDialog({
    documentId,
    documentTitle,
}: DeleteDocumentDialogProps) {

    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        setDeleting(true);
        setError("");
        try {
            const response = await fetch(
                "/api/delete",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        documentId,
                    }),
                }
            );


            const data = await response.json().catch(() => null);

            if (!response.ok) {
                setError(
                    data?.error ||
                    "Unable to delete document."
                );
                return;
            }

            window.location.href = "/dashboard";
        } catch (error) {

            console.error(
                "Error deleting document:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );

        } finally {

            setDeleting(false);

        }
    };


    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger
                className={`${buttonVariants({ variant: "destructive" })} w-full`}
            >
                <Trash2 className="size-4" />
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete document?
                    </DialogTitle>
                    <DialogDescription>
                        {documentTitle ? (
                            <>
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-foreground">
                                    "{documentTitle}"
                                </span>
                                ?
                            </>
                        ) : (
                            "Are you sure you want to delete this document?"
                        )}
                        {" "}This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}


                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            setOpen(false)
                        }
                        disabled={deleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}