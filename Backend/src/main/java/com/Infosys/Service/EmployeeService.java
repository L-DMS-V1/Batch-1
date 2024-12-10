package com.Infosys.Service;

import com.Infosys.Entity.DTO.UserDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Entity.Manager;
import com.Infosys.Entity.Users;
import com.Infosys.Repository.EmployeeRepository;
import com.Infosys.Repository.ManagerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired

    private ManagerRepository managerRepository;
    public void addEmployee(Users user, Long managerId) {
        // Add employee Logic
        Employee employee = new Employee();
        employee.setUsers(user);
        Optional<Manager> manager = managerRepository.findById(managerId);
        manager.ifPresent(employee::setManager);
        employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Employee> getEmployeesByManagerName(String username) {
        return employeeRepository.findByManagerUsersUsername(username);
    }
}
