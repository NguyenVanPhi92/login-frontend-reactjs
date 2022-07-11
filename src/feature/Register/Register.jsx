import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/FormCtrl/InputField/Input";
import { registerUser } from "../../server/ApiRequest";
import "./register.scss";

const Register = () => {
  const captcha = useRef(null);
  const [captchaValid, setCaptchaValid] = useState(null);
  const [password, setPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("username bắt buộc")
      .matches(
        /^(?=[a-z_\d]*[a-z])[a-z_\d]{6,}$/,
        "ít nhất 6 kí tự tối đa 30,không có kí tự đậc biệt không có khoảng trắng "
      ),
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
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  //handel

  const handleShowPassword = () => {
    setPassword((pass) => !pass);
    console.log("pass: ", password);
  };

  const handleOnsubmit = (valueForm) => {
    if (captcha.current.getValue()) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
    }

    if (valueForm && captchaValid) {
      registerUser(valueForm, dispatch, navigate);
    }
  };

  const onChange = () => {
    if (captcha.current.getValue()) {
      setCaptchaValid(true);
    }
  };

  const handleClick = () => {
    setTimeout(() => {
      setClick(false);
    }, 500);
    setClick(true);
  };

  return (
    <div className="container-form">
      <form onSubmit={form.handleSubmit(handleOnsubmit)}>
        <div className="form-input">
          <h3>REGISTER</h3>
          <Input
            click={click}
            type="text"
            name="username"
            form={form}
            label="Username"
            placeholder="enter your email"
          />
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

            {captchaValid === false && (
              <div className="error-captcha" style={{ color: "red" }}>
                bạn cần xác nhận Recaptcha
              </div>
            )}
          </div>
        </div>

        <button onClick={handleClick}>Register</button>
        <div className="rule">
          <p>
            By registering I confirm I have read and agree to Terms of Use. We
            send occasional marketing messages which can be switched off in
            account settings. We manage personal data as set out in our Privacy
            Notice.
          </p>
          <div className="login">
            <span>Don't have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
