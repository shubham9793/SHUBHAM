import { useContext, useEffect, useState } from "react";
import {  NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../Auth";
import userContext from "../Context/userContext";

function CustomeNavBar() {

  const[login,setLogin] = useState(false);

  const[user,setUser] = useState(undefined);

  const navigate= useNavigate();
  
  const userContextData = useContext(userContext);




  useEffect(()=>{

    setLogin(isLoggedIn())
    setUser(getCurrentUser());

  },[login])


  const logout = () =>{
    doLogout(()=>{
      // LoggedOut
      setLogin(false);
      userContextData.setUser({
        data:null,
        login:false
      })

      navigate("/") // navigate to hame page
    });
  }





  const[isOpen,setIsOpen] = useState(false)

  return (
    <div>
      <Navbar 
        color="dark" 
        dark expand="md" 
        fixed=""
        className="pr50 pl50"
        
      >

        <NavbarBrand tag={ReactLink} to="/" >MyBlogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/contactUs">Contact Us </DropdownItem>
                <DropdownItem tag={ReactLink} to="/services" >Facebook</DropdownItem>
                <DropdownItem tag={ReactLink} to="/services" >LinkedIn</DropdownItem>
                <DropdownItem tag={ReactLink} to="/services" >Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>




          <Nav navbar>

            {
              login && (
                <>
                  <NavItem  >
                    <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>Profile </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/dashboard">{user.name}</NavLink>
                  </NavItem>

                  <NavItem  >
                    <NavLink onClick={logout}>Logout </NavLink>
                  </NavItem>
                </>
              )
            }

          {
            !login && (
              <>
              <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>

              </>
            )
          }

          </Nav>  
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomeNavBar;
