import Analyzer from "./Analyzer";
import Iroh from '../node_modules/iroh';

class LooseAnalyzer extends Analyzer {
    constructor(code) {
        super(code);
        this._nextId = 1;
        this.addFunctionListeners();
    }

    addFunctionListeners() {
        this._stage.addListener(Iroh.FUNCTION).on('enter', (event) => {
            const caller = this._callStack.peek();
            const funId = this.getNextId();
            if (caller) {
                const link = {
                    source: caller.funId ? caller.funId : 0,
                    target: funId,
                    value: 1,
                    polarity: 1,
                    targetDistance: 1,
                    type: 'call',
                    typeParam: 1
                };
                console.log('Adding Link: ' + JSON.stringify(link));
                this._callLinks.push(link);
            }

            this._callStack.push({
                funId: funId,
                hash: event.hash,
                data: { parameters: event.arguments }
            });
        });

        const functionExitListener = event => {
            const fun = this._callStack.pop();
            if (fun) {
                this._functionNameMap[fun.hash] = event.name;
                fun.name = event.name;
                if (event.return) {
                    fun.data = { ...fun.data, return: event.return };
                }
                fun.id = this._nodes.length;
                this._functionIndexMap[fun.funId] = fun.id;
                console.log('Adding Node: ' + JSON.stringify(fun));
                this._nodes.push(fun);
            }
        }

        this._stage.addListener(Iroh.FUNCTION).on('leave', functionExitListener);

        this._stage.addListener(Iroh.FUNCTION).on('return', functionExitListener);
    }

    formatDataAfterEval() {
        this._functionIndexMap[0] = this._nodes.length - 1;
        this._callLinks.forEach(link => {
            link.source = this._functionIndexMap[link.source];
            link.target = this._functionIndexMap[link.target];
        });
    }

    getNextId() {
        return this._nextId++;
    }
}

export default LooseAnalyzer;