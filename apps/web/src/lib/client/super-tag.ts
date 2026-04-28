export function getSuperTagLoginUrl(returnTo: string): string {
  const url = new URL('/login', __SUPER_TAG_URL__)
  url.searchParams.set('returnTo', returnTo)
  return url.toString()
}

export function getSuperTagSignupUrl(returnTo: string): string {
  const url = new URL('/login', __SUPER_TAG_URL__)
  url.searchParams.set('returnTo', returnTo)
  url.searchParams.set('tab', 'signup')
  return url.toString()
}
