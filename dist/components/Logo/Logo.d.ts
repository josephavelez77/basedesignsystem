export type LogoVariant = 'horizontal' | 'vertical' | 'icon';
export interface LogoProps {
    /** Which form to render: icon mark only, horizontal (mark + wordmark side by side), or vertical (stacked). */
    variant?: LogoVariant;
    /** Additional CSS class for size or position overrides. */
    className?: string;
}
export declare const Logo: {
    ({ variant, className }: LogoProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=Logo.d.ts.map