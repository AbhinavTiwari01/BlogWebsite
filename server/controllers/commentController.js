import commentModel from "../Schemas/commentSchema.js"

export const newComment  = async(request, response) => {

    try {

        const newComment = await new commentModel(request.body);
        await newComment.save();

        return response.status(200).json({msg: "Post Saved successfully"});

    }catch(err){

    return response.status(500).json({error : err.message});
    }

}

export const getComments = async(request, response)=> {

    try{

          const comments = await commentModel.find({postId : request.params.id});

          return response.status(200).json(comments);

    }catch(err){

        return response.status(500).json({err : err.message});
    }
}

export const deleteComment = async(request, response) => {

    try{

        const comment = await commentModel.findById(request.params.id);
        await comment.delete();

        return response.status(200).json({msg : "Comment deleted successfully"});
    }catch(err){

        return response.status(500).json({err : err.message})
    }

}