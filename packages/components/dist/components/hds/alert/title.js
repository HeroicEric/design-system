import Component from '@glimmer/component';
import { HdsAlertTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{~#let (element this.componentTag) as |Tag|}}\n  <Tag class=\"hds-alert__title hds-typography-body-200 hds-font-weight-semibold\" ...attributes>\n    {{yield}}\n  </Tag>\n{{/let~}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAlertTitleComponent extends Component {
  get componentTag() {
    return this.args.tag ?? HdsAlertTitleTagValues.Div;
  }
}
var title = setComponentTemplate(TEMPLATE, HdsAlertTitleComponent);

export { title as default };
//# sourceMappingURL=title.js.map
