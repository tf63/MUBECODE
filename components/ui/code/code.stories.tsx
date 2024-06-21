import { CodeBlock } from './code'

import type { Meta, StoryObj } from '@storybook/react'

type CodeType = typeof CodeBlock

export default {
    title: 'Code',
    component: CodeBlock,
} satisfies Meta<CodeType>

export const Default: StoryObj<CodeType> = {
    render: () => <CodeBlock />,
}
