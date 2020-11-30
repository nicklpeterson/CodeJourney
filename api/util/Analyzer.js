import Stack from "./stack";
import Iroh from '../node_modules/iroh';

class Analyzer {
    constructor(code) {
        this._stage = new Iroh.Stage(code);
        this._callStack = new Stack();
        this._callLinks = [];
        this._nodes = [];
        this._functionIndexMap = {};
        this._functionNameMap = {};
        this._error = null;
        this.addProgramListeners();
    }

    addProgramListeners() {
        this._stage.addListener(Iroh.PROGRAM).on('enter', (event) => {
            this._callStack.push({
                hash: event.hash,
                data: [],
                name: 'ENTRY'
            });
        });

        this._stage.addListener(Iroh.PROGRAM).on('leave', (event) => {
            const program = this._callStack.pop();
            this._nodes.push(program);
            this._functionIndexMap[program.hash] = this._nodes.length - 1;
        });
    }

    evaluate() {
        try {
            eval(this._stage.script);
            this.formatDataAfterEval();
        } catch (error) {
            this._error = error;
        }
    }

    formatDataAfterEval() {}

    get nodes() {
        return this._nodes;
    }

    get callLinks() {
        return this._callLinks;
    }

    get error() {
        return this._error;
    }
}

export default Analyzer;