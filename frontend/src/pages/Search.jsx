import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { LiaFilterSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import PropertyCard from "../components/PropertyCard";
import "../assets/styles/Style.css"; // ודא שהנתיב נכון לפי מבנה הפרויקט שלך

const Search = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = !!currentUser;

  const [filters, setFilters] = useState({
    type: {
      apartment: false,
      standalone: false,
      guestHouse: false,
    },
    facilities: {
      secureSpace: false,
      parking: false,
      balcony: false,
      airConditioning: false,
    },
    sortBy: "",
  });

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handlePropertyTypeChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: {
        ...prevFilters.type,
        [type]: !prevFilters.type[type],
      },
    }));
  };

  const handleFacilityChange = (facility) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      facilities: {
        ...prevFilters.facilities,
        [facility]: !prevFilters.facilities[facility],
      },
    }));
  };

  const handleSortChange = (sortOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: sortOption,
    }));
  };

  const fetchProperties = async () => {
    try {
      const response = await axiosInstance.get("/api/property/get");
      setAllProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const applyFilters = () => {
    const { type, facilities, sortBy } = filters;

    const filtered = allProperties.filter((property) => {
      // Property Type Filter
      const isPropertyTypeMatch = Object.keys(type)
        .filter((key) => type[key])
        .includes(property.type);

      // Facilities Filter
      const isFacilitiesMatch = Object.keys(facilities).every((facility) => {
        if (facilities[facility]) {
          return property[facility] === true;
        }
        return true;
      });

      return (
        (!Object.values(type).some(Boolean) || isPropertyTypeMatch) &&
        isFacilitiesMatch
      );
    });

    // Sorting
    const sorted = filtered.sort((a, b) => {
      if (sortBy === "price-high-to-low") {
        return b.price - a.price;
      } else if (sortBy === "price-low-to-high") {
        return a.price - b.price;
      } else if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    setFilteredProperties(sorted);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allProperties]);

  return (
    <div>
      <section className="customized-sec">
        <div className="background-img">
          <div className="content-cust text-left m-3">
            {isLoggedIn ? (
              <>
                <h3>Customized to Your Preferences</h3>
                <p>
                  Discover properties that perfectly match your preferences,
                  <br />
                  Based on the settings you specified at the beginning of the
                  process.
                  <br />
                  To make adjustments, simply click 'Edit Profile'.
                </p>
                <Button variant="light">Edit Profile</Button>
              </>
            ) : (
              <>
                <h3>Welcome to Our HomeLink Platform</h3>
                <p>
                  Explore a wide range of properties tailored to your needs.
                  <br />
                  Please sign in to personalize your experience and save
                  preferences.
                </p>
                <Button variant="light" href="/signin">
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <Container
          className="search-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>
            <LiaFilterSolid /> Filter
          </h5>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item
              onClick={() => handleSortChange("price-high-to-low")}
            >
              Price high to low
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSortChange("price-low-to-high")}
            >
              Price low to high
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("latest")}>
              Latest
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("oldest")}>
              Oldest
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </section>
      <section>
        <Row>
          <Col xs={12} md={4} lg={3}>
            <Container className="filter-container">
              <Form>
                <h5>Property Type</h5>
                <Form.Check
                  type="checkbox"
                  label="Apartment"
                  id="apartment"
                  className="mb-3"
                  checked={filters.type.apartment}
                  onChange={() => handlePropertyTypeChange("apartment")}
                />
                <Form.Check
                  type="checkbox"
                  label="Standalone Property"
                  id="standaloneProperty"
                  className="mb-3"
                  checked={filters.type.standalone}
                  onChange={() => handlePropertyTypeChange("standalone")}
                />
                <Form.Check
                  type="checkbox"
                  label="Guest House"
                  id="guestHouse"
                  className="mb-3"
                  checked={filters.type.guestHouse}
                  onChange={() => handlePropertyTypeChange("guestHouse")}
                />
                <h5>Facilities</h5>
                <Form.Check
                  type="checkbox"
                  label="Secure space"
                  id="secureSpace"
                  className="mb-3"
                  checked={filters.facilities.secureSpace}
                  onChange={() => handleFacilityChange("secureSpace")}
                />
                <Form.Check
                  type="checkbox"
                  label="Parking"
                  id="parking"
                  className="mb-3"
                  checked={filters.facilities.parking}
                  onChange={() => handleFacilityChange("parking")}
                />
                <Form.Check
                  type="checkbox"
                  label="Balcony"
                  id="balcony"
                  className="mb-3"
                  checked={filters.facilities.balcony}
                  onChange={() => handleFacilityChange("balcony")}
                />
                <Form.Check
                  type="checkbox"
                  label="Air conditioning"
                  id="airConditioning"
                  className="mb-3"
                  checked={filters.facilities.airConditioning}
                  onChange={() => handleFacilityChange("airConditioning")}
                />
              </Form>
            </Container>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Row>
              {filteredProperties.map((property) => (
                <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                  <PropertyCard property={property} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Search;
