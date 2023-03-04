import React, { Component } from 'react';

class Header extends Component { // Using Class component for orginization. 
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Emaily
          </a>
            <ul>
              <li className="right">
                <a>Login With Google</a>
              </li>
            </ul>
        </div>
      </nav>
    )
  }
}

export default Header;