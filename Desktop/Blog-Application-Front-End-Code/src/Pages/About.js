import Base from "../Components/Base";
import userContext from "../Context/userContext";

const About = () => {
  return (
    <userContext.Consumer>
      {(user) => (
        <Base>
          <h1>This is About page</h1>
          <p>We are building a about webpage</p>
          <h1>Welcome user:{user.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
