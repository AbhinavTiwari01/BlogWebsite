import postModel from '../Schemas/postSchema.js';

export const createPost = async(request, response)=> {

    try{
   const postValues = new postModel(request.body);
   
   await postValues.save();

   return response.status(200).json({postData: postValues, msg: "Post Saved successfully" });
    
    }catch(err){

        return response.status(500).json(err);

    }
}

export const getAllPosts = async(request, response)=> {

    let category =  request.query.category;
    let allData;

    try{
        if(category){
           allData  = await postModel.find({categories : category});
        }
        else {        
        allData = await postModel.find({});
        }

        return response.status(200).json(allData);

    }catch(err){

        return response.status(500).json({msg : error.message});
    }

}

export const getPost = async(request, response)=> {

    try{

        let postData = await postModel.findById(request.params.id);
        return response.status(200).json(postData);

    }catch(err){

        return response.status(500).json({msg: err.message});
    }

}

export const updatePostData  = async(request, response)=> {
    
    try{

        const post =  await postModel.findById(request.params.id);

        if(!post){

            return response.status(404).json({msg : "Post not found"});
        }

        await postModel.findByIdAndUpdate(request.params.id, {$set : request.body})

        return response.status(200).json({msg : "Post is updated"})

    }catch(err){

        return response.status(500).json({msg : err.message});
    }
}

export const deletePost = async(request, response) => {

    try{
        const post =  await postModel.findById(request.params.id);

        if(!post){

            return response.status(404).json({msg : "Post not found"});
        }

        await post.delete();

        return response.status(200).json({msg : "Post Deleted Successfully"});

    }catch(err){

        return response.status(404).json({msg : err.message});

    }

}