export function toKebabCase(str: string): string {
  // https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case

  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
