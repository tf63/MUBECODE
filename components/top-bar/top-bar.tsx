import { LanguageDropdown } from './language-dropdown'
import { NextCodeButton } from './next-code-button'
import { ThemeSelect } from './theme-select'

export const TopBar = () => {
    return (
        <div className="flex items-center">
            <div className="px-4 py-3 text-center text-lg text-white">Type App</div>
            <div className="ml-auto flex items-center gap-10">
                <ThemeSelect />
                <LanguageDropdown />
           
                <NextCodeButton />
            </div>
        </div>
    )
}
