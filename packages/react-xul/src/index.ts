/// <reference path="./jsx.d.ts" />

import { diff } from 'deep-object-diff'
import Reconciler, { Fiber, HostConfig, OpaqueHandle } from 'react-reconciler'
import {
  XULDocument,
  XULElement,
  xulElements,
  XULElementsName,
} from 'xul-elements'
import { toKebabCase } from './utils.js'

type Type = XULElementsName | string
type Props = { [key: string]: any }
type Container = Document | Element
type Instance = Element
type TextInstance = Text

type SuspenseInstance = any
type HydratableInstance = any
type PublicInstance = any
type HostContext = any
type UpdatePayload = any
type _ChildSet = any
type TimeoutHandle = any
type NoTimeout = number

function getPropName(prop: string): string {
  if (prop == 'className') return 'class'

  return prop
}

function applyProp(
  instance: Element,
  props: Props,
  prop: string,
  isOverwriting = false
): boolean {
  // Everything that we should not handle goes here
  if (prop == 'children') return false

  // Handle event listeners
  if (typeof props[prop] === 'function') {
    const eventName = prop.replace('on', '').toLowerCase()

    if (isOverwriting) {
      instance.removeEventListener(eventName, props[prop])
    }

    instance.addEventListener(eventName, props[prop])
    return true
  }

  // Handle styles
  if (prop == 'style') {
    let style = ''
    for (const styleProp in props[prop]) {
      style += `${toKebabCase(styleProp)}: ${props[prop][styleProp]};`
    }

    instance.setAttribute('style', style)
    return true
  }

  instance.setAttribute(getPropName(prop).toLowerCase(), props[prop])
  return true
}

function applyProps(instance: Element, props: Props) {
  for (const prop in props) {
    applyProp(instance, props, prop)
  }
}

const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  supportsMicrotask: true,

  createInstance(
    type,
    props,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ) {
    let element

    if (xulElements.includes(type)) {
      element = (document as XULDocument).createXULElement(
        type as XULElementsName
      )
    } else {
      element = document.createElement(type)
    }

    applyProps(element, props)

    return element
  },
  createTextInstance(text, rootContainer, hostContext, internalHandle) {
    return document.createTextNode(text)
  },

  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },
  appendChildToContainer(container, child) {
    container.appendChild(child)
  },
  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child)
  },
  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild)
  },

  // Assorted mutation methods
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  },
  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
    return true
  },
  commitMount(instance, type, props, internalInstanceHandle) {
    applyProps(instance, props)
  },
  detachDeletedInstance(node) {
    node.remove()
    return null
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.nodeValue = newText
  },
  prepareUpdate(
    instance,
    type,
    oldPropsImut,
    newPropsImut,
    rootContainer,
    hostContext
  ) {
    let oldProps = { ...oldPropsImut, children: undefined }
    let newProps = { ...newPropsImut, children: undefined }

    const diffs = diff(oldProps, newProps)

    if (Object.keys(diffs).length === 0) {
      return null
    }

    return diffs
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    for (const updated in updatePayload) {
      if (typeof updatePayload[updated] === 'undefined') {
        instance.removeAttribute(getPropName(updated).toLowerCase())
        continue
      }

      applyProp(instance, nextProps, updated, true)
    }
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  },

  getPublicInstance(instance) {
    return instance
  },

  // We do not care about root host contexts
  getRootHostContext(rootContainer) {
    return null
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
    return null
  },

  // Performance stuff that I do not care about at the moment
  shouldSetTextContent(type, props) {
    return false
  },

  // We do not handle commits, so we are just going to pass everything through
  prepareForCommit(containerInfo) {
    return null
  },
  resetAfterCommit(containerInfo) {
    return null
  },
  supportsPersistence: false,

  preparePortalMount: function (containerInfo: Container): void {
    throw new Error('Function not implemented.')
  },
  scheduleTimeout: function (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ) {
    throw new Error('Function not implemented.')
  },
  cancelTimeout: function (id: any): void {
    throw new Error('Function not implemented.')
  },
  noTimeout: 0,
  isPrimaryRenderer: false,
  getCurrentEventPriority: function (): number {
    throw new Error('Function not implemented.')
  },
  getInstanceFromNode: function (node: any): Fiber | null | undefined {
    throw new Error('Function not implemented.')
  },
  beforeActiveInstanceBlur: function (): void {
    throw new Error('Function not implemented.')
  },
  afterActiveInstanceBlur: function (): void {
    throw new Error('Function not implemented.')
  },
  prepareScopeUpdate: function (scopeInstance: any, instance: any): void {
    throw new Error('Function not implemented.')
  },
  getInstanceFromScope: function (scopeInstance: any): Element | null {
    throw new Error('Function not implemented.')
  },
  supportsHydration: false,
}

const renderer = Reconciler(hostConfig)

export function injectDevTools() {
  const devTools = renderer.injectIntoDevTools({
    bundleType: 1,
    rendererPackageName: 'react-xul-renderer',
    version: '0.0.3',
  })
  console.log(devTools)
}

export function render(component: any, container: HTMLElement | XULElement) {
  let isStrictMode = false
  let concurrentUpdatesByDefaultOverride = false
  let identifierPrefix = ''

  const root = renderer.createContainer(
    container,
    0,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    (error) => console.error(error),
    null
  )
  renderer.updateContainer(component, root, null)
}
