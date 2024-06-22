import { LanguageSelect } from './language-select'

const ReloadButton = () => {
    return (
        <div className="btn btn-primary flex font-medium">
            <span>Next Code</span>

            <kbd
                className="ml-auto
                        inline-flex h-5 items-center gap-1 rounded bg-zinc-900 bg-opacity-5
                        px-1 text-[10px]"
            >
                <span>⌘</span>
                <span>R</span>
            </kbd>
        </div>
    )
}

export const TopBar = () => {
    return (
        <div className="flex items-center">
            <div className="px-4 py-3 text-center text-lg text-white">Type App</div>
            <div className="ml-auto flex items-center gap-10">
                <LanguageSelect />
                <ReloadButton />
            </div>
        </div>
    )
}
