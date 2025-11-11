import { loadLocale } from 'wuchale/load-utils'
import { locales } from '../locales/data.js'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies, url }) => {
    const qsLocale = url.searchParams.get('locale')
    const cookieLocale = cookies.get('locale')
    const locale = locales.includes(qsLocale ?? '') ? qsLocale : (locales.includes(cookieLocale ?? '') ? cookieLocale : 'en')
    // Persist selection
    if (qsLocale && qsLocale !== cookieLocale) {
        cookies.set('locale', qsLocale, { path: '/', httpOnly: false, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
    }
    // Ensure catalogs are loaded on the server for SSR
    await loadLocale(locale)
    return { locale }
}

