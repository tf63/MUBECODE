import { create } from 'zustand'

interface TypeStore {
    lineNumber: number
    cursorIndex: number
    isLineFinished: boolean
    resetGame: () => void
    nextLine: () => void
    setLineFinished: (isLineFinished: boolean) => void
    incCursorIndex: () => void
}

export const useTypeStore = create<TypeStore>((set) => ({
    lineNumber: 0,
    cursorIndex: 0,
    isLineFinished: false,
    resetGame: () => set({ lineNumber: 0, cursorIndex: 0, isLineFinished: false }),
    nextLine: () => set((state) => ({ lineNumber: state.lineNumber + 1, cursorIndex: 0, isLineFinished: false })),
    setLineFinished: (isLineFinished: boolean) => set({ isLineFinished: isLineFinished }),
    incCursorIndex: () => set((state) => ({ cursorIndex: state.cursorIndex + 1 })),
}))
