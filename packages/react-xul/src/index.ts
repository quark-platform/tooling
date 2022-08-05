import { diff } from 'deep-object-diff'
import Reconciler, { Fiber, HostConfig, OpaqueHandle } from 'react-reconciler'
import {
  XULDocument,
  XULElement,
  xulElements,
  XULElementsName,
} from 'xul-elements'

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
    if (xulElements.includes(type)) {
      return (document as XULDocument).createXULElement(type as XULElementsName)
    }

    return document.createElement(type)
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
    for (const prop in props) {
      if (typeof props[prop] === 'function') {
        instance.addEventListener(
          prop.replace('on', '').toLowerCase(),
          props[prop]
        )

        continue
      }

      let propName = prop

      // We should not handle children here
      if (prop == 'children') continue
      if (prop == 'className') propName = 'class'

      if (propName == 'style') {
        let style = ''
        for (const styleProp in props[prop]) {
          style += `${styleProp}: ${props[prop][styleProp]};`
        }

        instance.setAttribute('style', style)
        continue
      }

      instance.setAttribute(propName.toLowerCase(), props[prop])
    }
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
      let propName = updated

      if (propName == 'className') {
        propName = 'class'
      }

      if (typeof updatePayload[updated] === 'undefined') {
        instance.removeAttribute(propName)
        continue
      }

      const newVal = nextProps[updated]

      if (typeof newVal === 'function') {
        instance.removeEventListener(
          propName.replace('on', '').toLowerCase(),
          prevProps[updated]
        )
        instance.addEventListener(
          propName.replace('on', '').toLowerCase(),
          newVal
        )

        continue
      }

      if (propName == 'style') {
        let style = ''
        for (const styleProp in nextProps[updated]) {
          style += `${styleProp}: ${nextProps[updated][styleProp]};`
        }

        instance.setAttribute('style', style)
        continue
      }

      instance.setAttribute(propName.toLowerCase(), newVal)
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
    version: '18.0.15',
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
