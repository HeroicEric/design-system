/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTableThSortOrder, HdsTableThSortOrderIcons, HdsTableThSortOrderLabels } from './types.ts';
export interface HdsTableThButtonSortArgs {
    Args: {
        labelId?: string;
        onClick?: () => void;
        sortOrder?: HdsTableThSortOrder;
    };
    Element: HTMLButtonElement;
}
export default class HdsTableThButtonSortComponent extends Component<HdsTableThButtonSortArgs> {
    /**
     * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
     *
     * @param prefixLabelId/suffixLabelId
     */
    prefixLabelId: string;
    suffixLabelId: string;
    /**
     * @param icon
     * @type {HdsTableThSortOrderIcons}
     * @private
     * @default swap-vertical
     * @description Determines which icon to use based on the sort order defined
     */
    get icon(): HdsTableThSortOrderIcons;
    /**
     * @param sortOrderLabel
     * @default 'ascending'
     * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
     */
    get sortOrderLabel(): HdsTableThSortOrderLabels;
    /**
     * @param onClick
     * @type {function}
     * @default () => {}
     */
    get onClick(): () => void;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=th-button-sort.d.ts.map