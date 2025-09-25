import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";


function Footer() {
    return (
      <div className="footer">
        <div className="footerLeft">
          <Link className="link" id="twos" to="https://www.theworksofsummer.com/" target="_blank" rel="noopener noreferrer">theworksofsummer.com</Link>
        </div>
        <div className="footerRight">
          <p id="sb">
            <p id="sb-text">START BUILDING</p> 
            <Link className="link" id="iconGH" to="https://github.com/iamsummerflowers" target="_blank" rel="noopener noreferrer">
              <VscGithub />
            </Link>
          </p>
          
        </div>

      </div>
    );
  }
  
  export default Footer;