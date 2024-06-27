'use client'
import { Palette } from 'lucide-react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { useThemeStore } from '@/components/store/theme-store'

const ThemeRadioButton = ({ label }: { label: Theme }) => {
    const { theme, setTheme } = useThemeStore()

    useEffect(() => {
        const curTheme = localStorage.getItem('theme') as Theme
        if (curTheme == null) {
            localStorage.setItem('theme', 'default')
        }

        setTheme(curTheme ?? 'default')
    }, [setTheme])

    return (
        <input
            type="radio"
            name="theme"
            value={label}
            data-set-theme={label}
            data-act-class="ACTIVECLASS"
            className="theme-controller radio radio-lg checked:bg-primary focus-visible:outline-0"
            onChange={() => {
                setTheme(label)
            }}
            checked={theme === label}
        />
    )
}

export const ThemeSelect = () => {
    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div className="flex items-start">
            <Palette className="mr-3 h-8 w-8" />
            <div className="space-x-2">
                <ThemeRadioButton label="default" />
                <ThemeRadioButton label="dracula" />
                <ThemeRadioButton label="sunset" />
                <ThemeRadioButton label="dim" />
            </div>
        </div>
    )
}
