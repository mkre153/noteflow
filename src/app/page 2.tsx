'use client'

import { useState, useRef } from 'react'
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

import {
  FolderIcon,
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  ArchiveIcon,
  TrashIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  MoreHorizontalIcon,
  UndoIcon,
  RedoIcon,
  ImageIcon,
  PaperclipIcon
} from 'lucide-react'

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string>('all-notes')
  const [noteContent, setNoteContent] = useState('')

  const folders = [
    { id: 'all-notes', name: 'All Notes', icon: FileTextIcon, color: 'text-blue-600' },
    { id: 'favorites', name: 'Favorites', icon: StarIcon, color: 'text-yellow-500' },
    { id: 'archived', name: 'Archived', icon: ArchiveIcon, color: 'text-gray-500' },
    { id: 'trash', name: 'Trash', icon: TrashIcon, color: 'text-red-500' },
  ]

  const customFolders = [
    { id: 'work', name: 'Work', icon: FolderIcon, color: 'text-blue-500' },
    { id: 'personal', name: 'Personal', icon: FolderIcon, color: 'text-green-500' },
    { id: 'projects', name: 'Projects', icon: FolderIcon, color: 'text-purple-500' },
  ]

  const notes = [
    {
      id: '1',
      title: 'Welcome to NoteAI!',
      preview: 'Welcome to NoteAI! This is your advanced note-taking app with AI functionality...',
      date: 'Sep 22, 2025',
      favorite: true,
      content: `<h1>Welcome to NoteAI</h1>
<p>This is your advanced note-taking app with AI functionality. Here's what you can do:</p>
<p>✨ <strong>Features</strong></p>
<p><strong>Rich Text Editing:</strong> Format your notes with headings, lists, code blocks, and more</p>
<p><strong>Organization:</strong> Create folders to organize your notes</p>
<p><strong>Search:</strong> Quickly find notes with powerful search</p>
<p><strong>AI Assistant:</strong> Get help with writing and summarizing (coming soon)</p>
<p>🚀 <strong>Getting Started</strong></p>
<ul>
<li>Click the + button to create a new note</li>
<li>Use the folder icon to create folders for organization</li>
<li>Start typing to auto-save your content</li>
<li>Use the toolbar for formatting options</li>
</ul>
<p><em>Try creating your first note and exploring the features!</em></p>`
    },
    {
      id: '2',
      title: 'Sample Note',
      preview: 'This is a sample note with some content...',
      date: 'Sep 22, 2025',
      favorite: false,
      content: `<h2>Sample Note</h2>
<p>This is a <strong>sample note</strong> with some <em>formatted content</em>.</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>`
    },
  ]

  // Initialize editor with extensions
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
        history: true, // Enable history in StarterKit
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
        HTMLAttributes: {
          class: 'tiptap-heading',
        },
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
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
    ],
    content: noteContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-gray dark:prose-invert max-w-none focus:outline-none min-h-96 p-0',
      },
    },
  })

  // Handle note selection
  const handleNoteSelect = (noteId: string) => {
    setSelectedNote(noteId)
    const note = notes.find(n => n.id === noteId)
    if (note && editor) {
      editor.commands.setContent(note.content)
      setNoteContent(note.content)
    }
  }

  // Toolbar actions
  const handleBold = () => editor?.chain().focus().toggleBold().run()
  const handleItalic = () => editor?.chain().focus().toggleItalic().run()
  const handleStrike = () => editor?.chain().focus().toggleStrike().run()
  const handleCode = () => editor?.chain().focus().toggleCode().run()
  const handleH1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
  const handleH2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
  const handleH3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
  const handleBulletList = () => editor?.chain().focus().toggleBulletList().run()
  const handleOrderedList = () => editor?.chain().focus().toggleOrderedList().run()
  const handleUndo = () => editor?.chain().focus().undo().run()
  const handleRedo = () => editor?.chain().focus().redo().run()
  const handleLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  // Check if buttons should be active
  const isBold = editor?.isActive('bold')
  const isItalic = editor?.isActive('italic')
  const isStrike = editor?.isActive('strike')
  const isCode = editor?.isActive('code')
  const isH1 = editor?.isActive('heading', { level: 1 })
  const isH2 = editor?.isActive('heading', { level: 2 })
  const isH3 = editor?.isActive('heading', { level: 3 })
  const isBulletList = editor?.isActive('bulletList')
  const isOrderedList = editor?.isActive('orderedList')

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">NoteAI</h1>

            <div className="flex items-center space-x-1">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                <PlusIcon className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                <MoreHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Toolbar */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleBold}
              className={`p-2 hover:bg-gray-100 rounded ${isBold ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <BoldIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleItalic}
              className={`p-2 hover:bg-gray-100 rounded ${isItalic ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ItalicIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleStrike}
              className={`p-2 hover:bg-gray-100 rounded ${isStrike ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <StrikethroughIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleCode}
              className={`p-2 hover:bg-gray-100 rounded ${isCode ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <CodeIcon className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button
              onClick={handleH1}
              className={`p-2 hover:bg-gray-100 rounded ${isH1 ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Heading1Icon className="w-4 h-4" />
            </button>
            <button
              onClick={handleH2}
              className={`p-2 hover:bg-gray-100 rounded ${isH2 ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Heading2Icon className="w-4 h-4" />
            </button>
            <button
              onClick={handleH3}
              className={`p-2 hover:bg-gray-100 rounded ${isH3 ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Heading3Icon className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button
              onClick={handleBulletList}
              className={`p-2 hover:bg-gray-100 rounded ${isBulletList ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleOrderedList}
              className={`p-2 hover:bg-gray-100 rounded ${isOrderedList ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ListOrderedIcon className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">
              AI
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-1">
            <button onClick={handleLink} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <LinkIcon className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <ImageIcon className="w-4 h-4" />
            </button>
            <button onClick={handleUndo} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <UndoIcon className="w-4 h-4" />
            </button>
            <button onClick={handleRedo} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <RedoIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* System Folders */}
          <div className="space-y-1 mb-6">
            {folders.map((folder) => {
              const IconComponent = folder.icon
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 mr-3 ${folder.color}`} />
                  {folder.name}
                </button>
              )
            })}
          </div>

          {/* Custom Folders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Folders</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {customFolders.map((folder) => {
                const IconComponent = folder.icon
                return (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mr-3 ${folder.color}`} />
                    {folder.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="border-t border-gray-200 p-4 max-h-80 overflow-y-auto">
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteSelect(note.id)}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${
                  selectedNote === note.id
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate flex-1">
                    {note.title}
                  </h4>
                  <div className="flex items-center space-x-1 ml-2">
                    {note.favorite && (
                      <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                    )}
                    <button className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-gray-600">
                      <MoreHorizontalIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                  {note.preview}
                </p>
                <span className="text-xs text-gray-400">{note.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedNote ? (
            <div className="flex-1 bg-white">
              <div className="max-w-4xl mx-auto p-8">
                <EditorContent
                  editor={editor}
                  className="h-full focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-96"
                />
              </div>
            </div>
          ) : (
          // Welcome State
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="max-w-2xl mx-auto text-center p-8">
              <div className="mb-8">
                <FileTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to NoteAI
                </h2>
                <p className="text-gray-600">
                  This is your advanced note-taking app with AI functionality. Here's what you can do:
                </p>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  ✨ Features
                </h3>

                <div className="space-y-3">
                  <div>
                    <strong className="text-gray-900">Rich Text Editing:</strong>
                    <span className="text-gray-600"> Format your notes with headings, lists, code blocks, and more</span>
                  </div>

                  <div>
                    <strong className="text-gray-900">Organization:</strong>
                    <span className="text-gray-600"> Create folders to organize your notes</span>
                  </div>

                  <div>
                    <strong className="text-gray-900">Search:</strong>
                    <span className="text-gray-600"> Quickly find notes with powerful search</span>
                  </div>

                  <div>
                    <strong className="text-gray-900">AI Assistant:</strong>
                    <span className="text-gray-600"> Get help with writing and summarizing (coming soon)</span>
                  </div>
                </div>
              </div>

              <div className="text-left bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🚀 Getting Started
                </h3>

                <div className="space-y-2 text-gray-700">
                  <p>Click the + button to create a new note</p>
                  <p>Use the folder icon to create folders for organization</p>
                  <p>Start typing to auto-save your content</p>
                  <p>Use the toolbar for formatting options</p>
                  <p className="italic text-gray-600 mt-4">Try creating your first note and exploring the features!</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}