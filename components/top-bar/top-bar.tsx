import { LanguageDropdown } from './language-dropdown'
import { NextCodeButton } from './next-code-button'

export const TopBar = () => {
    return (
        <div className="flex items-center">
            <div className="px-4 py-3 text-center text-lg text-white">Type App</div>
            <div className="ml-auto flex items-center gap-10">
                <LanguageDropdown />
                <NextCodeButton />
            </div>
        </div>
    )
}
