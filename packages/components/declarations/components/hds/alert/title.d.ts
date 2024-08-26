/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAlertTitleTags } from './types';
export interface HdsAlertTitleSignature {
    Args: {
        tag?: HdsAlertTitleTags;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
declare class HdsAlertTitleComponent extends Component<HdsAlertTitleSignature> {
    get componentTag(): HdsAlertTitleTags;
}
export default HdsAlertTitleComponent;
//# sourceMappingURL=title.d.ts.map