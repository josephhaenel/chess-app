import './Chessboard.css';
import Tile from '../Tile/Tile';
import * as React from 'react';
import Referee from "../../referee/referee";


const horizontalAxist = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxist = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
    image: string;
    x: number;
    y: number;
}

// const pieces: Piece[] = [];

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w";
    const y = (p === 0) ? 7 : 0;

    initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 0, y })
    initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 7, y })
    initialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 1, y })
    initialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 6, y })
    initialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 2, y })
    initialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 5, y })
    initialBoardState.push({ image: `assets/images/king_${type}.png`, x: 4, y })
    initialBoardState.push({ image: `assets/images/queen_${type}.png`, x: 3, y })
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = React.useState<HTMLElement | null >(null);
    const [gridX, setGridX] = React.useState(0);
    const [gridY, setGridY] = React.useState(0);
    const [pieces, setPieces] = React.useState<Piece[]>(initialBoardState);

    const chessBoardRef = React.useRef<HTMLDivElement>(null);

    function grabPiece(e: React.MouseEvent) {
        const chessboard = chessBoardRef.current;
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));

            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;

            activePiece.style.position = "absolute";

            if ( x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if(x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }


            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }
            // activePiece.style.left = x < minX ? `${minX}px` : `${x}px`;
            // activePiece.style.top = y < minY? `${minY}px` : `${y}px`;



        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));


            setPieces((value) => {
                const pieces = value.map((p) => {
                    if(p.x === gridX && p.y === gridY) {
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                });
                return pieces;
            });

            setActivePiece(null);
        }
    }

    let board = [];
    for (let j = verticalAxist.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxist.length; i++) {
            let number = j + i;
            number = number + 2;
            let image = "";

            pieces.forEach(piece => {
                if(piece.x === i && piece.y === j) {
                    image = piece.image;
                }
            })
            
            board.push(<Tile key={`${j},${i}`} image={image} number={number}/>)
        }
    }
    return <div 
            onMouseMove={(e) => movePiece(e)} 
            onMouseDown={(e) => grabPiece(e)} 
            onMouseUp={(e) => dropPiece(e)} 
            id="chessboard"
            ref={chessBoardRef}>{board}</div>
    
}