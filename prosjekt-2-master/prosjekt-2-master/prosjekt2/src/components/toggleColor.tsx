import React, { Component } from "react"

/**
 * Class for rendering "Toggle blue mode"-button, and its functionality
 */
class toggleColor extends Component {
    constructor(props: string) {
        super(props)
        this.state = {
            color: "hsl(209, 92%, 98%)"
        }
    }

    /**
     * Executes on click on "Toggle blu mode"-button
     * Changing the body-color, which is then inherited in css
     */
    toggle() {
        const body = document.body
        if(body !== null){
            if(body.style.backgroundColor === "white"){
                body.style.backgroundColor = "hsl(209, 92%, 98%)"
            }
            else{
                body.style.backgroundColor = "white"
            }
        }
    }


    render() {
        return (
            <div>
                <button id="tglColorBtn" onClick={this.toggle}>Toggle blue mode</button>
                {/* <div id="visDiv">{this.state.message}</div> */}
            </div>
        )
    }
}

export default toggleColor;