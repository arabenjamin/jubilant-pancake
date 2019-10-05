import 'bootstrap/dist/css/bootstrap.css';
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
      hasError: false,
      hasBlinked: 0,
      data: null,
      blinks: [],
      name: "Ara Sheperdigian"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postPing(){
    //console.log("Posting Blink!")
    fetch('/ping', {
      method:"GET"
    })
    .then( res => res.json())
    .then(
      (result)=>{
        //console.log(result);
        var newBlinks = this.state.blinks.concat({
          radius:50,
          x:150,
          y:150,
        })
        this.setState({
          hasBlinked: this.state.hasBlinked+1,
          hasPosted:true,
          data: result.this_request,
          blinks:newBlinks
        })
      },
      (error)=>{
        console.log("ERROR!", error);
        this.setState({
          hasError: true,
        })
      });
  }

  resetState(){
		sleep(250).then(() => {
        	this.setState({
          hasPosted: false,
          hasError: false,
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
          hasError = {this.state.hasError}
        />
        
        <Icon2 blinks = {this.state.blinks}/>
        <MyLogo />

        <MyName data={this.state.name}/>
      </div>
    );
  }
}

function Button(props){

  if (props.hasError){

    //console.log(props);
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
  } else if(props.hasPosted){

    //console.log(props);
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
  } else {

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
}

function Icon2(props){

  console.log(props);

  var blinks = props.blinks.length;
  
  var nodes = [];
  var width = 300;

  for (let i=0; i<blinks; i++){

    let angle = (i /(blinks/2)) * Math.PI;
    let x = (props.blinks[i].radius * Math.cos(angle)) + (width/2);
    let y = (props.blinks[i].radius * Math.sin(angle)) + (width/2);
    let node = {
        'id':i,
        'x':x, 
        'y':y,
        'radius': 50
    };
    nodes.push(node);
  }

  const dots = nodes.map( (dot) =>
    <React.Fragment key={dot.id}>
      <circle id={dot.id} stroke="#000000" opacity=".25" r={dot.radius} cy={dot.y} cx={dot.x} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
      <circle id={dot.id} stroke="#000000" opacity=".25" r={dot.radius/dot.radius} cy={dot.y} cx={dot.x} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
    </React.Fragment>
  )

  return(
    <svg className="icon2" width={width} height={width} xmlns="http://www.w3.org/2000/svg" >
      <g>
        <circle id="base_circle" stroke="#000000" opacity="0.25" r="50"  cy={width/2} cx={width/2} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#19a01b"/>
        {dots}
        <circle id="top_circle" stroke="#000000" opacity="0.1" r="100"  cy={width/2} cx={width/2} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#19a01b"/>
      </g>
    </svg>
  )
}

function MyLogo(props){
  
  var leaves = 6;
  var nodes = [];
  var width = 300;
  var radius = 50;

  for (let i=0; i<leaves; i++){

    let angle = (i /(leaves/2)) * Math.PI;
    let x = (radius * Math.cos(angle)) + (width/2);
    let y = (radius * Math.sin(angle)) + (width/2);
    let node = {
        'id':i,
        'x':x, 
        'y':y,
        'radius': radius
    };
    nodes.push(node);
  }


  const dots = nodes.map( (dot) =>
    <React.Fragment key={dot.id}>
      <circle id={dot.id} stroke="#000000" opacity=".25" r={dot.radius} cy={dot.y} cx={dot.x} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
      <circle id={dot.id} stroke="#000000" opacity=".25" r={dot.radius/dot.radius} cy={dot.y} cx={dot.x} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
    </React.Fragment>
  )

  return(
    <svg className="icon2" width={width} height={width} xmlns="http://www.w3.org/2000/svg" >
      <g>
        <circle id="base_circle" stroke="#000000" opacity="0.25" r="50"  cy={width/2} cx={width/2} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#19a01b"/>
        {dots}
        <circle id="top_circle" stroke="#000000" opacity="0.1" r="100"  cy={width/2} cx={width/2} strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#19a01b"/>
      </g>
    </svg>
  )

}

function MyName(props){
  var my_name = props.data;
  console.log("Whats my name ?", my_name);
  return(

    <div>
        <h1>{my_name}</h1>
    </div>
  )

}



export default App;
