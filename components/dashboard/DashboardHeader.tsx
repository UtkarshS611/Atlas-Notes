"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
} from "@/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { PanelLeft } from "lucide-react";

import {
    useCollaboration,
} from "@/components/dashboard/CollaborationContext";


interface DashboardHeaderProps {
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
    documentTitle: string | null;
}


interface CollaborationUser {
    clientId: number;
    userId: string;
    name: string;
    color: string;
}


function getInitials(name: string): string {

    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) { return "?"; }


    if (words.length === 1) { return words[0].slice(0, 2).toUpperCase() }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}


export default function DashboardHeader({
    sidebarOpen,
    onSidebarToggle,
    documentTitle }: DashboardHeaderProps
) {

    const { user, provider } = useCollaboration();
    const pathName = usePathname();

    const [users, setUsers] = useState<CollaborationUser[]>([]);


    useEffect(() => {
        if (!provider) {
            setUsers([]);
            return;
        }
        const awareness = provider.awareness;
        if (!awareness) {
            setUsers([]);
            return;
        }

        const updateUsers = () => {
            const states = awareness.getStates();
            const collaborationUsers: CollaborationUser[] = [];

            states.forEach((state, clientId) => {
                if (!state) {
                    return;
                }

                const awarenessUser = state.user;
                if (!awarenessUser || typeof awarenessUser !== "object") {
                    return;
                }

                if (typeof awarenessUser.name !== "string" || awarenessUser.name.trim().length === 0) {
                    return;
                }

                collaborationUsers.push({
                    clientId,
                    userId: typeof awarenessUser.id === "string" ? awarenessUser.id : "",
                    name: awarenessUser.name,
                    color: typeof awarenessUser.color === "string" ? awarenessUser.color : "#6366f1",
                });

            });

            collaborationUsers.sort((a, b) => {
                const aIsCurrentUser = a.userId === user?.id;
                const bIsCurrentUser = b.userId === user?.id;

                if (aIsCurrentUser && !bIsCurrentUser) {
                    return -1;
                }

                if (!aIsCurrentUser && bIsCurrentUser
                ) {
                    return 1;
                }

                return 0;
            });
            setUsers(collaborationUsers);
        };

        updateUsers();

        awareness.on(
            "change",
            updateUsers
        );


        return () => {

            awareness.off(
                "change",
                updateUsers
            );

        };

    }, [
        provider,
        user?.id,
    ]);

    const visibleUsers = users.slice(0, 5);
    const remainingUsers = Math.max(users.length - 5, 0);

    return (

        <section className="flex justify-between px-2 py-2">
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
                            {pathName && pathName !== "/dashboard" && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {documentTitle || "Document"}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
                {visibleUsers.length > 0 && (
                    <AvatarGroup>
                        {visibleUsers.map(
                            (collaborationUser) => (
                                <Avatar
                                    key={collaborationUser.clientId}
                                    title={collaborationUser.name}
                                    className="border-2 border-background"
                                >
                                    <AvatarFallback
                                        className="text-xs font-medium text-white"
                                        style={{ backgroundColor: collaborationUser.color }}
                                    >
                                        {getInitials(
                                            collaborationUser.name
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                            )
                        )}
                        {remainingUsers > 0 && (
                            <AvatarGroupCount>
                                +{remainingUsers}
                            </AvatarGroupCount>
                        )}
                    </AvatarGroup>
                )}
            </div>
        </section>
    );
}