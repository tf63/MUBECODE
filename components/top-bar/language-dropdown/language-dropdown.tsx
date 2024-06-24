'use client'
import { useNextCode } from '@/components/hooks/use-next-code'

export const LanguageDropdown = () => {
    const { nextCode } = useNextCode()

    return (
        <div className="dropdown w-80">
            <div tabIndex={0} role="button" className="btn w-full justify-between">
                Language
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] mt-2 w-full rounded-box bg-base-300 p-2 shadow-2xl">
                <li>
                    <input
                        type="radio"
                        name="language-dropdown"
                        className="btn btn-ghost btn-sm btn-block justify-start focus-visible:outline-0"
                        aria-label="TypeScript"
                        value="typescript"
                        defaultChecked
                        onChange={() => {
                            nextCode()
                        }}
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="language-dropdown"
                        className="btn btn-ghost btn-sm btn-block justify-start focus-visible:outline-0"
                        aria-label="Go"
                        value="go"
                        disabled
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="language-dropdown"
                        className="btn btn-ghost btn-sm btn-block justify-start focus-visible:outline-0"
                        aria-label="Python"
                        value="python"
                        disabled
                    />
                </li>
            </ul>
        </div>
    )
}
