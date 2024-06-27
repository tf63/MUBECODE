import { NextCodeButton } from './next-code-button'

import type { Meta, StoryObj } from '@storybook/react'

type NextCodeButtonType = typeof NextCodeButton

export default {
    title: 'NextCodeButton',
    component: NextCodeButton,
} satisfies Meta<NextCodeButtonType>

export const Default: StoryObj<NextCodeButtonType> = {
    render: () => <NextCodeButton />,
}
