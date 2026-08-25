// import { Editor } from "@/components/editor/editor";

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
        <div className="min-h-screen">
            {/* <Editor documentId={documentId} /> */}
            Editor will be here son
        </div>
    );
}