import React, { Component } from "react";
import Nav from "./navbar";

// This component provides a basic wrapper for all pages, and passes props down the content component.
class Page extends Component {
  render() {
    return (
      <div className="if-wrapper">
        <Nav className="if-navigation" />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Page;
