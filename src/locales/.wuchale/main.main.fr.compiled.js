
            import { c as c_en } from './main.main.en.compiled.js'
            export let c = [...c_en]
            const set = (en, fr) => { const i = c_en.indexOf(en); if (i !== -1) c[i] = fr }
            const setArr = (probe, frArr) => {
                const i = c_en.findIndex(v => Array.isArray(v) && Array.isArray(probe) && v.length===probe.length && v.every((x,idx)=> x===probe[idx]))
                if (i !== -1) c[i] = frArr
            }
            set('Photo Blog','Blog photo')
            set('Articles','Articles')
            set('Back to Home','Retour à l’accueil')
            set('Logout','Déconnexion')
            set('+ Create a new article','+ Créer un nouvel article')
            set('ID:','ID :')
            set('Description:','Description :')
            set('Author:','Auteur :')
            set('Votes:','Votes :')
            set('Delete','Supprimer')
            set('Login','Connexion')
            set('E-Mail','E‑mail')
            set('Password','Mot de passe')
            set('Create a new article','Créer un nouvel article')
            set('Back to Admin','Retour à l’admin')
            set('Image','Image')
            set('Description','Description')
            set('Author','Auteur')
            set('Create article','Créer l’article')
            set('Uploaded','Téléversé')
            setArr([0,' likes'],[0," mentions J’aime"])
            set('Comments','Commentaires')
            set('Your Name','Votre nom')
            set('Your Comment','Votre commentaire')
            set('Add Comment','Ajouter un commentaire')
            set('�+? Back','Retour')
            set('Language:','Langue :')
            set('EN','EN'); set('DE','DE'); set('FR','FR'); set('SQ','SQ')
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) return
                for (const [ index, item ] of data['fr'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        
