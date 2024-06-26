import { useCallback, useEffect, useMemo } from 'react'

import { useTypeStore } from '@/components/store/type-store'

import { stripCode } from '@/lib/utils'

const disableKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Super']

export const useType = (code: Code) => {
    const state = useTypeStore()

    const targetCode = useMemo(() => stripCode(code), [code])

    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault()

            const key = event.key
            const targetLine = targetCode[state.lineNumber].line
            const targetKey = targetLine[state.cursorIndex]
            if (disableKeys.includes(key)) return

            if (state.cursorIndex === targetLine.length) {
                if (key === 'Enter') {
                    if (state.lineNumber === targetCode.length - 1) {
                        // finish
                        state.resetLineNumber()
                        state.resetCursorIndex()
                        return
                    } else {
                        // correct -> next line
                        state.resetCursorIndex()
                        state.incLineNumber()
                        return
                    }
                }
            }

            if (key === targetKey) {
                // correct -> next key
                state.incCursorIndex()
                return
            }
        },
        [state, targetCode]
    )

    const upHandler = useCallback((event: KeyboardEvent) => {
        event.preventDefault()
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        window.addEventListener('keydown', downHandler, { signal })
        window.addEventListener('keyup', upHandler, { signal })

        return () => controller.abort()
    }, [downHandler, upHandler])

    if (code.length === 0) {
        return { cursorIndex: 0, lineNumber: 0 }
    }

    return { cursorIndex: state.cursorIndex, lineNumber: state.lineNumber }
}
