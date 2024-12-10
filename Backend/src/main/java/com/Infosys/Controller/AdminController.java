package com.Infosys.Controller;

import com.Infosys.Entity.CourseProgress;
import com.Infosys.Entity.DTO.RequestCompletionDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Entity.Manager;
import com.Infosys.Entity.TrainingRequest;
import com.Infosys.Service.CourseProgressService;
import com.Infosys.Service.EmployeeService;
import com.Infosys.Service.ManagerService;
import com.Infosys.Service.TrainingRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private TrainingRequestService trainingRequestService;

    @Autowired
    private CourseProgressService courseProgressService;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private EmployeeService employeeService;

    @PutMapping("/acceptRequest/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.acceptRequest(requestId);
        return ResponseEntity.ok("Request accepted successfully");
    }

    @PutMapping("/rejectRequest/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.rejectRequest(requestId);
        return ResponseEntity.ok("Request rejected successfully");
    }

    @PostMapping("/completeRequest/{id}")
    public ResponseEntity<String> completeRequest(@PathVariable("id") Long requestId,@Valid @RequestBody RequestCompletionDTO requestCompletionDTO) {
        trainingRequestService.completeRequest(requestId, requestCompletionDTO);
        return ResponseEntity.ok("Request Completed successfully");
    }

    @GetMapping("/getAllRequests")
    public ResponseEntity<List<TrainingRequest>> getAllRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/getRequest/{requestId}")
    public ResponseEntity<TrainingRequest> getAllRequests(@PathVariable("requestId") Long requestId) {
        TrainingRequest trainingRequest = trainingRequestService.getRequestByRequestId(requestId);
        return ResponseEntity.ok(trainingRequest);
    }

    @GetMapping("/getAllCourseProgress")
    public ResponseEntity<List<CourseProgress>> getAllCourseProgress() {
        List<CourseProgress> courseProgressList = courseProgressService.getAllCourseProgress();
        return new ResponseEntity<>(courseProgressList, HttpStatus.OK);
    }

    @GetMapping("/getAllManagers")
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager> managerList = managerService.getAllManagers();
        return new ResponseEntity<>(managerList, HttpStatus.OK);
    }

    @GetMapping("/getAllEmployeesByManagerUsername")
    public ResponseEntity<List<Employee>> getAllEmpsByManUsername(@RequestParam String managerUsername) {
        List<Employee> employeeList = employeeService.getEmployeesByManagerName(managerUsername);
        return ResponseEntity.ok(employeeList);
    }


}
