import { BsArrowBarRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import logo from "../../assets/image/logo.png";
import "./header.scss";

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user);

  return (
    <>
      <header className="container header">
        <img src={logo} alt="" />

        {!!user && (
          <div className="content">
            <div className="content-right">
              <ul>
                <li>My Control</li>
                <li>Partner</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="content-left">
              <div className="user">
                <p className="money">$0.00 USDT</p>
                <div className="account">
                  <span>{user.user.username}</span>
                  <button>{!!user ? "Account" : "Login"}</button>
                  <div className="wrapper">
                    <div className="logout">
                      <div className="icon">
                        <BsArrowBarRight />
                      </div>
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
