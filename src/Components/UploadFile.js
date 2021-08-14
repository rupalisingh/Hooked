import { v4 as uuid } from 'uuid'
import { database, storage } from '../firebase'



export function UploadFile(props, file) {

    const types = ['video/mp4', 'video/webm', 'video/ogg']
    if (types.indexOf(file.type) == -1) {
        console.log('Please select a video File of mp4, webm or ogg format')
        return
    }

    if (file.size / (1024 * 1024) > 100) {
        console.log('File Size should be less than 100Mb')
        return
    }

    const id = uuid()
    const UploadTask = storage.ref(`post/${props.userDatauserId}/${file.name}`).put(file)
    UploadTask.on('state_changed', progress, fail, success)

    function progress(snapshot) {
        var status = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(status)
    }

    function fail(Error) {
        console.log('error occurred')
    }

    async function success() {
        const videourl = await UploadTask.snapshot.ref.getDownloadURL()
        let obj = {
            comments: [],
            likes: [],
            pid: id,
            pUrl: videourl,
            uProfile: props.userData.profileURL,
            uname: props.userData.username,
            userId: props.userData.userId,
            createdAt: database.getCurrentTimestamp()
        }
        console.log(obj)
        database.posts.add(obj).then(async docRef => {
            let postarrid = docRef.id
            await database.users.doc(props.userData.userId).update({
                postIds: [...props.userData.postIds, postarrid]
            })
        }).catch(error => {
            console.log(error)
        })



        console.log(database)

    }

}


