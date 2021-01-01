import React, { Component } from "react";
import { Link } from "react-router-dom";
import ParticlesContainer from "./Particles";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="tsparticles" className="tsparticles">
        <div className="sign-in-div">
          <h1 className="sign-in-h1">Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            elements={() => (
              <React.Fragment>
                <div className="input-container">
                  <input
                    className="sign-in-input"
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    onChange={this.change}
                    placeholder="emailAddress"
                  />
                  <input
                    className="sign-in-input"
                    id="password"
                    name="password"
                    type="password"
                    onChange={this.change}
                    placeholder="Password"
                  />
                </div>
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account?{" "}
            <Link className="sign-up-link" to="/signup">
              Click here
            </Link>{" "}
            to sign up!
          </p>
        </div>
        <ParticlesContainer />
      </div>
    );
  }

  change = (event) => {
    event.preventDefault();
    const emailAddress = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [emailAddress]: value,
      };
    });
  };

  /*
this submit function unpacks this.state into variables.
The function signIn is accessed through the context property
which was passed from context.js.
*/

  submit = () => {
    console.log("Fire");
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push("/");
          context.actions.usersCourses();
        }
      })
      .catch((err) => {
        this.props.history.push("/NotFound");
      });
  };

  cancel = () => {
    this.props.history.push("/UserSignOut");
  };
}
