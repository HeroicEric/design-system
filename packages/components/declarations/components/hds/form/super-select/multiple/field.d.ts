/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormFieldSignature } from '../../field/index.ts';
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.ts';
interface HdsFormSuperSelectMultipleFieldSignature {
    Args: HdsFormSuperSelectMultipleBaseSignature['Args'] & HdsFormFieldSignature['Args'];
    Blocks: {
        default: [unknown];
    };
    Element: HdsFormFieldSignature['Element'];
}
export default class HdsFormSuperSelectMultipleFieldComponent extends Component<HdsFormSuperSelectMultipleFieldSignature> {
    get idPrefix(): string;
}
export {};
//# sourceMappingURL=field.d.ts.map