import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();

        const documentId = body.documentId;
        const email = body.email?.trim().toLowerCase();

        if (!documentId || !email) {
            return NextResponse.json(
                {
                    error:
                        "Document ID and email are required.",
                },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);

        /*
         * Get currently authenticated user.
         */
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                {
                    error: "You must be logged in.",
                },
                { status: 401 }
            );
        }

        /*
         * Make sure current user owns the document.
         */
        const { data: document, error: documentError } =
            await supabase
                .from("documents")
                .select("id, owner_id")
                .eq("id", documentId)
                .single();

        if (
            documentError ||
            !document
        ) {
            return NextResponse.json(
                {
                    error: "Document not found.",
                },
                { status: 404 }
            );
        }

        if (document.owner_id !== user.id) {
            return NextResponse.json(
                {
                    error:
                        "Only the document owner can add members.",
                },
                { status: 403 }
            );
        }

        /*
         * Find the user by email.
         *
         * IMPORTANT:
         * auth.users cannot be queried directly
         * with the normal client.
         *
         * This part should eventually use a secure
         * server-side/admin lookup.
         */

        const {
            data: targetUser,
            error: targetUserError,
        } = await supabase.rpc(
            "get_user_id_by_email",
            {
                user_email: email,
            }
        );

        if (
            targetUserError ||
            !targetUser
        ) {
            return NextResponse.json(
                {
                    error:
                        "No account exists with this email.",
                },
                { status: 404 }
            );
        }

        if (targetUser === user.id) {
            return NextResponse.json(
                {
                    error:
                        "You are already the owner of this document.",
                },
                { status: 400 }
            );
        }

        /*
         * Add member.
         */
        const {
            error: memberError,
        } = await supabase
            .from("document_members")
            .upsert(
                {
                    document_id: documentId,
                    user_id: targetUser,
                    role: "editor",
                },
                {
                    onConflict:
                        "document_id,user_id",
                }
            );

        if (memberError) {
            console.error(memberError);

            return NextResponse.json(
                {
                    error:
                        "Unable to add member.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}