import AddPost from "../../Components/AddPost";
import Base from "../../Components/Base";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../Auth";
import { loadPostUserWise,deletePosts } from "../../Services/post-Service";
import { toast } from "react-toastify";
import Post from "../../Components/Post";

const UserDashboard = () =>{

    const [user,setUser] = useState({})
    const [posts,setPosts] = useState([])
    
    useEffect(()=>{
        
        setUser(getCurrentUser())
        loadPostData();
        
    },[])


    function loadPostData() {
        loadPostUserWise(getCurrentUser().id).then(data=>{
            console.log(data);
            setPosts([...data])
            console.log(getCurrentUser().id);
        }).catch(error=>{
            console.log(error);
            toast.error("Error While User's post loading!")
        })
    }
    //delete post function
    const deletePost=(post)=>{
        deletePosts(post.postId).then(res=>{
            console.log(res);
            toast.success("Post deleted !")
           let newPosts =  posts.filter(p=>p.postId !== post.postId)
           setPosts([...newPosts])
        }).catch(error=>{
            console.log(error);
            toast.error("Error in deleting post")
        })
        
    }
    return (
       <Base>
        <Container>
            <AddPost />
            <h1 className="mt20">Posts Count:({posts.length})</h1>
            {
                posts.map((post,index)=>{
                    return(
                        <Post post={post} key={index} deletePost={deletePost} />
                    )
                })
            }
        </Container>
       </Base>
    )
}

export default UserDashboard;