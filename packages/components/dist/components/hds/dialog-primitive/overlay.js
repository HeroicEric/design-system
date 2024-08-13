import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dialog-primitive__overlay {{@contextualClass}}\"></div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveOverlayComponent = templateOnlyComponent();
var overlay = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveOverlayComponent);

export { overlay as default };
//# sourceMappingURL=overlay.js.map
