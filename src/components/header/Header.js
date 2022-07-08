import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./header.scss";
import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import viet_flag from "../../assets/images/ic_flag_vn.svg";
import eng_flag from "../../assets/images/ic_flag_en.svg";

function Header({ theme, changeTheme }) {
  const { i18n } = useTranslation();

  const [isActiveLang, setActiveLang] = useState(false);
  const ToggleClass = () => {
    setActiveLang(!isActiveLang);
  };

  const handleChangeLaguage = (l) => {
    i18n.changeLanguage(l);
    setActiveLang(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__right">
          <span className="header__language">
            <i className="bx bx-globe" onClick={ToggleClass}></i>
            <ul className={`header__language-list ${isActiveLang && "active"}`}>
              <li
                onClick={() => {
                  handleChangeLaguage("en");
                }}
              >
                <img src={eng_flag} alt="" />
                <span>English</span>
              </li>
              <li onClick={() => handleChangeLaguage("vi")}>
                <img src={viet_flag} alt="" />
                <span>Vietnamese</span>
              </li>
            </ul>
          </span>
          <span className="theme-icon" onClick={changeTheme}>
            {theme === "light" ? (
              <i className="bx bxs-sun"></i>
            ) : (
              <i className="bx bxs-moon"></i>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
