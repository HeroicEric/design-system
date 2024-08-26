import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dropdown__footer {{if @hasDivider \'hds-dropdown__footer--with-divider\'}}\" ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDropdownFooterComponent = templateOnlyComponent();
var footer = setComponentTemplate(TEMPLATE, HdsDropdownFooterComponent);

export { footer as default };
//# sourceMappingURL=footer.js.map
