import { create } from 'zustand'

interface TypeStore {
    lineNumber: number
    cursorIndex: number
    isLineFinished: boolean
    resetLineNumber: () => void
    resetCursorIndex: () => void
    setLineFinished: (isLineFinished: boolean) => void
    incLineNumber: () => void
    incCursorIndex: () => void
}

export const useTypeStore = create<TypeStore>((set) => ({
    lineNumber: 0,
    cursorIndex: 0,
    isLineFinished: false,
    resetLineNumber: () => set({ lineNumber: 0 }),
    resetCursorIndex: () => set({ cursorIndex: 0 }),
    setLineFinished: (isLineFinished: boolean) => set({ isLineFinished: isLineFinished }),
    incLineNumber: () => set((state) => ({ lineNumber: state.lineNumber + 1, isLineFinished: false })),
    incCursorIndex: () => set((state) => ({ cursorIndex: state.cursorIndex + 1 })),
}))
