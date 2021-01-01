import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";
const Context = React.createContext(); 

export class Provider extends Component {

/* the data instance inside the constructor makes the
Data API utility methods available throughout the app via Context */

    constructor() {
        super();
        this.data = new Data();
    }

    state = { 
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
      courses: null
    }

        render () {
        const { authenticatedUser } = this.state;
        const { courses } = this.state;
        const value = {
          authenticatedUser,
          courses,
            data: this.data,
            actions: {
              signIn: this.signIn,
              signOut: this.signOut,
              usersCourses: this.usersCourses
            }
          };

        /* Context.Provider class is a higher order component
        which provides the application state and any actions or event handlers
        that need to be shared between components, via a required value prop. */

            return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
            

            );
        }

        signIn = async (emailAddress, password) => {
          const user = await this.data.getUser(emailAddress, password);
          if (user) {
            user.password = password;
          }
          if (user !== null) {
            this.setState(() => {
              return {
                authenticatedUser: user,
              };
            });
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
          }
          return user;
        }
    
        signOut = () => {
            this.setState(() => {
              return {
                authenticatedUser: null,
              };
            });
            Cookies.remove("authenticatedUser");
          }

        usersCourses = async () => {
          await this.data.getCourses().then((response) => {
            let receivedCourses = response;
            if (receivedCourses) {
              this.setState(() => {
                return {                                                                                                                                  
                  courses: receivedCourses
                };
              });
             } 
          }).catch(error => {
            console.log("API request failed", error)
            // react on errors.
          })
        }

    };

    export const Consumer = Context.Consumer;
    
// withContext is a higher-order function that wraps a provided component in a <Context.Consumer> component.
// withContext auto connects the component passed to it to all actions and context changes

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
             { context => <Component {...props} context={context} /> } 
        </Context.Consumer>
      );
    }
  }

