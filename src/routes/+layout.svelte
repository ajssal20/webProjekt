<script>
    import '../app.css'
    import '../locales/main.loader.svelte.js'
    import { getRuntimeRx } from '../locales/main.loader.svelte.js'
    let { children, data } = $props()
    const current = data?.locale ?? 'en'
    const __i18n = getRuntimeRx()
    function toLocale(loc) {
        // Preserve existing params on the client, otherwise fall back
        const qs = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams()
        qs.set('locale', loc)
        const q = qs.toString()
        return q ? `?${q}` : ''
    }
    function changeLocale(loc) {
        if (typeof location === 'undefined') return
        // Remember selection so it persists across navigation
        document.cookie = `locale=${loc}; Path=/; Max-Age=${60 * 60 * 24 * 365}`
        const qs = new URLSearchParams(location.search)
        qs.set('locale', loc)
        const q = qs.toString()
        const url = q ? `${location.pathname}?${q}` : location.pathname
        location.assign(url)
    }
</script>

<header class="w-full border-b border-gray-200">
    <div class="max-w-5xl mx-auto flex items-center justify-end p-3">
        <div class="flex items-center gap-2 text-sm">
            <span>Language:</span>
            <div class="relative">
                <select
                    aria-label="Language"
                    on:change={(e) => changeLocale(e.target.value)}
                    value={current}
                    class="px-2 py-1 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">EN</option>
                    <option value="de">DE</option>
                    <option value="fr">FR</option>
                    <option value="sq">SQ</option>
                </select>
            </div>
        </div>
    </div>
    </header>

{@render children()}
