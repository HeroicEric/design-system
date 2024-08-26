/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsDropdownListItemInteractiveColorValues } from './types.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';
export declare const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export declare const COLORS: string[];
export interface HdsDropdownListItemInteractiveSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color: HdsDropdownListItemInteractiveColors;
        icon?: HdsIconSignature['Args']['name'];
        isLoading?: boolean;
        text: string;
        trailingIcon?: HdsIconSignature['Args']['name'];
    };
    Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}
export default class HdsDropdownListItemInteractiveComponent extends Component<HdsDropdownListItemInteractiveSignature> {
    /**
     * @param text
     * @type {string}
     * @description The text of the item. If no text value is defined an error will be thrown
     */
    get text(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of the item (when item is set to interactive)
     */
    get color(): HdsDropdownListItemInteractiveColors;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=interactive.d.ts.map