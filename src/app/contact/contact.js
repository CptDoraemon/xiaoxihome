import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css'
import { IoIosClose, IoMdListBox } from "react-icons/io";

class Contact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'Your name please',
            email: 'Your Email please',
            message: 'Wanna say something?',
            nameClassName: 'contact-form-name',
            emailClassName: 'contact-form-email',
            messageClassName: 'contact-form-message'
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        // Error handler
        e.preventDefault();
        this.setState({
            nameClassName: 'contact-form-name',
            emailClassName: 'contact-form-email',
            messageClassName: 'contact-form-message'
        })
        if(this.state.name === '' || this.state.name === 'Your name please') {
            this.setState({
                name: 'Your name please',
                nameClassName: 'contact-form-name contact-form-error',
            });
        }
        if(this.state.email === '' || this.state.email === 'Your Email please' || this.state.email.indexOf('@') === -1) {
            this.setState({
                email: 'Your Email please',
                emailClassName: 'contact-form-email contact-form-error',
            });
        }
        if(this.state.message === '' || this.state.message === 'Wanna say something?') {
            this.setState({
                message: 'Wanna say something?',
                messageClassName: 'contact-form-message contact-form-error',
            });
        }
    }
    handleFocus(e) {
        e.target.select();
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleMessageChange(e) {
        this.setState({message: e.target.value});
    }

    render() {
        return(
            <div className='contact-wrapper'>
                <Link to='/home'>
                    <div className='contact-close-icon'>
                        <IoIosClose size='3em'/>
                    </div>
                </Link>
                <form className='contact-form' onSubmit={this.handleSubmit} >
                    <div className='contact-form-icon'><IoMdListBox size='3em' /></div>
                    <input className={this.state.nameClassName} value={this.state.name} onChange={this.handleNameChange} onFocus={this.handleFocus} />
                    <input className={this.state.emailClassName} value={this.state.email} onChange={this.handleEmailChange} onFocus={this.handleFocus}/>
                    <textarea className={this.state.messageClassName} value={this.state.message} onChange={this.handleMessageChange} onFocus={this.handleFocus}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export { Contact };