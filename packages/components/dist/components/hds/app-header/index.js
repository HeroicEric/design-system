import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{#if (and this.hasA11yRefocus (not this.isOpen))}}\n    {{! @glint-expect-error - `ember-a11y-refocus` doesn\'t expose types yet }}\n    <NavigationNarrator\n      @routeChangeValidator={{@a11yRefocusRouteChangeValidator}}\n      @skipTo={{this.a11yRefocusSkipTo}}\n      @skipText={{@a11yRefocusSkipText}}\n      @navigationText={{@a11yRefocusNavigationText}}\n      @excludeAllQueryParams={{@a11yRefocusExcludeAllQueryParams}}\n    />\n  {{/if}}\n\n  {{yield to=\"logo\"}}\n\n  {{#if (not this.isDesktop)}}\n    <Hds::AppHeader::MenuButton\n      @onClickToggle={{this.onClickToggle}}\n      @isOpen={{this.isOpen}}\n      @menuContentId={{this.menuContentId}}\n    />\n  {{/if}}\n\n  <div class=\"hds-app-header__actions\" id={{this.menuContentId}}>\n    <div class=\"hds-app-header__global-actions\">\n      {{yield to=\"globalActions\"}}\n    </div>\n\n    <div class=\"hds-app-header__utility-actions\">\n      {{yield to=\"utilityActions\"}}\n    </div>\n  </div>\n</div>");

var _class, _descriptor, _descriptor2, _descriptor3;
let HdsAppHeaderComponent = (_class = class HdsAppHeaderComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
    _initializerDefineProperty(this, "isDesktop", _descriptor2, this);
    _initializerDefineProperty(this, "hasOverflowContent", _descriptor3, this);
    _defineProperty(this, "desktopMQ", void 0);
    _defineProperty(this, "hasA11yRefocus", this.args.hasA11yRefocus ?? true);
    _defineProperty(this, "a11yRefocusSkipTo", '#' + (this.args.a11yRefocusSkipTo ?? 'main'));
    // Generates a unique ID for the Menu Content
    _defineProperty(this, "menuContentId", 'hds-menu-content-' + guidFor(this));
    _defineProperty(this, "breakpoint", parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint')));
    _defineProperty(this, "desktopMQVal", this.args.breakpoint ?? getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint'));
    this.desktopMQ = window.matchMedia(`(min-width: ${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
  }
  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);

    // set initial state based on viewport using a "synthetic" event
    const syntheticEvent = new MediaQueryListEvent('change', {
      matches: this.desktopMQ.matches,
      media: this.desktopMQ.media
    });
    this.updateDesktopVariable(syntheticEvent);
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener('change', this.updateDesktopVariable, true);
  }

  // Get the class names to apply to the component.
  get classNames() {
    const classes = ['hds-app-header'];
    if (this.isDesktop) {
      classes.push('hds-app-header--is-desktop');
    } else {
      classes.push('hds-app-header--is-mobile');
    }
    if (this.isOpen) {
      classes.push('hds-app-header--menu-is-open');
    } else {
      classes.push('hds-app-header--menu-is-closed');
    }
    return classes.join(' ');
  }
  escapePress(event) {
    if (event.key === 'Escape' && this.isOpen && !this.isDesktop) {
      this.isOpen = false;
    }
  }
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }
  updateDesktopVariable(event) {
    this.isDesktop = event.matches;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isDesktop", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "hasOverflowContent", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "escapePress", [action], Object.getOwnPropertyDescriptor(_class.prototype, "escapePress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateDesktopVariable", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateDesktopVariable"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAppHeaderComponent);

export { HdsAppHeaderComponent as default };
//# sourceMappingURL=index.js.map
