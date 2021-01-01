import React from "react";
import { NavLink } from "react-router-dom";

export default (props) => {
  const { errors, submit, elements } = props;

  /* Stops page from refreshing */

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div>
          <button className="signInBtn" type="submit">
            Submit
          </button>
          <NavLink className="button-2" to="/">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};

/* If the authentication of the user fails then the error is rendered to the user */

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2>Validation errors</h2>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
