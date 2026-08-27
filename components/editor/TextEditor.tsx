'use client'

import { useMemo } from 'react'

import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toggle } from '@/components/ui/toggle'

import {
    BoldIcon,
    CodeIcon,
    HighlighterIcon,
    ItalicIcon,
    LinkIcon,
    ListIcon,
    ListOrderedIcon,
    Quote,
    RedoIcon,
    StrikethroughIcon,
    UnderlineIcon,
    UndoIcon,
    UnlinkIcon,
    Subscript,
    Superscript,
    AlignCenter,
    AlignLeft,
    AlignRight,
    AlignJustify
} from "lucide-react";


export default function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: `Start Writing Here...`,
        immediatelyRender: false,
    })

    const providerValue = useMemo(() => ({ editor }), [editor])

    if (!editor) {
        return null
    }

    return (
        <EditorContext.Provider value={providerValue}>
            <header className='bg-fuchsia-200 flex justify-center items-center py-2 w-auto'>
                <div className='tool-group border-l-2 w-fit px-1'>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <UndoIcon />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <RedoIcon />
                    </Toggle>
                </div>


                <div className='tool-group border-x-2 w-fit px-1'>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <BoldIcon />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={"cursor-pointer"}
                    >
                        <StrikethroughIcon />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={"cursor-pointer"}
                    >
                        <ItalicIcon />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={"cursor-pointer"}
                    >
                        <UnderlineIcon />
                    </Toggle>
                </div>


                <div className='tool-group border-r-2 w-fit px-1'>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <Superscript />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <Subscript />
                    </Toggle>
                </div>


                <div className='tool-group border-r-2 w-fit px-1'>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <AlignLeft />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <AlignCenter />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <AlignRight />
                    </Toggle>
                    <Toggle
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"cursor-pointer"}
                    >
                        <AlignJustify />
                    </Toggle>
                </div>
            </header>
            <EditorContent
                editor={editor}
                className='mx-auto max-w-4xl mt-12'
            />
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
            {/* <BubbleMenu editor={editor}>This is the floating menu</BubbleMenu> */}
        </EditorContext.Provider>
    )
}