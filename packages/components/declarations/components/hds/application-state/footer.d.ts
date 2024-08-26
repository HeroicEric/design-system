/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone';
import type { HdsButtonSignature } from '../button';
import type { HdsDropdownSignature } from 'src/components/hds/dropdown';
export interface HdsApplicationStateFooterSignature {
    Args: {
        hasDivider?: boolean;
    };
    Blocks: {
        default?: [
            {
                Button?: ComponentLike<HdsButtonSignature>;
                Dropdown?: ComponentLike<HdsDropdownSignature>;
                LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsApplicationStateFooterComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsApplicationStateFooterSignature>;
export default HdsApplicationStateFooterComponent;
//# sourceMappingURL=footer.d.ts.map