import React from 'react';
import mainLogo from '../../../../assets/main-logo.svg'
import './index.scss';

const Header = () => {
  return (
    <div className="main-header">
      <img
        className="main-header__main-logo"
        src={mainLogo}
        alt="main-logo"/>
    </div>
  );
};

export default Header;