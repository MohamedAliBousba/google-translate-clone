import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='language-bar'>
          <div>English</div>
          <div>Arabic</div>
        </div>
        <div className="translation-boxes">
          <div>
            <textarea cols={30} rows={10}></textarea>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
