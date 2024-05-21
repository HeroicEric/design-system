import '@glint/environment-ember-loose';

import { LinkTo } from '@ember/routing';

import type RenderModifiersRegistry from '@ember/render-modifiers/template-registry';
import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';
import type EmberStargate from 'ember-stargate/template-registry';

import type HdsComponentsRegistry from '../src/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberTruthRegistry,
      HdsComponentsRegistry,
      EmberElementHelperRegistry,
      EmberStyleModifierRegistry,
      RenderModifiersRegistry,
      EmberStargate /*, other addon registries */ {
    // local entries
    LinkToExternal: typeof LinkTo;
  }
}
