import { default as React } from 'react';
export type LogoVariant = 'horizontal' | 'icon';
export interface LogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
    /** Which form to render: `icon` mark only, or `horizontal` (mark + wordmark + tagline side by side). */
    variant?: LogoVariant;
    /** Additional CSS class for size or position overrides. */
    className?: string;
}
export declare const Logo: {
    ({ variant, className, ...rest }: LogoProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=Logo.d.ts.map