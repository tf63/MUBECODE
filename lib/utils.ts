import { MutableRefObject } from 'react'

import hljs from '@/lib/hljs'

export const getRandomInt = (max: number): number => {
    /*
    This function generates a random integer between 0 and max (not inclusive of max)
    */
    return Math.floor(Math.random() * max)
}

export const getRandomAnotherInt = (max: number, current: number): number => {
    /*
    This function generates a random integer between 0 and max, excluding the current number.
    */
    const another = getRandomInt(max - 1)

    if (another === current) {
        return max - 1
    }

    return another
}

export const stripCode = (code: Code) => {
    /*
    This function removes leading and trailing whitespace from each line of code.
    */
    return code.map(({ id, line }) => ({ id, line: line.trim() }))
}

export const extractLeadingWhitespace = (input: string): string => {
    /*
    This function extracts leading whitespace from a string.
    */
    const match = input.match(/^(\s*)/)
    return match ? match[0] : ''
}

export const escapeHTML = (str: string) => {
    /*
    This function escapes HTML entities in a string.
    */
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export const removeCodeHighlight = (element: HTMLElement) => {
    /*
    This function removes code highlighting from an element.
    */
    if (element.dataset.highlighted) {
        delete element.dataset.highlighted
        element.innerHTML = escapeHTML(element.textContent ?? '') // ハイライトを解除
    }
}

export const highlightCodeAgain = (elementRef: MutableRefObject<HTMLSpanElement | null>) => {
    /*
    This function re-highlights code in an element.
    */
    if (elementRef.current == null) return

    const element = elementRef.current
    removeCodeHighlight(element)
    hljs.highlightElement(element)

    element.dataset.highlighted = 'true'
}

export const scrollWithInScreen = (elementRef: MutableRefObject<HTMLSpanElement | null>) => {
    /*
    This function scrolls the element into view if it is not in the viewport.
    */
    if (elementRef.current == null) return

    const element = elementRef.current

    const elementRect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    if (elementRect.bottom > viewportHeight / 2) {
        element.scrollIntoView({ behavior: 'instant', block: 'center' })
    }

    if (elementRect.top < 0) {
        element.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
}
