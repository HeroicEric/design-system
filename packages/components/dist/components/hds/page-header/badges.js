import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\nCopyright (c) HashiCorp, Inc.\nSPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-page-header__badges-wrapper\" ...attributes>{{yield}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsPageHeaderBadgesComponent = templateOnlyComponent();
var badges = setComponentTemplate(TEMPLATE, HdsPageHeaderBadgesComponent);

export { badges as default };
//# sourceMappingURL=badges.js.map
