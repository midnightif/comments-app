import React, {Component} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button, Modal, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Comment extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: this.props.data.name,
            text: this.props.data.text,
            _id: this.props.data._id,
            date: this.props.data.date
        };
    }

    handleDelete = () => {
        const _id = this.state._id;
        axios.delete(
            'http://api.host-panel.net/comments/'+ _id,
            { 'Content-Type': 'application/json',}
        ).then(() => {
            this.props.deleteComment(_id);
        });
        this.closeModal();

    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    openModal = () => {
        this.setState({ showModal: true });
    };

    handleFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const _id = this.state._id;
        const name = this.state.name.trim();
        const text = this.state.text.trim();
        const date = new Date();

        if (!name || !text) {
            return;
        }
        let comment = {_id, name, text, date };
        axios.put(
            'http://api.host-panel.net/comments/'+_id,
            comment,
            { 'Content-Type': 'application/json',}
        ).then(() => {
            this.props.updateComment(comment);
        });

        this.closeModal();
    };
    render() {
        const name = this.props.data.name;
        const text = this.props.data.text;
        const date = this.props.data.date;

        return(
            <div className='comment-box'>
                <div className='title'>
                    {name} <span className='text-muted'>commented <Moment fromNow>{date}</Moment></span>
                    <div role='toolbar' className='btn-toolbar right'>
                        <ButtonGroup>
                            <Button
                                bsStyle='success'
                                bsSize='xs'
                                onClick={this.openModal}>
                                <i className='fa fa-pencil' aria-hidden='true'/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                {text}

                <Modal show={this.state.showModal} >
                    <Modal.Header >
                        <Modal.Title>Edit your comment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <FormGroup controlId='formControlsText'>
                                <ControlLabel>Your Name</ControlLabel>
                                <FormControl
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleFieldChange} />

                            </FormGroup>
                            <FormGroup controlId='formControlsTextarea'>
                                <ControlLabel>Your comment</ControlLabel>
                                <FormControl
                                    componentClass='textarea'
                                    name='text'
                                    value={this.state.text}
                                    onChange={this.handleFieldChange} />
                            </FormGroup>

                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup >
                            <Button
                                bsStyle='danger'
                                bsSize='sm'
                                onClick={this.handleDelete} >
                                <i className='fa fa-trash-o' aria-hidden='true'/>
                            </Button>
                            <Button
                                bsStyle='primary'
                                bsSize='sm'
                                type='submit'
                                onClick={this.handleSubmit}>
                                <i className='fa fa-paper-plane' aria-hidden='true'/>
                            </Button>
                            <Button
                                bsSize='sm'
                                onClick={this.closeModal} >
                                <i className='fa fa-times' aria-hidden='true'/>
                            </Button>
                        </ButtonGroup>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Comment;