import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSheetsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path fill="#188038" d="M9.5 1L13 4.5H9.5V1z" />
                <path
                    fill="#34A853"
                    d="M9.5 4.5V1H3.937A.946.946 0 003 1.955v12.09c0 .528.42.955.938.955h8.124a.946.946 0 00.938-.954V4.5H9.5z"
                />
                <path
                    fill="#FDFFFF"
                    d="M5 6v5h6V6H5zm2.625 4.138H5.75V8.93h1.875v1.207zm0-2.069H5.75V6.862h1.875V8.07zm2.625 2.069H8.375V8.93h1.875v1.207zm0-2.069H8.375V6.862h1.875V8.07z"
                />
            </svg>
        );
    }
);
