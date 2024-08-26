import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { HdsTableThSortOrderIconValues, HdsTableThSortOrderValues, HdsTableThSortOrderLabelValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{on \"click\" this.onClick}}\n  aria-labelledby=\"{{this.prefixLabelId}} {{@labelId}} {{this.suffixLabelId}}\"\n  ...attributes\n>\n  <span id={{this.prefixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">Sort by</span>\n  <span id={{this.suffixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">{{this.sortOrderLabel}}</span>\n  <Hds::Icon @name={{this.icon}} />\n</button>");

const NOOP = () => {};
class HdsTableThButtonSortComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
     *
     * @param prefixLabelId/suffixLabelId
     */
    _defineProperty(this, "prefixLabelId", 'prefix-' + guidFor(this));
    _defineProperty(this, "suffixLabelId", 'suffix-' + guidFor(this));
  }
  /**
   * @param icon
   * @type {HdsTableThSortOrderIcons}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderIconValues.ArrowUp;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsTableThSortOrderIconValues.SwapVertical;
    }
  }

  /**
   * @param sortOrderLabel
   * @default 'ascending'
   * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
   */
  get sortOrderLabel() {
    return this.args.sortOrder === HdsTableThSortOrderValues.Asc ? HdsTableThSortOrderLabelValues.Desc : HdsTableThSortOrderLabelValues.Asc;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === HdsTableThSortOrderValues.Asc || this.args.sortOrder === HdsTableThSortOrderValues.Desc) {
      classes.push(`hds-table__th-button--is-sorted`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThButtonSortComponent);

export { HdsTableThButtonSortComponent as default };
//# sourceMappingURL=th-button-sort.js.map
