import React from "react";
import CallApi from "../../../api/api";
import classNames from "classnames";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
    state = {
        username: "Crofty",
        repeatPassword: "Qwerty",
        password: "Qwerty",
        errors: {},
        submitting: false
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                base: null,
                [name]: null
            }
        }));
    };

    handleBlur = event => {
        const errors = this.validateFields(event.target.name);
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        }
    };

    validateFields = event => {
        const errors = {};

        if (this.state[event] === "") {
            errors[event] = "Not empty";
        }

        if (
            this.state.password !== this.state.repeatPassword &&
            this.state.repeatPassword !== ""
        ) {
            errors.repeatPassword = "You must provide equal passwords";
        }

        return errors;
    };

    onSubmit = () => {
        let session = null;

        this.setState({
            submitting: true
        });
        CallApi.get("/authentication/token/new")
            .then(data => {
                return CallApi.post("/authentication/token/validate_with_login", {
                    body: {
                        username: this.state.username,
                        password: this.state.password,
                        request_token: data.request_token
                    }
                });
                // fetchApi(
                //   `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
                //   {
                //     method: "POST",
                //     mode: "cors",
                //     headers: {
                //       "Content-type": "application/json"
                //     },
                //     body: JSON.stringify({
                //       username: this.state.username,
                //       password: this.state.password,
                //       request_token: data.request_token
                //     })
                //   }
                // );
            })
            .then(data => {
                return CallApi.post("/authentication/session/new", {
                    body: {
                        request_token: data.request_token
                    }
                });
            })
            .then(data => {
                this.props.updateSessionId(data.session_id);
                session = data.session_id;
                return CallApi.get("/account", {
                    params: {
                        session_id: data.session_id
                    }
                });
                // fetchApi(
                //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
                //     data.session_id
                //   }`
                // );
            })
            .then(user => {
                console.log("session+++++", session);
                this.setState(
                    {
                        submitting: false
                    },
                    () => {
                        this.props.updateAuth(user, session);
                        this.props.toggleModal();
                    }
                );
            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    submitting: false,
                    errors: {
                        base: error.status_message
                    }
                });
            });
    };
    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        } else {
            this.onSubmit();
        }
    };
    // Подсветка полей с непрвильным вводом
    getClassForInput = key =>
        classNames("form-control", {
            invalid: this.state.errors[key]
        });

    render() {
        const {
            username,
            password,
            repeatPassword,
            errors,
            submitting
        } = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>

                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className={this.getClassForInput("username")}
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className={this.getClassForInput("password")}
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="repeatPassword">Повторите пароль</label>
                        <input
                            type="password"
                            className={this.getClassForInput("repeatPassword")}
                            id="repeatPassword"
                            placeholder="Пароль"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback">{errors.repeatPassword}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        Вход
                    </button>
                    {errors.base && (
                        <div className="invalid-feedback text-center">{errors.base}</div>
                    )}
                </form>
            </div>
        );
    }
}

export default AppContextHOC(LoginForm);
