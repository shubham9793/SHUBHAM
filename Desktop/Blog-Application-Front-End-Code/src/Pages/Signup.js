import { useState } from "react";
import { signup } from "../Services/user-service";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../Components/Base";

const Signup = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const[error,setError] = useState({
    errors:{},
    isError:false
  })

  const navigate  = useNavigate();

  // handleChange
  const handleChange = (event, property) => {
    
    setData({ ...data, [property]: event.target.value }); // Dynamic setting the value
  };

  // Submit Form
  const submitForm = (event) => {
    
    // if(error.isError) {      // if have any error 
    //   toast.error("Invalid Data!");
    //   setError({...error,isError:false})
    //   return ;
    // }

    // prevent Defauld behaviours
    event.preventDefault();
    // Data Validate

    // calling servers api for sending data
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        toast.success("User is registered Seccessfully !!"+resp.id);

        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });

        navigate("/login");

      }).catch((error)=>{
        console.log(error);
        console.log("Error Log");
        // Handle error in prop way
        setError({
          errors:error,
          isError:true
        })
      });
  };

  return (
    <Base>
      <Container>
        <Row style={{ marginTop: "10px" }} className="full-width">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <h2>Signup Here !</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter here"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name ? true:false}
                     
                    />
                    <FormFeedback>
                      { error.errors?.response?.data?.name }
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter here"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={error.errors?.response?.data?.email ? true:false}
                    />
                     <FormFeedback>
                      { error.errors?.response?.data?.email }
                    </FormFeedback>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter here"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password ? true:false}
                    />
                     <FormFeedback>
                      { error.errors?.response?.data?.password }
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      id="about"
                      type="textarea"
                      placeholder="Enter here"
                      style={{ height: "110px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={error.errors?.response?.data?.about ? true:false}
                    />
                     <FormFeedback>
                     { error.errors?.response?.data?.about }
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button type="submit" outline color="light">
                      Register
                    </Button>
                    <Button
                      outline
                      color="light"
                      tag={ReactLink}
                      to="/login"
                      style={{marginLeft:"20px"}}
                    >
                      Login
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
