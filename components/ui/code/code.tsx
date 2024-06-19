'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'
import { useTypeSystem } from '@/components/hooks/use-type-system'
import { Window } from '@/components/ui/window'

import hljs from '@/lib/hljs'

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
            {code.lines.map((line, index) => {
                return (
                    // 今回はkeyをindexにする
                    <pre key={index} className="flex">
                        <div className="mr-10 min-w-5 text-right opacity-40">{index + 1}</div>
                        <CodeLine line={line} />
                    </pre>
                )
            })}
        </div>
    )
}

export const CodeBlock = () => {
    return (
        <div className="py-5">
            <Window>
                <CodeText />
            </Window>
        </div>
    )
}
