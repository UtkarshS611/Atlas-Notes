import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});


import { Server } from "@hocuspocus/server";
import { supabase } from "./supabase";

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

const server = new Server({
    port: 3001,

    async onAuthenticate({ token, documentName }) {
        if (!token) {
            throw new Error("Authentication required");
        }

        // User auth with supabase
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser(token);

        if (userError || !user) {
            throw new Error("Invalid authentication token");
        }

        // get documentId
        const documentId = documentName.replace(
            "document-",
            ""
        );

        // check actual document 
        const { data: document, error: documentError } =
            await supabase
                .from("documents")
                .select("id, owner_id")
                .eq("id", documentId)
                .single();

        if (documentError || !document) {
            throw new Error("Document not found");
        }

        // check owner
        if (document.owner_id === user.id) {
            return {
                user,
                documentId,
                role: "owner",
            };
        }

        // Check if member or not
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
});

server.listen();

console.log("Hocuspocus running on port 3001");