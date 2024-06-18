import { Code } from './code'

import type { Meta, StoryObj } from '@storybook/react'

type CodeType = typeof Code

export default {
    title: 'Code',
    component: Code,
} satisfies Meta<CodeType>

export const Default: StoryObj<CodeType> = {
    render: () => <Code />,
}
