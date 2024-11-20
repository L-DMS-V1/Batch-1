package com.Infosys.Service;

import com.Infosys.Entity.Assessment;
import com.Infosys.Entity.Course;
import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.DTO.CourseAssignmentDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Repository.AssessmentRepository;
import com.Infosys.Repository.CourseAssignmentRepository;
import com.Infosys.Repository.CourseRepository;
import com.Infosys.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseAssignmentService {

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Existing method to assign course
    public CourseAssignment assignCourse(CourseAssignmentDTO courseAssignmentDTO) {
        Course course = courseRepository.findById(courseAssignmentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Employee employee = employeeRepository.findById(courseAssignmentDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        CourseAssignment courseAssignment = new CourseAssignment();
        courseAssignment.setCourse(course);
        courseAssignment.setEmployee(employee);
        return courseAssignmentRepository.save(courseAssignment);
    }

    // Existing method to get all assignments
    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentRepository.findAll();
    }

    // Existing method to update assignment status
    public CourseAssignment updateAssignmentStatus(Long assignmentId, String status) {
        CourseAssignment courseAssignment = courseAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        courseAssignment.setStatus(status);
        return courseAssignmentRepository.save(courseAssignment);
    }

    // Updated method to get all employees assigned to a course
    public List<Employee> getAssignedEmployeesByCourseId(Long courseId) {
        List<CourseAssignment> assignments = courseAssignmentRepository.findByCourse_CourseId(courseId);  // Use the updated method
        // Extract employees from course assignments
        List<Employee> employees = assignments.stream()
                .map(CourseAssignment::getEmployee)
                .collect(Collectors.toList());
        return employees;
    }

    public boolean reassignCourseBasedOnAssessmentScore(Long employeeId) {
        // Fetch the employee by ID
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) {
            return false; // Employee not found
        }

        // Fetch the latest assessment for the employee
        Assessment assessment = assessmentRepository.findByEmployee(employee).stream()
                .max(Comparator.comparing(Assessment::getAssessmentId)) // Get the latest assessment
                .orElse(null);

        if (assessment == null || assessment.getScore() >= 60) {
            return false; // No reassignment needed, score is above 60% or no assessment found
        }

        // Find the course assigned to the employee (assume a single assignment for simplicity)
        List<CourseAssignment> courseAssignments = courseAssignmentRepository.findByEmployee(employee);
        if (courseAssignments.isEmpty()) {
            return false; // No course assignments found for the employee
        }

        // Find the first course assignment to reassign
        CourseAssignment courseAssignment = courseAssignments.get(0); // For simplicity, reassigning the first course found
        if (courseAssignment != null) {
            // Reassign the course if the score is below 60%
            Course newCourse = courseRepository.findById(courseAssignment.getCourse().getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            CourseAssignment newAssignment = new CourseAssignment();
            newAssignment.setCourse(newCourse);  // This can be customized to assign a new course
            newAssignment.setEmployee(employee);
            courseAssignmentRepository.save(newAssignment);
            return true; // Course reassigned
        }

        return false; // No assignment found for the employee
    }


    // New method to get assignments by username
    public List<CourseAssignment> getAssignmentsByUsername(String username) {
        // Fetch the employee using the username
        Employee employee = employeeRepository.findByUsername(username);

        if (employee == null) {
            throw new RuntimeException("Employee not found for username: " + username);
        }

        // Return all course assignments for the found employee
        return courseAssignmentRepository.findByEmployee(employee);
    }
}
