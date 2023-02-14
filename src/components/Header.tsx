import * as BS from "react-bootstrap";
import styles from './Header.module.css';
import logo from '../assets/ehlib-logo.png';

const Header = () => {
  return (
    <div>
      <BS.Row id="header-top">
        <BS.Col md='auto'>
          <div id="logoimg">
              <a href="http://www.ehlib.com/ru" title="Главная">
                <img src={logo} alt="Logo" /></a>
            </div>
        </BS.Col>
        <BS.Col md={9}>
          <div id="sitename">
            <h1>Components for Delphi, C++ Builder,
              <br />
                Lazarus &amp; Visual Studio</h1>
          </div>
        </BS.Col>
      </BS.Row>

      <nav className="navbar navbar-expand-lg my-mavbar">
        <a className="navbar-brand my-nav-link" href="http://www.ehlib.com/ru">Главная</a>
      </nav>
    </div>

    // <BS.Container>
    //   <h1>
    //     <br />
    //     Нейминг<br />
    //     <br />
    //   </h1>
    // </BS.Container> 

  );
}  

export default Header;