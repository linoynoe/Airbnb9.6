import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    familySize: "",
    preferredArea: "",
    rooms: "",
    children: "",
    adults: "",
    babies: "",
    pet: false,
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        username: currentUser.username,
        email: currentUser.email,
        familySize: currentUser.familySize,
        preferredArea: currentUser.preferredArea,
        rooms: currentUser.rooms,
        children: currentUser.children,
        adults: currentUser.adults,
        babies: currentUser.babies,
        pet: currentUser.pet,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/api/user/update/${currentUser._id}`,
        userData
      );
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formFamilySize">
          <Form.Label>Family Size</Form.Label>
          <Form.Control
            type="text"
            name="familySize"
            value={userData.familySize}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPreferredArea">
          <Form.Label>Preferred Area</Form.Label>
          <Form.Control
            type="text"
            name="preferredArea"
            value={userData.preferredArea}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formRooms">
          <Form.Label>Rooms</Form.Label>
          <Form.Control
            type="text"
            name="rooms"
            value={userData.rooms}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formChildren">
          <Form.Label>Children</Form.Label>
          <Form.Control
            type="text"
            name="children"
            value={userData.children}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAdults">
          <Form.Label>Adults</Form.Label>
          <Form.Control
            type="text"
            name="adults"
            value={userData.adults}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBabies">
          <Form.Label>Babies</Form.Label>
          <Form.Control
            type="text"
            name="babies"
            value={userData.babies}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPet">
          <Form.Check
            type="checkbox"
            label="Pet"
            name="pet"
            checked={userData.pet}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
