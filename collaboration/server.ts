import dotenv from "dotenv";

dotenv.config({
    path: ".env.local",
});

import { Server } from "@hocuspocus/server";
import * as Y from "yjs";

import { supabase } from "./supabase";

console.log(
    "SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
);

const PORT = Number(process.env.PORT);

const server = new Server({
    port: PORT,

    async onAuthenticate({ token, documentName }) {
        if (!token) {
            throw new Error("Authentication required");
        }

        // Authenticate user with Supabase
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser(token);

        if (userError || !user) {
            throw new Error("Invalid authentication token");
        }

        // Get document ID
        const documentId = documentName.replace(
            "document-",
            ""
        );

        // Get document
        const {
            data: document,
            error: documentError,
        } = await supabase
            .from("documents")
            .select("id, owner_id")
            .eq("id", documentId)
            .single();

        if (documentError || !document) {
            throw new Error("Document not found");
        }

        // Owner has full access
        if (document.owner_id === user.id) {
            return {
                user,
                documentId,
                role: "owner",
            };
        }

        // Check membership
        const {
            data: membership,
            error: membershipError,
        } = await supabase
            .from("document_members")
            .select("role")
            .eq("document_id", documentId)
            .eq("user_id", user.id)
            .single();

        if (membershipError || !membership) {
            throw new Error(
                "You do not have access to this document"
            );
        }

        return {
            user,
            documentId,
            role: membership.role,
        };
    },

    /*
     * Load the persisted Yjs document
     * whenever a document room is opened.
     */
    async onLoadDocument({ documentName }) {
        const documentId = documentName.replace(
            "document-",
            ""
        );

        const {
            data: document,
            error,
        } = await supabase
            .from("documents")
            .select("yjs_state")
            .eq("id", documentId)
            .single();

        if (error) {
            console.error(
                "Failed to load document:",
                error
            );

            throw new Error(
                "Failed to load document"
            );
        }

        const ydoc = new Y.Doc();

        if (document?.yjs_state) {
            try {
                const update = Buffer.from(
                    document.yjs_state,
                    "base64"
                );

                Y.applyUpdate(
                    ydoc,
                    new Uint8Array(update)
                );

                console.log(
                    `Loaded document ${documentId}`
                );
            } catch (error) {
                console.error(
                    "Failed to decode Yjs state:",
                    error
                );

                throw new Error(
                    "Failed to load document state"
                );
            }
        }

        return ydoc;
    },

    /*
     * Persist the Yjs document when Hocuspocus
     * decides the room should be stored.
     */
    async onStoreDocument({
        documentName,
        document,
    }) {
        const documentId = documentName.replace(
            "document-",
            ""
        );

        try {
            const state = Y.encodeStateAsUpdate(
                document
            );

            const yjsState =
                Buffer.from(state).toString("base64");

            const { error } = await supabase
                .from("documents")
                .update({
                    yjs_state: yjsState,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", documentId);

            if (error) {
                console.error(
                    "Failed to save document:",
                    error
                );

                return;
            }

            console.log(
                `Saved document ${documentId}`
            );
        } catch (error) {
            console.error(
                "Failed to persist Yjs document:",
                error
            );
        }
    },
});

server.listen();

console.log(
    `Hocuspocus running on port: ${PORT}`
);