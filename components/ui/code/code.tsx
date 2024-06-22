'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'
import { useTypeSystem } from '@/components/hooks/use-type-system'
import { Window } from '@/components/ui/window'

import hljs from '@/lib/hljs'

import { Caret } from '../caret'

const extractLeadingWhitespace = (input: string): string => {
    const match = input.match(/^(\s*)/)
    return match ? match[0] : ''
}

const TargetLine = ({ line, cursorIndex }: { line: string; cursorIndex: number }) => {
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

        hljs.highlightElement(lineRef.current)
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

const LineNumber = ({ lineNumber }: { lineNumber: number }) => {
    return <div className="mr-10 min-w-5 text-right text-opacity-40">{lineNumber}</div>
}

const CodeText = () => {
    const { code, isLoading, isError } = useCode()

    const { cursorIndex, lineNumber } = useTypeSystem(code)

    useEffect(() => {
        console.log(cursorIndex, lineNumber)
    }, [cursorIndex, lineNumber])

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

    if (code == null) {
        return (
            <pre>
                <code>No data</code>
            </pre>
        )
    }

    return (
        <div>
            {code.map(({ id, line }, index) => {
                if (index === lineNumber) {
                    return (
                        <pre
                            key={id}
                            className="flex w-full items-center rounded-lg bg-base-100 p-0.5 text-cyan-300 text-opacity-40"
                        >
                            <LineNumber lineNumber={index + 1} />
                            <TargetLine line={line} cursorIndex={cursorIndex} />
                        </pre>
                    )
                } else {
                    return (
                        <pre key={id} className="flex items-center">
                            <LineNumber lineNumber={index + 1} />
                            <CodeLine line={line} />
                        </pre>
                    )
                }
            })}
        </div>
    )
}

export const CodeBlock = () => {
    return (
        <div className="py-6">
            <Window>
                <CodeText />
            </Window>
        </div>
    )
}
