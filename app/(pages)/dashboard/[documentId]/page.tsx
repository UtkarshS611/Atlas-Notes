import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import TextEditor from "@/components/editor/TextEditor";
import { createClient } from "@/lib/supabase/server";

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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        notFound();
    }

    const { data: document, error } = await supabase
        .from("documents")
        .select("id, title, content")
        .eq("id", documentId)
        .eq("owner_id", user.id)
        .single();

    if (error || !document) {
        console.error("Error loading document:", error);
        notFound();
    }

    return (
        <div className="px-4">
            <TextEditor
                documentId={document.id}
                initialContent={document.content}
            />
        </div>
    );
}