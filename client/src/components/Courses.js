import React from "react";
import { NavLink } from "react-router-dom";
import ParticlesContainer from "./Particles";

class Courses extends React.Component {
  state = {
    authenticatedUser: this.state,
    courses: [],
    errors: [],
  };

  // GET request called to get the full list of active courses

  componentDidMount() {
    // Destructuring context to access the usersCourses function

    const { context } = this.props;

    this.setState({
      courses: context.actions.usersCourses(),
    });
  }

  render() {
    const { context } = this.props;

    /*
    Cycling through the courses retrieved from the GET request.
    For each courses a div created with a NavLink to the
    relative detail page.

    mappedCourses stores this and used to display the results in 
    the return render method.
    */

    let mappedCourses;

    if (context.courses !== null) {
      mappedCourses = context.courses.courses.map((course) => (
        <div className="table-cell" key={course.id}>
          <p>Course</p>
          <NavLink to={`/courses/${course.id}`}> {course.title} </NavLink>
        </div>
      ));
    } else {
      return (
        <div>
          <p> Loading.... </p>
        </div>
      );
    }

    return (
      <div id="tsparticles" className="tsparticles">
        <div className="course-list-div">
          <div className="table">
            {mappedCourses}
            <div className="table-cell">
              <NavLink to="/courses/create"> + New Course </NavLink>
            </div>
          </div>
        </div>
        <ParticlesContainer />
      </div>
    );
  }
}

export default Courses;
