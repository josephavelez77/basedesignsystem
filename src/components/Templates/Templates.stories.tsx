import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  faHouse,
  faFolder,
  faChartBar,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { GlobalToolbar } from '../GlobalToolbar/GlobalToolbar'
import { NavDrawer } from '../NavDrawer/NavDrawer'
import { PageHeader } from '../PageHeader/PageHeader'
import { TabGroup } from '../TabGroup/TabGroup'
import { Stepper } from '../Stepper/Stepper'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: faHouse, selected: true },
  { label: 'Projects', icon: faFolder },
  { label: 'Analytics', icon: faChartBar },
  { label: 'Team', icon: faUsers },
  { label: 'Settings', icon: faGear },
]

const STEPPER_STEPS = [
  { label: 'Details' },
  { label: 'Configuration' },
  { label: 'Review' },
  { label: 'Confirm' },
]

const shell: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
}

const body: React.CSSProperties = {
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
}

const main: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: 'var(--container-color-themeable-primary)',
}

const content: React.CSSProperties = {
  flex: 1,
  padding: 'var(--container-padding-static-primary)',
  overflow: 'auto',
}

const meta: Meta = {
  title: 'Templates',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicPage: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={shell}>
        <GlobalToolbar onMenuToggle={() => setCollapsed((c) => !c)} />
        <div style={body}>
          <NavDrawer
            appName="Charter"
            items={NAV_ITEMS}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
          <div style={main}>
            <PageHeader
              title="Page title"
              primaryAction={{ label: 'Primary' }}
              secondaryAction={{ label: 'Secondary' }}
            />
            <div style={content} />
          </div>
        </div>
      </div>
    )
  },
}

export const BreadcrumbPage: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={shell}>
        <GlobalToolbar onMenuToggle={() => setCollapsed((c) => !c)} />
        <div style={body}>
          <NavDrawer
            appName="Charter"
            items={NAV_ITEMS}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
          <div style={main}>
            <PageHeader
              title="Page title"
              breadcrumbs={[
                { label: 'Section', onClick: () => {} },
                { label: 'Subsection', onClick: () => {} },
                { label: 'Page title' },
              ]}
              primaryAction={{ label: 'Primary' }}
              secondaryAction={{ label: 'Secondary' }}
            />
            <div style={content} />
          </div>
        </div>
      </div>
    )
  },
}

export const TabPage: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    return (
      <div style={shell}>
        <GlobalToolbar onMenuToggle={() => setCollapsed((c) => !c)} />
        <div style={body}>
          <NavDrawer
            appName="Charter"
            items={NAV_ITEMS}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
          <div style={main}>
            <PageHeader title="Page title" />
            <TabGroup
              tabs={[
                { label: 'Overview' },
                { label: 'Activity' },
                { label: 'Settings' },
                { label: 'Members' },
                { label: 'Billing' },
              ]}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
            <div style={content} />
          </div>
        </div>
      </div>
    )
  },
}

export const StepperPage: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    return (
      <div style={shell}>
        <GlobalToolbar onMenuToggle={() => setCollapsed((c) => !c)} />
        <div style={body}>
          <NavDrawer
            appName="Charter"
            items={NAV_ITEMS}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
          <div style={main}>
            <Stepper
              steps={STEPPER_STEPS}
              activeStep={activeStep}
              onNext={() => setActiveStep((s) => Math.min(s + 1, STEPPER_STEPS.length - 1))}
              onBack={() => setActiveStep((s) => Math.max(s - 1, 0))}
              onCancel={() => setActiveStep(0)}
              onDone={() => setActiveStep(0)}
            />
            <div style={content} />
          </div>
        </div>
      </div>
    )
  },
}
