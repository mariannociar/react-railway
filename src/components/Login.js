import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class Login extends React.Component {
    state = {
        uname: "",
        psw: "",
        token: "",
        haveResponse: false,
        response: {detail: ""},
        redirect: false,
    }

    handleChange = (e) => {
        if(e.target.id === "uname"){
            this.setState({uname: e.target.value})
        }
        else if(e.target.id === "psw"){
            this.setState({psw: e.target.value})
        }
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    handleClick = () => {
        const post = {};
        post.login = this.state.uname;
        post.password = this.state.psw;
        console.log(post)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('accept', 'application/json');
        
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(post)
        };
        console.log(requestOptions)
        fetch('http://127.0.0.1:8000/accounts/login/', requestOptions)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    haveResponse: true,
                    response: json,
                })
            });
    }
    componentDidUpdate = () => {
        if(this.state.haveResponse){
            if(this.state.response.detail === "Login successful"){
                this.props.updateUnameToken(this.state.uname, this.state.response.token)
                this.setState({
                    haveResponse: false,
                })
                setTimeout(()=> this.setState({redirect: true}), 1000)
            }
        }
    }
    
    render(){
        if(this.state.response.detail === "Login successful"){
            //this.props.updateUnameToken(this.state.uname, this.state.response.token)
            console.log(this.state.response)
            return(
                <div>
                    {this.state.redirect?<Redirect to='/'></Redirect>: <h1> You are logged in</h1>}
                </div>
            )
        }
        else{
            return(
                <div className='login'>
                    <h2> Prihlasenie </h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="loginForm">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input id='uname' onChange={this.handleChange} type="text" placeholder="Enter Username" name="uname" required></input>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input id='psw' onChange={this.handleChange} type="password" placeholder="Enter Password" name="psw" required></input>
                                
                            <button onClick={this.handleClick} type="submit">Login</button>
                            <label> Remember me</label>
                            <input type="checkbox" name="remember"></input>
                            
                        </div>   
                    </form>                
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUnameToken: (uname, token) => {dispatch({type: 'UPDATE_UNAME_TOKEN', uname: uname, token: token})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)



                                