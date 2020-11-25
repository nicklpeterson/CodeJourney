import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="code-editor">
        <p>
          please input your code, and click generate once you complete
        </p>
        <forum>
          <textarea cols={80} rows={40}>
          </textarea>
          <br/>
          <input type = "submit" value = "generate">
          </input>
        </forum>
      </header>
    </div>
  );
}

export default App;
