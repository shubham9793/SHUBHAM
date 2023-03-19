import { useEffect, useState, useRef } from "react";
import { loadAllCategory } from "../Services/category-service";
import JoditEditor from "jodit-react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Container,
  Button,
} from "reactstrap";

import { createPost as _createPost } from "../Services/post-Service";
import { getCurrentUser } from "../Auth";
import { toast } from "react-toastify";

const AddPost = () => {
  const editor = useRef(null); // for rich editor
  const [user,setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]); // loading category dynamically
  useEffect(() => { // ==> load all the category when this component will load


    
    setUser(getCurrentUser()) // find the user which is currently login
    loadAllCategory() // Load All category
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {// Binding the value to the field
    
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleContentField = (data) => {
    setPost({ ...post, content: data });
  };

  const handleRest = () => { // =>Function to reset data
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
  };


  const createPost=(event) =>{ // Submit Form// create post 
    event.preventDefault();
    //console.log(post)
    console.log("Sumited")

    if(post.title.trim()==='' ) {
        alert("Title is required")
        return;
    }

    if(post.content.trim()==='' ) {
        alert("Content is required")
        return ;
    }

    if(post.categoryId.trim()==='' ) {
        alert("Choose category")
        return ;
    }


    post['userId'] = user.id;
    // Submit the from
    _createPost(post).then(data=>{  // ==>   calling the method my services file
        console.log(post);
        toast.success("Post Created !")
        setPost({
            title:'',
            content:'',
            categoryId:'',
        })
    }).catch((error)=>{
        toast.error("Error While createing post !")
        
    })

  }

  return (
    <div className="wrapper mt20">
      <Card className="mt20 shadow-sm">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3 className="  text-center  mb20">Add Post </h3>
          <Form onSubmit={createPost}>
            {/* Title field */}

            <div className="mt20">
              <Label for="name">Post title</Label>
              <Input
                type="text"
                placeholder="Enter Here"
                name="title"
                id="title"
                onChange={handleChange}
                value={post.title}
              />
            </div>

            {/* Content Field */}
            <div className="mt20">
              <Label for="content">Post content</Label>
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={handleContentField}
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
                onChange={handleChange}
                defaultValue={0}
              >
                <option disabled value={0}>--Select category--</option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center mt20">
              <Button color="primary"> Create Post</Button>
              <Button color="danger" className="ml20" onClick={handleRest}>
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
