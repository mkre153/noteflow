import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Note {
  id: string
  title: string
  preview: string
  date: string
  favorite: boolean
  content: string
  folderId?: string
}

export interface Folder {
  id: string
  name: string
  icon: string
  color: string
  isCustom?: boolean
}

interface NoteStore {
  // State
  selectedNote: string | null
  selectedFolder: string
  noteContent: string
  isAIModalOpen: boolean
  selectedText: string
  notes: Note[]
  folders: Folder[]
  customFolders: Folder[]

  // Actions
  setSelectedNote: (id: string | null) => void
  setSelectedFolder: (folder: string) => void
  updateNoteContent: (content: string) => void
  toggleAIModal: () => void
  setIsAIModalOpen: (isOpen: boolean) => void
  setSelectedText: (text: string) => void

  // Note operations
  createNote: (title: string, folderId?: string) => string
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  toggleNoteFavorite: (id: string) => void

  // Folder operations
  createFolder: (name: string, color: string) => string
  deleteFolder: (id: string) => void

  // Computed values
  getFilteredNotes: () => Note[]
  getCurrentNote: () => Note | null
}

export const useNoteStore = create<NoteStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedNote: null,
      selectedFolder: 'all-notes',
      noteContent: '',
      isAIModalOpen: false,
      selectedText: '',

      // Static folders
      folders: [
        { id: 'all-notes', name: 'All Notes', icon: 'FileText', color: 'text-blue-600' },
        { id: 'favorites', name: 'Favorites', icon: 'Star', color: 'text-yellow-500' },
        { id: 'archived', name: 'Archived', icon: 'Archive', color: 'text-gray-500' },
        { id: 'trash', name: 'Trash', icon: 'Trash', color: 'text-red-500' },
      ],

      // Custom folders
      customFolders: [
        { id: 'work', name: 'Work', icon: 'Folder', color: 'text-blue-500', isCustom: true },
        { id: 'personal', name: 'Personal', icon: 'Folder', color: 'text-green-500', isCustom: true },
        { id: 'projects', name: 'Projects', icon: 'Folder', color: 'text-purple-500', isCustom: true },
      ],

      // Initial notes
      notes: [
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
      ],

      // Actions
      setSelectedNote: (id) => set({ selectedNote: id }),

      setSelectedFolder: (folder) => set({ selectedFolder: folder }),

      updateNoteContent: (content) => {
        set({ noteContent: content })
        const { selectedNote, notes } = get()
        if (selectedNote) {
          set({
            notes: notes.map(note =>
              note.id === selectedNote
                ? { ...note, content, preview: content.substring(0, 100) + '...' }
                : note
            )
          })
        }
      },

      toggleAIModal: () => set((state) => ({ isAIModalOpen: !state.isAIModalOpen })),

      setIsAIModalOpen: (isOpen) => set({ isAIModalOpen: isOpen }),

      setSelectedText: (text) => set({ selectedText: text }),

      // Note operations
      createNote: (title, folderId) => {
        const newId = Date.now().toString()
        const newNote: Note = {
          id: newId,
          title,
          preview: 'Start writing...',
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          favorite: false,
          content: '',
          folderId
        }

        set((state) => ({
          notes: [...state.notes, newNote],
          selectedNote: newId,
          noteContent: ''
        }))

        return newId
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === id ? { ...note, ...updates } : note
          )
        }))
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter(note => note.id !== id),
          selectedNote: state.selectedNote === id ? null : state.selectedNote,
          noteContent: state.selectedNote === id ? '' : state.noteContent
        }))
      },

      toggleNoteFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === id ? { ...note, favorite: !note.favorite } : note
          )
        }))
      },

      // Folder operations
      createFolder: (name, color) => {
        const newId = Date.now().toString()
        const newFolder: Folder = {
          id: newId,
          name,
          icon: 'Folder',
          color,
          isCustom: true
        }

        set((state) => ({
          customFolders: [...state.customFolders, newFolder]
        }))

        return newId
      },

      deleteFolder: (id) => {
        set((state) => ({
          customFolders: state.customFolders.filter(folder => folder.id !== id),
          notes: state.notes.map(note =>
            note.folderId === id ? { ...note, folderId: undefined } : note
          ),
          selectedFolder: state.selectedFolder === id ? 'all-notes' : state.selectedFolder
        }))
      },

      // Computed values
      getFilteredNotes: () => {
        const { notes, selectedFolder } = get()
        switch (selectedFolder) {
          case 'all-notes':
            return notes
          case 'favorites':
            return notes.filter(note => note.favorite)
          case 'archived':
            return notes.filter(note => note.folderId === 'archived')
          case 'trash':
            return notes.filter(note => note.folderId === 'trash')
          default:
            return notes.filter(note => note.folderId === selectedFolder)
        }
      },

      getCurrentNote: () => {
        const { selectedNote, notes } = get()
        return selectedNote ? notes.find(note => note.id === selectedNote) || null : null
      }
    }),
    {
      name: 'note-storage',
      partialize: (state) => ({
        notes: state.notes,
        customFolders: state.customFolders,
        selectedFolder: state.selectedFolder,
        selectedNote: state.selectedNote
      })
    }
  )
)