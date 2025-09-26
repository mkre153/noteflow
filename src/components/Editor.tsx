'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'
import { useCallback, useEffect } from 'react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  onBoldClick: () => void
  onItalicClick: () => void
  onStrikeClick: () => void
  onCodeClick: () => void
  onH1Click: () => void
  onH2Click: () => void
  onH3Click: () => void
  onBulletListClick: () => void
  onOrderedListClick: () => void
  onUndoClick: () => void
  onRedoClick: () => void
  onLinkClick: () => void
}

export default function Editor({
  content,
  onChange,
  onBoldClick,
  onItalicClick,
  onStrikeClick,
  onCodeClick,
  onH1Click,
  onH2Click,
  onH3Click,
  onBulletListClick,
  onOrderedListClick,
  onUndoClick,
  onRedoClick,
  onLinkClick,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        bold: false,
        italic: false,
        strike: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your note...',
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
      ListItem,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      History,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // Expose editor commands to parent component
  useEffect(() => {
    if (editor) {
      onBoldClick = () => editor.chain().focus().toggleBold().run()
      onItalicClick = () => editor.chain().focus().toggleItalic().run()
      onStrikeClick = () => editor.chain().focus().toggleStrike().run()
      onCodeClick = () => editor.chain().focus().toggleCode().run()
      onH1Click = () => editor.chain().focus().toggleHeading({ level: 1 }).run()
      onH2Click = () => editor.chain().focus().toggleHeading({ level: 2 }).run()
      onH3Click = () => editor.chain().focus().toggleHeading({ level: 3 }).run()
      onBulletListClick = () => editor.chain().focus().toggleBulletList().run()
      onOrderedListClick = () => editor.chain().focus().toggleOrderedList().run()
      onUndoClick = () => editor.chain().focus().undo().run()
      onRedoClick = () => editor.chain().focus().redo().run()
      onLinkClick = () => {
        const url = window.prompt('Enter URL:')
        if (url) {
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
      }
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="h-full">
      <EditorContent
        editor={editor}
        className="h-full prose prose-gray dark:prose-invert max-w-none p-8 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:p-0"
      />
    </div>
  )
}