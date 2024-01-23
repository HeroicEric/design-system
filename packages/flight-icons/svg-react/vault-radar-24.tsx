import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultRadar24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={25}
                fill="none"
                viewBox="0 0 24 25"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M18.554 11.304l.696.696-.002.002c0 3.998-3.252 7.25-7.25 7.25-3.996 0-7.248-3.252-7.248-7.25 0-3.997 3.252-7.25 7.249-7.25 2.16 0 4.222.98 5.594 2.64l-4.61 4.61h-.984v-.984l1.446-1.446a2.823 2.823 0 00-1.446-.4c-1.56 0-2.83 1.27-2.83 2.83s1.27 2.83 2.83 2.83 2.83-1.27 2.83-2.83l.696-.696.696.696a4.227 4.227 0 01-4.222 4.223 4.227 4.227 0 01-4.222-4.223 4.227 4.227 0 014.222-4.222c.893 0 1.74.278 2.45.787l1.168-1.168a5.875 5.875 0 00-3.616-1.256A5.864 5.864 0 006.145 12a5.864 5.864 0 005.856 5.857A5.864 5.864 0 0017.857 12l.697-.696z" />
                    <path
                        fillRule="evenodd"
                        d="M2 0h19.998v.002a2 2 0 012 2V22a2 2 0 01-2 1.999H2A2 2 0 010 22V2.003C0 .898.895.002 2 0zm21.002 2.004c0-.552-.45-1-1.001-1L21.998 1H2c-.552 0-1 .449-1 1v20.002c0 .552.448 1.001 1 1.001h20.002c.552 0 1-.449 1-1v-20z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
