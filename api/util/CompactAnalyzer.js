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
            console.log('Incrementing link: ' + JSON.stringify(link));
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
            type: 'call',
            typeParam: 1
          };
          console.log('Adding Link: ' + JSON.stringify(link));
          this._callLinks.push(link);
        }
      }

      this._callStack.push({
        hash: event.hash,
        data: [{caller: caller.hash, parameters: event.arguments}]
      });
    });
  }

  addFunctionExitListeners() {
    this._stage.addListener(Iroh.FUNCTION).on('leave', event => {
      const fun = this._callStack.pop();
      this._functionNameMap[fun.hash] = event.name;
      if (fun) {
        const indexOfNode = this._functionIndexMap[fun.hash];
        if (indexOfNode || indexOfNode === 0) {
          const node = this._nodes[indexOfNode];
          node.data.push(fun.data[0]);
          console.log('Update Node: ' + JSON.stringify(this._nodes[indexOfNode]));
        }
        else {
          fun.name = event.name;
          console.log('Adding Node: ' + JSON.stringify(fun));
          this._nodes.push(fun);
          this._functionIndexMap[fun.hash] = this._nodes.length - 1;
        }
      }
    });

    this._stage.addListener(Iroh.FUNCTION).on('return', event => {
      const fun = this._callStack.pop();
      this._functionNameMap[fun.hash] = event.name;
      if (fun) {
        const indexOfNode = this._functionIndexMap[fun.hash];
        if (indexOfNode) {
          this._nodes[indexOfNode].data.push({...fun.data[0], return: event.return});
          console.log('Update Node: ' + JSON.stringify(this._nodes[indexOfNode]));
        }
        else {
          fun.name = event.name;
          fun.data[0] = {...fun.data[0], return: event.return};
          console.log('Adding Node: ' + JSON.stringify(fun));
          this._nodes.push(fun);
          this._functionIndexMap[fun.hash] = this._nodes.length - 1;
        }
      }
    });
  }

  formatDataAfterEval() {
    this._nodes.forEach(node => {
      node.id = this._functionIndexMap[node.hash];
      node.data.forEach(element => {
        if (element.caller) {
          element.caller = this._functionNameMap[element.caller];
        }
      })
    });
    this._callLinks.forEach(link => {
      link.source = this._functionIndexMap[link.source];
      link.target = this._functionIndexMap[link.target];
      link.typeParam = link.typeParam.toString();
    });
  }
}

export default CompactAnalyzer;