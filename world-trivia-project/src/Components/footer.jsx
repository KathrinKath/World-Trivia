// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="waves">
//         <div className="wave" id="wave1"></div>
//         <div className="wave" id="wave2"></div>
//         <div className="wave" id="wave3"></div>
//         <div className="wave" id="wave4"></div>
//       </div>

//       <ul className="menu">
//         <li>
//           <a href="#">Home</a>
//         </li>
//         <li>
//           <a href="#">Service</a>
//         </li>
//         <li>
//           <a href="#">Team</a>
//         </li>
//         <li>
//           <a href="#">Contact</a>
//         </li>
//       </ul>

//       <p>&copy; 2024 Your Trivia Game</p>
//     </footer>
//   );
// };

// export default Footer;

// ---------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <ul className="menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Service</a>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* Add social media icons here */}
      <div className="footer-icon">
        <a href="#" className="icon-hover">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="#" className="icon-hover">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="#" className="icon-hover">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="#" className="icon-hover">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      </div>

      <p>&copy; 2024 Your Trivia Game</p>
    </footer>
  );
};

export default Footer;
