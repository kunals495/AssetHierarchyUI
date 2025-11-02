import React from "react";
import "../styles/LeftNav.css";
import shoplogo from '../assets/shopping-cart.png';
import setting from '../assets/setting.png';
import factory from '../assets/factory.png';
import home from '../assets/house.png';
import tag from '../assets/html-coding.png';

const LeftNav: React.FC = () => {
  return (
    <div className="left-nav">
     <img className="home" src={home} alt="home Logo">
     </img>
     <img className="factory" src={factory} alt="factory Logo">
     </img>
      <img className="tag" src={tag} alt="tag Logo" >
     </img>
     <img className="shop" src={shoplogo} alt="shop Logo" >
     </img>
     <img className="setting" src={setting} alt="setting Logo">
     </img>
    </div>
  );
};

export default LeftNav;
