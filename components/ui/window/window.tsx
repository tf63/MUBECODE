type WindowProps = { children: React.ReactNode }

const WindowButton = () => {
    return (
        <div className=" flex gap-2 py-6">
            <div className="btn-circle h-3 w-3 bg-rose-400" />
            <div className="btn-circle h-3 w-3 bg-amber-400" />
            <div className="btn-circle h-3 w-3 bg-emerald-400" />
        </div>
    )
}

export const Window = ({ children }: WindowProps) => {
    return (
        <div className="card bg-neutral shadow-sm">
            <div className="card-body gap-0.5 pt-0">
                <WindowButton />
                {children}
            </div>
        </div>
    )
}
