import Stack from "./stack";
import Iroh from '../node_modules/iroh';

class Analyzer {
  constructor(code) {
    this._stage = new Iroh.Stage(code);
    this._callStack = new Stack();
    this._callLinks = [];
    this._nodes = [];

    this._stage.addListener(Iroh.FUNCTION).on('enter', (event) => {
      const caller = this._callStack.peek();
      if (caller) {
        const type = event.hash === caller.id ? 'recursion' : 'call';
        const link = {
          source: caller.id,
          target: event.hash,
          value: 1,
          polarity: 1,
          targetDistance: 1,
          type: type
        };
        console.log('Adding Link: ' + JSON.stringify(link));
        this._callLinks.push(link);
      }
      this._callStack.push({
        id: event.hash,
        data: event.arguments
      });
    });

    this._stage.addListener(Iroh.FUNCTION).on('leave', event => {
      const fun = this._callStack.pop();
      if (fun) {
        fun.name = event.name;
        console.log('Adding Node: ' + JSON.stringify(fun));
        this._nodes.push(fun);
      }
    });

    this._stage.addListener(Iroh.FUNCTION).on('return', event => {
      const fun = this._callStack.pop();
      if (fun) {
        fun.data.return = event.return;
        fun.name = event.name;
        console.log('Adding Node: ' + JSON.stringify(fun));
        this._nodes.push(fun);
      }
    });
  }

  evaluate() {
    eval(this._stage.script);
  }

  get nodes() {
    return this._nodes;
  }

  get callLinks() {
    return this._callLinks;
  }
}

export default Analyzer;