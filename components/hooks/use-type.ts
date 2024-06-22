import { useMemo } from 'react'

import { useKey } from '@/components/hooks/use-key'
import { useTypeStore } from '@/components/store/type-store'

import { stripCode } from '@/lib/utils'

export const useType = (code: Code) => {
    const { cursorIndex, lineNumber, resetLineNumber, resetCursorIndex, incLineNumber, incCursorIndex } =
        useTypeStore()

    const { key } = useKey()

    const targetCode = useMemo(() => stripCode(code), [code])
    const targetLine = targetCode[lineNumber].line
    const targetKey = targetLine[cursorIndex]

    if (cursorIndex === targetLine.length) {
        if (key === 'Enter') {
            // correct -> next line
            resetCursorIndex()
            incLineNumber()

            if (lineNumber === targetCode.length) {
                // finish
                resetLineNumber()
                resetCursorIndex()
            }
        }
    }

    if (key === targetKey) {
        // correct -> next key
        incCursorIndex()
    }

    if (code.length === 0) {
        return { cursorIndex: 0, lineNumber: 0 }
    }

    return { cursorIndex, lineNumber }
}
