"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/auth/LogOut";

interface UserData {
    email: string | null;
    name: string;
}

export default function User() {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const supabase = createClient();

        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                return;
            }

            const name =
                user.user_metadata?.full_name ??
                user.user_metadata?.name ??
                user.email?.split("@")[0] ??
                "User";

            setUser({
                email: user.email ?? null,
                name,
            });
        };

        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const initials = user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="rounded-xl bg-gray-200">
            <div className="flex flex-col gap-3 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-medium">
                            {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}