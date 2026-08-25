import DocumentCard  from "@/components/dashboard/DocumentCard";

const documents = [
    {
        id: "1",
        title: "My first document",
        updatedAt: "2 minutes ago",
    },
    {
        id: "2",
        title: "Project Ideas",
        updatedAt: "Yesterday",
    },
    {
        id: "3",
        title: "Research Notes",
        updatedAt: "3 days ago",
    },
];

export default function DocumentGrid() {
    return (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {documents.map((document) => (
                <DocumentCard
                    key={document.id}
                    {...document}
                />
            ))}
        </div>
    );
}