import React from 'react';
import './App.css';
import config from './config';
import Card from './components/Card';

class App extends React.Component {

constructor() {
  super();
  this.state = {
    cards: this.prepareCards(),
    clicks: 0
  }
}

  prepareCards() {
    let id = 1;
    return [...config.cards, ...config.cards]
      .sort(() => Math.random(0) - 0.5)
      .map(item => ({...item, id: id++}));
  }

  choiceCardHandler(item) {
    console.log(item.name);
  }

  render() {
    return (
      <div className="App">
        <header className='header'>Memory Game</header>
        <div className='game'>
          <div className='score'>
            Нажатий: {this.state.clicks}
          </div>
          <div className='cards'>
            {
              this.state.cards.map(item => (
                <Card 
                  item={item} 
                  key={item.id}
                  onChoice={this.choiceCardHandler}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }

}

export default App;
