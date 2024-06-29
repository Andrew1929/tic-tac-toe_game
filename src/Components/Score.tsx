import React from 'react';
import '../Styles/scoreStyle.css';
import { useDispatch ,useSelector  } from 'react-redux';
import { RootState } from '../store/store';
import { resetGame, resetScore } from '../store/slices/gameSlice';

export const Score : React.FC = () => {
    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.game.score);

    const handleReset = () => {
        dispatch(resetGame());
        dispatch(resetScore());       
    };

    return (
        <header className='scoreboard'>
            <h3 className="players-username">PLayer 1</h3>

            <div className="score-and-button">
                <h2 className="score">Score: {score.player1}:{score.player2}</h2>

                <button className='reset-btn'  onClick={handleReset}>Reset</button>
            </div>

            <h3 className="players-username">PLayer 2</h3>
        </header>
    )
}