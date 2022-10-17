import './TooltipButton.css'

const TooltipButton = ({ onClick, iconURI, tooltipText }) => {
    return (
        <button className='deepuai-tooltip-button' onClick={onClick}>
            <img src={iconURI} alt='Icone do botão'/>
            <span className="tooltiptext">{tooltipText}</span>
        </button>
    )
}

export default TooltipButton