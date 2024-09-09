import { useSocket } from "../hooks/useSocket";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { ChessBoard } from "../components/ChessBoard";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  // Handle incoming socket messages
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          chess.reset();
          setBoard(chess.board());
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move made");
          break;
        case GAME_OVER:
          console.log("game over");
          break;
        default:
          break;
      }
    };
  }, [socket, chess]);

  // Send a message to the server when the button is clicked
  const handleClick = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: INIT_GAME,
        })
      );
    }
  };

  return (
    <>
      {!socket ? (
        <div className="text-white">Connecting...</div>
      ) : (
        <div className="flex w-full justify-center">
          <div className="max-w-screen-lg w-full">
            <div className="grid grid-cols-6 mt-4 gap-4 w-full">
              <div className="col-span-4 w-full flex justify-center">
                <ChessBoard
                  board={board}
                  socket={socket}
                  chess={chess}
                  setBoard={setBoard}
                />
              </div>
              {!started && (
                <div className="col-span-2 w-full">
                  <Button onClick={handleClick}>Play Online</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
