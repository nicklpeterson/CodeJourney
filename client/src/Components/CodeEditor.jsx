import React, {Component} from "react";
import FlowDiagram from "./FlowDiagram";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const CodeEditor = () => {
    const [code, setCode] = React.useState(
        `function add(a, b) { 
    return a + b;
}
add(1, 2);
`);

        return (
            <React.Fragment>
            <div className="code-editor">
                <header>
                    Please input your code.
                </header>
                <Editor
                    value = {code}
                    onValueChange = {code => setCode(code)}
                    highlight = { code => highlight(code, languages.js) }
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
            <FlowDiagram code = {code}/>
            </React.Fragment>
        );
}

export default CodeEditor;