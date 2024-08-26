/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/';
interface HdsSideNavHeaderHomeLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        color?: string;
        ariaLabel: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsSideNavHeaderHomeLinkComponent extends Component<HdsSideNavHeaderHomeLinkSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @description The value of `aria-label`
     */
    get ariaLabel(): string;
}
export {};
//# sourceMappingURL=home-link.d.ts.map