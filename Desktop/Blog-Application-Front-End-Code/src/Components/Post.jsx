import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../Auth";
import userContext from "../Context/userContext";


function Post({post={id:-1,title:"This is default post Title",content:"This is default post Content"},deletePost}) {

    const[user,setUser]=useState(null)
    const[login,setLogin] = useState(null)
    const userContextData = useContext(userContext);

    useEffect(()=>{
        setUser(getCurrentUser())
        setLogin(isLoggedIn())
        
    },[])


    return (
        <Card  className="border-0 shadow-sm mt20">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)+"..."}}>
                    
                </CardText>
                <div>
                    <Link className="btn btn-secondary " to={"/Posts/"+post.postId}>Read...</Link>

                    { userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={()=>deletePost(post)} className="ml20" color="danger">Delete</Button>:'')}
                    { userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} className="ml20" color="warning">Update</Button>:'')}

                </div>
            </CardBody>
        </Card>
    )
}


export default Post;