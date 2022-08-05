import { DOMAttributes } from 'react'

/**
 * This should include props that are universal across all elements.
 */
export interface UniversalXULProps extends DOMAttributes {
  flex?: number
  label?: string
}
