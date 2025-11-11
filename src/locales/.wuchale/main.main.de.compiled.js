
            import { c as c_en } from './main.main.en.compiled.js'
            export let c = [...c_en]
            // Provide translations by lookup so we don't depend on indices
            const set = (en, de) => { const i = c_en.indexOf(en); if (i !== -1) c[i] = de }
            const setArr = (probe, deArr) => {
                const i = c_en.findIndex(v => Array.isArray(v) && Array.isArray(probe) && v.length===probe.length && v.every((x,idx)=> x===probe[idx]))
                if (i !== -1) c[i] = deArr
            }
            // Common UI
            set('Photo Blog','Foto-Blog')
            set('Articles','Artikel')
            set('Back to Home','Zurück zur Startseite')
            set('Logout','Abmelden')
            set('+ Create a new article','+ Neuen Artikel erstellen')
            set('ID:','ID:')
            set('Description:','Beschreibung:')
            set('Author:','Autor:')
            set('Votes:','Stimmen:')
            set('Delete','Löschen')
            set('Login','Anmelden')
            set('E-Mail','E-Mail')
            set('Password','Passwort')
            set('Create a new article','Neuen Artikel erstellen')
            set('Back to Admin','Zurück zur Verwaltung')
            set('Image','Bild')
            set('Description','Beschreibung')
            set('Author','Autor')
            set('Create article','Artikel erstellen')
            set('Uploaded','Hochgeladen')
            setArr([0,' likes'],[0,' Gefallen'])
            set('Comments','Kommentare')
            set('Your Name','Dein Name')
            set('Your Comment','Dein Kommentar')
            set('Add Comment','Kommentar hinzufügen')
            set('�+? Back','Zurück')
            // Language selector labels
            set('Language:','Sprache:')
            set('EN','EN'); set('DE','DE'); set('FR','FR'); set('SQ','SQ')
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) return
                for (const [ index, item ] of data['de'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        
