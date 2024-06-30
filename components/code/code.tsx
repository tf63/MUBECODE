'use client'

import { useCode } from '@/components/hooks/use-code'
import { useLineNumber } from '@/components/hooks/use-type'
import { Window } from '@/components/ui/window'

import { CodeLine, CodeTargetLine } from './code-line'

const CodeLines = () => {
    const { code } = useCode()
    const { lineNumber } = useLineNumber(code.length)

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
