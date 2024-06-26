'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'
import { useType } from '@/components/hooks/use-type'
import { useTypeStore } from '@/components/store/type-store'
import { Caret } from '@/components/ui/caret'
import { Window } from '@/components/ui/window'

import { extractLeadingWhitespace, highlightCodeAgain, scrollWithInScreen } from '@/lib/utils'

const CodeTargetLine = ({ line }: { line: string }) => {
    const { cursorIndex, lineNumber } = useTypeStore()
    const caretRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        scrollWithInScreen(caretRef)
    }, [cursorIndex, lineNumber])

    const prefix = extractLeadingWhitespace(line)

    return (
        <code className="w-full whitespace-pre-wrap break-words">
            <span>{line.slice(0, cursorIndex + prefix.length)}</span>
            <Caret ref={caretRef} />
            <span>{line.slice(cursorIndex + prefix.length)}</span>
        </code>
    )
}

const CodeLine = ({ line }: { line: string }) => {
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

const CodeLines = () => {
    const { code } = useCode('typescript')
    const { lineNumber } = useType(code)

    return (
        <div>
            {code.map(({ id, line }, index) => {
                if (index === lineNumber) {
                    return (
                        <pre
                            key={id}
                            className="flex w-full items-center rounded-lg bg-base-100 p-0.5 text-primary text-opacity-60"
                        >
                            <div className="mr-10 min-w-5 text-right text-primary text-opacity-60">{index + 1}</div>
                            <CodeTargetLine line={line} />
                        </pre>
                    )
                } else {
                    return (
                        <pre key={id} className="flex w-full items-center">
                            <div className="mr-10 min-w-5 text-right text-white text-opacity-40">{index + 1}</div>
                            <CodeLine line={line} />
                        </pre>
                    )
                }
            })}
        </div>
    )
}

const CodeContent = () => {
    const { code, isLoading, isError } = useCode('typescript')

    if (isLoading === true) {
        return (
            <pre>
                <code>Loading...</code>
            </pre>
        )
    }

    if (isError != null) {
        return (
            <pre className="bg-warning">
                <code>Error!</code>
            </pre>
        )
    }

    if (code.length === 0) {
        return (
            <pre>
                <code>No data</code>
            </pre>
        )
    }

    return <CodeLines />
}

export const CodeBlock = () => {
    return (
        <div className="py-6">
            <Window>
                <CodeContent />
            </Window>
        </div>
    )
}
