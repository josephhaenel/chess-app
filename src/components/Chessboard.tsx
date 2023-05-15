import React from 'react';
import './Chessboard.css';

const horizontalAxist = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxist = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Chessboard() {

    let board = [];
    for (let j = verticalAxist.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxist.length; i++) {
            let number = j + i;
            number = number + 2;
            if ( number % 2 === 0) {
                board.push(<div className="tile black-tile"></div>)
            }
            else {
            board.push(<div className="tile white-tile"></div>)
            }
        }
    }
    return <div id="chessboard">{board}</div>
    
}