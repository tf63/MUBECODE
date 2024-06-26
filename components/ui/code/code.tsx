'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'
import { useType } from '@/components/hooks/use-type'
import { Caret } from '@/components/ui/caret'
import { Window } from '@/components/ui/window'

import { extractLeadingWhitespace, highlightCodeAgain } from '@/lib/utils'

const CodeTargetLine = ({ line, cursorIndex }: { line: string; cursorIndex: number }) => {
    const prefix = extractLeadingWhitespace(line)
    return (
        <code>
            {line.slice(0, cursorIndex + prefix.length)}
            <Caret />
            {line.slice(cursorIndex + prefix.length)}
        </code>
    )
}

const CodeLine = ({ line }: { line: string }) => {
    const lineRef = useRef(null)

    useEffect(() => {
        if (lineRef.current == null) {
            return
        }

        highlightCodeAgain(lineRef.current)
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
    const { cursorIndex, lineNumber } = useType(code)

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
                            <CodeTargetLine line={line} cursorIndex={cursorIndex} />
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
                {}
                <CodeContent />
            </Window>
        </div>
    )
}
