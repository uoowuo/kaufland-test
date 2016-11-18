import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';

export default class ButtonModal extends React.Component {

    render() {
        if (!this.state) { this.state = { showModal: false }; }

        const show = this.state.showModal;
        const hideHandler = this.getHideHandler();
        const closeButtonHandler = this.getCloseButtonHandler();
        const openButtonHandler = this.getOpenButtonHandler();

        const buttonModal = (
            <ButtonToolbar className="button-modal">
                <Button bsStyle="primary" onClick={openButtonHandler}>Annoy me</Button>

                <Modal id="annoycement-modal" show={show} onHide={hideHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Annoyncement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Would you like some more modal windows?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={closeButtonHandler}>No, thanks</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );

        return buttonModal;
    }

    getOpenButtonHandler() { return () => {
        this.setState({ showModal: true });
    }}

    getCloseButtonHandler() { return () => {
        this.setState({ showModal: false });
    }}

    getHideHandler() { return () => {
        this.setState({ showModal: false });
    }}
}