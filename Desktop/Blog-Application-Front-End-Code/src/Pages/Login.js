import { useContext, useState } from "react";
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
    FormGroup,
    Input,
    Label,
    Row,
  } from "reactstrap";

import Base from "../Components/Base";
import { login } from "../Services/user-service";
import { doLogin } from "../Auth";
import userContext from "../Context/userContext";
const Login = () => {


  const navigate = useNavigate();
  const userContextData = useContext(userContext)



  const[loginDetail,setLoginDetail] = useState({
    username:'',
    password:''
  })


  const handleChange=(event,property) =>{  // Login fun
    setLoginDetail({...loginDetail,[property]:event.target.value}) // Dynamic setting the value
  }


  const handleFormSubmit=(event) =>{
    event.preventDefault();



    if(loginDetail.username.trim() === null || loginDetail.username.trim() === '') {
      toast.error("Email is required !")
      return;
    }

    if(loginDetail.password.trim() === null || loginDetail.password.trim() === '') {
      toast.error("Password is required !")
      return ;
    }


    // Submit the data to server to genrate the token
    login(loginDetail).then((data)=>{

      // Save the data to localStorage 
      doLogin(data,()=>{
        console.log("Login details is saved to localStorate.... ")
        // redirect to userDashboard page
        userContextData.setUser({
          data:data.user,
          login:true
        }) 
        navigate("/user/dashboard");
      })


      toast.success("logged In !")
    }).catch((error)=>{
      console.log(error);
      if(error.response.status === 400  || error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on the server !");
      }
      
    })
    
  }


    return (
        <Base>
          <Container>
            <Row style={{ marginTop: "10px" }} className="full-width">
              <Col sm={{ size: 6, offset: 3 }}>
                <Card color="dark" inverse>
                  <CardHeader className="text-center">
                    <h2>Login Here!</h2>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                          
                      <FormGroup>
                        <Label for="name">Enter Email</Label>
                        <Input
                          id="username"
                          type="email"
                          placeholder="Enter here"
                          value={loginDetail.username} // Binding the data 
                          onChange={(e)=>handleChange(e,"username")}
                          
                        />
                      </FormGroup>
    
                      <FormGroup>
                        <Label for="password">Enter Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter here"
                          value={loginDetail.password} // Binding the data 
                          onChange={(e)=>handleChange(e,"password")}
                          
                        />
                      </FormGroup>
    
                      <Container className="text-center">
                        <Button outline color="light">Login</Button>
                        <Button outline color="light" style={{marginLeft:"20px"}} tag={ReactLink} to="/signup" >SignUp</Button>
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

export default Login;
