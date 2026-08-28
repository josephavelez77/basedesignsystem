import React from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'
import styles from './Stepper.module.css'

export interface StepItem {
  /** Display label — only rendered for the active step; hidden on complete and upcoming steps. */
  label: string
}

export interface StepperProps {
  /** Ordered list of step definitions; each requires a `label`. Designed for up to 5 steps. */
  steps: StepItem[]
  /** 0-indexed index of the currently active step; earlier steps render as complete, later as upcoming. */
  activeStep: number
  /** Called when the user clicks the Next button (all steps except the last). */
  onNext?: () => void
  /** Called when the user clicks the Back button (all steps except the first). */
  onBack?: () => void
  /** Called when the user clicks the Cancel button. */
  onCancel?: () => void
  /** Called when the user clicks the confirmatory button shown on the last step. */
  onDone?: () => void
  /** Label for the cancel button. Defaults to `"Cancel"`. */
  cancelLabel?: string
  /** Label for the back button. Defaults to `"Back"`. */
  backLabel?: string
  /** Label for the next button (all steps except last). Defaults to `"Next"`. */
  nextLabel?: string
  /** Label for the confirmatory button on the last step. Defaults to `"Submit"`. */
  doneLabel?: string
  /** Additional CSS class applied to the root element for layout overrides. */
  className?: string
}

type StepState = 'active' | 'upcoming' | 'complete'

function StepBadge({ state, number }: { state: StepState; number: number }) {
  return (
    <div className={[styles.badge, styles[`badge_${state}`]].join(' ')}>
      {state === 'complete' ? (
        <Icon icon={faCheck} size="small" aria-label="Completed" />
      ) : (
        <span className={styles.badgeNumber}>{number}</span>
      )}
    </div>
  )
}

export const Stepper = ({
  steps,
  activeStep,
  onNext,
  onBack,
  onCancel,
  onDone,
  cancelLabel = 'Cancel',
  backLabel = 'Back',
  nextLabel = 'Next',
  doneLabel = 'Submit',
  className,
}: StepperProps) => {
  const isFirst = activeStep === 0
  const isLast = activeStep === steps.length - 1

  return (
    <div className={[styles.stepper, className ?? ''].filter(Boolean).join(' ')}>
      {/* Step badges — single row, current step also shows its label */}
      <div className={styles.steps}>
        {steps.map((step, i) => {
          const state: StepState =
            i < activeStep ? 'complete' : i === activeStep ? 'active' : 'upcoming'
          return (
            <React.Fragment key={i}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.step}>
                <StepBadge state={state} number={i + 1} />
                {state === 'active' && (
                  <span className={styles.stepLabel}>{step.label}</span>
                )}
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Trailing actions — Cancel / Back / Next|Submit */}
      <div className={styles.controls}>
        <Button variant="neutral" emphasis="tertiary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        {!isFirst && (
          <Button variant="neutral" emphasis="secondary" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        <Button variant="brandPrimary" emphasis="primary" onClick={isLast ? onDone : onNext}>
          {isLast ? doneLabel : nextLabel}
        </Button>
      </div>
    </div>
  )
}

Stepper.displayName = 'Stepper'
