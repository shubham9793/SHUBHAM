import CustomeNavBar from "./CustomeNavBar";

const Base = ({ title = "Welcome to the our website.", children }) => {
  return (
    <div className="contqiner-fluid">
      <CustomeNavBar/>
      {children}
    </div>
  );
};

export default Base;
