# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NoteFlow is an advanced note-taking application built with Next.js 15 and React 19, featuring a rich text editor powered by Tiptap. The app provides a three-panel interface similar to modern note-taking applications like Notion and Obsidian.

## Development Commands

### Core Commands
```bash
# Start development server with Turbopack (fast refresh enabled)
npm run dev

# Build for production with Turbopack optimization
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Development Server
- Runs on http://localhost:3000
- Uses Turbopack for faster compilation
- Supports hot module replacement

## Architecture Overview

### Application Structure
The app follows a monolithic Next.js App Router structure with the main application logic in a single page component:

- **Single Page Application**: All functionality is contained in `src/app/page.tsx`
- **Three-Panel Layout**:
  - Left sidebar: Folder navigation and note list
  - Center: Note list with preview cards
  - Right: Tiptap rich text editor
- **State Management**: Uses React useState hooks (no external state management yet)
- **Data**: Currently uses hardcoded mock data (local storage implementation pending)

### Key Components

#### Main Application (`src/app/page.tsx`)
- Contains all application state and logic
- Manages note selection, folder navigation, and editor content
- Integrates Tiptap editor with toolbar functionality
- Handles all UI interactions

#### Editor Component (`src/components/Editor.tsx`)
- **Note**: This component exists but is not currently used
- Contains standalone Tiptap editor implementation
- Could be refactored to replace inline editor in main page

### Rich Text Editor Integration

#### Tiptap Configuration
The editor uses a custom Tiptap setup with specific extension management:

```typescript
// Critical: Use StarterKit with disabled extensions, then add individual extensions
StarterKit.configure({
  heading: false,
  bulletList: false,
  orderedList: false,
  // ... disable built-in extensions
  history: true  // Keep history enabled in StarterKit
})
```

#### SSR Compatibility
**Important**: Always include `immediatelyRender: false` in useEditor to prevent hydration mismatches:

```typescript
const editor = useEditor({
  immediatelyRender: false,  // Required for Next.js SSR
  // ... other config
})
```

#### Extension Management
- **Do not import separate History extension** - use StarterKit's built-in history
- Individual extensions (Bold, Italic, etc.) override StarterKit defaults
- Each toolbar button maps to specific editor commands via `editor.chain().focus().toggleX().run()`

### Styling and UI

#### Design System
- **TailwindCSS 4.0**: Latest version with updated configuration
- **Color Scheme**: Gray-based with blue accents
- **Icons**: Lucide React for consistent iconography
- **Typography**: Uses prose classes for editor content
- **Layout**: Flexbox-based responsive design

#### Three-Panel Layout Structure
```
┌─────────────────────────────────────────────────┐
│ Top Toolbar (formatting buttons, AI button)     │
├─────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────────┐ ┌─────────────────┐ │
│ │ Folders │ │ Notes List  │ │ Rich Editor     │ │
│ │         │ │             │ │                 │ │
│ │ - All   │ │ [Note Card] │ │ [Tiptap Editor] │ │
│ │ - Fav   │ │ [Note Card] │ │                 │ │
│ │ - Work  │ │ [Note Card] │ │                 │ │
│ └─────────┘ └─────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Data Structure

### Current Data Models
```typescript
// Folder structure
const folders = [
  { id: string, name: string, icon: IconComponent, color: string }
]

// Note structure
const notes = [
  {
    id: string,
    title: string,
    preview: string,
    date: string,
    favorite: boolean,
    content: string  // HTML content for editor
  }
]
```

### Pending Features
Based on the current todo list, these features are planned but not implemented:
- Local storage for data persistence
- Create/delete note functionality
- AI features integration
- Mobile responsive design improvements

## Development Notes

### Tiptap Editor Gotchas
1. **History Plugin Conflicts**: Never include both StarterKit and separate History extension
2. **SSR Issues**: Always use `immediatelyRender: false`
3. **Extension Order**: Individual extensions must come after StarterKit in extensions array
4. **Toolbar State**: Use `editor.isActive()` to show active button states

### State Management
- Currently uses local React state
- Note content is stored as HTML strings
- Editor content syncs bidirectionally with state
- No persistence layer yet (localStorage planned)

### Performance Considerations
- Uses Turbopack for fast builds
- Editor content updates trigger re-renders
- Consider memoization for toolbar buttons if performance issues arise

### Future Architecture Recommendations
- Extract editor to separate component for reusability
- Implement proper state management (Zustand is already installed)
- Add proper TypeScript interfaces for data models
- Consider splitting large page component into smaller components