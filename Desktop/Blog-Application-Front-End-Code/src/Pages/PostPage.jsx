import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import Base from "../Components/Base";
import { createComment, loadPost } from "../Services/post-Service";
import { BASE_URL } from "../Services/Helper";
import { isLoggedIn } from "../Auth";
const PostPage = () => {

    const {postId} = useParams();
    const[post,setPost] = useState(null)
    const[comment,setComment] = useState({
        content:''
    })

    useEffect(()=>{
        // load posts of postId
        loadPost(postId).then((data)=>{
            console.log(data);
            setPost(data)
        }).catch(error=>{
            console.log(error);
            toast.error("Error while fetching the posts details !")
        })
    },[postId])


    //print data
    const printDate = (numbers) =>{
        return new Date(numbers).toLocaleDateString();
    }



    // submit comments
    const submitComment=()=>{
        if(!isLoggedIn()) {
            toast.error("You are not loggedIn !")
        }
        if(comment.content.trim()==='') {
            return;
        }
        createComment(comment,post.postId).then(data=>{
            console.log(data);
            toast.success("Comment added !");
            setPost({
                ...post,
                comments:[...post.comments,data]
            })
            setComment({
                content:''
            })
        })
    }




  return (
    <Base>
      <div>
        <Container className="mt20">
            <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>)}
            <Row>
                <Col md={{size:12}}>
                    <h1 className="text-center">Post Details</h1>
                    <Card className="mt-3">
                        {
                            (post) && (
                                <CardBody>
                                <CardText> Posted by <b> {post.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                
                                <CardText>
                                    <span className="text-muted"> {post.category.categoryTitle}</span>
                                </CardText>

                                <div className="divder" style={{
                                    width:"100%",
                                    height:'1px',
                                    background:"#e2e2e2"
                                }}></div>
                                <h1 className="mt20">{post.title}</h1>
                                
                                <div className="image-container mt20 container text-center" style={{width:"50% "}}>
                                <img className="img-fluid" src={BASE_URL+'/api/post/image/'+post.imageName} alt="" />
                                </div>


                                <CardText className="mt20" dangerouslySetInnerHTML={{__html:post.content}}>

                                </CardText>
                            </CardBody>
                            )
                        }
                    </Card>
                </Col>  
            </Row>

            <Row className="mt20">
                <Col md={
                    {
                        size:9,
                        offset:1
                    }
                }>
                    <h2>Comments ({post?post.comments.length:0}) </h2>
                    {
                        post && post.comments.map((c,index)=>(
                            <Card className="mt20" key={index}>
                                <CardBody>
                                    <CardText>{c.content}</CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                    <Card className="mt20" >
                                <CardBody>
                                    <Input 
                                        type="textarea" 
                                        placeholder="Enter comment here" 
                                        value={comment.content}
                                        onChange={(event)=>setComment({content:event.target.value})}
                                    />
                                    <Button onClick={submitComment} className="mt20" color="primary">comment</Button>
                                </CardBody>
                            </Card>
                </Col>
            </Row>
        </Container>
      </div>
    </Base>
  );
};

export default PostPage;
