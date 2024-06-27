import { create } from 'zustand'

interface ThemeStore {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: 'default',
    setTheme: (theme: Theme) => set(() => ({ theme })),
}))
