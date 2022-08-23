import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'

dotenv.config();

const username= process.env.DB_USERNAME;

const password= process.env.DB_PASSWORD;


const storage= new GridFsStorage({

    url: `mongodb://${username}:${password}@crud-app-shard-00-00.0ihah.mongodb.net:27017,crud-app-shard-00-01.0ihah.mongodb.net:27017,crud-app-shard-00-02.0ihah.mongodb.net:27017/PROJECT1?ssl=true&replicaSet=atlas-12hxyj-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options : { useNewUrlParser : true },
    file : (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType)=== -1){
            return `${Date.now()}-blog-${file.originalName}`
        }
        return {
            bucketName : 'photos',
            fileName : `${Date.now()}-blog-${file.originalName}`
        }
    }  
})

export default multer({storage});
