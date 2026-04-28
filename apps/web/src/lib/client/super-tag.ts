export function getSuperTagLoginUrl(returnTo: string): string {
  const url = new URL('/login', __SUPER_TAG_URL__)
  url.searchParams.set('returnTo', returnTo)
  return url.toString()
}
