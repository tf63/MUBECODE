export const getRandomInt = (max: number): number => {
    /*
    This function generates a random integer between 0 and max.
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
