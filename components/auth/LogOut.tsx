"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            await logout();

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
            setLoading(false);
        }
    };

    return (
        <Button
            className={"w-full"}
            type="button"
            onClick={handleLogout}
            disabled={loading}
            variant={"destructive"}
        >
            {loading ? "Logging out..." : "Logout"}
        </Button>
    );
}