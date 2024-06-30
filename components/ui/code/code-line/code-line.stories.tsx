import { CodeLine } from './code-line'

import type { Meta, StoryObj } from '@storybook/react'

type CodeLineType = typeof CodeLine

export default {
    title: 'CodeLine',
    component: CodeLine,
} satisfies Meta<CodeLineType>

export const Default: StoryObj<CodeLineType> = {
    render: () => <CodeLine line="" />,
}
