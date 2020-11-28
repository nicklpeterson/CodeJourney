import React, {Component} from "react";
import FlowDiagram from "./FlowDiagram";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const CodeEditor = () => {
    const [inputCode, setInputCode] = React.useState(
        `
const stack = [];
function add(a, b) {
\t\treturn foo(a + 1, b + 1);
};
function foo(a, b) {
    doNothing();
    let ret = 0;
    while (ret < 100) {
        ret += bar(a+1, b+1)
    }
    return ret;
};
function bar(a, b) {
    doNothing();
    const c = factorial(5);
    return a + b + c;
}
function doNothing() {
  console.log('do nothing');
}
function factorial(n) {
    doNothing();
  if (n === 1) {
    return 1;
    }
  return n * factorial(n - 1);
}
add(1, 1);
        
`);

    console.log(inputCode);

        return (
            <React.Fragment>
            <div className="code-editor">
                <header>
                    Please input your code.
                </header>
                <Editor
                    value = {inputCode}
                    onValueChange = {code => setInputCode(code)}
                    highlight = { code => highlight(code, languages.js) }
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
            <FlowDiagram code = {inputCode}/>
            </React.Fragment>
        );
}

export default CodeEditor;
