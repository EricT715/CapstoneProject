import "./Header.scss"
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <div className="Header">
            <Link className="Home__Link"to ="/">
                <h1 className="Home">Home</h1>
            </Link>
        </div>
    )
}

export default Header;