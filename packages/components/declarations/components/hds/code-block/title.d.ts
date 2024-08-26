/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsCodeBlockTitleTags } from './types';
import type { HdsTextBodySignature } from '../text/body';
export interface HdsCodeBlockTitleSignature {
    Args: {
        tag?: HdsCodeBlockTitleTags;
    };
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare class HdsCodeBlockTitleComponent extends Component<HdsCodeBlockTitleSignature> {
    get componentTag(): HdsCodeBlockTitleTags;
}
export default HdsCodeBlockTitleComponent;
//# sourceMappingURL=title.d.ts.map