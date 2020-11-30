import Iroh from '../node_modules/iroh';
import Analyzer from "./Analyzer";

class CompactAnalyzer extends Analyzer {
  constructor(code) {
    super(code);
    this.addFunctionEnterListeners();
    this.addFunctionExitListeners();
  }

  addFunctionEnterListeners() {
    this._stage.addListener(Iroh.FUNCTION).on('enter', (event) => {
      const caller = this._callStack.peek();
      if (caller) {
        let newLink = null;
        this._callLinks.forEach(link => {
          if (link.target === event.hash && link.source === caller.hash) {
            link.typeParam++;
            // console.log('Incrementing link: ' + JSON.stringify(link));
            newLink = link;
          }
        });

        if (newLink === null) {
          const link = {
            source: caller.hash,
            target: event.hash,
            value: 1,
            polarity: 1,
            targetDistance: 1,
            type: caller.hash === event.hash ? 'recursion' : 'call',
            typeParam: 1
          };
          // console.log('Adding Link: ' + JSON.stringify(link));
          this._callLinks.push(link);
        }
      }

      this._callStack.push({
        hash: event.hash,
        data: {inputs: [{caller: caller.hash, parameters: event.arguments}], TimeSpentInFunction: 0},
        start: Date.now()
      });
    });
  }

  addFunctionExitListeners() {

    const functionExitListener = event => {
      const fun = this._callStack.pop();
      this._functionNameMap[fun.hash] = event.name;
      if (fun) {
        const timeElapsed = Date.now() - fun.start;
        fun.data.inputs[0].time = timeElapsed;
        const indexOfNode = this._functionIndexMap[fun.hash];
        if (indexOfNode || indexOfNode === 0) {
          const node = this._nodes[indexOfNode];
          if (event.return) {
            node.data.inputs.push({...fun.data.inputs[0], return: event.return})
          }
          else {
            node.data.inputs.push(fun.data.inputs[0]);
          }
          node.data.TimeSpentInFunction += timeElapsed;
          // console.log('Update Node: ' + JSON.stringify(this._nodes[indexOfNode]));
        }
        else {
          fun.data.TimeSpentInFunction += timeElapsed;
          fun.name = event.name;
          if (event.return) {
            fun.data.inputs[0] = {...fun.data.inputs[0], return: event.return};
          }
          this._nodes.push(fun);
          this._functionIndexMap[fun.hash] = this._nodes.length - 1;
        }
      }

    }

    this._stage.addListener(Iroh.FUNCTION).on('leave', functionExitListener);

    this._stage.addListener(Iroh.FUNCTION).on('return', functionExitListener);
  }

  formatDataAfterEval() {
    this._nodes.forEach(node => {
      node.id = this._functionIndexMap[node.hash];
      if (node.data && node.data.inputs) {
        node.data.TimeSpentInFunction = node.data.TimeSpentInFunction.toString() + " ms";
        node.data.inputs.forEach(element => {
          if (element.caller) {
            element.caller = this._functionNameMap[element.caller];
          }
        })
      }
    });
    this._callLinks.forEach(link => {
      link.source = this._functionIndexMap[link.source];
      link.target = this._functionIndexMap[link.target];
      link.typeParam = link.typeParam.toString();
    });
  }
}

export default CompactAnalyzer;