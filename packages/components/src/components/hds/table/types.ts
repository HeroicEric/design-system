export type HdsTableColumn = {
  align?: HdsTableHorizontalAlignment | undefined;
  key: string;
  label: string;
  isSortable?: boolean;
  isVisuallyHidden?: boolean;
  sortingFunction?: HdsTableSortingFunction<unknown>;
  tooltip?: string;
  width?: string;
};

export enum HdsTableDensities {
  Short = 'short',
  Medium = 'medium',
  Tall = 'tall',
}

export enum HdsTableHorizontalAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum HdsTableVerticalAlignment {
  Top = 'top',
  Middle = 'middle',
  Baseline = 'baseline',
}

export enum HdsTableScope {
  Row = 'row',
  Col = 'col',
}

export enum HdsTableThSortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum HdsTableThSortOrderLabels {
  Asc = 'ascending',
  Desc = 'descending',
  None = 'none',
}

export enum HdsTableThSortOrderIcons {
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
  SwapVertical = 'swap-vertical',
}

export interface HdsTableSelectableRow {
  selectionKey: string;
  checkbox: HTMLInputElement | undefined;
}

export type HdsTableSortingFunction<T> = (a: T, b: T) => number;
