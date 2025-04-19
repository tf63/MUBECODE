export const LanguageSelect = () => {
    return (
        <select className="select select-bordered w-80" defaultValue={'TypeScript'}>
            <option>TypeScript</option>
            <option disabled>Go</option>
            <option disabled>Python</option>
            <option disabled>Ruby</option>
        </select>
    )
}
