import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n\n<Hds::SideNav::Base\n  class={{concat this.classNames (unless (has-block \"header\") \" hds-side-nav--is-headerless\")}}\n  ...attributes\n  {{on \"transitionstart\" (fn this.setTransition \"start\")}}\n  {{on \"transitionend\" (fn this.setTransition \"end\")}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  {{did-insert this.didInsert}}\n>\n  <:root>\n    {{#if this.hasA11yRefocus}}\n      {{! @glint-expect-error - `ember-a11y-refocus` doesn\'t expose types yet }}\n      <NavigationNarrator\n        @routeChangeValidator={{@a11yRefocusRouteChangeValidator}}\n        @skipTo=\"#{{@a11yRefocusSkipTo}}\"\n        @skipText={{@a11yRefocusSkipText}}\n        @navigationText={{@a11yRefocusNavigationText}}\n        @excludeAllQueryParams={{@a11yRefocusExcludeAllQueryParams}}\n      />\n    {{/if}}\n    {{#if this.showToggleButton}}\n      {{! template-lint-disable no-invalid-interactive}}\n      <div class=\"hds-side-nav__overlay\" {{on \"click\" this.toggleMinimizedStatus}} />\n      {{! template-lint-enable no-invalid-interactive}}\n      <Hds::SideNav::ToggleButton\n        aria-label={{this.ariaLabel}}\n        @icon={{if this.isMinimized \"chevrons-right\" \"chevrons-left\"}}\n        {{on \"click\" this.toggleMinimizedStatus}}\n      />\n    {{/if}}\n  </:root>\n  <:header as |Header|>\n    {{~yield (hash Header=Header isMinimized=this.isMinimized) to=\"header\"~}}\n  </:header>\n  <:body as |Body|>\n    {{~yield (hash Body=Body isMinimized=this.isMinimized) to=\"body\"~}}\n  </:body>\n  <:footer as |Footer|>\n    {{~yield (hash Footer=Footer isMinimized=this.isMinimized) to=\"footer\"~}}\n  </:footer>\n</Hds::SideNav::Base>");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
let HdsSideNavComponent = (_class = class HdsSideNavComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "isResponsive", _descriptor, this);
    // controls if the component reacts to viewport changes
    _initializerDefineProperty(this, "isMinimized", _descriptor2, this);
    // sets the default state on 'desktop' viewports
    _initializerDefineProperty(this, "isCollapsible", _descriptor3, this);
    // controls if users can collapse the sidenav on 'desktop' viewports
    _initializerDefineProperty(this, "isAnimating", _descriptor4, this);
    _initializerDefineProperty(this, "isDesktop", _descriptor5, this);
    _defineProperty(this, "desktopMQ", void 0);
    _defineProperty(this, "containersToHide", void 0);
    _defineProperty(this, "hasA11yRefocus", this.args.hasA11yRefocus ?? true);
    _defineProperty(this, "desktopMQVal", getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint'));
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
    if (this.args.hasA11yRefocus) {
      assert('@a11yRefocusSkipTo for NavigatorNarrator (a11y-refocus) in "Hds::SideNav" must have a valid value', this.args.a11yRefocusSkipTo !== undefined);
    }
  }
  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this.desktopMQ.matches,
        media: this.desktopMQ.media
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener('change', this.updateDesktopVariable, true);
  }
  get shouldTrapFocus() {
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }
  get showToggleButton() {
    return this.isResponsive && !this.isDesktop || this.isCollapsible;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'close menu'
   */
  get ariaLabel() {
    if (this.isMinimized) {
      return this.args.ariaLabel ?? 'Open menu';
    }
    return this.args.ariaLabel ?? 'Close menu';
  }
  get classNames() {
    const classes = []; // `hds-side-nav` is already set by the "Hds::SideNav::Base" component

    // add specific class names for the different possible states
    if (this.isResponsive) {
      classes.push('hds-side-nav--is-responsive');
    }
    if (!this.isDesktop && this.isResponsive) {
      classes.push('hds-side-nav--is-mobile');
    } else {
      classes.push('hds-side-nav--is-desktop');
    }
    if (this.isMinimized && this.isResponsive) {
      classes.push('hds-side-nav--is-minimized');
    } else {
      classes.push('hds-side-nav--is-not-minimized');
    }
    if (this.isAnimating) {
      classes.push('hds-side-nav--is-animating');
    }

    // Add class based on the presence of app-header
    if (this.args.withAppHeader) {
      classes.push('hds-side-nav--with-app-header');
    }
    return classes.join(' ');
  }
  escapePress(event) {
    if (event.key === 'Escape' && !this.isMinimized && !this.isDesktop) {
      this.isMinimized = true;
    }
  }
  toggleMinimizedStatus() {
    this.isMinimized = !this.isMinimized;
    this.containersToHide.forEach(element => {
      if (this.isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
    const {
      onToggleMinimizedStatus
    } = this.args;
    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this.isMinimized);
    }
  }
  didInsert(element) {
    this.containersToHide = element.querySelectorAll('.hds-side-nav-hide-when-minimized');
  }
  setTransition(phase, event) {
    // we only want to respond to `width` animation/transitions
    if (event.propertyName !== 'width') {
      return;
    }
    if (phase === 'start') {
      this.isAnimating = true;
    } else {
      this.isAnimating = false;
    }
  }
  updateDesktopVariable(event) {
    this.isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this.isMinimized = !this.isDesktop;
    const {
      onDesktopViewportChange
    } = this.args;
    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this.isDesktop);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isResponsive", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isResponsive ?? true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isMinimized", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isMinimized ?? false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "isCollapsible", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isCollapsible ?? false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isAnimating", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isDesktop", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "escapePress", [action], Object.getOwnPropertyDescriptor(_class.prototype, "escapePress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleMinimizedStatus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleMinimizedStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setTransition", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setTransition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateDesktopVariable", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateDesktopVariable"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsSideNavComponent);

export { HdsSideNavComponent as default };
//# sourceMappingURL=index.js.map
