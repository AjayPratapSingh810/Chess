interface ButtonProps {
    onClick: () => void;
}
export const Button = ({ onClick }:ButtonProps) => {
    return <>
        <button onClick={onClick} className="mt-8 px-8 py-4 text-2xl bg-green-500 text-white font-bold rounded">Play Online</button>
    </>
}