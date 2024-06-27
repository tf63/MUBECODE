import { create } from 'zustand'

interface LanguageStore {
    language: Language
    setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
    language: 'typescript',
    setLanguage: (language: Language) => set(() => ({ language })),
}))
