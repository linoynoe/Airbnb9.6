import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyRowList from '../components/PropertyRowList'
import { FaRegEdit, FaRegClock, FaRegEnvelope } from "react-icons/fa";

import '../assets/styles/Style.css';
import { useSelector } from 'react-redux';

const BusinessProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Container className="profile-container">
            <div className="profile-section">
                <div className="profile-part">
                    <div className="profile-image">
                        <Image src={currentUser.avatar}
                            width="60"
                            height="60"
                            alt='profile' />
                    </div>

                    <div className="profile-details">
                        <div className="profile-text">
                            <h4>{currentUser.username}</h4>
                            <Link to={"/edit-business-profile"}>
                                <FaRegEdit />
                            </Link>

                        </div>
                        <p>{currentUser.email}</p>
                    </div>
                </div>

                <div className="profile-part">
                    <div className="profile-link">
                        <FaRegClock />
                        <span>Order History</span>
                    </div>
                </div>

                <div className="profile-part">
                    <div className="profile-link">
                        <FaRegEnvelope />
                        <span>Requests</span>
                    </div>
                </div>
            </div>
            <div className="profile-list">
                <div className="list-header">
                    <h2>Properties list</h2>
                    <Button variant="dark">Add Property</Button>
                </div>
                <div className="list-body">
                    <PropertyRowList />
                    <PropertyRowList />
                    <PropertyRowList />
                </div>
            </div>

        </Container>
    );
};

export default BusinessProfile;
