/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

interface HdsFormSuperSelectPlaceholderSignature {
  Args: {
    placeholder?: string;
  };
}

const HdsFormSuperSelectPlaceholderComponent =
  templateOnlyComponent<HdsFormSuperSelectPlaceholderSignature>();

export default HdsFormSuperSelectPlaceholderComponent;
