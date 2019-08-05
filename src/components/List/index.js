import React, { useEffect, useState } from 'react';
import ListContext from './context';
// import { MdAdd } from 'react-icons/md';
import Card from '../Card';
import { Container } from './styles';

export default function List({ data, index: listIndex }) {
    const [cards, setCards] = useState(data.cards);

    useEffect(() => {
        addEmptyCard();
    }, []);

    function addEmptyCard() {
        setCards([...cards, { id: cards.length + 1, content: '' }]);
    }

    return (
        <ListContext.Provider value={{ addEmptyCard }}>
            <Container done={data.done}>
                <header>
                    <h2>{data.title}</h2>
                    {/* {data.creatable && (
                        <button type="button">
                            <MdAdd size={24} color="#FFF" />
                        </button>
                    )} */}
                </header>

                <ul>
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            listIndex={listIndex}
                            index={index}
                            data={card}
                        />
                    ))}
                </ul>
            </Container>
        </ListContext.Provider>
    )
}