import { Score } from "./Components/Score";
import { TicTacToeBoard } from "./Components/TicTacToeBoard";
import { PlayerChat } from "./Components/PlayerChat";
import './Styles/pageStyle.css'

const App : React.FC = () =>{
  return (
    <div className="game-container">
      <div className="game">
        <Score/>

        <TicTacToeBoard/>
      </div>

      <div className="chat-container">
        <PlayerChat player="player1" />
        <PlayerChat player="player2" />
      </div>
    </div>
  )
}

export default App;

