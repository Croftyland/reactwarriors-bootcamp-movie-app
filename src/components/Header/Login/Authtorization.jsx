import React from "react";
import Field from "./Field";
import { inject, observer } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class Authorization extends React.Component {
  onLogin = event => {
    event.preventDefault();

    const {
      loginFormStore: { validateFields, updateErrors, onSubmit }
    } = this.props;
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      updateErrors(errors);
    } else {
      onSubmit();
    }
  };

  render() {
    const {
      loginFormStore: {
        username,
        handleBlur,
        onChangeValue,
        errors,
        password,
        repeatPassword,
        submitButton
      }
    } = this.props;
    return (
      <form className="form card-body">
        <Field
          id="username"
          labelText="Username"
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={onChangeValue}
          error={errors.username}
          onBlur={handleBlur}
        />
        <Field
          id="password"
          labelText="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={onChangeValue}
          error={errors.password}
          onBlur={handleBlur}
        />
        <Field
          id="repeat-password"
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={onChangeValue}
          error={errors.repeatPassword}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={this.onLogin}
          disabled={submitButton}
        >
          Submit
        </button>
        {errors.base ? (
          <div className="invalid-feedback text-center">{errors.base}</div>
        ) : null}
      </form>
    );
  }
}

export default Authorization;
