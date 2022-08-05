// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { DOMAttributes } from 'react'

/**
 * This should include props that are universal across all elements.
 */
export interface UniversalXULProps extends DOMAttributes {
  flex?: number
  label?: string
}
