import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Col, Container, Row } from "reactstrap";
import Base from "../Components/Base";
import CategorySideMenu from "../Components/CategorySideMenu";
import Post from "../Components/Post";
import { deletePosts, loadPostCategoryWise } from "../Services/post-Service";

function Categories() {
  const {categoryId} = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while load posts from server");
      });
  }, [categoryId]);



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
      <Container className="mt20">
        <Row>
          <Col md={2} className="mt30">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h2>Total Blogs :({posts.length})</h2>
            {posts &&
              posts.map((post, index) => {
                return <Post key={index} post={post} deletePost={deletePost} />;
              })}

              <Card className="mt50 text-center">{posts.length<=0?<h2>No posts are available in this category</h2>:''}</Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
