import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import axios from 'axios';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';

class Comment extends Component{
    /* TODO write prop Types */
    // static propTypes = {
    //
    //     data: PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         // user: PropTypes.object.isRequired,
    //         body: PropTypes.string.isRequired
    // })
    // }
    constructor(props) {
        super(props);
        this.state = {_id: '', showModal: false};
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleDelete(id) {
        axios.delete(
            'http://api.host-panel.net/comment/'+ id,
            { 'Content-Type': 'application/json',}
        ).then(function(response){
            console.log('deleted successfully')
        });
        // this.getComments();
    }

    handleEdit(event) {
        this.openModal();
        // axios.delete(
        //     'http://api.host-panel.net/comment/'+ id,
        //     { 'Content-Type': 'application/json',}
        // ).then(function(response){
        //     console.log('deleted successfully')
        // });
        // // this.getComments();
    }
    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    render() {
        var name = this.props.data.name;
        var text = this.props.data.text;
        var id = this.props.data._id;
        var date = this.props.data.date;

        return(
            <div className="comment-box">
                <div className="title">
                    {name} <span className="text-muted">commented <Moment fromNow>{date}</Moment></span>
                    <div role="toolbar" className="btn-toolbar right">
                        <ButtonGroup>
                            <Button bsStyle="danger" bsSize="xs" id="{id}" onClick={this.handleDelete}><i className="fa fa-times" aria-hidden="true"></i></Button>
                            <Button bsStyle="default" bsSize="xs" onClick={this.handleEdit}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
                        </ButtonGroup>
                    </div>
                </div>
                {text}

                <Modal show={this.state.showModal} >
                    <Modal.Header >
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        <hr />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Comment;