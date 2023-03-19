import { myAxios } from "./Helper";


// Register the user 
export const signup =(data)=>{
    return myAxios.post("/api/v1/auth/register",data).then((response)=>response.data)
}


// Login the user
 
export const login=(loginDetail)=>{
      return myAxios.post('/api/v1/auth/login',loginDetail).then((response)=>response.data)
}


// get User details
export const getUser=(userId)=>{
    return myAxios.get(`/api/users/${userId}`).then((response)=>response.data)
}