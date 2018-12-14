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
        if(this.state.email === '' || this.state.email === 'Your Email please') {
            this.setState({
                email: 'Your Email please',
                emailClassName: 'contact-form-email contact-form-error',
            });
        } else if(this.state.email.indexOf('@') === -1) {
            this.setState({
                email: 'Email invalid',
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
    letItSnow() {
        let display = document.getElementById('display');
        let ctx = display.getContext('2d');
        let width = display.width = window.innerWidth;
        let height = display.height = window.innerHeight;


        class Snow {
            constructor(){
                this.x = Math.floor(Math.random() * width);
                this.y = 0;
                this.update = this.update.bind(this);
                this.draw = this.draw.bind(this);
                this.radius = Math.random() * 2 + 3;
                this.speed = this.radius / 5;
            }
            draw() {
                let x = this.x;
                let y = this.y;
                ctx.save();
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.beginPath();
                ctx.arc(x, y, this.radius, 0, 2*Math.PI); // x, y, r, startAngle, endAngle
                ctx.fill();
                ctx.restore();
            }
            update() {
                if(this.y <= height){
                    this.y += this.speed;
                }
            }
        }

        let array = [];
        requestAnimationFrame(frame);
        function frame() {
            requestAnimationFrame(frame);
            if (Math.random() > 0.95) {
                let snow = new Snow();
                array.push(snow);
            }
            ctx.clearRect(0, 0, width, height);
            array.map((i) => i.update());
            array.map((i) => i.draw());
            if(array.length > 100){
                array.shift();
            }
        }
    }
    componentDidMount() {
        if (window.innerWidth > 1000) this.letItSnow();
    }

    render() {
        return(
            <div className='contact-wrapper'>
                <canvas id='display' width='1' height='1' />
                <Link to='/home'>
                    <div className='contact-close-icon'>
                        <IoIosClose size='4em'/>
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