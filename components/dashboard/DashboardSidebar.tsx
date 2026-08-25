"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import User from "@/components/dashboard/User";

import { Button } from "@/components/ui/button";

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
}: DashboardSidebarProps) {

    const documents = [
        { id: "1", title: "Document 1" },
        { id: "2", title: "Document 2" },
        { id: "3", title: "Document 3" },
    ]
    return (
        <aside
            className={`
                        min-h-screen
                        shrink-0
                        bg-sidebar
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
                <div>
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
                        <Button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <Plus className="size-4" />
                            New document
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between px-3 pb-3">
                    {/* Sidebar Sections */}
                    <div>
                        <div className="mt-6 flex-1 overflow-y-auto space-y-2">
                            <p className="text-sm font-medium tracking-wider text-muted-foreground">
                                Documents
                            </p>
                            <div className="space-y-2">
                                {documents.map((document) => (
                                    <Link
                                        key={document.id}
                                        href={`/dashboard/${document.id}`}
                                        className="flex items-center gap-3 rounded-lg"
                                    >
                                        <span className="truncate">
                                            {document.title || "Untitled document"}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User section */}
                    <User />
                </div>
            </div>
        </aside>
    );
}