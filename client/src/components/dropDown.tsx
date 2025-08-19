import { useState } from "react"

interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    label: string
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
    const [open, setopen] = useState(false)
    const [selected, setselected] = useState<string | null>(null)
    const handleClick = (option: string) => {
        setselected(option)
        onSelect(option);
        setopen(false)
    }

    return (
        <div>
            <label className="text-[0.875rem] text-neutral-700">{label}</label>
            <div className="dropdown bg-neutral-900 w-full text-neutral-100 rounded-[0.25rem] border-1 border-neutral-700 relative">
                <button onClick={() => setopen(!open)} className="py-2 px-4 border-b-neutral-700 border-b-1 w-full">
                    {selected || "select"}
                </button>
                <ul className="absolute bg-neutral-900 w-full rounded-b-[0.25rem]">
                    {
                        open && options.map((option, index) => (
                            <li className="py-2 px-3 list-none rounded-[0.25rem] hover:border-[#0ae448] hover:border-1 text-center" key={index} onClick={() => handleClick(option)}>{option}</li>
                        ))
                    }
                </ul>
            </div >
        </div>
    )
}
export default Dropdown