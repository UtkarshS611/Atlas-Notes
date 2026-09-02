"use client";

import * as Y from "yjs";

import { HocuspocusProvider } from "@hocuspocus/provider";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";

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

import {
    useCollaboration,
} from "@/components/dashboard/CollaborationContext";

export default function TextEditor() {

    const {
        user,
        userColor,
        ydoc,
        provider,
    } = useCollaboration();

    if (!user || !ydoc || !provider
    ) {
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
            user={user}
            userColor={userColor}
        />
    );
}

function CollaborativeEditor({
    ydoc,
    provider,
    user,
    userColor,
}: {
    ydoc: Y.Doc;
    provider: HocuspocusProvider;
    user: {
        id: string;
        name: string;
    };
    userColor: string;
}) {

    const editor = useEditor({

        extensions: [

            StarterKit.configure({
                undoRedo: false,
            }),


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
                    id: user.id,
                    name: user.name,
                    color: userColor,
                },
            }),

        ],
    });


    if (!editor) {
        return null;
    }


    return (
        <div className="w-full">

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

            <EditorContent
                editor={editor}
                className="mx-auto mt-12 max-w-4xl"
            />
        </div>
    );
}