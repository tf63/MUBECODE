'use client'
import { useEffect } from 'react'

import { useNextCode } from '@/components/hooks/use-next-code'

export const NextCodeButton = () => {
    const { nextCode } = useNextCode()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault()
            if (event.key === 'Escape') {
                nextCode()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [nextCode])

    return (
        <div className="btn btn-primary flex font-medium" onClick={nextCode}>
            <span>Next Code</span>

            <kbd
                className="ml-auto
                      inline-flex h-5 items-center gap-1 rounded bg-zinc-900 bg-opacity-5
                      px-1 text-[10px]"
            >
                <span>Esc</span>
            </kbd>
        </div>
    )
}
