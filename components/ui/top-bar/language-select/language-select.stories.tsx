import { LanguageSelect } from './language-select'

import type { Meta, StoryObj } from '@storybook/react'

type LanguageSelectType = typeof LanguageSelect

export default {
    title: 'LanguageSelect',
    component: LanguageSelect,
} satisfies Meta<LanguageSelectType>

export const Default: StoryObj<LanguageSelectType> = {
    render: () => <LanguageSelect />,
}
