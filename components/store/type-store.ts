import { create } from 'zustand'

interface TypeStore {
    lineNumber: number
    cursorIndex: number
    resetLineNumber: () => void
    resetCursorIndex: () => void
    incLineNumber: () => void
    incCursorIndex: () => void
}

export const useTypeStore = create<TypeStore>((set) => ({
    lineNumber: 0,
    cursorIndex: 0,
    resetLineNumber: () => set({ lineNumber: 0 }),
    resetCursorIndex: () => set({ cursorIndex: 0 }),
    incLineNumber: () => set((state) => ({ lineNumber: state.lineNumber + 1 })),
    incCursorIndex: () => set((state) => ({ cursorIndex: state.cursorIndex + 1 })),
}))
