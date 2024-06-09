import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form } from "react-bootstrap";
import axiosInstance from "../../axiosConfig"; // ייבוא ה-axios instance
import "../assets/styles/Style.css";

const PropertyRowListEvacuee = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const storedData = localStorage.getItem("persist:root");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const user = JSON.parse(parsedData.user);
          const userId = user.currentUser._id;

          const response = await axiosInstance.get(
            `/api/request/user/${userId}`
          );
          setRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleShowModal = (propertyId) => {
    setCurrentPropertyId(propertyId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContent("");
    setRating(1);
    setError(null);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/comment", {
        propertyId: currentPropertyId,
        content,
        rating,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <>
      {requests.map((request) => (
        <div key={request._id} className="list-row">
          <Image
            className="list-img"
            src={request.property.imageUrls[0]}
            width="100"
            height="100"
            alt="list img"
          />
          <div className="list-text">
            <h5>{request.property.address}</h5>
            <p>{request.message}</p>
          </div>
          <div className="list-labels">
            <p>
              Start Date: {new Date(request.startDate).toLocaleDateString()}
            </p>
            <p>End Date: {new Date(request.endDate).toLocaleDateString()}</p>
          </div>
          <div className="list-changes">
            <span
              style={{ color: request.status === "approved" ? "green" : "red" }}
            >
              {request.status}
            </span>
            {request.status === "approved" && (
              <Button
                variant="primary"
                onClick={() => handleShowModal(request.property._id)}
              >
                Add Comment
              </Button>
            )}
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="commentContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="commentRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyRowListEvacuee;
