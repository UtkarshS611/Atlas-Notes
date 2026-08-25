"use client";

import { Button } from "@/components/ui/button";

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"

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
        <section className="px-2 py-2 flex justify-between">
            <div className="flex items-center">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onSidebarToggle}
                    className="mr-2"
                >
                    <PanelLeft />
                </Button>
                <div className="border-l-[1.5px] pl-2 text-sm">
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
            </div>
            <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
                <AvatarGroup>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/maxleiter.png"
                            alt="@maxleiter"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
            </div>
        </section>
    );
}