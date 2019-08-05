import styled, { css } from 'styled-components';

export const Container = styled.div`
    position: relative;
    background: #FFF;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    cursor: grab;
    transition: .5s all;

    ${ props => props.isChecked && css`
        opacity: 0.4;
    ` }

    &:hover {
        background: #63b4ef33;
    }

    header {
        position: absolute;
        top: -22px;
        left: 15px;
    }

    p {
        font-weight: 500;
        line-height: 20px;
        padding-left: 7px;
    }

    img {
        width: 24px;
        height: 24px;
        border-radius: 2px;
        margin-top: 5px;
    }

    .card-task__check {

    }

    .card-task__input-text {
        width: 100%;
        padding: 5px;
        border: none;
        background: transparent;
    }

    ${ props => props.isDragging && css`
        border: 2px dashed rgba(0, 0, 0, 0.2);
        padding-top: 6px;
        border-radius: 15px;
        background: transparent;
        box-shadow: none;
        cursor: grabbing;

        p, img, header {
            opacity: 0;
        }
    `}

    
`;

export const Label = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
    background: ${ props => props.color };
`;