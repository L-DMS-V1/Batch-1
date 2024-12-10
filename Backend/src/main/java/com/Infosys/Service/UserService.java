package com.Infosys.Service;

import com.Infosys.Entity.DTO.LoginDTO;
import com.Infosys.Entity.DTO.UserDTO;
import com.Infosys.Entity.Users;
import com.Infosys.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(@Valid UserDTO userDTO) {
        Users user = new Users();
        user.setAccountId(userDTO.getAccountId());
        user.setAccountName(userDTO.getAccountName());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hashing the password
        user.setRole(userDTO.getRole());
        userRepository.save(user);
        if (userDTO.getRole().equals("MANAGER")) {
            managerService.addManager(user);
        } else if (userDTO.getRole().equals("EMPLOYEE")) {
            employeeService.addEmployee(user, userDTO.getManagerId());
        }
    }

    public String login(LoginDTO loginDTO) {
        Optional<Users> userOpt = userRepository.findByUsername(loginDTO.getUsername());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) { // Check hashed password
                return "Login Successful";
            } else {
                return "Invalid Credentials";
            }
        } else {
            return "User Not Found";
        }
    }

    public String changePassword(String username, String previousPassword, String newPassword) {
        Optional<Users> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();

            // Check if the previous password matches
            if (!passwordEncoder.matches(previousPassword, user.getPassword())) {
                return "Previous password is incorrect";
            }

            // Check if the new password is the same as the old password
            if (passwordEncoder.matches(newPassword, user.getPassword())) {
                return "New password cannot be the same as the old password";
            }

            // Update the password
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return "Password changed successfully";
        } else {
            return "User not found";
        }
    }
}
