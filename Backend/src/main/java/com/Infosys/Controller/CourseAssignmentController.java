package com.Infosys.Controller;

import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.DTO.CourseAssignmentDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Service.CourseAssignmentService;
import com.Infosys.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/course-assignments")
public class CourseAssignmentController {

    @Autowired
    private CourseAssignmentService courseAssignmentService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public CourseAssignment assignCourse(@RequestBody CourseAssignmentDTO courseAssignmentDTO) {
        return courseAssignmentService.assignCourse(courseAssignmentDTO);
    }

    @GetMapping
    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentService.getAllAssignments();
    }

    @PatchMapping("/{assignmentId}/status")
    public CourseAssignment updateAssignmentStatus(@PathVariable Long assignmentId, @RequestParam String status) {
        return courseAssignmentService.updateAssignmentStatus(assignmentId, status);
    }

    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // New endpoint to get assigned employees by courseId
    @GetMapping("/assigned-employees/{courseId}")
    public ResponseEntity<List<Employee>> getAssignedEmployees(@PathVariable Long courseId) {
        try {
            List<Employee> assignedEmployees = courseAssignmentService.getAssignedEmployeesByCourseId(courseId);
            if (assignedEmployees.isEmpty()) {
                return ResponseEntity.noContent().build();  // Return 204 No Content if no employees are found
            }
            return ResponseEntity.ok(assignedEmployees);  // Return 200 OK with employee list
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Handle errors
        }
    }

    // New endpoint to reassign course based on assessment score
    @PutMapping("/reassign/{employeeId}")
    public ResponseEntity<String> reassignCourseBasedOnAssessment(@PathVariable Long employeeId) {
        boolean reassigned = courseAssignmentService.reassignCourseBasedOnAssessmentScore(employeeId);
        if (reassigned) {
            return ResponseEntity.ok("Course reassigned successfully based on the assessment score.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Reassignment criteria not met (score below 60%).");
        }
    }
}
