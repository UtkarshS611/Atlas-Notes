"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import { useMediaQuery } from "@/hooks/use-media-query";
import { createClient } from "@/lib/supabase/client";

interface Document {
    id: string;
    title: string;
    updated_at: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const isMobile = useMediaQuery("(max-width: 767px)");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [documents, setDocuments] = useState<Document[]>([]);

    /*
     * Desktop → sidebar open
     * Mobile  → sidebar closed
     */
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    /*
     * Fetch documents
     */
    useEffect(() => {
        const fetchDocuments = async () => {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("documents")
                .select("id, title, updated_at")
                .eq("owner_id", user.id)
                .order("updated_at", {
                    ascending: false,
                });

            if (error) {
                console.error("Error fetching documents:", error);
                return;
            }

            setDocuments(data ?? []);
        };

        fetchDocuments();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <section className="h-screen overflow-hidden">
            <div className="flex h-full min-w-0">

                {/* Mobile backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}

                {/* Sidebar */}
                <DashboardSidebar
                    open={sidebarOpen}
                    onClose={closeSidebar}
                    documents={documents}
                    setDocuments={setDocuments}
                />

                {/* Main */}
                <div className="flex min-w-0 flex-1 flex-col">

                    <DashboardHeader
                        sidebarOpen={sidebarOpen}
                        onSidebarToggle={toggleSidebar}
                    />

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {children}
                    </div>

                </div>
            </div>
        </section>
    );
}