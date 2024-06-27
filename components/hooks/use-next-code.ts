import { useShallow } from 'zustand/react/shallow'

import { useCodeStore } from '@/components/store/code-store'
import { useTypeStore } from '@/components/store/type-store'

export const useNextCode = () => {
    const [updateCodeIndex, resetCodeIndex] = useCodeStore(
        useShallow((state) => [state.updateCodeIndex, state.resetCodeIndex])
    )
    const [resetCursorIndex, resetLineNumber] = useTypeStore(
        useShallow((state) => [state.resetCursorIndex, state.resetLineNumber])
    )

    const nextCode = (random: boolean) => {
        resetCursorIndex()
        resetLineNumber()
        if (random === true) {
            updateCodeIndex()
        } else {
            resetCodeIndex()
        }
    }

    return {
        nextCode,
    }
}
