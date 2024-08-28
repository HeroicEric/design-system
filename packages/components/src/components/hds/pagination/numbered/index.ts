/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { elliptize } from '../elliptize.ts';
import { HdsPaginationDirectionValues } from '../types.ts';

import type {
  HdsPaginationPage,
  HdsPaginationRoutingProps,
  HdsPaginationElliptizedPageArray,
  HdsPaginationElliptizedPageArrayItem,
} from '../types';
export interface HdsPaginationNumberedSignature {
  Args: {
    ariaLabel?: string;
    totalItems: number;
    showLabels?: boolean;
    isTruncated?: boolean;
    currentPage?: number;
    showInfo?: boolean; //TODO: Add this to the docs
    showPageNumbers?: boolean; //TODO: Add this to the docs
    showTotalItems?: boolean; //TODO: Add this to the docs
    showSizeSelector?: boolean;
    sizeSelectorLabel?: string;
    pageSizes?: number[];
    currentPageSize?: number;
    // route stuff
    route?: string;
    model?: unknown;
    models?: unknown[];
    replace?: boolean;
    queryFunction?: (page: number, pageSize: number) => Record<string, unknown>;
    // end route stuff
    onPageChange?: (page: number, pageSize: number) => unknown;
    onPageSizeChange?: (pageSize: number) => unknown;
  };
  Element: HTMLDivElement;
}

// for context about the decision to use these values, see:
// https://hashicorp.slack.com/archives/C03A0N1QK8S/p1673546329082759
export const DEFAULT_PAGE_SIZES = [10, 30, 50];
export default class HdsPaginationNumberedComponent extends Component<HdsPaginationNumberedSignature> {
  // These two private variables are used to differentiate between
  // "uncontrolled" component (where the state is handled internally) and
  // "controlled" component (where the state is handled externally, by the consumer's code).
  // In the first case, these variables store the internal state of the component at any moment,
  // and their value is updated internally according to the user's interaction with the component.
  // In the second case, these variables store *only* the initial state of the component (coming from the arguments)
  // at rendering time, but from that moment on they're not updated anymore, no matter what interaction the user
  // has with the component (the state is controlled externally, eg. via query parameters)
  @tracked _currentPage = this.args.currentPage ?? 1;
  // we assert that `this.pageSizes` will always be an array with at least one item
  @tracked _currentPageSize = this.args.currentPageSize ?? this.pageSizes[0]!;
  @tracked isControlled;

  showInfo = this.args.showInfo ?? true; // if the "info" block is visible
  showLabels = this.args.showLabels ?? false; // if the labels for the "prev/next" controls are visible
  showSizeSelector = this.args.showSizeSelector ?? true; // if the "size selector" block is visible
  showPageNumbers = this.args.showPageNumbers ?? true; // if the "page numbers" block is visible
  isTruncated = this.args.isTruncated ?? true; // if the list of "page numbers" is truncated

  constructor(owner: unknown, args: HdsPaginationNumberedSignature['Args']) {
    super(owner, args);

    const { queryFunction } = this.args;

    // This component works in two different ways, depending if we need to support
    // routing through links (`LinkTo`) for the "navigation controls", or not.
    // If there's no routing then the component behaves as "uncontrolled"
    // (the state updates - eg to the "currentPage" and "currentPageSize"
    // are handled by its internal logic).
    // If instead the component needs to update the routing (and we infer this via the "query" arguments)
    // then the component behaves as "controlled", where the state is
    // initialized and updated using the arguments passed to it.

    if (queryFunction === undefined) {
      this.isControlled = false;
    } else {
      assert(
        '@queryFunction for "Hds::Pagination::Numbered" must be a function',
        typeof queryFunction === 'function'
      );
      assert(
        '@currentPage and @currentPageSize for "Hds::Pagination::Numbered" must be provided as numeric arguments when the pagination controls the routing',
        typeof this.args.currentPageSize === 'number' &&
          typeof this.args.currentPage === 'number'
      );
      this.isControlled = true;
    }

    assert(
      '@totalItems for "Hds::Pagination::Numbered" must be defined as an integer number',
      typeof this.args.totalItems === 'number'
    );
  }

  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'Pagination';
  }

  // This very specific `get/set` pattern is used to handle the two different use cases of the component
  // being "controlled" (when it has routing, meaning it needs to support pagination controls as links/`LinkTo`)
  // vs being "uncontrolled" (see comments above for details).
  //
  // If it has routing (and so it's "controlled"), than the value ("state") of the `currentPage/currentPageSize` variables
  // is *always* determined by the controller via arguments (most of the times, connected to query parameters in the URL).
  // For this reason the "get" method always returns the value from the `args`,
  // while the "set" method never updates the private internal state (_variable).
  //
  // If instead it doesn't have routing (and so it's "uncontrolled") than the value ("state") of the `currentPage/currentPageSize` variables
  // is *always* determined by the component's internal logic (and updated according to the user interaction with it).
  // For this reason the "get" and "set" methods always read from or write to the private internal state (_variable).

  get currentPage() {
    if (this.isControlled) {
      // if the component is controlled, `@currentPage` is asserted to be a number
      return this.args.currentPage as number;
    } else {
      return this._currentPage;
    }
  }

  set currentPage(value) {
    if (this.isControlled) {
      // noop
    } else {
      // if `this.isControlled` is `false`
      this._currentPage = value as number;
    }
  }

  get currentPageSize() {
    if (this.isControlled) {
      // if the component is controlled, `@currentPageSize` is asserted to be a number
      return this.args.currentPageSize as number;
    } else {
      return this._currentPageSize;
    }
  }

  set currentPageSize(value) {
    if (this.isControlled) {
      // noop
    } else {
      this._currentPageSize = value;
    }
  }

  get pageSizes() {
    const { pageSizes = DEFAULT_PAGE_SIZES } = this.args;

    assert(
      // TODO: Add test for this
      `pageSizes argument must be an array with at least one item. Received: ${pageSizes}`,
      Array.isArray(pageSizes) === true && pageSizes.length > 0
    );

    return pageSizes;
  }

  get itemsRangeStart() {
    // Calculate the starting range of items displayed on current page
    // if currentPage = 1st page and # of items per page is 10:
    //  ( (1 - 1 = 0) * 10 = 0 ) + 1 = 1
    // if current page = 2nd page:
    // ( (2 - 1 = 1) * 10 = 10 ) + 1 = 11
    return (this.currentPage - 1) * this.currentPageSize + 1;
  }

  get itemsRangeEnd() {
    // Calculate ending range of items displayed on current page
    // 2 cases: 1) full page of items or 2) last page of items
    if (this.currentPage * this.currentPageSize < this.args.totalItems) {
      // 1) full page of items (pages 1 to page before last):
      return this.itemsRangeStart + this.currentPageSize - 1;
    } else {
      // 2) last page of items:
      return this.args.totalItems;
    }
  }

  get pages(): HdsPaginationElliptizedPageArray {
    const pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    if (this.isTruncated) {
      return elliptize({ pages, current: this.currentPage });
    } else {
      return pages;
    }
  }

  get totalPages() {
    return Math.max(Math.ceil(this.args.totalItems / this.currentPageSize), 1);
  }

  buildQueryParamsObject(
    page: HdsPaginationElliptizedPageArrayItem,
    pageSize: number
  ): Record<string, unknown> {
    // `page` may also be ellipsis
    if (this.isControlled && typeof page === 'number') {
      // if the component is controlled, `@queryFunction` is asserted to be a function
      return this.args.queryFunction!(page, pageSize);
    } else {
      return {};
    }
  }

  get routing(): HdsPaginationRoutingProps {
    const routing: HdsPaginationRoutingProps = {
      route: this.args.route ?? undefined,
      model: this.args.model ?? undefined,
      models: this.args.models ?? undefined,
      replace: this.args.replace ?? undefined,
    };

    // the "query" is dynamic and needs to be calculated
    if (this.isControlled) {
      routing.queryPrev = this.buildQueryParamsObject(
        this.currentPage - 1,
        this.currentPageSize
      );
      routing.queryNext = this.buildQueryParamsObject(
        this.currentPage + 1,
        this.currentPageSize
      );
      // IMPORTANT: here we need to use an object and not an array
      // otherwise the {{get object page}} will be shifted by one
      // (the pages are 1-based while the array would be zero-based)
      routing.queryPages = {};
      this.pages.forEach(
        (page) =>
          (routing.queryPages![page] = this.buildQueryParamsObject(
            page,
            this.currentPageSize
          ))
      );
    } else {
      routing.queryPrev = undefined;
      routing.queryNext = undefined;
      routing.queryByPage = {};
    }

    return routing;
  }

  get isDisabledPrev() {
    return this.currentPage === 1;
  }

  get isDisabledNext() {
    return this.currentPage === this.totalPages;
  }

  @action
  onPageChange(page: HdsPaginationPage) {
    let gotoPageNumber;
    if (page === HdsPaginationDirectionValues.Prev && this.currentPage > 1) {
      gotoPageNumber = this.currentPage - 1;
    } else if (
      page === HdsPaginationDirectionValues.Next &&
      this.currentPage < this.totalPages
    ) {
      gotoPageNumber = this.currentPage + 1;
    } else {
      gotoPageNumber = page;
    }

    // we want to invoke the `onPageChange` callback only on actual page change
    if (gotoPageNumber !== this.currentPage) {
      // we have already determined that `gotoPageNumber` is not `prev` or `next`
      this.currentPage = gotoPageNumber as number;

      const { onPageChange } = this.args;

      if (typeof onPageChange === 'function') {
        onPageChange(this.currentPage, this.currentPageSize);
      }
    }
  }

  @action
  onPageSizeChange(newPageSize: number) {
    const { onPageSizeChange } = this.args;

    if (!this.isControlled) {
      // notice: we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
      this.currentPage = 1;
      this.currentPageSize = newPageSize;
    }

    // invoke the callback function
    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }
  }
}
