
import './App.css';
import FormEditor from './FormEditor'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Form Editor Application</h1>
      </header>
      
      {/* Render the FormEditor component */}
      <FormEditor />

      <footer className="App-footer">
        <p>Form Editor App © 2024</p>
      </footer>
    </div>
  );
}

export default App;
