import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { ScreenMode } from "../pages/SigninPage";
import { jwtDecode } from 'jwt-decode';
import { ENDPOINTS } from "../services/api"

const SigninForm = ({ onSwitchMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        userName: username,
        password
      });
      const { token } = response.data; // Assuming the response contains the token
      const decodedToken = jwtDecode(token); // Decode the token to get user role
      const userRole = decodedToken.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      
      // Navigate to the respective dashboard based on the role
      if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'Manager') {
        navigate('/manager-dashboard');
      } else if (userRole === 'Employee') {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error.response?.data);
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", color: colors.grey[800] }}
    >
      <Stack spacing={3} sx={{ width: "100%", maxWidth: "500px" }}>
        <Stack>
          <Typography variant="h4" fontWeight={600} color={colors.grey[800]}>
            Welcome To LearningHub
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <TextField
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn} // Add click handler for sign-in
            sx={{
              bgcolor: colors.grey[800],
              "&:hover": {
                bgcolor: colors.grey[600],
              },
            }}
          >
            Sign in
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Don't have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SigninForm;
