import { LanguageDropdown } from './language-dropdown'

import type { Meta, StoryObj } from '@storybook/react'

type LanguageDropdownType = typeof LanguageDropdown

export default {
    title: 'LanguageDropdown',
    component: LanguageDropdown,
} satisfies Meta<LanguageDropdownType>

export const Default: StoryObj<LanguageDropdownType> = {
    render: () => <LanguageDropdown />,
}
