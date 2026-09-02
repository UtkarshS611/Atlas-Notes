"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import {
    FileText
} from "lucide-react";

interface Document {
    id: string;
    title: string;
    updated_at: string;
}


interface SharedDocument {
    id: string;
    title: string;
    role: "owner" | "editor" | "viewer";
}


export default function DashboardPage() {

    const [documents, setDocuments] = useState<Document[]>([]);
    const [sharedDocuments, setSharedDocuments] = useState<SharedDocument[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadDocuments = async () => {

            try {
                const supabase = createClient();
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    setLoading(false);
                    return;
                }
                const {
                    data: ownedDocuments,
                    error: ownedError,
                } = await supabase
                    .from("documents")
                    .select(
                        "id, title, updated_at"
                    )
                    .eq("owner_id", user.id)
                    .order("updated_at", {
                        ascending: false,
                    });

                if (ownedError) {
                    console.error(
                        "Error fetching documents:",
                        ownedError
                    );
                }

                setDocuments(
                    ownedDocuments ?? []
                );
                const response = await fetch("/api/shared");

                if (response.ok) {
                    const data = await response.json();
                    setSharedDocuments(
                        data.documents ?? []
                    );
                }
            } catch (error) {
                console.error(
                    "Error loading dashboard:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        loadDocuments();

    }, []);
    const privateDocuments =
        documents.filter(
            (document) =>
                !sharedDocuments.some(
                    (sharedDocument) =>
                        sharedDocument.id === document.id
                )
        );

    const hasDocuments = privateDocuments.length > 0 || sharedDocuments.length > 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <p className="text-sm text-muted-foreground">
                    Loading documents...
                </p>
            </div>
        );
    }

    if (!hasDocuments) {

        return (
            <div className="flex flex-col items-center gap-10 px-4 py-32 lg:py-48">
                <h1 className="text-center text-3xl">
                    Nothing here yet 🤷‍♂️. Start by creating a new document.
                </h1>
                <img
                    src="/empty.svg"
                    alt="Nothing Yet"
                    className="mx-auto max-w-64 lg:max-w-80"
                />
            </div>
        );
    }


    return (
        <div className="px-4 py-2">

            {/* Private Documents */}
            {privateDocuments.length > 0 && (
                <section className="mb-10">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="uppercase">
                            Private Documents
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {privateDocuments.map(
                            (document) => (
                                <Link
                                    key={document.id}
                                    href={`/dashboard/${document.id}`}
                                    className="group"
                                >
                                    <div className="relative flex flex-col justify-between rounded-lg border border-primary shadow-sm p-5 transition-colors hover:bg-muted overflow-hidden">
                                        <div
                                            className="bg-primary absolute h-12 w-12 blur-[30px] bottom-0 right-0 translate-y-1/2 translate-x-1/2 z-99 rounded-full aspect-square"
                                        />
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-full aspect-square p-3 text-black bg-primary/40">
                                                <FileText
                                                    className="size-5"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {document.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    Last edited{" "}
                                                    {new Date(
                                                        document.updated_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* Shared Documents */}
            {sharedDocuments.length > 0 && (
                <section>
                    <div className="mb-2 flex items-center justify-between">
                        <p className="uppercase">
                            Shared Documents
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sharedDocuments.map(
                            (document) => (
                                <Link
                                    key={document.id}
                                    href={`/dashboard/${document.id}`}
                                    className="group"
                                >
                                    <div className="relative flex flex-col justify-between rounded-lg border border-blue-500 shadow-sm p-5 transition-colors hover:bg-muted overflow-hidden">
                                        <div
                                            className="bg-blue-500 absolute h-12 w-12 blur-[30px] bottom-0 right-0 translate-y-1/2 translate-x-1/2 z-99 rounded-full aspect-square"
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full p-3 aspect-square bg-blue-500/40 text-black">
                                                <FileText
                                                    className="size-5"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {document.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {document.role === "owner"
                                                        ? "Owner"
                                                        : document.role === "editor"
                                                            ? "Editor"
                                                            : "Viewer"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}