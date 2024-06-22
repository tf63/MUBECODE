import { useEffect, useMemo, useRef } from 'react'

import { useKey } from '@/components/hooks/use-key'

const stripCode = (code: Code) => {
    return code.map(({ id, line }) => ({ id, line: line.trim() }))
}

export const useTypeSystem = (code: Code) => {
    const lineNumberRef = useRef(0)
    const cursorIndexRef = useRef(0)

    const { key } = useKey()

    const targetCode = useMemo(() => stripCode(code), [code])

    useEffect(() => {
        const targetLine = targetCode[lineNumberRef.current].line
        const targetKey = targetLine[cursorIndexRef.current]

        if (cursorIndexRef.current === targetLine.length) {
            if (key === 'Enter') {
                // correct -> next line
                cursorIndexRef.current = 0
                lineNumberRef.current += 1

                if (lineNumberRef.current === targetCode.length) {
                    // finish
                    cursorIndexRef.current = 0
                    lineNumberRef.current = 0
                }
            }
            return
        }

        if (key === targetKey) {
            // correct -> next key
            cursorIndexRef.current += 1
        }
    }, [key, targetCode])

    if (code.length === 0) {
        return { cursorIndex: 0, lineNumber: 0 }
    }

    return { cursorIndex: cursorIndexRef.current, lineNumber: lineNumberRef.current }
}
