import { useCodeStore } from '@/components/store/code-store'
import { useTypeStore } from '@/components/store/type-store'

export const useNextCode = () => {
    const { updateCodeIndex } = useCodeStore()
    const { resetCursorIndex, resetLineNumber } = useTypeStore()

    const nextCode = () => {
        resetCursorIndex()
        resetLineNumber()
        updateCodeIndex()
    }

    return {
        nextCode,
    }
}
