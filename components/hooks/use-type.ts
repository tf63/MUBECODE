import { useEffect, useMemo } from 'react'

import { useKey } from '@/components/hooks/use-key'
import { useTypeStore } from '@/components/store/type-store'

import { stripCode } from '@/lib/utils'

export const useType = (code: Code) => {
    const state = useTypeStore()

    const { key } = useKey()

    const targetCode = useMemo(() => stripCode(code), [code])

    useEffect(() => {
        const targetLine = targetCode[state.lineNumber].line
        const targetKey = targetLine[state.cursorIndex]

        if (state.cursorIndex === targetLine.length) {
            if (key === 'Enter') {
                // correct -> next line
                state.resetCursorIndex()
                state.incLineNumber()

                if (state.lineNumber === targetCode.length) {
                    // finish
                    state.resetLineNumber()
                    state.resetCursorIndex()
                }
            }
        }

        if (key === targetKey) {
            // correct -> next key
            state.incCursorIndex()
        }
    }, [key, state, targetCode])

    if (code.length === 0) {
        return { cursorIndex: 0, lineNumber: 0 }
    }

    return { cursorIndex: state.cursorIndex, lineNumber: state.lineNumber }
}
