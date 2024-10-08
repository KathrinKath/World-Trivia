import "../App.css";
import "../images/logo.gif";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h1 className="navbar-title">Trivia Game</h1> */}
      <div className="logo-container">
        <img src="./src/images/logo.gif" alt="logo " className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
