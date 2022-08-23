// API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : "loading...",
        message : 'Data is being loaded, please wait'
    },
    success: {
        title : "Success",
        message : 'Data is loaded successfully'    
    },
    responseFailure : {
        title : "Error",
        message : 'An error occured while fetching the response from the server, please try again'
    },
    requestFailure : {
        title : "Error",
        message : 'An error occured while parsing request data'
    },
    networkError : {
        title : "Error",
        message : 'Please check internet connectivity, unable to connect to server'
    }
}


//API SERVICE CALL
//Sample Request
//Need Service call : {url, method, params: true/ false, query : true/false}

export const SERVICE_URLs = {

    userSignup : {url: '/signup', method : 'POST'},
    userLogin  : {url: '/login', method : 'POST'}, 
    uploadFile : {url: 'file/upload', method : 'POST'},
    createPost1 : {url: '/createPost', method: 'POST'},
    getAllPosts: { url: '/posts', method: 'GET', params : true},
    getPostById : {url: '/post', method : 'GET', query: true},
    updatePost : {url : '/update' , method: 'PUT', query : true},
    deletePost : {url : '/delete', method : 'DELETE', query : true},
    newComment : {url : '/comment/new', method : 'POST'},
    getAllComments : {url : '/comments', method : 'GET', query : true},
    deleteComment : {url: '/comment/delete', method : 'DELETE', query:  true},
}