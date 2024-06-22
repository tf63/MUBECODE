import { TopBar } from './top-bar'

import type { Meta, StoryObj } from '@storybook/react'

type TopBarType = typeof TopBar

export default {
    title: 'TopBar',
    component: TopBar,
} satisfies Meta<TopBarType>

export const Default: StoryObj<TopBarType> = {
    render: () => <TopBar />,
}
