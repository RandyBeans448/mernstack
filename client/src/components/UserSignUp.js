import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import ParticlesContainer from "./Particles";

export class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div className="sign-up-div">
        <div>
          <h1>Sign Up</h1>
          <Form
            errors={errors}
            submit={this.submit}
            elements={() => (
              <React.Fragment>
                <input
                  className="sign-up-input"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First name"
                />
                <input
                  className="sign-up-input"
                  id="LastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  className="sign-up-input"
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="emailAddress"
                />
                <input
                  className="sign-up-input"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
        </div>
        <ParticlesContainer />
        <p>
          Already have a user account?{" "}
          <Link className="sign-in-link" to="/signin">
            {" "}
            Sign in!{" "}
          </Link>
        </p>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;

    // Takes the state of each value needed to authenticate a PUT request from the REST API.

    const { firstName, lastName, emailAddress, password } = this.state;

    // Creates a new object with each property as the value of each corresponding state

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    /*
    Create user takes the user object to create the new user and then signs in the user using the 
    emailAddress and password properties as arguments.    
    */

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(this.state.errors);
        this.props.history.push("/error");
      });
  };
}

export default UserSignUp;
