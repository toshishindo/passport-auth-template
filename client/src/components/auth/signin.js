import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";
import * as actions from '../../actions';

class Signin extends Component {
  renderInput({input, type}) {
    return (
      <div>
         <input {...input} type={type} className="form-control" />
         {/* {...field.meta.touched && field.meta.error} */}
      </div>
    );
  }

  handleFormSubmit({ email, password }) {
    // console.log(email, password);
    //Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-gorup">
          <label>Email:</label>
          <Field name="email" component={this.renderInput} type="text" />
        </fieldset>
        <fieldset className="form-gorup">
          <label>Password:</label>
          <Field name="password" component={this.renderInput} type="text" />
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(
  connect(null, actions)(Signin)
);
