/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import {
  HdsTableDensities as HdsTableDensitiesValues,
  HdsTableScope,
  HdsTableThSortOrder as HdsTableThSortOrderValues,
  HdsTableVerticalAlignment as HdsTableVerticalAlignmentValues,
} from './types.ts';
import type {
  HdsTableColumn,
  HdsTableDensities,
  HdsTableThSortOrder,
  HdsTableVerticalAlignment,
  HdsTableSortingFunction,
  HdsTableSelectableRow,
} from './types';
import type { ComponentLike } from '@glint/template';
import type { HdsTableTrArgs } from './tr.ts';
import type { HdsTableThArgs } from './th.ts';
import type { HdsTableThSortArgs } from './th-sort.ts';

export const DENSITIES: string[] = Object.values(HdsTableDensitiesValues);
export const DEFAULT_DENSITY = HdsTableDensitiesValues.Medium;

export const VALIGNMENTS: string[] = Object.values(
  HdsTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsTableVerticalAlignmentValues.Top;

export interface HdsTableArgs {
  Args: {
    caption?: string;
    columns?: HdsTableColumn[];
    density?: HdsTableDensities;
    identityKey: string;
    isStriped?: boolean;
    isFixedLayout?: boolean;
    isSelectable?: boolean;
    onSelectionChange?: (selection: {
      selectionKey: string;
      selectionCheckboxElement:
        | HdsFormCheckboxBaseSignature['Element']
        | undefined;
      selectedRowsKeys: string[];
      selectableRowsStates: {
        selectionKey: string;
        isSelected: boolean | undefined;
      }[];
    }) => void;
    onSort?: (sortBy: string, sortOrder: HdsTableThSortOrder) => void;
    sortBy?: string;
    sortedMessageText: string;
    sortOrder?: HdsTableThSortOrder;
    valign?: HdsTableVerticalAlignment;
  };
  Blocks: {
    head?: [
      {
        Tr: ComponentLike<HdsTableTrArgs>;
        Th: ComponentLike<HdsTableThArgs>;
        ThSort: ComponentLike<HdsTableThSortArgs>;
        sortBy: string | undefined;
        sortOrder: HdsTableThSortOrder;
        setSortBy: (column: string) => void;
      },
    ];
    body?: [
      {
        Tr: ComponentLike<HdsTableTrArgs>;
        Th: ComponentLike<HdsTableThArgs>;
        ThSort: ComponentLike<HdsTableThSortArgs>;
      },
    ];
  };
  Element: HTMLTableElement;
}

export default class HdsTableIndexComponent extends Component<HdsTableArgs> {
  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || HdsTableThSortOrderValues.Asc;
  @tracked selectAllCheckbox:
    | HdsFormCheckboxBaseSignature['Element']
    | undefined = undefined;
  selectableRows: HdsTableSelectableRow[] = [];
  @tracked isSelectAllCheckboxSelected: boolean | undefined = undefined;

  /**
   * @param getSortCriteria
   * @type {string | HdsTableSortingFunction<unknown>}
   * @default sortBy:sortOrder
   * @description Returns the sort criteria
   */
  get getSortCriteria(): string | HdsTableSortingFunction<unknown> {
    // get the current column
    const currentColumn = this.args?.columns?.find(
      (column) => column.key === this.sortBy
    );
    if (
      // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  get selectionScopeCol() {
    return HdsTableScope.Col;
  }

  get selectionScopeRow() {
    return HdsTableScope.Row;
  }

  /**
   * @param identityKey
   * @type {string | undefined}
   * @default '@identity'
   * @description Returns the key to use for the table rows to provide more granular control. If no identityKey is defined, Ember's default `@identity` is used. See https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each
   * this would be relevant for any table that would have data that could update or change, i.e., polling.
   */
  get identityKey(): string | undefined {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  /**
   * @param sortedMessageText
   * @type {string}
   * @default ''
   * @description Returns the text to display in the sorted message. If no text is defined, the default text is used.
   */
  get sortedMessageText(): string {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this.sortBy && this.sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
    } else {
      return '';
    }
  }

  /**
   * @param isStriped
   * @type {boolean}
   * @default false
   * @description Determines whether the table rows should have alternating background colors; defaults to false.
   */
  get isStriped(): boolean {
    return this.args.isStriped ?? false;
  }

  /**
   * @param isFixedLayout
   * @type {boolean}
   * @default false
   * @description Determines whether the table-display should be set to fixed; meaning, the table columns are of equal width no matter the content; defaults to false.
   */
  get isFixedLayout(): boolean {
    return this.args.isFixedLayout ?? false;
  }

  /**
   * @param density
   * @type {string}
   * @default 'medium'
   * @description Determines the density of the table cells; options are "short", "medium" and "tall". If no density is defined, "medium" is used.
   */
  get density(): HdsTableDensities {
    const { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
  }

  /**
   * @param valign
   * @type {HdsTableVerticalAlignment}
   * @default 'top'
   * @description Determines the vertical alignment of the table cells; options are: "top", "middle", "baseline". If no valign is defined, "top" is used.
   */
  get valign(): HdsTableVerticalAlignment {
    const { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-table--striped');
    }

    // add a class based on the @isFixedLayout argument
    if (this.isFixedLayout) {
      classes.push('hds-table--layout-fixed');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-table--valign-${this.valign}`);
    }

    return classes.join(' ');
  }

  @action
  setSortBy(column: string): void {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder =
        this.sortOrder === HdsTableThSortOrderValues.Asc
          ? HdsTableThSortOrderValues.Desc
          : HdsTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsTableThSortOrderValues.Asc;
    }

    const { onSort } = this.args;

    if (typeof onSort === 'function' && this.sortBy !== undefined) {
      onSort(this.sortBy, this.sortOrder);
    }
  }

  onSelectionChangeCallback(
    checkbox: HdsFormCheckboxBaseSignature['Element'] | undefined,
    selectionKey: string
  ): void {
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange({
        selectionKey: selectionKey,
        selectionCheckboxElement: checkbox,
        selectedRowsKeys: this.selectableRows.reduce<string[]>((acc, row) => {
          if (row?.checkbox?.checked) {
            acc.push(row.selectionKey);
          }
          return acc;
        }, []),
        selectableRowsStates: this.selectableRows.reduce(
          (
            acc: { selectionKey: string; isSelected: boolean | undefined }[],
            row
          ) => {
            acc.push({
              selectionKey: row.selectionKey,
              isSelected: row?.checkbox?.checked,
            });
            return acc;
          },
          []
        ),
      });
    }
  }

  @action
  onSelectionAllChange(): void {
    this.selectableRows.forEach((row) => {
      if (row.checkbox) {
        row.checkbox.checked = this.selectAllCheckbox?.checked ? true : false;
        row.checkbox.dispatchEvent(new Event('toggle', { bubbles: false }));
      }
    });
    this.isSelectAllCheckboxSelected = this.selectAllCheckbox?.checked;
    this.onSelectionChangeCallback(this.selectAllCheckbox, 'all');
  }

  @action
  onSelectionRowChange(
    checkbox: HdsFormCheckboxBaseSignature['Element'],
    selectionKey: string
  ): void {
    this.setSelectAllState();
    this.onSelectionChangeCallback(checkbox, selectionKey);
  }

  @action
  didInsertSelectAllCheckbox(
    checkbox: HdsFormCheckboxBaseSignature['Element']
  ): void {
    this.selectAllCheckbox = checkbox;
  }

  @action
  willDestroySelectAllCheckbox(): void {
    this.selectAllCheckbox = undefined;
  }

  @action
  didInsertRowCheckbox(
    checkbox: HdsFormCheckboxBaseSignature['Element'],
    selectionKey: string
  ): void {
    this.selectableRows.push({ selectionKey, checkbox });
    this.setSelectAllState();
  }

  @action
  willDestroyRowCheckbox(selectionKey: string): void {
    this.selectableRows = this.selectableRows.filter(
      (row) => row.selectionKey !== selectionKey
    );
    this.setSelectAllState();
  }

  @action
  setSelectAllState(): void {
    if (this.selectAllCheckbox) {
      const selectableRowsCount = this.selectableRows.length;
      const selectedRowsCount = this.selectableRows.filter(
        (row) => row?.checkbox?.checked
      ).length;

      this.selectAllCheckbox.checked =
        selectedRowsCount === selectableRowsCount;
      this.selectAllCheckbox.indeterminate =
        selectedRowsCount > 0 && selectedRowsCount < selectableRowsCount;
      this.isSelectAllCheckboxSelected = this.selectAllCheckbox.checked;
      this.selectAllCheckbox.dispatchEvent(
        new Event('toggle', { bubbles: false })
      );
    }
  }
}
