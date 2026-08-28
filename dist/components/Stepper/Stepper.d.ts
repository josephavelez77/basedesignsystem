export interface StepItem {
    /** Display label — only rendered for the active step; hidden on complete and upcoming steps. */
    label: string;
}
export interface StepperProps {
    /** Ordered list of step definitions; each requires a `label`. Designed for up to 5 steps. */
    steps: StepItem[];
    /** 0-indexed index of the currently active step; earlier steps render as complete, later as upcoming. */
    activeStep: number;
    /** Called when the user clicks the Next button (all steps except the last). */
    onNext?: () => void;
    /** Called when the user clicks the Back button (all steps except the first). */
    onBack?: () => void;
    /** Called when the user clicks the Cancel button. */
    onCancel?: () => void;
    /** Called when the user clicks the confirmatory button shown on the last step. */
    onDone?: () => void;
    /** Label for the cancel button. Defaults to `"Cancel"`. */
    cancelLabel?: string;
    /** Label for the back button. Defaults to `"Back"`. */
    backLabel?: string;
    /** Label for the next button (all steps except last). Defaults to `"Next"`. */
    nextLabel?: string;
    /** Label for the confirmatory button on the last step. Defaults to `"Submit"`. */
    doneLabel?: string;
    /** Additional CSS class applied to the root element for layout overrides. */
    className?: string;
}
export declare const Stepper: {
    ({ steps, activeStep, onNext, onBack, onCancel, onDone, cancelLabel, backLabel, nextLabel, doneLabel, className, }: StepperProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=Stepper.d.ts.map