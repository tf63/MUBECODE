import { useCallback, useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useTypeStore } from '@/components/store/type-store'

const disableKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Super']

export const useCursorIndex = (line: string) => {
    const [cursorIndex, isLineFinished, setLineFinished, incCursorIndex] = useTypeStore(
        useShallow((state) => [state.cursorIndex, state.isLineFinished, state.setLineFinished, state.incCursorIndex])
    )

    const targetLine = useMemo(() => line.trim(), [line])

    useEffect(() => {
        if (cursorIndex === targetLine.length) {
            setLineFinished(true)
        }
    }, [cursorIndex, targetLine.length, setLineFinished])

    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault()

            const key = event.key
            const targetKey = targetLine[cursorIndex]
            if (disableKeys.includes(key)) return
            if (isLineFinished) return

            if (key === targetKey) {
                // correct -> next key
                incCursorIndex()
            }
        },
        [cursorIndex, targetLine, isLineFinished, incCursorIndex]
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

    return { cursorIndex }
}

export const useLineNumber = (maxLineNumber: number) => {
    const [lineNumber, isLineFinished, resetLineNumber, resetCursorIndex, incLineNumber] = useTypeStore(
        useShallow((state) => [
            state.lineNumber,
            state.isLineFinished,
            state.resetLineNumber,
            state.resetCursorIndex,
            state.incLineNumber,
        ])
    )

    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault()

            if (isLineFinished && event.key === 'Enter') {
                if (lineNumber === maxLineNumber - 1) {
                    // finish
                    resetLineNumber()
                    resetCursorIndex()
                    return
                } else {
                    // correct -> next line
                    resetCursorIndex()
                    incLineNumber()
                    return
                }
            }
        },
        [maxLineNumber, isLineFinished, lineNumber, resetCursorIndex, resetLineNumber, incLineNumber]
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

    return { lineNumber }
}
