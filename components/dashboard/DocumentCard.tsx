// import Link from "next/link";

// interface DocumentCardProps {
//     id: string;
//     title: string;
//     updatedAt: string;
// }

// export default function DocumentCard({
//     id,
//     title,
//     updatedAt,
// }: DocumentCardProps) {
//     return (
//         <Link
//             href={`/documents/${id}`}
//             className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:shadow-lg"
//         >
//             <div className="mb-8 flex h-32 items-center justify-center rounded-xl bg-muted">
//                 <span className="text-4xl">📄</span>
//             </div>

//             <h2 className="truncate font-semibold group-hover:underline">
//                 {title}
//             </h2>

//             <p className="mt-1 text-sm text-muted-foreground">
//                 Updated {updatedAt}
//             </p>
//         </Link>
//     );
// }