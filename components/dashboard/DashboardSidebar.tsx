"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";

interface Document {
    id: string;
    title: string;
}

interface DashboardSidebarProps {
    open: boolean;
    onClose: () => void;
    documents?: Document[];
}

export default function DashboardSidebar({
    open,
    onClose,
    documents = [],
}: DashboardSidebarProps) {
    return (
        <div
            className={`
                        shrink-0
                        min-h-screen
                        bg-background
                        border-r

                        // desktop transitions

                        md:relative
                        md:overflow-hidden
                        md:transition-[width]
                        md:duration-300
                        md:ease-in-out ${open ? "md:w-64" : "md:w-0"}

                        // mobile transitions  

                        fixed
                        top-0
                        left-0
                        z-50
                        w-64

                        transition-transform
                        duration-300
                        ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                        `}
        >
            <div className="flex h-full w-64 flex-col">
                <div className="flex items-center gap-2 py-3 px-5">
                    <div className="h-8 w-8 rounded-full aspect-square bg-blue-400" />
                    <Link
                        href="/dashboard"
                        className="text-xl font-semibold tracking-tight"
                        onClick={onClose}
                    >
                        Atlas Notes
                    </Link>
                </div>
                <div className="px-3">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Plus className="size-4" />
                        New document
                    </button>
                </div>

                {/* Documents */}
                <div className="mt-6 flex-1 overflow-y-auto px-3">
                    <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Documents
                    </p>

                    <div className="space-y-1">
                        {documents.map((document) => (
                            <Link
                                key={document.id}
                                href={`/dashboard/${document.id}`}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground
                "
                            >
                                <FileText className="size-4 shrink-0" />

                                <span className="truncate">
                                    {document.title || "Untitled document"}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User section */}
                <div className="border-t p-3">
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            U
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                User
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                                user@email.com
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}