import { Controller } from "react-hook-form";
import "./input.scss";

const Input = (props) => {
  const { type, placeholder, label, name, form, click } = props;
  const {
    formState: { errors },
  } = form; // lấy ra lỗi trong form đã đc định nghĩa từ trước
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <div className="input-group">
          <p htmlFor="">{label}</p>
          <input
            className={
              !!hasError && click ? "error shake" : !!hasError ? "error" : ""
            }
            type={type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
          {hasError ? (
            <p className="error-message">
              {" "}
              {!!hasError ? errors[name]?.message : ""}
            </p>
          ) : (
            <p style={{ visibility: "hidden", padding: "0" }}>no error</p>
          )}
        </div>
      )}
    />
  );
};

export default Input;
