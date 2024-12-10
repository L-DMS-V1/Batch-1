package com.Infosys.Service;

import com.Infosys.Entity.*;
import com.Infosys.Entity.DTO.EmployeeDTO;
import com.Infosys.Entity.DTO.TrainingRequestDTO;
import com.Infosys.Filter.JWTFilter;
import com.Infosys.Repository.CourseRepository;
import com.Infosys.Repository.EmployeeRepository;
import com.Infosys.Repository.ManagerRepository;
import com.Infosys.Repository.TrainingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    private static final Logger logger = LoggerFactory.getLogger(ManagerService.class);

    public void addManager(Users user) {
        // Add manager logic
        Manager manager = new Manager();
        manager.setUsers(user);
        managerRepository.save(manager);
    }

    public void requestForm(TrainingRequestDTO trainingRequestDTO) {
        // Get the username of the authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Manager manager = managerRepository.findByUsersUsername(username);
        trainingRequestDTO.setManagerId(manager.getManagerId());

        TrainingRequest trainingRequest = new TrainingRequest();
        trainingRequest.setEmployeePosition(trainingRequestDTO.getEmployeePosition());

        // Convert DTO list of employee IDs or usernames to Employee entities
        List<Employee> employees = new ArrayList<>();
        for (Employee employeeTemp : trainingRequestDTO.getRequiredEmployees()) {
            Employee employee = employeeRepository.findByUsersUsername(employeeTemp.getUsers().getUsername());
//                    .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + employeeDTO.getEmployeeId()));
            employees.add(employee);
        }

        trainingRequest.setRequiredEmployees(employees);
        trainingRequest.setStatus(RequestStatus.PENDING);

        Optional<Course> courseOpt = courseRepository.findByCourseId(trainingRequestDTO.getCourseId());
        courseOpt.ifPresent(trainingRequest::setCourse);
        Optional<Manager> managerOpt = managerRepository.findById(trainingRequestDTO.getManagerId());
        managerOpt.ifPresent(trainingRequest::setManager);

        logger.info("Hello");
        trainingRepository.save(trainingRequest);
    }

    public List<TrainingRequest> getRequestByManagerName(String managerName) {
        return trainingRepository.findByManagerUsersUsername(managerName);
    }

    public TrainingRequest getRequestByRequestId(Long requestId) {
        return trainingRepository.findByRequestId(requestId);
    }

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

}
