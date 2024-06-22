'use client'
import { useNextCode } from '@/components/hooks/use-next-code'

export const NextCodeButton = () => {
    const { nextCode } = useNextCode()
    return (
        <div className="btn btn-primary flex font-medium" onClick={nextCode}>
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
