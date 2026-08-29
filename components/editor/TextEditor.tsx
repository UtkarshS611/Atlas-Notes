'use client'

import { useEffect, useMemo, useRef } from "react";

import { createClient } from "@/lib/supabase/client";

import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

import TextAlign from '@tiptap/extension-text-align'

import { FontSize, TextStyle } from '@tiptap/extension-text-style'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    BoldIcon,
    ItalicIcon,
    RedoIcon,
    StrikethroughIcon,
    UnderlineIcon,
    UndoIcon,
    AlignCenter,
    AlignLeft,
    AlignRight,
    AlignJustify,
    ChevronDown
} from "lucide-react";

import {
    LuSuperscript,
    LuSubscript
} from "react-icons/lu";

interface TextEditorProps {
    documentId: string;
    initialContent: Record<string, any> | null;
}

export default function TextEditor({
    documentId,
    initialContent,
}: TextEditorProps) {

    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    const saveDocument = (content: Record<string, any>) => {
        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }

        saveTimeout.current = setTimeout(async () => {
            const supabase = createClient();

            const { error } = await supabase
                .from("documents")
                .update({
                    content: content,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", documentId);

            if (error) {
                console.error("Failed to save document:", error);
            } else {
                console.log("Document saved");
            }
        }, 800);
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Subscript,
            Superscript,

            TextStyle,
            FontSize,

            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: initialContent ?? {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: {
                        level: 1,
                    },
                    content: [
                        {
                            type: "text",
                            text: "Your Heading",
                        },
                    ],
                },
            ],
        },

        onUpdate: ({ editor }) => {
            saveDocument(editor.getJSON());
        },
        immediatelyRender: true,
    })



    const { fontSize } = useEditorState({
        editor,
        selector: ({ editor }) => {
            if (!editor) {
                return {
                    fontSize: "16px",
                };
            }

            return {
                fontSize:
                    editor.getAttributes("textStyle")?.fontSize ?? "16px",
            };
        },
    });

    const providerValue = useMemo(() => ({ editor }), [editor])

    if (!editor) {
        return null
    }


    return (
        <EditorContext.Provider value={{ editor }}>
            <header className='border-b flex justify-center items-center py-2 w-auto'>
                <div className='tool-group px-1'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div
                                className={`bg-muted h-full py-1 w-32 gap-1 cursor-pointer flex items-center rounded-xl justify-around`}
                            >
                                {fontSize}
                                <ChevronDown className="size-3.5" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start" className={"overflow-hidden"}>
                            {[
                                "10px",
                                "12px",
                                "14px",
                                "16px",
                                "18px",
                                "20px",
                                "24px",
                                "28px",
                                "32px",
                                "36px",
                                "48px",
                                "64px",
                            ].map((size) => (
                                <DropdownMenuItem
                                    key={size}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setFontSize(size)
                                            .run()
                                    }
                                    className={fontSize === size ? "bg-muted" : ""}
                                >
                                    {size}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <div className='tool-group border-l-2 w-fit px-1'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().undo().run()}
                        className={"cursor-pointer"}
                    >
                        <UndoIcon />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().redo().run()}
                        className={"cursor-pointer"}
                    >
                        <RedoIcon />
                    </Button>
                </div>


                <div className='tool-group border-x-2 w-fit px-1'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <BoldIcon />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={"cursor-pointer"}
                    >
                        <StrikethroughIcon />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={"cursor-pointer"}
                    >
                        <ItalicIcon />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={"cursor-pointer"}
                    >
                        <UnderlineIcon />
                    </Button>
                </div>


                <div className='tool-group border-r-2 w-fit px-1'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        className={"cursor-pointer"}
                    >
                        <LuSuperscript />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        className={`cursor-pointer`}
                    >
                        <LuSubscript />
                    </Button>
                </div>


                <div className='tool-group border-r-2 w-fit px-1'>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
                        className={"cursor-pointer"}
                    >
                        <AlignLeft />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleTextAlign("center").run()}
                        className={"cursor-pointer"}
                    >
                        <AlignCenter />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleTextAlign("right").run()}
                        className={"cursor-pointer"}
                    >
                        <AlignRight />
                    </Button>
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => editor.chain().focus().toggleTextAlign("justify").run()}
                        className={"cursor-pointer"}
                    >
                        <AlignJustify />
                    </Button>
                </div>
            </header>
            <EditorContent
                editor={editor}
                className='mx-auto max-w-4xl mt-12'
                placeholder='Start writing your document here...'
            />
        </EditorContext.Provider>
    )
}