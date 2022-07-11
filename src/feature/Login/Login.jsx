import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import * as yup from "yup";
import Input from "../../components/FormCtrl/InputField/Input";
import { loginUser } from "../../server/ApiRequest";
import "./login.scss";

const Login = () => {
  const captcha = useRef(null);
  const [captchaValid, setCaptchaValid] = useState(null);
  const [captchaError, setCaptchaError] = useState(null);
  const [password, setPassword] = useState(true);
  const [register, setRegister] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().email("email không hợp lệ").required("email bắt buộc"),
    password: yup
      .string()
      .required("password bắt buộc")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        "ít nhấ 8 kí tự,1 hoa,1 thường,1 số và 1 kí tự đặc biệt"
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  //handel
  const handleOnsubmit = (valueForm) => {
    if (captcha.current.getValue()) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
      setCaptchaError(false);
    }

    if (valueForm && captchaValid) {
      loginUser(valueForm, dispatch, navigate);
    }
  };

  const handleShowPassword = () => {
    setPassword((pass) => !pass);
  };

  const onChange = () => {
    if (captcha.current.getValue()) {
      setCaptchaError(true);
    }
  };

  const handleRegister = () => {
    setRegister(true);
  };

  const handleClick = () => {
    setTimeout(() => {
      setClick(false);
    }, 500);
    setClick(true);
  };

  if (register) {
    setTimeout(() => {
      setRegister(false);
      navigate("/register");
    }, 1000);

    return <Loading />;
  }

  return (
    <div className="container-form">
      <form onSubmit={form.handleSubmit(handleOnsubmit)}>
        <div className="form-input">
          <h3>LOG IN TO YOUR ACCOUNT</h3>
          <Input
            click={click}
            type="email"
            name="email"
            label="Email"
            placeholder="enter your email"
            form={form}
          />
          <div className="password">
            <Input
              click={click}
              name="password"
              type={password ? "password" : "text"}
              label="Password"
              placeholder="enter your password"
              form={form}
            />
            <div className="icon" onClick={handleShowPassword}>
              {password ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="recaptcha">
            <ReCAPTCHA
              ref={captcha}
              sitekey="6Lc_iMwgAAAAADxWEt6fq7n7EyMwkvevn1Cbu_lr"
              onChange={onChange}
            />
          </div>
          {captchaError === false && (
            <div className="error-captcha" style={{ color: "red" }}>
              bạn cần xác nhận Recaptcha
            </div>
          )}
        </div>

        <button onClick={handleClick}>Login</button>
        <div className="difference">
          <Link to="/register" className="forgot_account">
            Forgot your password?
          </Link>

          <div className="register">
            <span>Don't have an account? </span>
            <span className="reg" onClick={handleRegister}>
              Register
            </span>
          </div>
        </div>

        <div className="setting">
          <a href="/">Privacy Notice</a>
          <a href="/">Cookies Notice</a>
          <a href="/">Cookies Settings</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
