import { useState, useEffect } from "react";
import Image from "next/image";

import { useUser } from "../src/contexts/UserContext";
import { useRouter } from "next/router";

import Footer from "../src/components/Footer";
import NavBar from "../src/components/Navbar";
import LoginForm from "../src/components/LoginForm";
import RegisterForm from "../src/components/RegisterForm";

import { Spinner } from "react-bootstrap";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [router, user]);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <NavBar />
      <main>
        <div className="container-sm login-container">
          <div className="row justify-content-around">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <div className="col-lg-6 d-none d-lg-block">
                  <Image
                    src="/img/svg/shopping.svg"
                    alt="Shopping"
                    className="img-fluid"
                    width={1000}
                    height={1000}
                  />
                  <h2 className="marketing-title">
                    Discover the Best Deals at{" "}
                    <span className="shopex-brand">Shopex</span>
                  </h2>
                </div>
                <div className="col-lg-4">
                  <div className="login-box">
                    {isLogin ? (
                      <LoginForm handleFormToggle={handleFormToggle} />
                    ) : (
                      <RegisterForm handleFormToggle={handleFormToggle} />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
