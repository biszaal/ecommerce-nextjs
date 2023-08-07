import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUser } from "../contexts/UserContext";
import { Navbar } from "react-bootstrap";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const { user, logoutUser } = useUser();

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/products?search=${searchTerm}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container justify-content-between align-items-center">
        <Link href="/home" className="navbar-brand text-white pe-4">
          Shopex
        </Link>

        <div className="col-lg-4 col-6 text-right">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn align-content-center bg-white"
                type="submit"
              >
                <SearchIcon htmlColor="#FF6D70" />
              </button>
            </div>
          </form>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleOpen}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon htmlColor="#FF6D70" />
        </button>

        <Navbar.Collapse id="responsive-navbar-nav" in={isOpen}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <span className="nav-link" onClick={handleLogout}>
                  Logout
                </span>
              ) : (
                <Link href="/auth" className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </Navbar.Collapse>
      </div>
    </nav>
  );
}
