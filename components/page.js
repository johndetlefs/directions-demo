import React, { Component } from "react";
import Head from "next/head";
import Nav from "./navbar";

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
