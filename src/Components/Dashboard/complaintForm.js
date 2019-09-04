import React, { Component } from 'react'
import { connect } from "react-redux"
import './Form.css'
import 'font-awesome/css/font-awesome.min.css';
// time
let formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes; // for less than 10 minutes to add a zero upfront
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

class ComplaintForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      block: "block-1",
      floorNo: [1, 2, 3, 4],
      floor: "floor-1",
      systemNumber: "",
      description: "",
      err: false
    }
    // this.blockRef=React.createRef()
    // this.floorRef=React.createRef()
    this.systemRef=React.createRef()
    this.descRef=React.createRef()
  }
  // componentDidMount(){
  //   this.blockRef.current.focus()
  // }

  handleChange = (e) => {
    // System Number
    if (e.target.name === "systemNumber") {
      if (Number.isInteger(parseInt(e.target.value))) {
        this.setState({ systemNumber: e.target.value })
      }
      else if (isNaN(parseInt(e.target.value))) {
        return this.setState({ err: true })
      }
    }

    // separate for floor and system number
    if (e.target.name !== "floor" && e.target.name !== "systemNumber") {
      this.setState({ [e.target.name]: e.target.value })
    }
    // for dynamic dropdown to FLOOR additional function
    if (e.target.name === "block") {
      // passing block value since setstate doesn't update soon
      this.floorMap(e.target.value)
      this.setState({ floorView: false })
    }
  }


  floorMap = (blockValue) => {
    switch (blockValue) {
      // case "block-1":
      //   return this.setState({ floorNo: 4 })
      case "block-2":
        return this.setState({ floorNo: [1, 2, 3, 4, 5] })
      case "block-3":
        return this.setState({ floorNo: [1, 2, 3, 4, 5, 6] })
      case "block-4":
        return this.setState({ floorNo: [1, 2, 3, 4, 5, 6, 7] })
      default:
        return this.setState({ floorNo: [1, 2, 3, 4] })
    }
  }
  handleKeyPress=(e)=>{
    if(e.key==='Enter' && e.target.name==='systemNumber'){
      // if(e.target.name==='block'){
      //   this.floorRef.current.focus()
      // }
      // else if(e.target.name==='floor'){
      //   this.systemRef.current.focus()
      // }
      // if(e.target.name==='systemNumber'){
        this.descRef.current.focus()
      // }
    }
  }

  handleClick = () => {
    const { block, floor, systemNumber, description } = this.state
    if (parseInt(systemNumber) % 1 === 0) {
      this.props.setForm(block, floor, systemNumber, description)
    }
    else {
      this.setState({ err: true })
      this.setState({ systemNumber: "" })
    }
    this.setState({
      block: "block-1",
      floor: "floor-1",
      systemNumber: "",
      description: "",
    })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div style={{ width: '30%' }} className="complaint-form">
        {/* <span onClick={this.props.show} class="closeButton">&times;</span> */}
      <button className="closeButton" name = "complaintform" onClick={this.props.show}>&times;</button>
      {/* <i onClick={this.props.show}class="fa">&#xf00d;</i> */}
        <h1 className="heading">Complaint-Form</h1>
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/* Block */}
          <label className="label">Block : </label>&nbsp;
          <select 
            name="block"
            id="myList"
            onChange={this.handleChange}
          // value={this.state.block}
          >
            {/* <option></option> */}
            <option>block-1</option>
            <option>block-2</option>
            <option>block-3</option>
            <option>block-4</option>
          </select><br></br>

          {/* Floor */}
          <label className="label">Floor : </label>&nbsp;
          <select
            name="floor"
            onChange={this.handleChange}
            id="myList"

          // value={this.state.floor}
          >
            {/* <option></option> */}
            {
              this.state.floorNo ? this.state.floorNo.map((i) => {
                return (<option key={(i * 100).toString()}>{`floor-${i}`}</option>)
              }) : ""
            }
          </select><br></br>

          {/* System Number */}
          <label className="label">System Number : </label>
          <input 
           ref={this.systemRef}
            onKeyPress={this.handleKeyPress}
            name="systemNumber"
            type="number"
            onChange={this.handleChange}
            step={1}
            value={this.state.systemNumber}
          ></input><br></br>
          {this.state.err ? <p>Enter a number</p> : ""}


          {/* Description */}
          <label className="label">Description :</label>
          <textarea
           ref={this.descRef}
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          ></textarea><br></br>
          <button className="submit" onClick={this.handleClick} type="submit">Submit</button>
        </form>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setForm: (block, floor, systemNumber, description) => dispatch({
      type: "ADD_LIST", payload: {
        block, floor, systemNumber, description, createdTime: formatAMPM(new Date()), technician: ''
      }
    })
  }
}

export default connect(null, mapDispatchToProps)(ComplaintForm)