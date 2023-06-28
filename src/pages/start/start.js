import "./start.scss";
import { Link } from "react-router-dom";

const start = () => {
    return (
        <div>
            <h1> Welcome to the Game</h1>
            <Link to="/Game">
            <button>Click here to Start</button>
            </Link>
            <Link to ="/WatchLearning">
                <button>Click to watch MachineLearning</button>
            </Link>
        </div>
    )
}

export default start;