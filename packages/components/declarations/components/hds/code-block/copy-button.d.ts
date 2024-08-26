/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsCopyButtonSignature } from '../copy/button';
export interface HdsCodeBlockCopyButtonSignature {
    Args: {
        targetToCopy?: HdsCopyButtonSignature['Args']['targetToCopy'];
    };
    Blocks: {
        default: [];
    };
    Element: HdsCopyButtonSignature['Element'];
}
declare const HdsCodeBlockCopyButtonComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsCodeBlockCopyButtonSignature>;
export default HdsCodeBlockCopyButtonComponent;
//# sourceMappingURL=copy-button.d.ts.map