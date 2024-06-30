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
        // 空のlineに対応するために レンダリングごとにカーソルの終端判定
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
    const [lineNumber, isLineFinished, resetGame, nextLine] = useTypeStore(
        useShallow((state) => [state.lineNumber, state.isLineFinished, state.resetGame, state.nextLine])
    )

    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault()

            if (isLineFinished && event.key === 'Enter') {
                if (lineNumber === maxLineNumber - 1) {
                    // finish
                    resetGame()
                    return
                } else {
                    // correct -> next line
                    nextLine()
                    return
                }
            }
        },
        [lineNumber, maxLineNumber, isLineFinished, resetGame, nextLine]
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
