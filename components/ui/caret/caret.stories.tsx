import { Caret } from './caret'

import type { Meta, StoryObj } from '@storybook/react'

type CaretType = typeof Caret

export default {
    title: 'Caret',
    component: Caret,
} satisfies Meta<CaretType>

export const Default: StoryObj<CaretType> = {
    render: () => <Caret />,
}
