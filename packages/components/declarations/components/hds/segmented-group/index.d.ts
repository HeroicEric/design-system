/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsButtonSignature } from '../button';
import type { HdsDropdownSignature } from '../dropdown';
import type { HdsFormSelectBaseSignature } from '../form/select/base';
import type { HdsFormTextInputBaseSignature } from '../form/text-input/base';
import type { HdsYieldSignature } from '../yield';
interface HdsSegmentedGroupSignature {
    Blocks: {
        default: [
            {
                Button?: ComponentLike<HdsButtonSignature>;
                Dropdown?: ComponentLike<HdsDropdownSignature>;
                Select?: ComponentLike<HdsFormSelectBaseSignature>;
                TextInput?: ComponentLike<HdsFormTextInputBaseSignature>;
                Generic?: ComponentLike<HdsYieldSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsSegmentedGroupComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsSegmentedGroupSignature>;
export default HdsSegmentedGroupComponent;
//# sourceMappingURL=index.d.ts.map