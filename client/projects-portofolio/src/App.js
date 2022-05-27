import './App.css';

import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

// import logo from "./img/logo192.png"

import TestPage from './pages/test';

import SignInPage from './pages/sign-in/sign-in';
import CategoryPage from './pages/category/category';
import ProjectsPage from './pages/project/project';
import ProfilPage from './pages/profil/profil';
import { Container } from 'react-bootstrap';

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
    }
  }, []);

  return (
    <div id="app">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">PLF Proiect</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/category">Category</Nav.Link>
                <Nav.Link onClick={localStorage.setItem('category', JSON.stringify({"id":0, "name":"All"}))} href="/projects">Projects</Nav.Link>
              </Nav>
              <Nav>
                {user ? (
                  <Nav.Link href="/profil">{user.name}</Nav.Link>
                ) : (
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/test" element={<TestPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
