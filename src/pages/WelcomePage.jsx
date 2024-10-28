// src/pages/WelcomePage.jsx

import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import Lottie from "lottie-react";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import assets from "../assets";

export const ScreenMode = {
  WELCOME: "WELCOME",
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const WelcomePage = () => {
  const [currMode, setCurrMode] = useState(ScreenMode.WELCOME);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(
    assets.animations.welcomeBg
  );

  const onSwitchMode = (mode) => {
    setWidth(100);

    setTimeout(() => {
      setCurrMode(mode);
      setCurrentAnimation(
        mode === ScreenMode.SIGN_IN
          ? assets.animations.signinBg
          : mode === ScreenMode.SIGN_UP
          ? assets.animations.signupBg
          : assets.animations.welcomeBg
      );
    }, 1100);

    setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      {/* Left panel */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          position: "relative",
        }}
      >
        {currMode === ScreenMode.WELCOME && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <h1>Welcome to Our Training Platform</h1>
            <p>Manage and track training programs for your organization.</p>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
        {currMode === ScreenMode.SIGN_IN && (
          <SigninForm onSwitchMode={() => onSwitchMode(ScreenMode.SIGN_UP)} />
        )}
        {currMode === ScreenMode.SIGN_UP && (
          <SignupForm onSwitchMode={() => onSwitchMode(ScreenMode.SIGN_IN)} />
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: left,
            right: right,
            width: `${width}%`,
            height: "100%",
            bgcolor: "#333",
            transition: "all 1s ease-in-out",
          }}
        />
      </Grid>

      {/* Right panel */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bgcolor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Lottie
            animationData={currentAnimation}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: left,
            right: right,
            width: `${width}%`,
            height: "100%",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            transition: "all 1s ease-in-out",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default WelcomePage;
