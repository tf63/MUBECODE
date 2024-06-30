'use client'
import { useEffect, useMemo, useRef } from 'react'

import { useCursorIndex } from '@/components/hooks/use-type'
import { Caret } from '@/components/ui/caret'

import { extractLeadingWhitespace, highlightCodeAgain, scrollWithInScreen } from '@/lib/utils'

export const CodeTargetLine = ({ line }: { line: string }) => {
    const { cursorIndex } = useCursorIndex(line)
    const caretRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        scrollWithInScreen(caretRef)
    }, [])

    const prefix = useMemo(() => extractLeadingWhitespace(line), [line])

    return (
        <code className="w-full whitespace-pre-wrap break-words">
            <span>{line.slice(0, cursorIndex + prefix.length)}</span>
            <Caret ref={caretRef} />
            <span>{line.slice(cursorIndex + prefix.length)}</span>
        </code>
    )
}

export const CodeLine = ({ line }: { line: string }) => {
    const lineRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        highlightCodeAgain(lineRef)
    }, [line])

    return (
        // tailwindcssのプロパティが効かないのでstyleで指定
        <code
            ref={lineRef}
            style={{
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
            }}
            className="typescript"
        >
            {line}
        </code>
    )
}
