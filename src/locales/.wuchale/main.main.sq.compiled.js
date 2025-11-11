
            import { c as c_en } from './main.main.en.compiled.js'
            export let c = [...c_en]
            const set = (en, sq) => { const i = c_en.indexOf(en); if (i !== -1) c[i] = sq }
            const setArr = (probe, sqArr) => {
                const i = c_en.findIndex(v => Array.isArray(v) && Array.isArray(probe) && v.length===probe.length && v.every((x,idx)=> x===probe[idx]))
                if (i !== -1) c[i] = sqArr
            }
            set('Photo Blog','Blogu i fotografive')
            set('Articles','Artikujt')
            set('Back to Home','Kthehu te faqja kryesore')
            set('Logout','Dil')
            set('+ Create a new article','+ Krijo artikull të ri')
            set('ID:','ID:')
            set('Description:','Përshkrimi:')
            set('Author:','Autori:')
            set('Votes:','Votat:')
            set('Delete','Fshi')
            set('Login','Hyr')
            set('E-Mail','E-mail')
            set('Password','Fjalëkalimi')
            set('Create a new article','Krijo artikull të ri')
            set('Back to Admin','Kthehu te administrimi')
            set('Image','Imazh')
            set('Description','Përshkrimi')
            set('Author','Autori')
            set('Create article','Krijo artikullin')
            set('Uploaded','Ngarkuar')
            setArr([0,' likes'],[0,' pëlqime'])
            set('Comments','Komente')
            set('Your Name','Emri juaj')
            set('Your Comment','Komenti juaj')
            set('Add Comment','Shto koment')
            set('�+? Back','Kthehu')
            set('Language:','Gjuha:')
            set('EN','EN'); set('DE','DE'); set('FR','FR'); set('SQ','SQ')
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) return
                for (const [ index, item ] of data['sq'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        
