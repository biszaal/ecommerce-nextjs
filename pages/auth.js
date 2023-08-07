import { useState, useEffect } from "react";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useUser();
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
