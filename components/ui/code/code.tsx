'use client'

import { useEffect, useRef } from 'react'

import { useCode } from '@/components/hooks/use-code'
import { useType } from '@/components/hooks/use-type'
import { Caret } from '@/components/ui/caret'
import { Window } from '@/components/ui/window'

import hljs from '@/lib/hljs'
import { extractLeadingWhitespace } from '@/lib/utils'

// import hljs from '@/lib/hljs'

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

const escapeHTML = (str: string) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

const removeHighlight = (element: HTMLElement) => {
    if (element.dataset.highlighted) {
        delete element.dataset.highlighted
        element.innerHTML = escapeHTML(element.textContent ?? '') // ハイライトを解除
    }
}

const highlightAgain = (element: HTMLElement) => {
    removeHighlight(element) // 以前のハイライトを解除
    hljs.highlightElement(element) // 再ハイライト

    element.dataset.highlighted = 'true' // ハイライトが設定されたことを記録
}

const CodeLine = ({ line }: { line: string }) => {
    const lineRef = useRef(null)

    useEffect(() => {
        if (lineRef.current == null) {
            return
        }

        highlightAgain(lineRef.current)
    }, [line])

    return (
        // tailwindcssのプロパティが効かないのでstyleで指定
        <>
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
        </>
    )
}

const LineNumber = ({ lineNumber }: { lineNumber: number }) => {
    return <div className="mr-10 min-w-5 text-right text-opacity-40">{lineNumber}</div>
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
                            className="flex w-full items-center rounded-lg bg-base-100 p-0.5 text-cyan-300 text-opacity-40"
                        >
                            <LineNumber lineNumber={index + 1} />
                            <CodeTargetLine line={line} cursorIndex={cursorIndex} />
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
