/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
interface HdsFormSuperSelectOptionGroupSignature {
    Args: {
        group: {
            groupName?: string;
        };
    };
    Blocks: {
        default: [];
    };
}
export default class HdsFormSuperSelectOptionGroupComponent extends Component<HdsFormSuperSelectOptionGroupSignature> {
    /**
     * Generates a unique ID for the group title
     * @return {string}
     */
    groupTitleId: string;
}
export {};
//# sourceMappingURL=option-group.d.ts.map