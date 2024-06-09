import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import axiosInstance from "../../axiosConfig";
import "../assets/styles/Style.css";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [matchingProperties, setMatchingProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/api/property/get");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data");
        }
        if (response.data.length === 0) {
          throw new Error("No properties found");
        }
        setProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const storedData = localStorage.getItem("persist:root");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const user = JSON.parse(parsedData.user);
          const userId = user.currentUser._id;

          const response = await axiosInstance.get(
            `/api/auth/getuser/${userId}`
          );
          const userData = response.data;
          setUser(userData);

          // Find matching properties after user and properties are fetched
          if (properties.length > 0) {
            const matching = findMatchingProperties(userData, properties);
            setMatchingProperties(matching);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProperties();
    fetchUser();
  }, [properties.length]); // Only re-run the effect if the length of properties changes

  const findMatchingProperties = (user, properties) => {
    if (!Array.isArray(properties)) return [];
    return properties
      .map((property) => {
        let score = 0;
        if (property.Area === user.preferredArea) score += 1;
        if (property.NumberOfRooms === user.rooms) score += 1;
        if (property.NumberOfBeds === user.familySize) score += 1;
        if (property.adults === user.adults) score += 1;
        if (property.babies === user.babies) score += 1;
        if (property.Pets === user.pet) score += 1;
        return { ...property, matchScore: score };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  return (
    <Container>
      <h2>All Properties</h2>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h3>Matching Properties</h3>
          <Row>
            {matchingProperties.map((property) => (
              <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
        </>
      )}
      {user && (
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>User Details</Card.Title>
            <Card.Text>
              <strong>Username:</strong> {user.username}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Family Size:</strong> {user.familySize}
            </Card.Text>
            <Card.Text>
              <strong>Preferred Area:</strong> {user.preferredArea}
            </Card.Text>
            <Card.Text>
              <strong>Rooms:</strong> {user.rooms}
            </Card.Text>
            <Card.Text>
              <strong>Children:</strong> {user.children}
            </Card.Text>
            <Card.Text>
              <strong>Adults:</strong> {user.adults}
            </Card.Text>
            <Card.Text>
              <strong>Babies:</strong> {user.babies}
            </Card.Text>
            <Card.Text>
              <strong>Pet:</strong> {user.pet ? "Yes" : "No"}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AllProperties;
