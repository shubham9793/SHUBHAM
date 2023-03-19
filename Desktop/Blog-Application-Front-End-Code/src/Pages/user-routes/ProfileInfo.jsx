import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import Base from "../../Components/Base";
import { getUser } from "../../Services/user-service";
const ProfileInfo = () => {

  const{userId} = useParams();
  const[user,setUser]=useState([])

  useEffect(()=>{
    getUser(userId).then(data=>{
      
      setUser({...data})
      console.log(data)
    }).catch(error=>{
      console.log(error);
      toast.error("Error while loading users details!");
    })
  },[])
  
  const userView=()=>{
    return (
      <Row>
        <Col md={{size:8,offset:2}}>
        <Card className="mt20 border-0">
          <CardBody>
          <h2 className="text-center mt20">User's Profile </h2>
          <Container className="text-center mt20">
            <img style={{borderRadius:"50%",maxHeight:"250px",maxWidth:"250px"}} src={"https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"} alt="default pic" className="img-fluid" />
          </Container>
          <Table hover bordered={true} className="mt20 text-center">
            <tbody>
              <tr>
                <td>BLOG ID</td>
                <td>BLOG-{user.id}</td>
              </tr>
              <tr>
                <td>User's Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>UserName/Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>About</td>
                <td>{user.about}</td>
              </tr>
            </tbody>
          </Table>
          </CardBody>
        </Card>
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {user? userView():''}
    </Base>
  );
};

export default ProfileInfo;
