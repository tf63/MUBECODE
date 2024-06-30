import { ThemeSelect } from './theme-select'

import type { Meta, StoryObj } from '@storybook/react'

type ThemeSelectType = typeof ThemeSelect

export default {
    title: 'ThemeSelect',
    component: ThemeSelect,
} satisfies Meta<ThemeSelectType>

export const Default: StoryObj<ThemeSelectType> = {
    render: () => <ThemeSelect />,
}
