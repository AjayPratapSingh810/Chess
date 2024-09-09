import { Color, PieceSymbol, Square } from "chess.js";
import { useEffect, useState } from "react";
import { MOVE } from "../screens/Game";
export const ChessBoard = ({
  chess,
  setBoard,
  board,
  socket,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket | null;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="text-white-200 border-2 border-black">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    console.log("from --> ", from);
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      setTo(squareRepresentation);
                      socket?.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from: from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      chess.move({
                        from: from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                      setFrom(null);
                      setTo(null);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-green-500" : "bg-white"
                  }`}
                >
                  <div className="w-full h-full flex justify-center align-center">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-[4.25rem]"
                          src={`/${
                            square?.color === "b"
                              ? `b${square.type}`
                              : `w${square.type}`
                          }.png`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
