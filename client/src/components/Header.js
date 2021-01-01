import React from "react";
import { Link } from "react-router-dom";

export default ({ context }) => {
  const authedUser = context.authenticatedUser;

  //Nav bar conditionally rendered on if the user is logged in or not

  return (
    <div>
      <div className="header-div">
        <div>
          <Link to="/" className="header-div-left">
            {" "}
            Student Courses{" "}
          </Link>
        </div>

        <nav>
          {authedUser ? (
            <React.Fragment>
              <div className="header-div-right">
                <span className="header-div-right">
                  {" "}
                  Welcome {authedUser.firstName} {authedUser.lastName}{" "}
                </span>
                <Link className="header-div-right" to="/signout">
                  {" "}
                  Sign Out{" "}
                </Link>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="header-div-right-up-in">
                <Link className="header-div-right" to="/signup">
                  Sign Up
                </Link>
                <Link className="header-div-right" to="/signin">
                  Sign In
                </Link>
              </div>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};

// export class Header extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       authenticatedUser: ,
//     }

//     this.signOut = this.signOut.bind(this);
//   }

//   signOut = () => {
//     const { context } = this.state;
//     context.actions.signOut();
//   }

//   render() {

//     const { context } = this.state;

//     let authedUser;
//     let signedIn;
//     let notSignedIn

//     if (this.state.authenticatedUser !== null) {
//       authedUser = context.authenticatedUser;
//       signedIn =

//       <React.Fragment>
//         <div className="header-div-right">
//           <span className="header-div-right"> Welcome {authedUser.firstName} {authedUser.lastName} </span>
//           <button className="header-div-right" onClick={this.signOut}> Sign Out </button>
//         </div>
//       </React.Fragment>

//     } else if (this.state.authenticatedUser === false) {

//      notSignedIn =

//       <React.Fragment>
//       <div className="header-div-right-up-in">
//         <Link className="header-div-right" to="/signup">Sign Up</Link>
//         <Link className="header-div-right" to="/signin">Sign In</Link>
//       </div>
//       </React.Fragment>

//     }

//     return (
//       <div>
//         <div className="header-div">
//           <div>
//           <Link to="/" className="header-div-left"> Student Courses </Link>
//           </div>
//           <nav>
//             {signedIn}
//             {notSignedIn}
//          </nav>
//       </div>
//      </div>
//     )
//   }
// }

// export default Header;
