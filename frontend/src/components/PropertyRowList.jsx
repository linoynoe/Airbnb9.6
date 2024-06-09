import { Button, Image } from 'react-bootstrap';
import '../assets/styles/Style.css';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const PropertyRowList = () => {
    return (
        <div className="list-row">
            <Image
                className="list-img"
                src="https://images.unsplash.com/photo-1571742422028-0f7ca4b37d49?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="100"
                height="100"
                alt="list img" />
            <div className="list-text">
                <h5>17 Haven Street, Tel Aviv, Israel</h5>
                <p>4-room apartment in central Tel Aviv provides a serene retreat amidst the city's bustling. </p>
            </div>
            <div className="list-labels">
                <Button variant="outline-dark" size="sm" disabled >Gush Dan</Button>
                <Button variant="outline-dark" size="sm" disabled >Tel Aviv</Button>
                <Button variant="outline-dark" size="sm" disabled >2 Beds</Button>
                <Button variant="outline-dark" size="sm" disabled >Pet</Button>
            </div>
            <div className="list-changes">
                <Link to={"/"}>
                    <FaRegEdit />
                </Link>
                <Link to={"/"}>
                    <FaRegTrashAlt />
                </Link>
            </div>

        </div>

    )
}

export default PropertyRowList