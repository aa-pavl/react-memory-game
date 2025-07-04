import React from 'react';

class Card extends React.Component {

    cardClickHandler(item) {
        this.props.onChoice(item);
    }


    render() {
        return (
            <div className='card' onClick={this.cardClickHandler.bind(this, this.props.item)}>
                <img 
                    src={'/images/' + this.props.item.image} 
                    alt={this.props.item.name} 
                />
            </div>
        )
    }
}

export default Card;