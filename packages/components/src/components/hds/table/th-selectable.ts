/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsTableScope as HdsTableScopeValues } from './types.ts';
import type { HdsTableScope } from './types';
import type { HdsTableThArgs } from './th';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export interface HdsTableThSelectableArgs {
  Args: {
    didInsertAll?: (checkbox: HdsFormCheckboxBaseSignature['Element']) => void;
    didInsertRow?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string
    ) => void;
    isSelected?: boolean;
    onSelectionAllChange?: () => void;
    onSelectionRowChange?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string
    ) => void;
    selectionAriaLabelSuffix: string;
    selectionKey: string;
    selectionScope?: HdsTableScope;
    willDestroyAll?: () => void;
    willDestroyRow?: (selectionKey: string) => void;
  };
  Element: HdsTableThArgs['Element'];
}

export default class HdsTableThSelectableComponent extends Component<HdsTableThSelectableArgs> {
  @tracked isSelected = this.args.isSelected;

  /**
   * Generate a unique ID for the Checkbox
   * @return {string}
   */
  checkboxId = 'checkbox-' + guidFor(this);

  get ariaLabel() {
    const { selectionAriaLabelSuffix } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }

  @action
  didInsertHandler(checkbox: HdsFormCheckboxBaseSignature['Element']) {
    if (this.args.selectionScope === HdsTableScopeValues.Col) {
      const { didInsertAll } = this.args;
      if (typeof didInsertAll === 'function') {
        didInsertAll(checkbox);
      }
    } else if (this.args.selectionScope === HdsTableScopeValues.Row) {
      const { didInsertRow } = this.args;
      if (typeof didInsertRow === 'function') {
        didInsertRow(checkbox, this.args.selectionKey);
      }
    }
    // we need to use a custom event listener here because changing the `checked` value via JS
    // (and this happens with the "select all") doesn't trigger the `change` event
    // and consequently the `aria-label` won't be automatically updated (and so we have to force it)
    checkbox.addEventListener('toggle', this.updateAriaLabel.bind(this), true);
  }

  @action
  willDestroyHandler(checkbox: HdsFormCheckboxBaseSignature['Element']) {
    if (this.args.selectionScope === HdsTableScopeValues.Col) {
      const { willDestroyAll } = this.args;
      if (typeof willDestroyAll === 'function') {
        willDestroyAll();
      }
    } else if (this.args.selectionScope === HdsTableScopeValues.Row) {
      const { willDestroyRow } = this.args;
      if (typeof willDestroyRow === 'function') {
        willDestroyRow(this.args.selectionKey);
      }
    }
    if (checkbox) {
      checkbox.removeEventListener(
        'toggle',
        this.updateAriaLabel.bind(this),
        true
      );
    }
  }

  @action
  onChangeSelection(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isSelected = target.checked;
    if (this.args.selectionScope === HdsTableScopeValues.Col) {
      const { onSelectionAllChange } = this.args;
      if (typeof onSelectionAllChange === 'function') {
        onSelectionAllChange();
      }
    } else if (this.args.selectionScope === HdsTableScopeValues.Row) {
      const { onSelectionRowChange } = this.args;
      if (typeof onSelectionRowChange === 'function') {
        onSelectionRowChange(target, this.args.selectionKey);
      }
    }
  }

  updateAriaLabel(event: Event) {
    // Assert event.target as HTMLInputElement to access the 'checked' property
    const target = event.target as HTMLInputElement;
    this.isSelected = target.checked;
  }
}
