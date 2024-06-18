'use client'
import { useCode } from '@/components/hooks/use-code'

const CodeText = () => {
    const { codes, isLoading, isError } = useCode()

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

    if (codes == null || codes.length === 0) {
        return (
            <pre data-prefix="1">
                <code>No data</code>
            </pre>
        )
    }

    return <div>{codes[0].text}</div>
}

export const Code = () => {
    return (
        <div className="mockup-code my-5">
            <CodeText />
        </div>
    )
}
