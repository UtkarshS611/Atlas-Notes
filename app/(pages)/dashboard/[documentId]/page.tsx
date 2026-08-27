// import { Editor } from "@/components/editor/editor";

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

    return (
        <div className="px-4">
            Editor will be here son

            <TextEditor />
        </div>
    );
}