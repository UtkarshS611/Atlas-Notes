"use client"
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

    /*
     * Desktop:
     *   Sidebar starts open
     *
     * Mobile:
     *   Sidebar starts closed
     */
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const documents = [
        {
            id: "1",
            title: "My first document",
        },
        {
            id: "2",
            title: "Project Ideas",
        },
        {
            id: "3",
            title: "Research Notes",
        },
    ];

    return (
        <section className="overflow-hidden">
            <div className="flex min-w-0">
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
                />
                <div>
                    <DashboardHeader
                        sidebarOpen={sidebarOpen}
                        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
                    />
                    {children}
                </div>
            </div>
        </section>
    );
}