'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

import { useCodeStore } from '@/components/store/code-store'

type APIResponse = {
    codes: Code[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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

export const useCode = (language: string) => {
    const { codes, isLoading, isError } = useCodes(language)
    const { codeIndex, codeSize, setCodeSize, updateCodeIndex } = useCodeStore()

    useEffect(() => {
        setCodeSize(codes.length)
    }, [codes.length, setCodeSize])

    useEffect(() => {
        if (codeSize === 0) {
            return
        }

        updateCodeIndex()
    }, [codeSize, updateCodeIndex])

    return {
        code: codes[codeIndex],
        isLoading,
        isError,
    }
}
