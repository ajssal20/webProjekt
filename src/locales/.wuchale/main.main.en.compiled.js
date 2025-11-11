
            export let c = ["Photo Blog","Articles","Back to Home","Logout","+ Create a new article","ID:","Description:","Author:","Votes:","Delete","Login","E-Mail","Password","Create a new article","Back to Admin","Image","Description","Author","Create article","← Back","Uploaded",[0," likes"],"Comments","Your Name","Your Comment","Add Comment","Language:","EN","ES","DE","FR","SQ","Language",[0," • ",1," likes"]]
            // only during dev, for HMR
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) {
                    return
                }
                for (const [ index, item ] of data['en'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        