import axios from 'axios';
import { API_NOTIFICATION_MESSAGES , SERVICE_URLs} from '../Constants/config';
import { getAccessToken , getType} from '../utils/common-utils';


const API_URL= 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000,
    headers : {
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){

        if(config.TYPE.params){
            config.params = config.TYPE.params;     //handling params, Go to config.js line 29
        }
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;  //handling query, go to config.js line 29
        }  

        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // stop global loader here
        return processResponse(response);
    },
    function (error){
        //stop global loader here
        return Promise.reject(processError(error));
    }
)


//if response is success --> return { isSuccess : true, data : object }
//if error in response --> return { isFailure : false, status : string, msg : string, statusCode : int  }

const processResponse = (response) => {
    if (response?.status === 200){
        return { isSuccess : true, data : response.data}
    }
    else{
        return{
            isFailure : true,
            status : response?.status,
            msg : response?.message,
            code : response?.code
        }
    }
}

const processError = (error) => {
    if (error.response){
        //Request made but server responded with a status other than (2.x.x)
        console.log("Error in response", error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFailure,
            code : error.response.status
        }

    }
    else if (error.request){
        //Request made but no response from the server
        console.log("Error in request", error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.requestFailure,
            code : ""
        }
    }
    else {
        //Something happend in setting up request that triggers an error
        console.log("Error in Network", error.toJSON());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.networkError,
            code : ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLs)){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method : value.method,
            url: value.url,
            data : value.method === 'DELETE' ? {} : body,
            responseType : value.responseType,
            headers : {
                authorization : getAccessToken()
            },
            TYPE : getType(value, body), //checking if params or query which is passed in config
            onUploadProgress : function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress : function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        })
    }

export {API};



