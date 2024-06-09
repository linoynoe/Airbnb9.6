import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Style.css";
import OAuth from "../components/OAuth";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    familySize: "",
    preferredArea: "North", // Default value set to 'North'
    rooms: "",
    children: "",
    adults: "",
    babies: "",
    pet: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data === "User created successfully") {
        setLoading(false);
        setError(null);
        navigate("/sign-in");
      } else {
        setLoading(false);
        setError(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="signup-form m-5">
      <Container fluid className="p-3">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.username}
                type="text"
                placeholder="User Name"
                isInvalid={!!error && error.includes("username")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("username") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.email}
                type="email"
                placeholder="Enter email"
                isInvalid={!!error && error.includes("email")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("email") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder="Password"
                isInvalid={!!error && error.includes("password")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("password") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <h4 className="m-3">Personal Details</h4>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="familySize">
              <Form.Label>Number of People in the Family</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.familySize}
                type="number"
                placeholder="Number of People"
                min="0"
                isInvalid={!!error && error.includes("familySize")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("familySize") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="preferredArea">
              <Form.Label>Preferred Area</Form.Label>
              <Form.Control
                as="select"
                onChange={handleChange}
                value={formData.preferredArea}
                isInvalid={!!error && error.includes("preferredArea")}
                disabled={loading}
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Center">Center</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {error && error.includes("preferredArea") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="rooms">
              <Form.Label>Desired Number of Rooms</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.rooms}
                type="number"
                placeholder="Number of Rooms"
                min="0"
                isInvalid={!!error && error.includes("rooms")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("rooms") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="children">
              <Form.Label>Number of Children</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.children}
                type="number"
                placeholder="Number of Children"
                min="0"
                isInvalid={!!error && error.includes("children")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("children") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="adults">
              <Form.Label>Number of Adults</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.adults}
                type="number"
                placeholder="Number of Adults"
                min="0"
                isInvalid={!!error && error.includes("adults")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("adults") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="babies">
              <Form.Label>Number of Babies (under 2 years old)</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.babies}
                type="number"
                placeholder="Number of Babies"
                min="0"
                isInvalid={!!error && error.includes("babies")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("babies") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="pet">
              <Form.Check
                onChange={handleChange}
                checked={formData.pet}
                type="checkbox"
                label="Do you have a pet?"
                isInvalid={!!error && error.includes("pet")}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {error && error.includes("pet") ? error : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button disabled={loading} className="m-3" variant="dark" type="submit">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <OAuth />
        <p>
          Member?
          <Link to="/sign-in"> Sign In</Link>
        </p>
      </Container>
      {error &&
        !error.includes("username") &&
        !error.includes("email") &&
        !error.includes("password") &&
        !error.includes("familySize") &&
        !error.includes("preferredArea") &&
        !error.includes("rooms") &&
        !error.includes("children") &&
        !error.includes("adults") &&
        !error.includes("babies") &&
        !error.includes("pet") && <p>{error}</p>}
    </Form>
  );
};

export default SignUp;
