/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsTableThButtonTooltipArgs {
    Args: {
        labelId?: string;
        tooltip: string;
    };
    Element: HTMLButtonElement;
}
export default class HdsTableThButtonTooltipComponent extends Component<HdsTableThButtonTooltipArgs> {
    /**
     * Generates a unique ID for the (hidden) "label prefix" <span> element
     *
     * @param prefixLabelId
     */
    prefixLabelId: string;
    get tooltip(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=th-button-tooltip.d.ts.map