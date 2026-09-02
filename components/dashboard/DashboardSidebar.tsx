"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { createClient } from "@/lib/supabase/client";


import User from "@/components/dashboard/User";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ShareDocumentDialog from "@/components/dashboard/SharedDocumentDialog";

import { FileText, Plus } from "lucide-react";
import Image from "next/image";

interface Document {
    id: string;
    title: string;
    updated_at: string;
}

interface SharedDocument {
    id: string;
    title: string;
    role: "editor" | "viewer";
}

interface DashboardSidebarProps {
    open: boolean;
    onClose: () => void;

    documents: Document[];

    setDocuments: React.Dispatch<
        React.SetStateAction<Document[]>
    >;
}

export default function DashboardSidebar({
    open,
    onClose,
    documents,
    setDocuments,
}: DashboardSidebarProps) {

    const router = useRouter();
    const pathname = usePathname();

    const currentDocumentId = pathname.startsWith("/dashboard/") ? pathname.split("/")[2] : null;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [creating, setCreating] = useState(false);
    const [sharedDocuments, setSharedDocuments] = useState<SharedDocument[]>([]);
    const [loadingSharedDocuments, setLoadingSharedDocuments] = useState(true);

    useEffect(() => {
        const loadSharedDocuments = async () => {
            try {

                setLoadingSharedDocuments(true);
                const response = await fetch("/api/shared");

                if (!response.ok) {
                    const data =
                        await response.json().catch(
                            () => null
                        );

                    console.error("Failed to load shared documents:", data);

                    setSharedDocuments([]);
                    return;
                }

                const data = await response.json();

                setSharedDocuments(data.documents ?? []);

            } catch (error) {

                console.error("Error loading shared documents:", error);
                setSharedDocuments([]);

            } finally {
                setLoadingSharedDocuments(false);
            }
        };

        loadSharedDocuments();
    }, []);

    const createDocument = async () => {
        const documentTitle = title.trim();

        if (!documentTitle || creating) {
            return;
        }

        setCreating(true);

        try {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/sign-in");
                return;
            }

            const { data, error } =
                await supabase
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

            setDocuments((prev) => [data, ...prev]);

            setTitle("");
            setDialogOpen(false);

            router.push(`/dashboard/${data.id}`);

        } catch (error) {
            console.error("Error creating document:", error);

        } finally {
            setCreating(false);
        }
    };

    const privateDocuments = documents.filter(
        (document) =>
            !sharedDocuments.some(
                (sharedDocument) =>
                    sharedDocument.id === document.id
            )
    );

    return (
        <>
            <aside
                className={`
                    shrink-0
                    bg-sidebar
                    border-r

                    md:relative
                    md:h-screen
                    md:overflow-hidden
                    md:transition-[width]
                    md:duration-300
                    md:ease-in-out
                    ${open ? "md:w-64" : "md:w-0"}

                    fixed
                    inset-y-0
                    left-0
                    z-50
                    w-64
                    transition-transform
                    duration-300
                    ease-in-out
                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    md:translate-x-0
                `}
            >
                <div className="flex h-full w-64 flex-col">

                    {/* Header */}
                    <div className="shrink-0">
                        <div className="flex items-center gap-2 px-5 py-3">
                            <Image
                                src={"/logo.svg"}
                                alt="Atlas Notes logo"
                                width={32}
                                height={32}
                            />
                            <Link
                                href="/dashboard"
                                className="text-xl font-semibold tracking-tight"
                            >
                                Atlas Notes
                            </Link>
                        </div>

                        <div className="px-3">
                            <Button
                                type="button"
                                onClick={() =>
                                    setDialogOpen(true)
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
                            >
                                <Plus className="size-4" />
                                New document
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="min-h-0 flex-1 overflow-y-auto px-3">

                        {/* Private */}
                        <div className="mt-6 space-y-1">
                            <h2 className="text-xs font-medium tracking-wider text-muted-foreground">
                                Private
                            </h2>
                            <div>
                                {privateDocuments.length === 0 ? (
                                    <p className="px-2 py-1 text-sm text-muted-foreground">
                                        No private documents
                                    </p>
                                ) : (
                                    privateDocuments.map(
                                        (document) => {
                                            const isActive =
                                                currentDocumentId ===
                                                document.id;

                                            return (
                                                <Link
                                                    key={document.id}
                                                    href={`/dashboard/${document.id}`}
                                                    className={`
                                                        block truncate rounded-lg px-2 py-2 text-sm transition-colors ${isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-1"}
                                                    `}
                                                >
                                                    <FileText
                                                        className="size-4 text-green-500"
                                                    />
                                                    {document.title ||
                                                        "Untitled document"}
                                                </Link>
                                            );
                                        }
                                    )
                                )}
                            </div>
                        </div>

                        {/* Shared documents */}
                        <div className="mt-6 space-y-1">
                            <h2 className="text-xs font-medium tracking-wider text-muted-foreground">
                                Shared
                            </h2>
                            <div>
                                {loadingSharedDocuments ? (
                                    <p className="py-1 text-sm text-muted-foreground">
                                        Loading...
                                    </p>
                                ) : sharedDocuments.length === 0 ? (
                                    <p className="py-1 text-sm text-muted-foreground">
                                        No shared documents
                                    </p>
                                ) : (
                                    sharedDocuments.map(
                                        (document) => {
                                            const isActive =
                                                currentDocumentId ===
                                                document.id;

                                            return (
                                                <Link
                                                    key={document.id}
                                                    href={`/dashboard/${document.id}`}
                                                    className={`
                                                        flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors ${isActive
                                                            ? "bg-accent text-accent-foreground font-medium"
                                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                                                    `}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <FileText
                                                            className="size-4 text-blue-500"
                                                        />
                                                        {document.title ||
                                                            "Untitled document"}
                                                    </span>

                                                    <span
                                                        className={`shrink-0 text-[10px] uppercase tracking-wide
                                                            ${isActive
                                                                ? "text-accent-foreground/70"
                                                                : "text-muted-foreground/70"
                                                            }`}
                                                    >
                                                        {document.role}
                                                    </span>
                                                </Link>
                                            );
                                        }
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User */}
                    <div className="shrink-0 p-3 space-y-2">
                        {currentDocumentId && (
                            <ShareDocumentDialog
                                documentId={currentDocumentId}
                            />
                        )}
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

                    <DialogHeader>
                        <DialogTitle>
                            Create new document
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 py-2">
                        <Label htmlFor="document-title">
                            Title
                        </Label>

                        <Input
                            id="document-title"
                            placeholder="My new document"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key ===
                                    "Enter"
                                ) {
                                    createDocument();
                                }
                            }}
                            autoFocus
                            disabled={creating}
                        />
                    </div>

                    <DialogFooter className="flex! flex-col! justify-center">

                        <Button
                            type="button"
                            onClick={
                                createDocument
                            }
                            disabled={
                                !title.trim() ||
                                creating
                            }
                        >
                            {creating
                                ? "Creating..."
                                : "Create document"}
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                                setDialogOpen(false)
                            }
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