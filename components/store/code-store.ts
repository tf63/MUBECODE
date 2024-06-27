import { create } from 'zustand'

import { getRandomAnotherInt } from '@/lib/utils'

interface CodeStore {
    codeIndex: number
    codeSize: number
    setCodeSize: (codeSize: number) => void
    updateCodeIndex: () => void
    resetCodeIndex: () => void
}

export const useCodeStore = create<CodeStore>((set) => ({
    codeIndex: 0,
    codeSize: 0,
    setCodeSize: (codeSize: number) => set(() => ({ codeSize })),
    updateCodeIndex: () => set((state) => ({ codeIndex: getRandomAnotherInt(state.codeSize, state.codeIndex) })),
    resetCodeIndex: () => set(() => ({ codeIndex: 0 })),
}))
