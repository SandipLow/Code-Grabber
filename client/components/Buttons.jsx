import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export const Button = ({ color, children, onClick }) => {
    return (
        <button 
            className="rounded border border-purple-600 p-2 text-purple-600 hover:bg-purple-600 hover:text-white mr-2"
        >
            {children}
        </button>   
    )
}


export const ButtonIconDownload = ({ color, label, icon, onClick, disabled })=> {
    const [hover, setHover] = useState(false);
    
    return (
        <button 
            style={{
                backgroundColor: hover ? `var(--${color})` : 'transparent',
                color: hover ? 'white' : `var(--${color})`,
                borderColor: `var(--${color})`
            }}
            className={`w-fit border border-solid transition-colors relative text-left px-4 py-2 rounded-md`} 
            onMouseOver={e=>setHover(true)}
            onMouseLeave={e=>setHover(false)} 
            onClick={onClick} 
            disabled={disabled} 
        >
            <FontAwesomeIcon icon={faDownload} className='mr-2'/>
            <span>{label}</span>
            <FontAwesomeIcon icon={icon} className='absolute right-4 bottom-1 bg-white text-slate-700 rounded-full p-2'/>
        </button>
    )
}


export const ButtonCustom = ({ color, children, onClick, disabled }) => {
    const [hover, setHover] = useState(false);

    return (
        <button 
            style={{
                backgroundColor: hover ? `var(--${color})` : 'transparent',
                color: hover ? 'white' : `var(--${color})`,
                borderColor: `var(--${color})`
            }}
            className={`w-fit border border-solid transition-colors relative text-left px-4 py-2 rounded-md`} 
            onMouseOver={e=>setHover(true)}
            onMouseLeave={e=>setHover(false)} 
            onClick={onClick} 
            disabled={disabled}
        >
            {children}
        </button>
    )
}