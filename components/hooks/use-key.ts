import { useState, useEffect, useCallback } from 'react'

const disableKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Super']

export const useKey = () => {
    const [key, setKey] = useState('')

    const downHandler = useCallback((event: KeyboardEvent) => {
        event.preventDefault()
        if (disableKeys.includes(event.key)) return
        setKey(() => event.key)
    }, [])

    const upHandler = useCallback((event: KeyboardEvent) => {
        event.preventDefault()
        setKey(() => '')
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        window.addEventListener('keydown', downHandler, { signal })
        window.addEventListener('keyup', upHandler, { signal })

        return () => controller.abort()
    }, [downHandler, upHandler])

    return { key }
}
