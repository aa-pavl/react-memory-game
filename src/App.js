import React from 'react';
import './App.css';
import config from './config';
import Card from './components/Card';
import Popup from 'reactjs-popup';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      cards: this.prepareCards(),
      clicks: 0,
      isPopupOpened: false
    }
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    this.setState({
      cards: this.prepareCards(),
      clicks: 0,
      isPopupOpened: false
    })
  }

  prepareCards() {
    // генерация рандомного расположения карточек
    let id = 1;
    return [...config.cards, ...config.cards]
      .sort(() => Math.random(0) - 0.5)
      .map(item => ({ ...item, id: id++, isOpen: false, isCompleted: false }));
  }

  choiceCardHandler(openItem) {
    // не работаем с уже угадаными карточками
    // не открываем юолее 2х карточек одновременно
    if (openItem.isCompleted || this.state.cards.filter(item => item.isOpen).length >= 2) {
      return;
    }

    this.setState({
      cards: this.state.cards.map(item => {
        return item.id === openItem.id ? { ...item, isOpen: true } : item
      })
    }, () => {
      this.processChoosingCards();
    });

    // счетчик нажатий
    this.setState({
      clicks: this.state.clicks + 1
    });
  }


  processChoosingCards() {
    const openedCards = this.state.cards.filter(item => item.isOpen);
    if (openedCards.length === 2) {
      if (openedCards[0].name === openedCards[1].name) {
        // карточки совпали
        this.setState({
          cards: this.state.cards.map(item => {
            // помечаем карточки как завершенные
            if (item.id === openedCards[0].id || item.id === openedCards[1].id) {
              item.isCompleted = true;
            }
            // восстанавливаем состояние закрытой карточки, так как используем его как временное
            item.isOpen = false;
            return item;
          })
        }, () => {
          this.chechForAllCompleted();
        })

      } else {
        // закрытие карточек через 1 сек
        setTimeout(() => {
          this.setState({
            cards: this.state.cards.map(item => {
              item.isOpen = false;
              return item;
            })
          })
        }, 1000)
      }
    }
  }


  chechForAllCompleted() {
    if (this.state.cards.every(item => item.isCompleted)) {
      this.setState({
        isPopupOpened: true
      })
    }
  }

  closePopup() {
    this.setState({
      isPopupOpened: false
    })
    this.startGame();
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
                  isShowed={item.isOpen || item.isCompleted}
                  onChoice={this.choiceCardHandler.bind(this)}
                />
              ))
            }
          </div>
        </div>

        <Popup open={this.state.isPopupOpened} closeOnDocumentClick onClose={this.closePopup.bind(this)}>
          <div className='modal'>
            <span className='close' onClick={this.closePopup.bind(this)}>&times;</span>
            Игра завершена! Ваш результат: {this.state.clicks} кликов!
          </div>
        </Popup>
      </div>
    );
  }

}

export default App;
