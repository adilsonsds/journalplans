import React, { useState, useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container } from './styles';

export default function Card({ data, index, listIndex }) {
    const [isChecked, setIsChecked] = useState(false);

    function handleCheck(e) {
        setIsChecked(e.target.checked);
    }

    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', index, listIndex },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggedIndex = item.index;
            const targetIndex = index;

            if (draggedIndex === targetIndex && draggedListIndex && targetListIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            if (draggedIndex < targetIndex && draggedTop < targetCenter) {
                // se não arrastou até o meio do card de baixo
                return;
            }

            if (draggedIndex > targetIndex && draggedTop > targetCenter) {
                // se não arrastou até o meio do card de cima
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

            item.index = targetIndex;
            item.listIndex = targetListIndex;
        }
    });

    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging} isChecked={isChecked}>
            {/* <header>
                {data.labels.map(label => <Label key={label} color={label} />)}
            </header> */}
            <input type="checkbox" checked={isChecked} onChange={handleCheck} />
            <p>{data.content}</p>
        </Container>
    )
}