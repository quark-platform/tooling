/**
 * This file provides assorted polyfills for reacts event system
 */

/**
 * Polyfills some of the methods that React provides by default
 * https://reactjs.org/docs/events.html
 *
 * @param event The dom event
 * @returns A polyfilled event
 */
export const polyfillEvent = (event: any) => {
  /**
   * Persist does nothing in React 17 onwards, but some libraries still use it
   */
  event.persist = () => {}

  return event
}

/**
 * React events often behave a touch differently than the browser events do,
 * primarily to reduce confusion. This maps React events to more appropriate
 * browser events. These include:
 *
 * - onChange -> oninput: React onChange happens with every keystroke, not onSubmit
 *
 * @param eventName The react event name
 * @returns The dom event object property name
 */
export const getEventName = (eventName: string): string =>
  eventName == 'onChange' ? 'oninput' : eventName.toLowerCase()
