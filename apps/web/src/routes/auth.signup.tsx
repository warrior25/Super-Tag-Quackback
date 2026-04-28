import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getSuperTagSignupUrl } from '@/lib/client/super-tag'

/**
 * Portal Signup Page
 *
 * For portal visitors to create accounts using email OTP or OAuth.
 * Creates member record with role='user' (portal users can vote/comment but not access admin).
 */
export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
})

function SignupPage() {
  const superTagSignupUrl = getSuperTagSignupUrl('/')

  useEffect(() => {
    window.location.replace(superTagSignupUrl)
  }, [superTagSignupUrl])

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Redirecting to Super Tag signup</h1>
        <p className="text-sm text-muted-foreground">
          If you are not redirected automatically,{' '}
          <a className="font-medium text-primary hover:underline" href={superTagSignupUrl}>
            continue here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
