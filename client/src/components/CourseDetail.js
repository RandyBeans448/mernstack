import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ParticlesContainer from "./Particles";
const ReactMarkdown = require("react-markdown");

export class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: this.state,
      emailAddress: "",
      password: "",
      courses: [],
      errors: [],
      courseDetails: [],
      userId: [],
      id: "",
      firstName: null,
      lastName: null,
    };

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    // Setting the initial state of id to the params

    const { context } = this.props;
    const paramsId = this.props.match.params.id;
    const parsedId = parseInt(paramsId);

    this.setState({
      id: parsedId,
    });

    /*
           Get request responds by retrieving the course that relates to
           the state of id.
           The states of firstName and lastName are initially set to null.
           The GET request responds after the page is rendered and requires a value 
           otherwise it comes back as undefined
           */

    context.data
      .getCoursesById(parsedId)
      .then((response) => {
        if (response) {
          this.setState({
            courseDetails: response.course,
            userId: response.course.userId,
            firstName: response.course.user.firstName,
            lastName: response.course.user.lastName,
          });
        }
      })
      .catch((error) => {
        console.log("Course does not exist", error);
      });
  }

  deleteCourse = () => {
    /*
            Setting the state of the emailAddress & password so that 
            the deleteCourse can take them as arguments.
            Function requires authorization to fire.
            State set in the function so that anyone who isn't logged in
            can view the page.
            */

    const { context } = this.props;
    const { id } = this.state;
    const authedUser = context.authenticatedUser;
    const emailAddress = authedUser.emailAddress;
    const password = authedUser.password;

    //Deletes course and takes the states of id, emailAddress and password as arguments

    context.data
      .deleteCourse(id, emailAddress, password)
      .then((response) => {
        if (response) {
          console.log("destroyed");
          this.props.history.push("/");
        }
      })
      .catch((errors) => {
        console.log("Course not destroyed", errors);
        this.setState({ errors });
        console.log(this.state.errors);
      });
  };

  render() {
    //courseDetails state needed for displaying its properties

    const { courseDetails } = this.state;
    const userId = courseDetails.userId;

    let markdownList = courseDetails.materialsNeeded;
    let markdownDesc = courseDetails.description;

    /*
        If a user is logged in and the authenticated user matches the userId
        of the course then this will allow the authenticated user to 
        update and delete.
        */

    let updateAndDeleteBtns;

    const paramsId = this.props.match.params.id;

    if (this.props.context.authenticatedUser !== null) {
      if (this.props.context.authenticatedUser.id === userId) {
        updateAndDeleteBtns = (
          <React.Fragment>
            <NavLink to={`/courses/${paramsId}/update`} className="nav-button">
              {" "}
              Update{" "}
            </NavLink>
            <button to="/" onClick={this.deleteCourse} className="nav-button">
              {" "}
              Delete{" "}
            </button>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="action-margin">
        <div className="action-bar">
          <NavLink to="/" className="nav-button">
            {" "}
            Return{" "}
          </NavLink>
          {updateAndDeleteBtns}
        </div>
        <div className="detail-div">
          <div>
            <div className="detail-div-left">
              <h3> Course </h3>
              <h1 className="detailH1"> {courseDetails.title} </h1>
              <h3> Owner </h3>
              <h3>
                {" "}
                {this.state.firstName} {this.state.lastName}{" "}
              </h3>
              <span className="detailDesc">
                {" "}
                <ReactMarkdown source={markdownDesc} />{" "}
              </span>
            </div>
            <div className="detail-div-right">
              <h3> Estimated time </h3>
              <p> {courseDetails.estimatedTime} </p>
              <h3> Materials </h3>
              <ul className="list-detail-style-right">
                <li>
                  {" "}
                  <ReactMarkdown source={markdownList} />{" "}
                </li>
              </ul>
              <div id="tsparticles" className="tsparticles"></div>
            </div>
          </div>
          <ParticlesContainer />
        </div>
      </div>
    );
  }
}

export default CourseDetail;
