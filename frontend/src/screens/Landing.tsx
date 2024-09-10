import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom";
export const Landing = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/game");
    }
    return <>
        <div className="flex bg-black h-screen">
            <div className="flex justify-end h-2/4 w-2/4 m-10">
                <img className="w-80 h-80" src="chess.avif" alt="" />
            </div>
            <div className="flex flex-col justify-center text-white font-bold w-1/4 h-1/4 m-10">
                <h1 className="text-3xl text-center">Play chess online on the #2 site</h1>
                <Button onClick={handleClick} />
            </div>
        </div>
    </>
}