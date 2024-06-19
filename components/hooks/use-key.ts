import { useState, useEffect, useCallback } from 'react'

const disableKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Super']

export const useKey = () => {
    const [key, setKey] = useState('')

    const downHandler = useCallback((event: KeyboardEvent) => {
        event.preventDefault()
        if (disableKeys.includes(event.key)) return
        setKey(event.key)
    }, [])

    const upHandler = useCallback((event: KeyboardEvent) => {
        event.preventDefault()
        setKey('')
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [downHandler, upHandler])

    return { key }
}
