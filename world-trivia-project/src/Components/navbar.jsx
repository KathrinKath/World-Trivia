import "../App.css";
import logo from "/public/logo.gif";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h1 className="navbar-title">Trivia Game</h1> */}
      <div className="logo-container">
        <img src={logo} alt="logo " className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
