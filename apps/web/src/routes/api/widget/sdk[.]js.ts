import { createFileRoute } from '@tanstack/react-router'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { config } from '@/lib/server/config'

const widgetBundlePath = new URL(
  '../../../../../../packages/widget/dist/browser.js',
  import.meta.url
)

async function loadWidgetBundle(): Promise<string> {
  try {
    return await readFile(fileURLToPath(widgetBundlePath), 'utf8')
  } catch {
    return 'console.warn("Quackback: widget bundle is not built yet.")'
  }
}

function jsResponse(body: string, maxAge: number): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${maxAge}`,
    },
  })
}

export const Route = createFileRoute('/api/widget/sdk.js')({
  server: {
    handlers: {
      GET: async () => {
        const { getWidgetConfig } = await import('@/lib/server/domains/settings/settings.widget')
        const widgetConfig = await getWidgetConfig()
        if (!widgetConfig.enabled) {
          return jsResponse(
            '/* Quackback widget is disabled */ console.warn("Quackback: Widget is disabled for this workspace.");',
            60
          )
        }
        // Prepend a tenant-specific URL. The bundle reads window.__QUACKBACK_URL__
        // during browser-queue init to auto-fire Quackback.init when the script
        // loads via a raw <script src="/api/widget/sdk.js"> tag.
        const prelude = `window.__QUACKBACK_URL__=${JSON.stringify(config.baseUrl)};`
        return jsResponse(prelude + (await loadWidgetBundle()), 3600)
      },
    },
  },
})
