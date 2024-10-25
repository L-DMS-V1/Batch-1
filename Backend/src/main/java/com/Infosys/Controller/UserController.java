package com.Infosys.Controller;

import com.Infosys.Entity.DTO.LoginDTO;
import com.Infosys.Entity.DTO.UserDTO;
import com.Infosys.Service.JWTService;
import com.Infosys.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {
        userService.createUser(userDTO);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginDTO loginDTO) {
        String response = userService.login(loginDTO);
        if (response.equals("Login Successful")) {
            // Generate JWT token after successful login
            String token = jwtService.generateToken(loginDTO.getEmail()); // Assuming username is the subject

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body("Login Successful");

//            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response.equals("User Not Found")) {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
