'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { create } from 'zustand'

import { getRandomInt } from '@/lib/utils'

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

interface CodeStore {
    codeIndex: number
    codeSize: number
    setCodeSize: (codeSize: number) => void
    nextCode: () => void
}

export const useCodeStore = create<CodeStore>((set) => ({
    codeIndex: 0,
    codeSize: 0,
    setCodeSize: (codeSize: number) => set(() => ({ codeSize })),
    nextCode: () => set((state) => ({ codeIndex: getRandomInt(state.codeSize) })),
}))

export const useCode = (language: string) => {
    const { codes, isLoading, isError } = useCodes(language)
    const { codeIndex, setCodeSize, nextCode } = useCodeStore()

    useEffect(() => {
        setCodeSize(codes.length)
    }, [setCodeSize, codes.length])

    return {
        code: codes[codeIndex],
        isLoading,
        isError,
        nextCode,
    }
}
