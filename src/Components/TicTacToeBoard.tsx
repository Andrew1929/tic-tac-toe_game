import React , {useEffect, useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { makeMove,  resetGame, increaseScore  } from '../store/slices/gameSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons'
import '../Styles/TicTacToeBoardStyle.css';

export const TicTacToeBoard : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const board = useSelector((state: RootState) => state.game.board);
    const [showWinnerMessage, setShowWinnerMessage] = useState(false);
    const [winningCells, setWinningCells] = useState<number[]>([]);
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayer);
    const isGameOver = useSelector((state: RootState) => state.game.isGameOver);
    const winner = useSelector((state: RootState) => state.game.winner);

    useEffect(() => {
        let timeoutId: number;
    
        if (isGameOver) {
          setShowWinnerMessage(true);
          timeoutId = window.setTimeout(() => {
            setShowWinnerMessage(false);
            dispatch(resetGame());
          }, 5000);
        }
    
        return () => {
          clearTimeout(timeoutId);
        };
    }, [isGameOver, dispatch]);
    
  const handleMove = (index: number) => {
        if (!isGameOver) {
          dispatch(makeMove({ index }));
        }
    };
    
    const renderIcon = (player: string) => {
        return player === 'X' ? (
          <FontAwesomeIcon className='Xmark' icon={faXmark} />
        ) : (
          <FontAwesomeIcon className='Circle' icon={faCircle} />
        );
    };
    
    useEffect(() => {
        if (winner) {
          dispatch(increaseScore({ winner }));
        }
    }, [winner, dispatch]);
    
    const winningCombinations: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    useEffect(() => {
        for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setWinningCells(combination);
            break;
          }
        }
    }, [board]);

    const getClassName = (index: number) => {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        return `cell y${row}x${col}`;
    };

    
    const notificationMessage = isGameOver ? (winner ? `Winner: ${winner}` : 'Draw!') : `Player ${currentPlayer}, it's your turn`;
    const winnerMessage = winner ? `${winner} wins!` : "It's a draw!";

    return (
        <main className='main'>
            <div className="player-board first-board">
                <h2 className='notification'>
                    {notificationMessage}
                </h2>

                <div className="tic-tac-toe-board">
                    {board.map((cell , index) => (
                        <button key={index} className={getClassName(index)} onClick={() => handleMove(index)}>
                           {cell && renderIcon(cell)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="player-board second-board">
                <h2 className='notification'>
                    {isGameOver ? (winner ? `Winner: ${winner}` : 'Draw!') : `Player ${currentPlayer}, it's your turn`}
                </h2>

                <div className="tic-tac-toe-board">
                    {board.map((cell , index) => (
                        <button key={index} className={getClassName(index)} onClick={() => handleMove(index)}>
                           {cell && renderIcon(cell)}
                        </button>
                    ))}
                </div>
            </div>
            {showWinnerMessage && (
                <div className="winner-message">
                    <p className='winner-message-text'>{winnerMessage}</p>
                </div>
            )}
        </main>
    )
}