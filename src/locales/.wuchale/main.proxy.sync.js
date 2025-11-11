
            import * as _w_c_main_0_ from './main.main.en.compiled.js'
import * as _w_c_main_1_ from './main.main.de.compiled.js'
import * as _w_c_main_2_ from './main.main.fr.compiled.js'
import * as _w_c_main_3_ from './main.main.sq.compiled.js'
            /** @type {{[loadID: string]: {[locale: string]: import('wuchale/runtime').CatalogModule}}} */
            const catalogs = {main: {en: _w_c_main_0_,de: _w_c_main_1_,fr: _w_c_main_2_,sq: _w_c_main_3_}}
            export const loadCatalog = (/** @type {string} */ loadID, /** @type {string} */ locale) => {
                const map = catalogs[loadID] || {}
                return map[locale] || map['en']
            }
            export const loadIDs = ['main']
        
