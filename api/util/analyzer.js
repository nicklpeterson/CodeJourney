import Stack from "./stack";
import Iroh from '../node_modules/iroh';

class Analyzer {
  constructor(code) {
    this._stage = new Iroh.Stage(code);
    this._callStack = new Stack();
    this._callLinks = [];
    this._nodes = [];
    this._functionIndexMap = {};
    this._id = 1;

    this._stage.addListener(Iroh.PROGRAM).on('enter', (event) => {
      this._callStack.push({
        hash: event.hash,
        data: {},
        name: '__Main__'
      });
    });

    this._stage.addListener(Iroh.PROGRAM).on('leave', (event) => {
      const program = this._callStack.pop();
      this._nodes.push(program);
      this._functionIndexMap[program.hash] = this._nodes.length - 1;
    });

    this._stage.addListener(Iroh.FUNCTION).on('enter', (event) => {
      const caller = this._callStack.peek();
      if (caller) {
        const type = event.hash === caller.hash ? 'recursion' : 'call';
        const link = {
          source: caller.hash,
          target: event.hash,
          value: 1,
          polarity: 1,
          targetDistance: 1,
          type: type,
          typeParam: " 1",
        };
        console.log('Adding Link: ' + JSON.stringify(link));
        this._callLinks.push(link);
      }
      this._callStack.push({
        hash: event.hash,
        data: {parameters: event.arguments}
      });
    });

    this._stage.addListener(Iroh.FUNCTION).on('leave', event => {
      const fun = this._callStack.pop();
      if (fun) {
        fun.name = event.name;
        console.log('Adding Node: ' + JSON.stringify(fun));
        this._nodes.push(fun);
        this._functionIndexMap[fun.hash] = this._nodes.length - 1;
      }
    });

    this._stage.addListener(Iroh.FUNCTION).on('return', event => {
      const fun = this._callStack.pop();
      if (fun) {
        fun.data = {...fun.data, return: event.return};
        fun.name = event.name;
        console.log('Adding Node: ' + JSON.stringify(fun));
        this._nodes.push(fun);
        this._functionIndexMap[fun.hash] = this._nodes.length - 1;
      }
    });
  }

  evaluate() {
    eval(this._stage.script);
    this._nodes.forEach(node => {
      node.id = this._functionIndexMap[node.hash];
    });

    this._callLinks.forEach(link => {
      link.source = this._functionIndexMap[link.source];
      link.target = this._functionIndexMap[link.target];
    });
  }

  get nodes() {
    return this._nodes;
  }

  get callLinks() {
    return this._callLinks;
  }
}

export default Analyzer;