'use client'
import { useCode } from '@/components/hooks/use-code'

const CodeText = () => {
    const { code, isLoading, isError } = useCode()

    if (isLoading === true) {
        return (
            <pre data-prefix="1">
                <code>Loading...</code>
            </pre>
        )
    }

    if (isError != null) {
        return (
            <pre data-prefix="1" className="bg-warning text-warning-content">
                <code>Error!</code>
            </pre>
        )
    }

    if (code == null) {
        return (
            <pre data-prefix="1">
                <code>No data</code>
            </pre>
        )
    }

    return (
        <>
            {code.lines.map((line, index) => {
                return (
                    <pre key={line} data-prefix={index + 1}>
                        <code>{line}</code>
                    </pre>
                )
            })}
        </>
    )
}

export const Code = () => {
    return (
        <div className="mockup-code my-5">
            <CodeText />
        </div>
    )
}
