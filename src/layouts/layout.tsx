import React, { ReactNode, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "../components/tooglebutton/toggleButton";
import ReusableButton from "../components/button/button";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/loader";


interface JokesLayoutProps {
  children: ReactNode;
  token: string | null;
 
}

const JokesLayout: React.FC<JokesLayoutProps> = ({ children, token }) => {
  const [dark, setDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      try {
        localStorage.setItem("token", "");
        navigate("/login");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        // Handle the error gracefully
      }
      
    }
  }, [token, navigate]);

  return (
    <>
    {loading && <Loader loading={loading} />}
    {!loading && (
    <>
      
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />
        {dark ? darkTheme.palette.mode : lightTheme.palette.mode} mode
        <Button theme={dark ? "dark" : "light"} setDark={setDark} dark={dark} />
        {token && (
          <ReusableButton onClick={handleLogout} label={"Log Out"} size="small" />
        )}
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Jokes
          </Typography>
          <div>{children}</div>
        </Container>
      </ThemeProvider>
    </>
    ) }</>
  );
};

export default JokesLayout;
