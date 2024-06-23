import { useShallow } from 'zustand/react/shallow'

import { useCodeStore } from '@/components/store/code-store'
import { useTypeStore } from '@/components/store/type-store'

export const useNextCode = () => {
    const [updateCodeIndex] = useCodeStore(useShallow((state) => [state.updateCodeIndex]))
    const [resetCursorIndex, resetLineNumber] = useTypeStore(
        useShallow((state) => [state.resetCursorIndex, state.resetLineNumber])
    )

    const nextCode = () => {
        resetCursorIndex()
        resetLineNumber()
        updateCodeIndex()
    }

    return {
        nextCode,
    }
}
