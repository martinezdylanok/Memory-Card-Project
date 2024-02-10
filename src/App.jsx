import "./App.css";
import GameInfo from "./components/GameInfo";
import GameScore from "./components/GameScore";
import Game from "./components/Game";

export default function App() {
   return (
      <>
         <GameInfo />
         <GameScore />
         <Game />
      </>
   );
}
