import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class UserSignOut extends Component {
  componentDidMount() {
    const { context } = this.props;
    context.actions.signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default UserSignOut;
