/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormFieldSignature } from '../../field/index.ts';
import type { HdsFormSuperSelectSingleBaseSignature } from './base.ts';
interface HdsFormSuperSelectSingleFieldSignature {
    Args: HdsFormSuperSelectSingleBaseSignature['Args'] & HdsFormFieldSignature['Args'];
    Blocks: {
        default: [unknown];
    };
    Element: HdsFormFieldSignature['Element'];
}
export default class HdsFormSuperSelectSingleFieldComponent extends Component<HdsFormSuperSelectSingleFieldSignature> {
    get idPrefix(): string;
}
export {};
//# sourceMappingURL=field.d.ts.map