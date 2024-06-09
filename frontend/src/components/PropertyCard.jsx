import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axiosInstance from "../../axiosConfig";
import "react-datepicker/dist/react-datepicker.css";

const PropertyCard = ({ property }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowRequestModal(false);
    setRequestMessage("");
    setStartDate(null);
    setEndDate(null);
    setError(null);
  };

  const handleShowDetails = async () => {
    setShowDetailsModal(true);
    try {
      const response = await axiosInstance.get(`/api/comment/${property._id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleShowRequestForm = () => setShowRequestModal(true);
  const handleRequestMessageChange = (e) => setRequestMessage(e.target.value);

  const handleSendRequest = async () => {
    try {
      const storedData = localStorage.getItem("persist:root");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const user = JSON.parse(parsedData.user);
        const userId = user.currentUser._id;

        const requestData = {
          senderId: userId,
          propertyId: property._id,
          recipientId: property.userRef,
          message: requestMessage,
          startDate,
          endDate,
        };

        console.log("Sending request:", requestData);

        const response = await axiosInstance.post("/api/request", requestData);
        console.log("Request sent:", response.data);
        handleCloseModals();
      } else {
        setError("User data not found. Please log in.");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setError("Failed to send request. Please try again.");
    }
  };

  return (
    <>
      <Card className="m-5" style={{ width: "18rem", minHeight: "400px" }}>
        <Card.Img
          variant="top"
          src={property.imageUrls[0]}
          alt={property.name}
          style={{
            minHeight: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Body>
          <Card.Title>{property.name}</Card.Title>
          <Card.Text>{property.description}</Card.Text>
          <Button variant="dark" onClick={handleShowDetails}>
            More Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetailsModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>{property.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Description:</strong> {property.description}
          </p>
          <p>
            <strong>Address:</strong> {property.address}
          </p>
          <p>
            <strong>Bathrooms:</strong> {property.bathrooms}
          </p>
          <p>
            <strong>Bedrooms:</strong> {property.bedrooms}
          </p>
          <p>
            <strong>Furnished:</strong> {property.furnished ? "Yes" : "No"}
          </p>
          <p>
            <strong>Parking:</strong> {property.parking ? "Yes" : "No"}
          </p>
          <p>
            <strong>Type:</strong> {property.type}
          </p>
          <p>
            <strong>Offer:</strong> {property.offer ? "Yes" : "No"}
          </p>
          <p>
            <strong>Region:</strong> {property.region}
          </p>
          <p>
            <strong>User Reference:</strong> {property.userRef}
          </p>
          {property.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`property_image_${index}`}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          ))}
          <h5>Comments:</h5>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id}>
                <p>
                  <strong>{comment.user.username}:</strong> {comment.content}
                </p>
                <p>Rating: {comment.rating}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowRequestForm}>
            Send a Request
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRequestModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Send a Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="requestMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={requestMessage}
                onChange={handleRequestMessageChange}
                placeholder="Write your request message here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendRequest}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyCard;
