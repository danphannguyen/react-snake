import Board from './components/Board/Board';
import Toggle from './components/Toggle/Toggle';

import logo from './logo.svg';

function App() {
  return (
    <div>

      <div className="flashbang"></div>

      <Board />
      <div className='toggle-wrapper'>
        <Toggle mode={"Corner"} />
        <Toggle mode={"Impossible"} />
        <Toggle mode={"Reversed"} />
        <Toggle mode={"Halloween"} />
      </div>

    </div>

  );
}

export default App;
