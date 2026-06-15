import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  faEllipsisVertical,
  faXmark,
  faGear,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    icon: faEllipsisVertical,
    variant: 'neutral',
    'aria-label': 'More options',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['brandPrimary', 'neutral', 'statusError'],
    },
    iconSize: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BrandPrimary: Story = {
  args: { variant: 'brandPrimary', icon: faGear, 'aria-label': 'Settings' },
}

export const Neutral: Story = {
  args: { variant: 'neutral', icon: faXmark, 'aria-label': 'Close' },
}

export const StatusError: Story = {
  args: { variant: 'statusError', icon: faTrash, 'aria-label': 'Delete' },
}

export const Disabled: Story = {
  args: { variant: 'neutral', icon: faGear, 'aria-label': 'Settings', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon={faMagnifyingGlass} variant="brandPrimary" aria-label="Search" />
      <IconButton icon={faMagnifyingGlass} variant="neutral" aria-label="Search" />
      <IconButton icon={faTrash} variant="statusError" aria-label="Delete" />
      <IconButton icon={faPlus} variant="neutral" aria-label="Add" disabled />
    </div>
  ),
}
