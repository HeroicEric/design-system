/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsDisclosurePrimitiveSignature } from '../disclosure-primitive';
import type { HdsRevealToggleButtonSignature } from './toggle/button';
interface HdsRevealSignature {
    Args: {
        text: HdsRevealToggleButtonSignature['Args']['text'];
        textWhenOpen?: HdsRevealToggleButtonSignature['Args']['text'];
        isOpen?: HdsRevealToggleButtonSignature['Args']['isOpen'];
    };
    Blocks: {
        default: [];
    };
    Element: HdsDisclosurePrimitiveSignature['Element'];
}
export default class HdsRevealComponent extends Component<HdsRevealSignature> {
    /**
     * Generates a unique ID for the Content
     *
     * @param contentId
     */
    contentId: string;
    /**
     * @param getText
     * @type {string}
     * @description A local function that emulates a getter to compute the value of the `@text` argument for the button (mainly to make TypeScript happy)
     */
    getText: (isOpen: boolean) => string;
}
export {};
//# sourceMappingURL=index.d.ts.map