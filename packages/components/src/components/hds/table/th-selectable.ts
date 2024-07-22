/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import type { HdsTableScope } from './types';
import type { HdsTableThArgs } from './th';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export interface HdsTableThSelectableArgs {
  Args: {
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string
    ) => void;
    isSelected?: boolean;
    onSelectionChange?: () => void;
    selectionAriaLabelSuffix: string;
    selectionKey: string;
    selectionScope?: HdsTableScope;
    willDestroyCheckbox?: () => void;
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
  didInsert(checkbox: HdsFormCheckboxBaseSignature['Element']) {
    const { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
      // we need to use a custom event listener here because changing the `checked` value via JS
      // (and this happens with the "select all") doesn't trigger the `change` event
      // and consequently the `aria-label` won't be automatically updated (and so we have to force it)
      checkbox.addEventListener(
        'toggle',
        this.updateAriaLabel.bind(this),
        true
      );
    }
  }

  @action
  willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']) {
    const { willDestroyCheckbox } = this.args;
    if (typeof willDestroyCheckbox === 'function') {
      willDestroyCheckbox();
      if (checkbox) {
        checkbox.removeEventListener(
          'toggle',
          this.updateAriaLabel.bind(this),
          true
        );
      }
    }
  }

  @action
  onChangeSelection(event: Event) {
    // Assert event.target as HTMLInputElement to access the 'checked' property
    const target = event.target as HTMLInputElement;
    this.isSelected = target.checked;
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange();
    }
  }

  updateAriaLabel(event: Event) {
    // Assert event.target as HTMLInputElement to access the 'checked' property
    const target = event.target as HTMLInputElement;
    this.isSelected = target.checked;
  }
}
