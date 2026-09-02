import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import TextEditor from "@/components/editor/TextEditor";

interface DocumentPageProps {
    params: Promise<{
        documentId: string;
    }>;
}

export default async function DocumentPage({
    params,
}: DocumentPageProps) {
    const { documentId } = await params;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Get current user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    // Check whether the user owns the document
    const { data: document, error: documentError } =
        await supabase
            .from("documents")
            .select("id, owner_id, title")
            .eq("id", documentId)
            .maybeSingle();

    if (documentError) {
        console.error("Document access error:", documentError);
        redirect("/dashboard");
    }

    if (!document) {
        redirect("/dashboard");
    }

    // Owner has access
    if (document.owner_id === user.id) {
        return (
            <div className="px-4">
                <TextEditor />
            </div>
        );
    }

    // Check whether user is a member
    const { data: membership, error: membershipError } =
        await supabase
            .from("document_members")
            .select("role")
            .eq("document_id", documentId)
            .eq("user_id", user.id)
            .maybeSingle();

    if (membershipError) {
        console.error(
            "Membership check error:",
            membershipError
        );

        redirect("/dashboard");
    }

    if (!membership) {
        redirect("/dashboard");
    }

    return (
        <div className="px-4">
            <TextEditor />
        </div>
    );
}