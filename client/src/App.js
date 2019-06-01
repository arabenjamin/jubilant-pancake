import React, { Component } from 'react';
import logo from './fol3.svg';
import './App.css';

function sleep(time){
	return new Promise(resolve => setTimeout(resolve, time));
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isAdmin: false,
      isLoggedin: false,
      hasPosted: false,
      hasBlinked: 0,
      data: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postPing(){
    //console.log("Posting Blink!")
    /**
     * 
     * NOTE: During Development npm start will
     *  cause the enpoint "/ping" to resolve back to /
     *  
     *  Ideally it should result in a 404 
     *     
     * 
     * TODO: Have Go serve this resource, 
     *    so you can point to "/ping", etc     
     * */ 
    fetch('http://localhost:8080/ping', {
      method:"GET"
    })
    .then( res => res.json())
    .then(
      (result)=>{
        //console.log(result);
        this.setState({
          hasBlinked: this.state.hasBlinked+1,
          hasPosted:true,
          data: result.this_request
        })
      },
      (error)=>{
        //console.log("ERROR!", error);
        this.setState({
          hasPosted: false,
        })
      });
  }

  resetState(){
		sleep(250).then(() => {
        	this.setState({
		    	hasPosted: false
	    	})
		});
	}

  handleSubmit(event){
    event.preventDefault();
    //console.log('We clicked the Button')
    this.postPing();
    this.resetState();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Ara Sheperdigian
          </p>
          <a
            className="App-link"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </header>
        <Button  
          handleClick = {this.handleSubmit}
          hasPosted = {this.state.hasPosted}
          hasBlinked = {this.state.hasBlinked} 
          
        />
      </div>
    );
  }
}

function Button(props){

			
	if (!props.hasPosted){
	    return (
		    <div>

		        <div className="container-fluid">
			        <div className="row">
			            <div className="col-xs-12 col-md-12 " id ="reqTbl" >
		                    <button type="button" className="btn btn-primary" onClick={props.handleClick} >Blink Me!&nbsp;
					            <span className="badge badge-info">{props.hasBlinked}</span>
				            </button>
						</div>
					</div>
				</div>	
		    </div>
	    )
	}
    else if (props.hasPosted){
	    return (
			<div>
			
		        <div className="container-fluid">
			        <div className="row">
			            <div className="col-xs-12 col-md-12 " id ="reqTbl" >
				            <button type="button" className="btn btn-success" onClick={props.handleClick}>Blinked!&nbsp;
				                <span className="badge badge-info">{props.hasBlinked}</span>
				            </button>
						</div>
					</div>
				</div>	
			</div>
		)	
	}
    else if(props.hasPosted== null){
		return (
			<div>

		        <div className="container-fluid">
			        <div className="row">
			            <div className="col-xs-12 col-md-12 " id ="reqTbl" >
				            <button type="button" className="btn btn-danger" onClick={props.handleClick}>Oh no!&nbsp;
				                <span className="badge badge-warning">{props.hasBlinked}</span>
				            </button>
						</div>	
					</div>
				</div>	
			</div>
		
		)
	}	
}

export default App;
