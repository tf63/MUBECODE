import { Palette } from 'lucide-react'

export const ThemeSelect = () => {
    return (
        <div className="flex items-start">
            <Palette className="mr-3 h-8 w-8" />
            <div className="space-x-2">
                <input
                    type="radio"
                    name="theme"
                    value="default"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                    defaultChecked
                />
                <input
                    type="radio"
                    name="theme"
                    value="dracula"
                    className="theme-controller radio  radio-lg checked:bg-primary"
                />
                <input
                    type="radio"
                    name="theme"
                    value="sunset"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                />
                <input
                    type="radio"
                    name="theme"
                    value="night"
                    className="theme-controller radio radio-lg  checked:bg-primary"
                />
            </div>
        </div>
    )
}
