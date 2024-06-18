'use client'
import useSWR from 'swr'

type APIResponse = {
    codes: Code[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCode = () => {
    const { data, error, isLoading } = useSWR<APIResponse, Error>('/api/codes', fetcher)
    console.log(data, error, isLoading)
    return {
        codes: data?.codes,
        isLoading,
        isError: error,
    }
}
