import JoditEditor from "jodit-react";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import Base from "../Components/Base";
import userContext from "../Context/userContext";
import { loadPost, updatePosts } from "../Services/post-Service";
import { loadAllCategory } from "../Services/category-service";

function UpdateBlog() {
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const editor = useRef(null); // for rich editor

  const [categories, setCategories] = useState([]); // loading category dynamically
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllCategory() // Load All category
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Load the selected blog
    loadPost(blogId)
      .then((data) => {
        setPost({ ...data,categoryId:data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while loading blogs!");
      });
  }, []);

  useEffect(() => {
    if (post) {
      if (post.user.id !== object.user.data.id) {
        toast.error("this is not your blog!");
        navigate("/");
      }
    }
  }, [post]);


  const handleChange=(event,fieldName)=>{
    setPost({
        ...post,
        [fieldName]:event.target.value
    })
  }


 const updatePost=(event)=>{
    event.preventDefault()
    console.log(post)
    updatePosts({...post,category:{categoryId:post.categoryId}},post.postId).then(data=>{
        console.log(data);
        toast.success("Post updated")
    }).catch(error=>{
        console.log(error);
        toast("Error while updateing post")
    })
 }

  const updateHtml = () => {
    return (
      <div className="wrapper mt20">
        <Card className="mt20 shadow-sm">
          <CardBody>
            {/* {JSON.stringify(post)} */}
            <h3 className="  text-center  mb20">Update Posts </h3>
            <Form onSubmit={updatePost}>
              {/* Title field */}

              <div className="mt20">
                <Label for="name">Post title</Label>
                <Input
                  type="text"
                  placeholder="Enter Here"
                  name="title"
                  id="title"
                  value={post.title}
                  onChange={(event)=>handleChange(event,'title')}
                />
              </div>

              {/* Content Field */}
              <div className="mt20">
                <Label for="content">Post content</Label>
                <JoditEditor 
                    ref={editor} 
                    value={post.content}
                    onChange={newContent=>setPost({...post,content:newContent})}
                />
              </div>

              {/* Category field loading value from category controller */}
              <div className="mt20">
                <Label for="name">Select category</Label>
                <Input
                  id="categoryId"
                  name="categoryId"
                  type="select"
                  placeholder="Select category"
                  value={post.categoryId}
                  onChange={(event)=>handleChange(event,'categoryId')}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>
                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center mt20">
                <Button color="primary"> Update Post</Button>
                <Button color="danger" className="ml20" onClick={""}>
                  Reset
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
        
      <Container>{post&&updateHtml()}</Container>
    </Base>
  );
}

export default UpdateBlog;
