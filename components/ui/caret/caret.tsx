import { forwardRef } from 'react'

interface CaretProps {}

const CaretContent = (_props: CaretProps, ref: React.Ref<HTMLSpanElement>) => {
    return <span ref={ref} className="mr-0.5 inline-block h-4 w-0 animate-blink border-r-2 border-r-primary"></span>
}

export const Caret = forwardRef<HTMLSpanElement, CaretProps>(CaretContent)
