import { useEffect, useRef } from 'react'

import { useKey } from '@/components/hooks/use-key'

export const useTypeSystem = (code: Code | undefined) => {
    const lineNumberRef = useRef(0)
    const cursorIndexRef = useRef(0)

    const { key } = useKey()

    useEffect(() => {
        console.log(key)

        if (code == null) {
            return
        }

        const line = code.lines[lineNumberRef.current]
        const targetKey = line[cursorIndexRef.current]

        if (cursorIndexRef.current === line.length) {
            if (key === 'Enter') {
                // correct -> next line
                cursorIndexRef.current = 0
                lineNumberRef.current += 1

                if (lineNumberRef.current === code.lines.length) {
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
    }, [key, code])

    if (code == null) {
        return { cursorIndex: 0, lineNumber: 0 }
    }

    return { cursorIndex: cursorIndexRef.current, lineNumber: lineNumberRef.current }
}
