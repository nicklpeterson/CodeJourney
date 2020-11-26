import React, {Component} from "react"
export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }

    generate = () =>{
        this.setState({
            code: document.getElementById("textfield-code").innerHTML
        });
    };

    render() {
        const { code } = this.state;
        return (
            <div className="App">
                <header className="code-editor">
                    <p>
                        please input your code, and click generate once you complete
                    </p>
                    <forum>
                    <textarea cols={80} rows={40} id={"textfield-code"}>
                    </textarea>
                        <br/>
                        <button onClick={this.generate} id={"btn-generateInput"}>generate</button>
                    </forum>
                </header>
            </div>
        )
    }
}