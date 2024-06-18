'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'

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
        <code ref={lineRef} style={{ padding: 0, margin: 0, backgroundColor: 'transparent' }} className="typescript">
            {line}
        </code>
    )
}

const CodeText = () => {
    const { code, isLoading, isError } = useCode()

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
        <>
            {code.lines.map((line, index) => {
                return (
                    // 今回はkeyをindexにする
                    <pre key={index}>
                        <CodeLine line={line} />
                    </pre>
                )
            })}
        </>
    )
}

export const CodeBlock = () => {
    return (
        <div className="card my-5 bg-neutral shadow-sm">
            <div className="card-body gap-0.5">
                <CodeText />
            </div>
        </div>
    )
}
