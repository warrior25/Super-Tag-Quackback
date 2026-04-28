import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { settingsQueries } from '@/lib/client/queries/settings'
import { getSuperTagLoginUrl, getSuperTagSignupUrl } from '@/lib/client/super-tag'

/**
 * Portal Login Page
 *
 * For portal users (visitors) to sign in using email OTP or OAuth.
 */
export const Route = createFileRoute('/auth/login')({
  loader: async ({ context }) => {
    // Settings already available from root context
    const { settings, queryClient } = context
    if (!settings) {
      throw redirect({ to: '/onboarding' })
    }

    // Pre-fetch portal config using React Query
    await queryClient.ensureQueryData(settingsQueries.publicPortalConfig())

    return {}
  },
  component: LoginPage,
})

function LoginPage() {
  Route.useLoaderData()
  const superTagLoginUrl = getSuperTagLoginUrl('/')
  const superTagSignupUrl = getSuperTagSignupUrl('/')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in with Super Tag or continue to admin login
          </p>
        </div>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <a href={superTagLoginUrl}>Sign in with Super Tag</a>
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">Admin access</span>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to="/admin/login">Login with Quackback credentials</Link>
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <a href={superTagSignupUrl} className="font-medium text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
