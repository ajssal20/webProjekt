
            /** @type {{[loadID: string]: {[locale: string]: () => Promise<import('wuchale/runtime').CatalogModule>}}} */
            const catalogs = {main: {en: () => import('./main.main.en.compiled.js'),de: () => import('./main.main.de.compiled.js'),fr: () => import('./main.main.fr.compiled.js'),sq: () => import('./main.main.sq.compiled.js')}}
            export const loadCatalog = async (/** @type {string} */ loadID, /** @type {string} */ locale) => {
                const map = catalogs[loadID] || {}
                const load = map[locale] || map['en']
                try {
                    return await load()
                } catch (e) {
                    if (load !== map['en'] && map['en']) {
                        return await map['en']()
                    }
                    throw e
                }
            }
            export const loadIDs = ['main']
        
