import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                    documents: [],
                },
                {
                    status: 401,
                }
            );
        }

        /*
         * Get documents where the current user is
         * explicitly a member.
         */
        const {
            data: memberships,
            error: membershipError,
        } = await supabase
            .from("document_members")
            .select("document_id, role")
            .eq("user_id", user.id);

        if (membershipError) {
            console.error(
                "Membership query error:",
                membershipError
            );

            return NextResponse.json(
                {
                    error:
                        "Failed to load shared documents.",
                    documents: [],
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * Get documents owned by the current user
         * that have at least one member.
         */
        const {
            data: ownedDocuments,
            error: ownedError,
        } = await supabase
            .from("documents")
            .select(`
                id,
                title,
                updated_at,
                document_members!inner (
                    user_id,
                    role
                )
            `)
            .eq("owner_id", user.id);

        if (ownedError) {
            console.error(
                "Owned shared documents error:",
                ownedError
            );

            return NextResponse.json(
                {
                    error:
                        "Failed to load shared documents.",
                    documents: [],
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * Documents where I'm a member.
         */
        const memberDocumentIds =
            new Set(
                (memberships ?? []).map(
                    (membership) =>
                        membership.document_id
                )
            );

        /*
         * Documents I own that have members.
         */
        const ownerSharedDocuments =
            (ownedDocuments ?? []).filter(
                (document) =>
                    document.document_members &&
                    document.document_members.length > 0
            );

        /*
         * Get the actual member documents.
         */
        let memberDocuments: {
            id: string;
            title: string;
            updated_at: string;
        }[] = [];

        if (memberDocumentIds.size > 0) {
            const {
                data,
                error,
            } = await supabase
                .from("documents")
                .select(
                    "id, title, updated_at"
                )
                .in(
                    "id",
                    Array.from(
                        memberDocumentIds
                    )
                );

            if (error) {
                console.error(
                    "Member documents error:",
                    error
                );

                return NextResponse.json(
                    {
                        error:
                            "Failed to load shared documents.",
                        documents: [],
                    },
                    {
                        status: 500,
                    }
                );
            }

            memberDocuments = data ?? [];
        }

        /*
         * Combine owner-shared documents and
         * documents shared with the current user.
         */
        const sharedMap = new Map<
            string,
            {
                id: string;
                title: string;
                updated_at: string;
                role: string;
            }
        >();

        /*
         * Documents I own and have shared.
         */
        ownerSharedDocuments.forEach(
            (document) => {
                sharedMap.set(
                    document.id,
                    {
                        id: document.id,
                        title:
                            document.title ||
                            "Untitled document",
                        updated_at:
                            document.updated_at,
                        role: "owner",
                    }
                );
            }
        );

        /*
         * Documents shared with me.
         */
        memberDocuments.forEach(
            (document) => {
                const membership =
                    memberships?.find(
                        (membership) =>
                            membership.document_id ===
                            document.id
                    );

                sharedMap.set(
                    document.id,
                    {
                        id: document.id,
                        title:
                            document.title ||
                            "Untitled document",
                        updated_at:
                            document.updated_at,
                        role:
                            membership?.role ??
                            "editor",
                    }
                );
            }
        );

        return NextResponse.json({
            documents:
                Array.from(
                    sharedMap.values()
                ),
        });
    } catch (error) {
        console.error(
            "Shared documents API error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Something went wrong.",
                documents: [],
            },
            {
                status: 500,
            }
        );
    }
}