import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

import { useLoginFormValidator } from "../../hooks/useLoginFormValidator";
import { suggestEmail } from "../../utils/emailsSuggest";
import { fakeAuthentication } from "../../data/account";
import "./login.scss";

function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailsSuggest, setEmailsSuggest] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { errors, validateForm, onBlurField } = useLoginFormValidator({
    email,
    password,
  });

  const handleEmailChange = (e) => {
    setEmailsSuggest(suggestEmail(e.target.value));
  };

  const handleSelectEmail = (item) => {
    setEmail(item);
  };

  const onUpdateField = (e) => {
    const field = e.target.name;
    if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
    if (errors[field].impacted) {
      validateForm({
        form: { email, password },
        errors,
        field,
      });
    }
  };

  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const onSubmitForm = (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    if (token) {
      // console.log(token);

      const { isValid } = validateForm({
        form: { email, password },
        errors,
        forceTouchErrors: true,
      });
      if (!isValid) return;

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const data = fakeAuthentication(email, password);
        if (data === "success") {
          navigate("/");
        } else {
          setErrorMessage(data);
        }
      }, 2000);

      captchaRef.current.reset();
    } else {
      setErrorMessage("Please check recapcha!");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__content">
          <h6 className="login__title">{t("content.Login_Title")}</h6>
          <form className="login__form" onSubmit={onSubmitForm}>
            <div className="login__form-item">
              <label htmlFor="email">Email</label>
              <div
                className="input-email__wrap"
                onBlur={() =>
                  //stupid way. I have no idea (-_-)
                  setTimeout(() => {
                    setEmailsSuggest([]);
                  }, 100)
                }
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => {
                    onUpdateField(e);
                    handleEmailChange(e);
                  }}
                  onBlur={(e) => {
                    onBlurField(e);
                  }}
                  onFocus={handleEmailChange}
                />
                {emailsSuggest?.length > 0 && (
                  <ul className="input-email__suggest">
                    {emailsSuggest.map((item, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          handleSelectEmail(item);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.email.impacted && errors.email.error ? (
                <span>{errors.email.message}</span>
              ) : null}
            </div>
            <div className="login__form-item">
              <label htmlFor="password">{t("content.Password")}</label>
              <div className="input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={onUpdateField}
                  onBlur={onBlurField}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bx bxs-${showPassword ? "show" : "hide"}`}></i>
                </span>
              </div>
              {errors.password.impacted && errors.password.error ? (
                <span>{errors.password.message}</span>
              ) : null}
            </div>
            <div className="login__form-item">
              <div className="login__capcha">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                />
              </div>
            </div>
            <div className="login__form-item">
              <button className="login__form-btn" type="submit" tabIndex="0">
                {loading ? "Loading..." : t("content.Login")}
              </button>
              {errorMessage && <span>{errorMessage}</span>}
            </div>
            <div className="login__form-item">
              <a className="login__form-link" href="/">
                {t("content.Forgot_Your_Password")}
              </a>
            </div>
          </form>
        </div>

        <div className="login__footer">
          <div>
            {t("content.Dont_Have_Account")}
            <a href="/"> {t("content.Register")}</a>
          </div>
          <div>
            <a href="/">{t("content.Privacy_Notice")}</a>
            <a href="/">{t("content.Cookies_Notice")}</a>
            <a href="/">{t("content.Cookies_Settings")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
