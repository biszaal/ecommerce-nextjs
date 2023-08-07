import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navbar } from "react-bootstrap";

const error404 = () => {
  return (
    <>
      <Navbar />
      <main>
        <div class="error-container">
          <div class="error-content">
            <Image
              src="img/svg/404.svg"
              alt="404 Error"
              class="error-icon"
              width={1000}
              height={1000}
            />
            <h1 class="error-title">Error 404 - Page Not Found</h1>
            <p class="error-text">
              The requested page could not be found. Please check the URL or go
              back to the <Link href="/home">homepage</Link>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default error404;
