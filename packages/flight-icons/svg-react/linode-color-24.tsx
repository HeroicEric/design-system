import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLinodeColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill="#231F20"
                    d="M20 10.853l-2.657-1.531-2.242 1.426-.028 1.459-1.092-.749-1.482.942-.065-1.594-1.527-1.065 1.458-.787c-.01 0 0 .154-.215-5.222L8.699 2 4 3.522l1.049 5.266 1.577 1.278-1.2.588.785 3.97 1.1 1.077-.787.5.612 3.069L9.608 22c.012-.015.26-.215 3.175-2.635l-.085-2.085 1.252 1.108c.018-.019.269-.212 2.563-2.113l.088-1.542.945.684c.017-.018.232-.19 2.084-1.723l.37-2.84z"
                />
                <path
                    fill="#000"
                    d="M17.795 12.495L20 10.853l-2.657-1.531-2.242 1.426 2.694 1.747z"
                />
                <path
                    fill="#004B16"
                    d="M17.551 15.415l.244-2.92-2.695-1.747-.055 2.852 2.506 1.815zM13.954 18.385V15.36l-2.722-2.152.214 2.971 2.508 2.206z"
                />
                <path
                    fill="#000"
                    d="M13.954 15.36l2.735-2.044-2.707-1.858-2.75 1.75 2.723 2.152z"
                />
                <path
                    fill="#004B16"
                    d="M9.608 21.997l-.435-3.091L6.524 16.2l.612 3.068 2.472 2.729z"
                />
                <path
                    fill="#000"
                    d="M9.173 18.906l3.489-2.595-2.704-2.294L6.524 16.2l2.65 2.706z"
                />
                <path
                    fill="#004B16"
                    d="M8.947 17.3l-.575-4.088-2.951-2.556.79 3.965L8.947 17.3z"
                />
                <path
                    fill="#000"
                    d="M8.372 13.212l4.064-2.406L9.4 8.686l-3.98 1.97 2.95 2.556z"
                />
                <path
                    fill="#004B16"
                    d="M8.096 11.26l-.788-5.6L4 3.523l1.049 5.266 3.047 2.471z"
                />
                <path
                    fill="#000"
                    d="M7.308 5.66l4.836-1.93L8.699 2 4 3.522l3.308 2.139z"
                />
                <path
                    fill="#1CB35C"
                    d="M19.633 13.69c-2.046 1.694-2.091 1.725-2.084 1.725.254-3.058.233-2.92.245-2.92 2.334-1.742 2.188-1.642 2.204-1.642l-.365 2.838zM16.518 16.27c-2.533 2.1-2.573 2.114-2.563 2.114-.025-3.167-.01-3.025 0-3.025 2.918-2.172 2.724-2.044 2.734-2.044l-.171 2.956zM12.788 19.362c-3.161 2.62-3.19 2.635-3.175 2.635-.449-3.185-.438-3.091-.438-3.091 3.717-2.762 3.482-2.595 3.492-2.595l.12 3.051zM12.144 3.729c.222 5.377.204 5.223.216 5.223-4.182 2.264-4.274 2.307-4.266 2.307-.806-5.723-.794-5.598-.788-5.598l4.838-1.932zM12.434 10.806c.167 4.077.146 3.936.161 3.936-3.617 2.535-3.659 2.563-3.645 2.563-.584-4.2-.584-4.093-.575-4.093l4.059-2.406z"
                />
            </svg>
        );
    }
);
