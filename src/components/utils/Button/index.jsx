import './Button.css'

const Button = ({ onClick, iconURI, children }) => {
    return (
        <button className='deepuai-button' onClick={onClick}>
            <img src={iconURI} alt='Icone do botão'/>
            <span>{children}</span>
        </button>
    )
}

export default Button