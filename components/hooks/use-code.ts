'use client'
import useSWR from 'swr'

type APIResponse = {
    code: Code
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCode = () => {
    const { data, error, isLoading } = useSWR<APIResponse, Error>('/api/codes', fetcher)

    return {
        code: data?.code,
        isLoading,
        isError: error,
    }
}
