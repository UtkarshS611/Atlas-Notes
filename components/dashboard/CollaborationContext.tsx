"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import * as Y from "yjs";

import { HocuspocusProvider } from "@hocuspocus/provider";

import { createClient } from "@/lib/supabase/client";


interface CollaborationUser {
    id: string;
    name: string;
}


interface CollaborationContextValue {
    user: CollaborationUser | null;
    userColor: string;
    ydoc: Y.Doc | null;
    provider: HocuspocusProvider | null;
}


const CollaborationContext =
    createContext<CollaborationContextValue>({
        user: null,
        userColor: "#6366f1",
        ydoc: null,
        provider: null,
    });


function getUserColor(userId: string) {

    const colors = [
        "#6366f1",
        "#ec4899",
        "#14b8a6",
        "#f97316",
        "#8b5cf6",
        "#06b6d4",
        "#22c55e",
        "#eab308",
        "#ef4444",
        "#3b82f6",
    ];

    let hash = 0;

    for (let i = 0; i < userId.length; i++) {
        hash =
            userId.charCodeAt(i) +
            ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
}


export function CollaborationProvider({
    documentId,
    children,
}: {
    documentId: string | null;
    children: React.ReactNode;
}) {

    const supabase = createClient();
    const [user, setUser] = useState<CollaborationUser | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setUser(null);
                return;
            }

            setUser({
                id: user.id,
                name:
                    user.user_metadata?.full_name ||
                    user.user_metadata?.name ||
                    user.email?.split("@")[0] ||
                    "Anonymous",
            });
        };

        loadUser();
    }, []);

    useEffect(() => {
        const getSession = async () => {

            const {
                data: { session },
            } = await supabase.auth.getSession();

            setAccessToken(
                session?.access_token ?? null
            );
        };

        getSession();
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setAccessToken(
                    session?.access_token ?? null
                );
            }
        );

        return () => {
            subscription.unsubscribe();
        };

    }, []);


    const ydoc = useMemo(() => {

        if (!documentId) {
            return null;
        }

        return new Y.Doc();

    }, [documentId]);

    const provider = useMemo(() => {

        if (
            !documentId ||
            !ydoc ||
            !accessToken
        ) {
            return null;
        }


        return new HocuspocusProvider({
            url: "ws://localhost:3001",

            name: `document-${documentId}`,

            document: ydoc,

            token: accessToken,
        });

    }, [
        documentId,
        ydoc,
        accessToken,
    ]);


    const userColor = user ? getUserColor(user.id) : "#6366f1";


    return (
        <CollaborationContext.Provider
            value={{
                user,
                userColor,
                ydoc,
                provider,
            }}
        >
            {children}
        </CollaborationContext.Provider>
    );
}


export function useCollaboration() {

    return useContext(
        CollaborationContext
    );
}