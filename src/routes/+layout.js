import { locales } from '../locales/data.js'
import { loadLocale } from 'wuchale/load-utils'
// so that the loaders are registered, only here, not required in nested ones (below)
import '../locales/main.loader.svelte.js'

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ url }) => {
    const locale = url.searchParams.get('locale') ?? 'en'
    if (locales.includes(locale)) {
        await loadLocale(locale)
    }
    return { locale }
}
