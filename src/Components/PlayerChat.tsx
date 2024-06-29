import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage } from '../store/slices/chatSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import '../Styles/playerChatStyle.css';

export const PlayerChat = ({ player }: { player: 'player1' | 'player2' }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const messages = useSelector((state: RootState) => state.chat.messages);

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dispatch(addMessage({ text: inputValue, time, player }));
      setInputValue('');
    }
  };

  return (
    <section className="chat-section">
      <div className={`player-chat ${player === 'player1' ? 'first-chat' : 'second-chat'}`}>
        <div className="chat-interface">
          <header className="chat-header">
            <div className="player-role">
              {player === 'player1' ? (
                <FontAwesomeIcon className="icon" icon={faXmark} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCircle} />
              )}
            </div>
            <h3 className="player-username">{player === 'player1' ? 'Player 1' : 'Player 2'}</h3>
          </header>

          <div className="chat">
            <div className="chat-message">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.player === player ? 'own-message' : 'opponent-message'}`}>
                  <p className="message-text">{message.text}</p>
                  <p className="send-message-time">{message.time}</p>
                </div>
              ))}
            </div>

            <div className="input-for-send-message">
              <input
                type="text"
                className="message-input"
                placeholder="Message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="send-btn" onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
