import React from "react";
import logo from "./assets/logo.svg";
import "./Header.css";
import CircularProgressbar from "./components/CircularProgressbar";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.animationTime = "1.5s";
        this.radius = 15;
        this.initialAnimationDelay = 50;
    }

    renderReactImage() {
        return (<img src={logo} className="Header-logo" alt="logo" width="50" height="50" />);
    }

    render() {
        return (
            <header className="Header">
                {this.renderReactImage()}
                <CircularProgressbar radius={this.radius}
                    progress={75}
                    initialAnimation={true}
                    initialAnimationDelay={this.initialAnimationDelay}
                    strokeLinecap="butt"
                    transition={this.animationTime}
                    trackTransition={this.animationTime}
                    strokeColor={"#1C89BF"} >
                </CircularProgressbar>
            </header>
        );
    }
}
