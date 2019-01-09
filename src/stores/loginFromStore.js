import { observable,action,configure } from "mobx";
import CallApi from '../api/api';
import { userStore } from "./userStore"

configure({enforceActions: "always"});


class LoginFormStore {
       @observable username = "Crofty";

       @observable repeatPassword = "Qwerty";

       @observable  password = "Qwerty";

    @observable errors = {};

    @observable submitButton = false;

    @observable showLoginModal = false;

    @action
    onChangeValue = event => {
        let { name, value } = event.target;

        this[name] = value;
        this.updateErrors({
            base: null,
            [name]: null
        });
    };

    @action
    toggleLoginModal = () => {
        this.showLoginModal = !this.showLoginModal;
    };

    @action
    updateErrors = (errors = {}) => {
        for (let key in errors) {
            this.errors[key] = errors[key];
        }
    };

    @action
    updateSubmitting = value => {
        this.submitButton = value;
    };

    @action
    handleBlur = event => {
        const errors = this.validateFields();
        const name = event.target.name;
        if (errors[name]) this.errors[name] = errors[name];
    };

    validateFields = () => {
        const errors = {};

        if (this.username === "") {
            errors.username = "Username can`t be empty";
        }

        if (this.password === "") {
            errors.password = "Password can`t be empty";
        }

        if (this.repeatPassword !== this.password) {
            errors.repeatPassword = "Passords must be equal";
        }

        return errors;
    };

    @action
    onSubmit = () => {
        let session_id = null;
        this.updateSubmitting(true);
        return CallApi.get("/authentication/token/new")
            .then(data => {
                return CallApi.post("/authentication/token/validate_with_login", {
                    body: {
                        username: this.username,
                        password: this.password,
                        request_token: data.request_token
                    }
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
            }).then(data => {
                return CallApi.post("/authentication/session/new", {
                    body: {
                        request_token: data.request_token
                    }
                });
            });
           })

            .then(data => {
                session_id = data.session_id;
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
                this.updateSubmitting(false);
                userStore.updateAuth(user, session_id);
                this.toggleLoginModal();
            })
            .catch(error => {
                this.updateSubmitting(false);
                this.updateErrors( {
                    base: error.status_message
                });
            });
    };

}


export const loginFormStore = new LoginFormStore();




