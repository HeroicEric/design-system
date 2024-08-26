import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-form-visibility-toggle\" type=\"button\" aria-label={{@ariaLabel}} ...attributes>\n  <Hds::Icon @name={{if @isVisible \"eye\" \"eye-off\"}} @size=\"16\" />\n  <span class=\"sr-only\" aria-live=\"polite\">{{@ariaMessageText}}</span>\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormVisibilityToggleComponent = templateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsFormVisibilityToggleComponent);

export { index as default };
//# sourceMappingURL=index.js.map
