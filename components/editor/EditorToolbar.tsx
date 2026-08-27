import { useEditor } from '@tiptap/react'
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
} from "lucide-react";

export default function EditorToolbar() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        immediatelyRender: false,
    })

    if (!editor) {
        return null
    }

    return (
        <header className='bg-fuchsia-200 flex justify-center items-center'>
            <div className='tool-group'>
                <Toggle
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <BoldIcon />
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <StrikethroughIcon />
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <ItalicIcon />
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <UnderlineIcon />
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <LinkIcon />
                </Toggle>
            </div>
        </header>
    )
}