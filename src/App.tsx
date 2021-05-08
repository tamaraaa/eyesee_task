import React from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';

import './App.scss';

const App = observer(() => {
    return (
        <div className="App">
            <div className="App__sidebar">
                <Sidebar />
            </div>
            <Board />
        </div>
    );
});

export default App;
