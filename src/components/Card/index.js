import React, { useState, useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import ListContext from '../List/context';
import { Container } from './styles';
import { saveCard } from '../../services/api';

export default function Card({ data, index, listIndex }) {

    const [content, setContent] = useState(data.content);
    const [isChecked, setIsChecked] = useState(data.isChecked);
    const ref = useRef();
    const { move } = useContext(BoardContext);
    const { addEmptyCard } = useContext(ListContext);

    function save() {
        saveCard(listIndex, index, { isChecked, content });
    }

    function handleCheck(e) {
        setIsChecked(e.target.checked);
        save();
    }

    function handleContentChange(e) {
        setContent(e.target.value);
        save();
    }

    function handleContentKeyPress(e) {
        if (!e.target.value) return;

        if (e.key === 'Enter') {
            addEmptyCard();
        }
        save();
    }

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
            <input className="card-task__check" type="checkbox" checked={isChecked} onChange={handleCheck} />
            <input autoFocus className="card-task__input-text" type="text" value={content} onChange={handleContentChange} onKeyPress={handleContentKeyPress} placeholder="Digite" />
        </Container>
    )
}