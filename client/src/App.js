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
      blinks: []
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
        'radius': props.blinks[i].radius
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

function Icon(){

  return(
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
      <g>
        <title>Layer 1</title>

        <g id="svg_8">

          <circle id="svg_1" stroke="#000000" opacity="0.25" r="50"  cy="150" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_2" stroke="#000000" opacity="0.25" r="50"  cy="100" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_3" stroke="#000000" opacity="0.25" r="50"  cy="200" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>

          <circle id="svg_4" stroke="#000000" opacity="0.25" r="50"  cy="75" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_5" stroke="#000000" opacity="0.25" r="50"  cy="225" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_6" stroke="#000000" opacity="0.25" r="50" cy="125" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_7" stroke="#000000" opacity="0.25" r="50" cy="175" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>

          <circle id="svg_8" stroke="#000000" opacity="0.25" r="50" cy="50" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_9" stroke="#000000" opacity="0.25" r="50" cy="100" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_10" stroke="#000000" opacity="0.25" r="50"  cy="150" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#19a01b"/>
          <circle id="svg_11" stroke="#000000" opacity="0.25" r="50" cy="200" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_12" stroke="#000000" opacity="0.25" r="50" cy="250" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          
          <circle id="svg_13" stroke="#000000" opacity="0.25" r="50"  cy="75" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_14" stroke="#000000" opacity="0.25" r="50" cy="125" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_15" stroke="#000000" opacity="0.25" r="50" cy="175" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_16" stroke="#000000" opacity="0.25" r="50"  cy="225" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          
          <circle id="svg_17" stroke="#000000" opacity="0.25" r="50"  cy="100" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>     
          <circle id="svg_18" stroke="#000000" opacity="0.25" r="50"  cy="150" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>
          <circle id="svg_19" stroke="#000000" opacity="0.25" r="50"  cy="200" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#0c4e6d"/>

          <circle id="svg_20" stroke="#4286f4" opacity="1" r="1" cy="50" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_21" stroke="#4286f4" opacity="1" r="1" cy="150" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_22" stroke="#4286f4" opacity="1" r="1" cy="100" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_23" stroke="#4286f4" opacity="1" r="1" cy="200" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_24" stroke="#4286f4" opacity="1" r="1" cy="250" cx="63" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>

          <circle id="svg_25" stroke="#4286f4" opacity="1" r="1" cy="75" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_26" stroke="#4286f4" opacity="1" r="1" cy="125" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/> 
          <circle id="svg_27" stroke="#4286f4" opacity="1" r="1" cy="175" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_28" stroke="#4286f4" opacity="1" r="1" cy="225" cx="105" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>

          <circle id="svg_29" stroke="#4286f4" opacity="1" r="1" cy="50" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_30" stroke="#4286f4" opacity="1" r="1" cy="100" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_31" stroke="#4286f4" opacity="1" r="1" cy="150" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_32" stroke="#4286f4" opacity="1" r="1" cy="200" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_33" stroke="#4286f4" opacity="1" r="1" cy="250" cx="150" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>

          <circle id="svg_34" stroke="#4286f4" opacity="1" r="1" cy="75" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_35" stroke="#4286f4" opacity="1" r="1" cy="125" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_36" stroke="#4286f4" opacity="1" r="1" cy="175" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_37" stroke="#4286f4" opacity="1" r="1" cy="225" cx="195" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>

          <circle id="svg_38" stroke="#4286f4" opacity="1" r="1" cy="50" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_39" stroke="#4286f4" opacity="1" r="1" cy="100" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_40" stroke="#4286f4" opacity="1" r="1" cy="150" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>   
          <circle id="svg_41" stroke="#4286f4" opacity="1" r="1" cy="200" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
          <circle id="svg_42" stroke="#4286f4" opacity="1" r="1" cy="250" cx="237" strokeLinecap="null" strokeLinejoin="null" strokDasharray="null" strokeWidth="5" fill="#ffffff"/>
        
        </g>
      </g>
    </svg>
  )

}

export default App;
