import React, {Component} from 'react';
import axios from 'axios';

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {name: '', text: ''};

    }
    handleFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    validate = (name, text) => {
        // true means invalid, so our conditions got reversed
        return {
            name: name.length === 0,
            text: text.length === 0,
        };
    };

    canBeSubmitted = () => {
        const errors = this.validate(this.state.name, this.state.text);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            event.preventDefault();
            return;
        }

        let name = this.state.name.trim();
        let text = this.state.text.trim();

        let _id = Date.now();
        let date = new Date();
        let comment = { _id: _id, name: name, text: text, date: date }

        axios.post(
            'http://api.host-panel.net/comments',
            comment,
            { 'Content-Type': 'application/json',}
        ).then(function(){
            console.log('saved successfully')
        });

        this.props.onCommentSubmit(comment);
        this.setState({name: '', text: ''})
    };
    render(){
        const errors = this.validate(this.state.name, this.state.text);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return(
            <form className='comment-form'>
                <div className='form-group'>
                    <label htmlFor='user'>Name:</label>
                    <input
                        type='user'
                        className={errors.name ? 'error form-control' : 'form-control'}
                        id='user'
                        placeholder='Enter your name'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleFieldChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='comment'>Comment:</label>
                    <textarea
                        className={errors.text ? 'error form-control' : 'form-control'}
                        rows='5'
                        id='comment'
                        placeholder='Say something...'
                        name='text'
                        value={this.state.text}
                        onChange={this.handleFieldChange}
                    />
                </div>
                <div className='form-group'>
                    <button
                        type='submit'
                        className='btn btn-default'
                        onClick={this.handleSubmit}
                        disabled={isDisabled}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

export default CommentForm;