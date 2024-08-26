/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
export interface BaseHdsTableTrArgs {
    Args: {
        isSelectable?: boolean;
        isSelected?: false;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope: HdsTableScope;
        didInsert: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        onSelectionChange: (checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        willDestroy: () => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableRowElement;
}
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
    Args: BaseHdsTableTrArgs['Args'] & {
        isSelectable: true;
        selectionScope: HdsTableScopeValues.Row;
        selectionKey: string;
    };
}
export type HdsTableTrArgs = BaseHdsTableTrArgs | SelectableHdsTableTrArgs;
export default class HdsTableTrComponent extends Component<HdsTableTrArgs> {
    /**
     * @param selectionKey
     * @type {string}
     * @default undefined
     */
    get selectionKey(): string | undefined;
}
//# sourceMappingURL=tr.d.ts.map