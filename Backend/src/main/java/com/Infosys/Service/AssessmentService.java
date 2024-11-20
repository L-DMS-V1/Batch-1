package com.Infosys.Service;

import com.Infosys.Entity.Assessment;
import com.Infosys.Entity.Course;
import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.DTO.AssessmentDTO;
import com.Infosys.Entity.DTO.AssessmentSubmissionDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Repository.AssessmentRepository;
import com.Infosys.Repository.CourseAssignmentRepository;
import com.Infosys.Repository.CourseRepository;
import com.Infosys.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private CourseProgressService courseProgressService;

    // Method to get the latest assessment for an employee
    public Assessment getLatestAssessment(Long employeeId) {
        // Fetch the employee by ID
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Fetch the latest assessment for the employee
        return assessmentRepository.findByEmployee(employee).stream()
                .max(Comparator.comparing(Assessment::getAssessmentId))
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
    }

    // Method to reassign a course based on the assessment score
    public boolean reassignCourseBasedOnAssessmentScore(Long employeeId) {
        // Fetch the employee by ID
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Fetch the latest assessment for the employee
        Assessment assessment = assessmentRepository.findByEmployee(employee).stream()
                .max(Comparator.comparing(Assessment::getAssessmentId))
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

            // You can choose to reassign the same course or a different course here
            CourseAssignment newAssignment = new CourseAssignment();
            newAssignment.setCourse(newCourse);  // Assigning the same course for simplicity
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

    // Method to assign course to an employee
    public CourseAssignment assignCourse(Long courseId, Long employeeId) {
        // Fetch the course and employee
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Create a new CourseAssignment
        CourseAssignment courseAssignment = new CourseAssignment();
        courseAssignment.setCourse(course);
        courseAssignment.setEmployee(employee);

        // Save the assignment and return
        return courseAssignmentRepository.save(courseAssignment);
    }

    // Method to get all course assignments
    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentRepository.findAll();
    }

    // Method to update the status of a course assignment
    public CourseAssignment updateAssignmentStatus(Long assignmentId, String status) {
        CourseAssignment courseAssignment = courseAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        courseAssignment.setStatus(status);
        return courseAssignmentRepository.save(courseAssignment);
    }

    // Method to get all employees assigned to a course
    public List<Employee> getAssignedEmployeesByCourseId(Long courseId) {
        List<CourseAssignment> assignments = courseAssignmentRepository.findByCourse_CourseId(courseId);  // Use the updated method
        // Extract employees from course assignments
        return assignments.stream()
                .map(CourseAssignment::getEmployee)
                .collect(Collectors.toList());
    }
    public void createAssessment(AssessmentDTO assessmentDTO) {
        // Convert AssessmentDTO to Assessment entity
        Assessment assessment = new Assessment();
        Course course = courseRepository.findById(assessmentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        assessment.setCourse(course);
        assessment.setAssessmentType(assessmentDTO.getAssessmentType());
        assessment.setTotalMarks(assessmentDTO.getTotalMarks());
        assessment.setDuration(assessmentDTO.getDuration());

        // Save the assessment in the database
        assessmentRepository.save(assessment);
    }
    public int evaluateAssessment(AssessmentSubmissionDTO submissionDTO) {
        // Assuming the AssessmentSubmissionDTO contains the employeeId and assessmentId
        Long assessmentId = submissionDTO.getAssessmentId();
        Long employeeId = submissionDTO.getEmployeeId();

        // Fetch the assessment using the assessmentId
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        // You can implement logic here to calculate the score, e.g., comparing answers in the DTO with the correct answers in the assessment
        // For now, let's assume it returns a dummy score
        int score = submissionDTO.getScore(); // Use the score from the DTO or your own logic

        // Save or update the result (optional, depends on your business logic)
        // You can also save the score in a separate entity if needed
        // For now, we'll just return the score

        return score;
    }
}
