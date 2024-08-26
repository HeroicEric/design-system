/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableScope } from './types';
import type { HdsTableThArgs } from './th';
export interface HdsTableThSelectableArgs {
    Args: {
        didInsert: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        isSelected?: boolean;
        onSelectionChange: (target: HdsFormCheckboxBaseSignature['Element'], selectionKey: string | undefined) => void;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope: HdsTableScope;
        willDestroy: (selectionKey?: string) => void;
    };
    Element: HdsTableThArgs['Element'];
}
export default class HdsTableThSelectableComponent extends Component<HdsTableThSelectableArgs> {
    isSelected: boolean | undefined;
    /**
     * Generate a unique ID for the Checkbox
     * @return {string}
     */
    checkboxId: string;
    get ariaLabel(): string;
    didInsert(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    onSelectionChange(event: Event): void;
    updateAriaLabel(event: Event): void;
}
//# sourceMappingURL=th-selectable.d.ts.map