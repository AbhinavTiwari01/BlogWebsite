import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    picture : {
        type : String
    },

    username : {
        type : String,
        required : true,
    },

    categories : {
        type : String,
        required : true,
    },
    createdDate : {
        type : Date,
    }

})

const postModel = mongoose.model('postCollection', postSchema, 'postCollection')
export default postModel;