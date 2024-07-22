/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTableScope as HdsTableScopeAsVal } from './types.ts';
import type { HdsTableScope } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

// Base interface for non-selectable rows
interface BaseHdsTableTrArgs {
  Args: {
    isSelectable?: boolean;
    isSelected?: false;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsTableScope;
    didInsertAll?: (checkbox: HdsFormCheckboxBaseSignature['Element']) => void;
    didInsertRow?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string
    ) => void;
    onSelectionAllChange?: () => void;
    onSelectionRowChange?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string
    ) => void;
    willDestroyAll?: () => void;
    willDestroyRow?: (selectionKey: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
  Args: BaseHdsTableTrArgs['Args'] & {
    isSelectable: true;
    selectionScope: HdsTableScope.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsTableTrArgs = BaseHdsTableTrArgs | SelectableHdsTableTrArgs;

export default class HdsTableTrComponent extends Component<HdsTableTrArgs> {
  /**
   * @param selectionKey
   * @type {string | undefined}
   * @default undefined
   */
  get selectionKey(): string | undefined {
    if (
      this.args.isSelectable &&
      this.args.selectionScope === HdsTableScopeAsVal.Row
    ) {
      // TypeScript still doesn't know that `selectionKey` exists because `this.args` is of a union type.
      // We need to assert the specific type where `selectionKey` exists.
      const selectableArgs = this.args as SelectableHdsTableTrArgs['Args'];
      assert(
        `@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`,
        selectableArgs.selectionKey
      );
      return selectableArgs.selectionKey;
    }
    return undefined;
  }
}
