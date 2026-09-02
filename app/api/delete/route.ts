import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: Request) {
    try {
        const { documentId } = await request.json();

        if (!documentId) {
            return NextResponse.json(
                {
                    error: "Document ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);

        /*
         * Get current user
         */
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                {
                    error: "Unauthorized.",
                },
                {
                    status: 401,
                }
            );
        }

        /*
         * Make sure the current user owns
         * the document.
         */
        const {
            data: document,
            error: documentError,
        } = await supabase
            .from("documents")
            .select("id, owner_id")
            .eq("id", documentId)
            .single();

        if (documentError || !document) {
            return NextResponse.json(
                {
                    error: "Document not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (document.owner_id !== user.id) {
            return NextResponse.json(
                {
                    error:
                        "You do not have permission to delete this document.",
                },
                {
                    status: 403,
                }
            );
        }

        /*
         * Delete document
         */
        const { error: deleteError } =
            await supabase
                .from("documents")
                .delete()
                .eq("id", documentId)
                .eq("owner_id", user.id);

        if (deleteError) {
            console.error(
                "Failed to delete document:",
                deleteError
            );

            return NextResponse.json(
                {
                    error: "Failed to delete document.",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(
            "Delete document error:",
            error
        );

        return NextResponse.json(
            {
                error: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}