import React, { useEffect } from "react";
import "../pages/App.css";
import { SplitText } from "../Gsap/SplitText";
import { Link } from "gatsby";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoBanner from "./videoBanner"
import Event from "../components/event";
import CustomCursor from "../components/customCursor";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.toggle("scroll", window.scrollY > navbar.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie;
      if (cookies.includes("__Secure-3PSIDCC=your-cookie-value")) {
        // Your custom logic here
        console.log("Cookie value matches. Implement your logic.");
      }
    };

    checkCookie();
  }, []);

  return (
    <>
    <CustomCursor />
      <Navbar expand="sm" fixed="top">
        <Navbar.Brand>
          <Link to="/event">Stonners</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/home">
                home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/pages">
                pages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/events">
                events
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/docs">
                docs
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand className="login">
          <Link to="/login">login</Link>
        </Navbar.Brand>
      </Navbar>

      <div className="header">
        <VideoBanner />
        <div className="img-content">
          <h2>THE STONNER'S FESTIVAL 2023</h2>
          <h4>
            <SplitText by="WORD" as="i" animate>
              India's First and Largest Concept Live Concert
              <br />
              30 & 31 December 2023
              <br />
              Venue: United Way Ground, Atladra, Vadodara
              <br />
              Organizer: Stonner's Pvt Ltd
            </SplitText>
          </h4>
        </div>
      </div>
      <div className="container event">
        <Event />
      </div>
    </>
  );
}

export default App;
