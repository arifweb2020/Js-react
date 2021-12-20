for HOOKS

import { useLocation } from "react-router-dom";
const location = useLocation();

location.pathname === "/reports/feedback"

<Redirect from="/" to="/404" exact />
             <Route
               //exact
               //path="/404"
               name="Page-404"
               render={(props) => <Page404 {...props} />}
             />



import React from "react";
import logo from "../../assets/Images/logo.png";
import whatsAppImg from "../../assets/Images/whatsAppImg.svg";
import "../header/headerStyle.scss";


class Arif extends React.Component {

  logout() {
    window.localStorage.clear();
    window.location.href = '/investment';
  }

  render() {

    return (
      <div className="no-padding">
        <div className="wraaper">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <nav className="navbar navbar-expand-xl  navbar-light  navHeader">
              <div className="container-fluid no-padding">
                <a className="navbar-brand" href="/">
                  <img
                    src={logo}
                    className="d-inline-block align-middle"
                    alt="Dezrve"
                  />
                </a>
                <div className="pull-right">
                  <div className="rightHeaderWrapper">
                    <button className="btn">
                      <a
                        href="whatsapp://send?text=Hello World!&phone=+91923334324432"
                        target="_new"
                      >
                        Expert assitance
                        <span className="whatsAppWrapper">
                          <img src={whatsAppImg} alt="whatsappimg" />
                        </span>
                      </a>
                    </button>
                    {this.props.location.pathname === "/home" || this.props.location.pathname === "/home/portfolio" ? (
                      <button className="btn btnLogOut" onClick={this.logout}>Logout</button>) :
                      null}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Arif;

for functional component use location we hav e to use

const Child = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch("write-the-url-you-want-to-match-here");

  return (
    <div>{location.pathname}</div>
  )
}

export default Child
