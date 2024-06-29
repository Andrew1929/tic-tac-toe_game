import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState  {
    score: { player1: number; player2: number };
    board: string[];
    currentPlayer : string;
    winner : string | null;
    isGameOver: boolean;
}

const initialGameState : GameState = {
    score: { player1: 0, player2: 0 },
    board : Array(9).fill(''),
    currentPlayer : 'X',
    winner : null,
    isGameOver : false,
};

const checkWinner = (board: string[]): string | null => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    return null;
};

const gameSlice = createSlice({
    name: 'tic-tac-toe',
    initialState : initialGameState,
    reducers : {
        makeMove(state, action: PayloadAction<{ index: number }>) {
            if (state.board[action.payload.index] === '' && !state.isGameOver) {
              state.board[action.payload.index] = state.currentPlayer;
              const winner = checkWinner(state.board);
      
              if (winner) {
                state.winner = winner;
                state.isGameOver = true;
              } else if (!state.board.includes('')) {
                state.isGameOver = true;
              } else {
                state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
              }
            }
        },

        increaseScore(state, action: PayloadAction<{ winner: string }>) {
            if (action.payload.winner === 'X') {
              state.score.player1 += 1;
            } else if (action.payload.winner === 'O') {
              state.score.player2 += 1;
            }
        },

        resetGame (state) {
            state.board = Array(9).fill('');
            state.currentPlayer = 'X';
            state.winner = null;
            state.isGameOver = false;
        },

        setWinner (state , action : PayloadAction <{winner : string}>) {
            state.winner = action.payload.winner;
            state.isGameOver = true;
        },

        resetScore(state) {
            state.score = { player1: 0, player2: 0 };
        },
    }, 
});

export const {makeMove, resetGame, setWinner , increaseScore, resetScore} = gameSlice.actions;
export default gameSlice.reducer;