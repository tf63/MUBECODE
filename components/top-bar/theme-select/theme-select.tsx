'use client'
import { Palette } from 'lucide-react'

import { useThemeStore } from '@/components/store/theme-store'

export const ThemeSelect = () => {
    const { setTheme } = useThemeStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.value)
    }

    return (
        <div className="flex items-start">
            <Palette className="mr-3 h-8 w-8" />
            <div className="space-x-2">
                <input
                    type="radio"
                    name="theme"
                    value="default"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                    onChange={handleChange}
                    defaultChecked
                />
                <input
                    type="radio"
                    name="theme"
                    value="dracula"
                    className="theme-controller radio  radio-lg checked:bg-primary"
                    onChange={handleChange}
                />
                <input
                    type="radio"
                    name="theme"
                    value="sunset"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                    onChange={handleChange}
                />
                <input
                    type="radio"
                    name="theme"
                    value="night"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
