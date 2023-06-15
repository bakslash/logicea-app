import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableButton from "../components/button/button";
import JokesLayout from "../layouts/layout";
import CustomCard from "../components/card/customCard";
import { randomBytes } from "crypto";

interface LoginProps {
  loggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ loggedIn }) => {
  const navigate = useNavigate();
 

  const handleLogin = () => {
    const generateToken = (length: number) => {
      const generatedToken = randomBytes(Math.ceil(length / 2)).toString("hex");
      return generatedToken.slice(0, length);
    };
    const token = generateToken(16);
    localStorage.setItem("token", token);
    navigate("/");
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <JokesLayout token={null}>
      <CustomCard title="Login">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
          }}
        >
          <ReusableButton onClick={handleLogin} label={"Log In"}>
            Log In
          </ReusableButton>
        </div>
      </CustomCard>
    </JokesLayout>
  );
};

export default Login;
