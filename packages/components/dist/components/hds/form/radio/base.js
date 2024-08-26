import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<input type=\"radio\" class=\"hds-form-radio\" ...attributes value={{@value}} />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormRadioBaseComponent = templateOnlyComponent();
var base = setComponentTemplate(TEMPLATE, HdsFormRadioBaseComponent);

export { base as default };
//# sourceMappingURL=base.js.map
