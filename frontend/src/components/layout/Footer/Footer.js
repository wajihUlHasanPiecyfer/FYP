import React from "react";
import "./Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";

const Footer = () => {
  return (

    <footer id="footer" className="footer-1">
      <div className="main-footer widgets-dark typo-light">
        <div className="container">
          {/* <div className="row"> */}

            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="widget subscribe no-box">
                <h5 className="widget-title-footer">Sir Syed College OF Computer Science
                  <span></span></h5>
                <p>To become a leading Computer Science education Institution, inculcating professionalism, mannerism and rational thinking. To provide sound academic foundation and demonstrate practical applications of concepts and techniques to the students enabling them to develop analytical thinking and design. To focus on character building, professional ethics, inter-personal communication and presentation skills of our students. To use the latest techniques and technologies in instruction for effective Computer Science teaching.To emphasize on extra-curricular activities to develop balanced personalities.</p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-2">
              <div className="widget no-box">
                <h5 className="widget-title">Follow up<span></span></h5>
                <Link to="https://www.facebook.com/scocs.uet/"><i className="fa fa-facebook" aria-hidden="true"><FacebookIcon />   Facebook</i></Link><br/>
                <Link to="https://www.instagram.com/sirsyedcollegepk/"><i className="fa fa-twitter" aria-hidden="true"><InstagramIcon/>   Instagaram</i></Link><br/>
                <Link to="https://www.google.com/search?q=scocs&rlz=1C1CHBF_enPK1028PK1028&oq=scocs&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyCQgCEAAYChiABDIPCAMQLhgKGK8BGMcBGIAEMg8IBBAuGAoYxwEY0QMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQkxODg0NWowajSoAgCwAgA&sourceid=chrome&ie=UTF-8"><i className="fa fa-google" ><GoogleIcon/> Google</i></Link><br/>
                <Link to="https://www.scocs.edu.pk"><i className="fa fa-linkedin" ><LanguageIcon/> Website</i></Link><br/>
              </div>
            </div>
            <br />
            <br />


            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">Contact Us<span></span></h5>
                <p>
                  38-47/C2-Gulberg III, Ghalib Road, Lahore, Pakistan<br/>
                  Phone: (042) 3578 5580<br/>
                  Mobile: 0302 4423272<br/>
                  Website: www.scocs.edu.pk<br/>
                  Email: info@scocs.edu.pk<br/>
                </p>
              </div>

            </div>
          {/* </div> */}
        </div>

        <div className="footer-copyright">
            {/* <div className="row"> */}
              <div className="col-md-12  text-center">
                <div className="row">
                  <div className="col-md-12 col-12 mb-1 mt-1 text-right">
                    <p>Copyright By Scholor's Library SCOCS © 2023. All rights reserved.</p>
                  </div>
             
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;