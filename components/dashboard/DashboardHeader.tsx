"use client";

import { Button } from "@/components/ui/button";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { PanelLeft } from "lucide-react";

interface DashboardHeaderProps {
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
}

export default function DashboardHeader({
    sidebarOpen,
    onSidebarToggle,
}: DashboardHeaderProps) {
    return (
        <section className="flex h-14 items-center px-2 py-2">

            {/* Sidebar toggle */}
            <Button
                size="icon"
                variant="ghost"
                onClick={onSidebarToggle}
                className="mr-2"
            >
                <PanelLeft />
            </Button>

            {/* Breadcrumb */}
            <div className="border-l-2 pl-2 text-sm">
                <Breadcrumb>
                    <BreadcrumbList>

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Document
                            </BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            </div>

        </section>
    );
}