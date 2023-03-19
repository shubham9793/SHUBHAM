import { privateAxios } from "./Helper";
import { myAxios } from "./Helper";
// create post function
export const createPost = (postData) => {
  // console.log(postData);
  return privateAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

// Get ALl Post

export const loadAllPosts = (pageNumber,pageSize) => {
  return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response) => response.data);
};




// Load post by given id

export const loadPost=(postId) =>{
  return myAxios.get("/api/posts/"+postId).then((response) => response.data);
}


// Add Comments 

export const createComment=(comment,postId)=>{
  return privateAxios.post(`/api/post/${postId}/comments`,comment).then((response) => response.data);
}


// get category wise posts
export function loadPostCategoryWise(categoryId){
  return privateAxios.get(`/api/category/${categoryId}/posts`).then((response) => response.data);
}

export const loadPostUserWise=(userId)=>{
  return privateAxios.get(`/api/user/${userId}/posts`).then((response) => response.data);
}

// delete posts
export const deletePosts=(postId)=>{
  return privateAxios.delete(`/api/posts/${postId}`).then((response) => response.data);
}

// update Post
export const updatePosts=(post,postId)=>{
  return privateAxios.put(`/api/posts/${postId}`,post).then((response) => response.data);
}