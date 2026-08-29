"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import User from "@/components/dashboard/User";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { createClient } from "@/lib/supabase/client";

interface Document {
    id: string;
    title: string;
    updated_at: string;
}

interface DashboardSidebarProps {
    open: boolean;
    onClose: () => void;
    documents: Document[];
    setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export default function DashboardSidebar({
    open,
    onClose,
    documents,
    setDocuments,
}: DashboardSidebarProps) {
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [creating, setCreating] = useState(false);

    const createDocument = async () => {
        const documentTitle = title.trim();

        if (!documentTitle || creating) return;

        setCreating(true);

        try {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            const { data, error } = await supabase
                .from("documents")
                .insert({
                    title: documentTitle,
                    owner_id: user.id,
                })
                .select("id, title, updated_at")
                .single();

            if (error) {
                console.error("Error creating document:", error);
                return;
            }

            // Add document to sidebar
            setDocuments((prev) => [data, ...prev]);

            // Reset form
            setTitle("");
            setDialogOpen(false);

            // Open the new document
            router.push(`/dashboard/${data.id}`);
        } catch (error) {
            console.error("Error creating document:", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <aside
                className={`
          min-h-screen
          shrink-0
          bg-sidebar
          border-r

          md:relative
          md:overflow-hidden
          md:transition-[width]
          md:duration-300
          md:ease-in-out
          ${open ? "md:w-64" : "md:w-0"}

          fixed
          top-0
          left-0
          z-50
          w-64

          transition-transform
          duration-300
          ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
            >
                <div className="flex h-screen w-64 flex-col">

                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-2 px-5 py-3">
                            <div className="aspect-square h-8 w-8 rounded-full bg-blue-400" />

                            <Link
                                href="/dashboard"
                                className="text-xl font-semibold tracking-tight"
                            >
                                Atlas Notes
                            </Link>
                        </div>

                        {/* New document */}
                        <div className="px-3">
                            <Button
                                type="button"
                                onClick={() => setDialogOpen(true)}
                                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
                            >
                                <Plus className="size-4" />
                                New document
                            </Button>
                        </div>
                    </div>

                    {/* Recent documents */}
                    <div className="mt-6 flex min-h-0 flex-1 flex-col px-3">
                        <p className="mb-3 text-sm font-medium tracking-wider text-muted-foreground">
                            Recent documents
                        </p>

                        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
                            {documents.length === 0 ? (
                                <p className="px-1 py-2 text-sm text-muted-foreground">
                                    No documents yet.
                                </p>
                            ) : (
                                documents.map((document) => (
                                    <Link
                                        key={document.id}
                                        href={`/dashboard/${document.id}`}
                                        className="
                      block truncate
                      rounded-lg
                      px-2 py-2
                      text-sm
                      text-muted-foreground
                      transition-colors
                      hover:bg-muted
                      hover:text-foreground
                    "
                                    >
                                        {document.title || "Untitled document"}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* User */}
                    <div className="p-3">
                        <User />
                    </div>

                </div>
            </aside>

            {/* Create document dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!creating) {
                        setDialogOpen(open);

                        if (!open) {
                            setTitle("");
                        }
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <div className="space-y-2 py-2">
                        <Label htmlFor="document-title">
                            Title
                        </Label>

                        <Input
                            id="document-title"
                            placeholder="My new document"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    createDocument();
                                }
                            }}
                            autoFocus
                        />
                    </div>

                    <DialogFooter className="flex! flex-col! justify-center ">
                        <Button
                            type="button"
                            onClick={createDocument}
                            disabled={!title.trim() || creating}
                        >
                            {creating ? "Creating..." : "Create document"}
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => setDialogOpen(false)}
                            disabled={creating}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}