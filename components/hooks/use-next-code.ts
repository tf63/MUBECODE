import { useShallow } from 'zustand/react/shallow'

import { useCodeStore } from '@/components/store/code-store'
import { useTypeStore } from '@/components/store/type-store'

export const useNextCode = () => {
    const [updateCodeIndex, resetCodeIndex] = useCodeStore(
        useShallow((state) => [state.updateCodeIndex, state.resetCodeIndex])
    )
    const [resetGame] = useTypeStore(useShallow((state) => [state.resetGame]))

    const nextCode = (random: boolean) => {
        resetGame()

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
