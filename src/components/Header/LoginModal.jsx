import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Authorization from "../Header/Login/Authtorization";
import { inject, observer } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class LoginModal extends React.Component {
  render() {
    const {
      loginFormStore: { showLoginModal, toggleLoginModal }
    } = this.props;
    return (
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
        <ModalBody>
          <Authorization />
        </ModalBody>
      </Modal>
    );
  }
}

export default LoginModal;
