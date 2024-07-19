import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export enum HdsTableHorizontalAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum HdsTableScope {
  Row = 'row',
  Col = 'col',
}
export interface BaseHdsTableTrArgs {
  Args: {
    isSelectable?: boolean;
    isSelected?: false;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string | undefined;
    selectionScope: HdsTableScope;
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string | undefined
    ) => void;
    onSelectionChange: () => void;
    willDestroy: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
  Args: BaseHdsTableTrArgs['Args'] & {
    isSelectable: true;
    selectionScope: HdsTableScope.Row;
    selectionKey: string; // Now required for selectable rows
  };
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
