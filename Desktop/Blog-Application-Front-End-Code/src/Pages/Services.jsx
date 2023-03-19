import Base from "../Components/Base";
import userContext from "../Context/userContext";
const Services = () => {
  return (
    <userContext.Consumer>
      {(user)=>(
        <Base>
        <h1>This is my service page</h1>
        <p>This is our service page</p>
        <h1>Welcome: {user.name}</h1>
      </Base>
      )}
     </userContext.Consumer>
  );
};

export default Services;
