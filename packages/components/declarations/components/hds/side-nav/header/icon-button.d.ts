/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/';
interface HdsSideNavHeaderIconButtonSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        ariaLabel: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsSideNavHeaderIconButtonComponent extends Component<HdsSideNavHeaderIconButtonSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @description The value of `aria-label`
     */
    get ariaLabel(): string;
}
export {};
//# sourceMappingURL=icon-button.d.ts.map