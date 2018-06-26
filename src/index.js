import React, { Component } from "react";
import ReactDOM from "react-dom";

const appDiv = document.getElementById("root");

class ToDoRenderer extends Component {
  state = { toDos: [] };
  componentDidMount() {
    fetch("http://localhost:3000/getToDos", {
      method: "POST",
      body: JSON.stringify({
        userName: this.props.userName
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(jsonRes => {
        this.setState({ toDos: jsonRes.response });
        console.log(jsonRes.response);
      });
  }
  render() {
    return (
      <div>
        <h1>Hello {this.props.userName}!</h1>
        <div>
          {this.state.toDos.map(toDo => {
            return (
              <div key={toDo._id}>
                <span>{toDo.done ? "Done " : "Not Done "}</span>
                <span>{toDo.itemName}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
class LogIn extends Component {
  logIn = () => {
    const userName = this.userNameNode.value;
    const passWord = this.passWordNode.value;
    fetch("http://localhost:3000/logIn", {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        password: passWord
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.response === "Ok") {
          this.props.hasLoggedIn(userName);
        }
      });
  };
  render() {
    return (
      <div>
        <input ref={node => (this.userNameNode = node)} />{" "}
        <span> Enter username </span> <br />
        <input type="password" ref={node => (this.passWordNode = node)} />{" "}
        <span> Enter password </span> <br />
        <button onClick={this.logIn}>Submit</button>
      </div>
    );
  }
}
class App extends Component {
  state = { loggedIn: false, userName: "", userId: "" };
  setLoggedInToTrue = userName => {
    this.setState({
      loggedIn: true,
      userName: userName
    });
  };
  render() {
    if (this.state.loggedIn) {
      return <ToDoRenderer userName={this.state.userName} />;
    } else {
      return <LogIn hasLoggedIn={this.setLoggedInToTrue} />;
    }
  }
}
const element = <App />;
const rootElement = document.getElementById("root");

ReactDOM.render(element, rootElement);
