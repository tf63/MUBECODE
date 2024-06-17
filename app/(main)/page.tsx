const Page = () => {
    return (
        <div>
            <button className="btn">Button</button>
            <div className="mockup-code my-5">
                <pre data-prefix="1">
                    <code>npm i daisyui</code>
                </pre>
                <pre data-prefix="2">
                    <code>installing...</code>
                </pre>
                <pre data-prefix="3" className="bg-warning text-warning-content">
                    <code>Error!</code>
                </pre>
            </div>
        </div>
    )
}

export default Page
