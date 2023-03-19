import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { deletePosts, loadAllPosts } from "../Services/post-Service";
import Post from "./Post";

// const flag = 0;

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    // const pageSize = 5;
    // loadAllPosts(0,pageSize)
    //   .then((data) => {
    //     console.log(data);
    //     setPostContent(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Error in loading post !")
    //   });
    changePage(0);
  },[]);

  const changePage = (PageNumber = 0, pageSize = 5) => {
    if (PageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }

    if (PageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
        return;
    }
    loadAllPosts(PageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        console.log(data);
        window.scroll(0,0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post !");
      });
  };

  //delete post function
  const deletePost=(post)=>{
    deletePosts(post.postId).then(res=>{
        console.log(res);
        toast.success("Post deleted !")
        let newPostContent = postContent.content.filter(p=>p.postId !== post.postId)
        setPostContent({...postContent,content:newPostContent})
    }).catch(error=>{
        console.log(error);
        toast.error("Error in deleting post")
    })
    
}

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
            // offset: 1,
          }}
        >
          <h3>Total Blogs ({postContent?.totalElements})</h3>

          {postContent.content.map((post) => (
            <Post deletePost={deletePost} post={post} key={post.postId} />
          ))}

          <Pagination size="lg">
            <PaginationItem
              onClick={() => changePage(postContent.pageNumber-1)}
              disabled={postContent.pageNumber === 0}
            >
              <PaginationLink previous>previous</PaginationLink>
            </PaginationItem>

            {[...Array(postContent.totalPages)].map((item, index) => (
              <PaginationItem
                onClick={() => changePage(index)}
                active={index === postContent.pageNumber}
                key={index}
              >
                <PaginationLink>{index+1}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem
              onClick={() => changePage(postContent.pageNumber+1)}
              disabled={postContent.lastPage}
            >
              <PaginationLink last>next</PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
