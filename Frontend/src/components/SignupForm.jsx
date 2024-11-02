import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { ScreenMode } from "../pages/SigninPage";
import { Createemployee } from "../services/signupservices";

const SignupForm = ({ onSwitchMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");

  // State for form fields and error messages
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [accountIdError, setAccountIdError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = () => {
    let isValid = true;
    setAccountIdError("");
    setAccountNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate Account ID (no specific validation needed for any characters)
    if (!accountId) {
      setAccountIdError("Account ID is required");
      isValid = false;
    }

    // Validate Account Name (uppercase, lowercase, '.', '_', no numbers)
    if (!accountName) {
      setAccountNameError("Account Name is required");
      isValid = false;
    } else if (!/^[a-zA-Z._]+$/.test(accountName)) {
      setAccountNameError(
        "Account Name can only contain letters, '.', and '_'"
      );
      isValid = false;
    }

    // Validate Username (uppercase, lowercase, numbers, special characters)
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      setUsernameError("Username can contain letters, numbers, '.', and '_'");
      isValid = false;
    }

    // Validate Email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    // Validate Password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      console.log("Signing up with:", {
        accountId,
        accountName,
        username,
        email,
        password,
        role,
      });
      // Handle signup logic
    }

    e.preventDeafult();
    const employee ={accountId,accountName, username,email, password, role,}
    console.log(employee)
    
    Createemployee(employee).then((response) =>{
    console.log(response.data);
    })

  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", color: colors.grey[800] }}
    >
      <Stack spacing={1} sx={{ width: "100%", maxWidth: "500px" }}>
        <Stack>
          <Typography variant="h4" fontWeight={600} color={colors.grey[800]}>
            Create LearningHub Account
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Account ID</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              error={!!accountIdError}
              helperText={accountIdError}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Account Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              error={!!accountNameError}
              helperText={accountNameError}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Username</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
            />
          </Stack>
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
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Confirm Password</Typography>
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Role</Typography>
            <Select
              fullWidth
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          size="large"
          onClick={handleSignUp} // Add click handler for sign-up
          sx={{
            bgcolor: colors.grey[800],
            "&:hover": {
              bgcolor: colors.grey[600],
            },
          }}
        >
          Sign up
        </Button>
        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
