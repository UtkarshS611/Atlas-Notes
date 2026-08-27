"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import { useMediaQuery } from "@/hooks/use-media-query";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const isMobile = useMediaQuery("(max-width: 767px)");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <section className="h-screen overflow-hidden">
            <div className="flex h-full min-w-0">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}

                <DashboardSidebar
                    open={sidebarOpen}
                    onClose={closeSidebar}
                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader
                        sidebarOpen={sidebarOpen}
                        onSidebarToggle={() =>
                            setSidebarOpen((prev) => !prev)
                        }
                    />

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}