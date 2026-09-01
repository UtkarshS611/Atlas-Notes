"use client";

import { useEffect, useMemo, useState } from "react";

import * as Y from "yjs";

import {
    useEditor,
    EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";

import { HocuspocusProvider } from "@hocuspocus/provider";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

import {
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    AlignCenter,
    AlignLeft,
    AlignRight,
    AlignJustify,
} from "lucide-react";

import {
    LuSuperscript,
    LuSubscript,
} from "react-icons/lu";

interface TextEditorProps {
    documentId: string;
}

export default function TextEditor({
    documentId,
}: TextEditorProps) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const ydoc = useMemo(() => {
        return new Y.Doc();
    }, []);
    useEffect(() => {
        const supabase = createClient();

        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setAccessToken(session?.access_token ?? null);
        };

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setAccessToken(
                    session?.access_token ?? null
                );
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    const provider = useMemo(() => {
        if (!accessToken) {
            return null;
        }

        return new HocuspocusProvider({
            url: "ws://localhost:3001",
            name: `document-${documentId}`,
            document: ydoc,
            token: accessToken,
        });
    }, [
        accessToken,
        documentId,
        ydoc,
    ]);

    if (!provider) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Connecting...
                </p>
            </div>
        );
    }

    return (
        <CollaborativeEditor
            ydoc={ydoc}
            provider={provider}
        />
    );
}
function CollaborativeEditor({
    ydoc,
    provider,
}: {
    ydoc: Y.Doc;
    provider: HocuspocusProvider;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                undoRedo: false,
            }),
            // TextStyle,
            Subscript,
            Superscript,
            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),
            Collaboration.configure({
                document: ydoc,
            }),
            CollaborationCaret.configure({
                provider,

                user: {
                    name: "Test User",
                    color: "#6366f1",
                },
            }),
        ],
    });
    if (!editor) {
        return null;
    }

    return (
        <div className="w-full">
            {/* Toolbar */}
            <header className="flex w-full items-center justify-center border-b py-2">
                <div className="tool-group flex w-fit items-center border-x-2 px-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <BoldIcon />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <StrikethroughIcon />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <ItalicIcon />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleUnderline()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <UnderlineIcon />
                    </Button>
                </div>


                {/* Superscript / Subscript */}
                <div className="tool-group flex w-fit items-center border-r-2 px-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleSuperscript()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <LuSuperscript />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleSubscript()
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <LuSubscript />
                    </Button>
                </div>


                {/* Text alignment */}
                <div className="tool-group flex w-fit items-center border-r-2 px-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("left")
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <AlignLeft />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("center")
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <AlignCenter />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("right")
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <AlignRight />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setTextAlign("justify")
                                .run()
                        }
                        className="cursor-pointer"
                    >
                        <AlignJustify />
                    </Button>
                </div>
            </header>


            {/* Editor */}
            <EditorContent
                editor={editor}
                className="mx-auto mt-12 max-w-4xl"
            />
        </div>
    );
}