import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import TaskForm from "../Forms/TaskForm";
import NavBar from "./NavBar";

const Layout = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const handleClose = () => {
    setIsFormVisible(false);
  };

  const handleOpen = () => {
    setIsFormVisible(true);
  };
  const handelLogOut = () => {
    authCtx.logOut();
  };

  return (
    <>
      <NavBar handleFormOpen={handleOpen} onLogout={handelLogOut} />
      {isFormVisible && <TaskForm onClose={handleClose} />}
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
