'use client'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

import { getRandomInt } from '@/lib/utils'

type APIResponse = {
    codes: Code[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCode = (language: string) => {
    const { codes, isLoading, isError } = useCodes(language)

    const initialCodeIndex = useMemo(() => getRandomInt(codes.length !== 0 ? codes.length - 1 : 0), [codes.length])
    const [codeIndex, setCodeIndex] = useState(initialCodeIndex)

    return {
        code: codes[codeIndex],
        isLoading,
        isError,
        nextCode: () => setCodeIndex(() => getRandomInt(codes.length - 1)),
    }
}

export const useCodes = (language: string) => {
    const { data, error, isLoading } = useSWR<APIResponse, Error>(`/api/codes/${language}`, fetcher)

    if (data == null) {
        return { codes: [], isLoading, isError: error }
    }

    return {
        codes: data.codes,
        isLoading,
        isError: error,
    }
}
