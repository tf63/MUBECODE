import { Window } from './window'

import type { Meta, StoryObj } from '@storybook/react'

type WindowType = typeof Window

export default {
    title: 'Window',
    component: Window,
} satisfies Meta<WindowType>

export const Default: StoryObj<WindowType> = {
    render: () => <Window />,
}
