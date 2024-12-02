package com.Infosys.Service;

<<<<<<< HEAD
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
=======
import com.Infosys.Entity.*;
import com.Infosys.Entity.DTO.AssessmentDTO;
import com.Infosys.Entity.DTO.AssessmentQuestionDTO;
import com.Infosys.Entity.DTO.AssessmentSubmissionDTO;
import com.Infosys.Repository.*;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.Optional;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
<<<<<<< HEAD
=======
    private AssessmentQuestionRepository assessmentQuestionRepository;

    @Autowired
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private CourseProgressService courseProgressService;

<<<<<<< HEAD
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
=======
    @Autowired
    private EmployeeAssessmentRepository employeeAssessmentRepository;

    @Autowired
    private CourseProgressRepository courseProgressRepository;

>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    public void createAssessment(AssessmentDTO assessmentDTO) {
        // Convert AssessmentDTO to Assessment entity
        Assessment assessment = new Assessment();
        Course course = courseRepository.findById(assessmentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        assessment.setCourse(course);
<<<<<<< HEAD
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
=======
        assessment.setTotalMarks(assessmentDTO.getTotalMarks());
        assessment.setPassingMarks(assessmentDTO.getPassingMarks());
        assessment.setDuration(assessmentDTO.getDuration());

        List<AssessmentQuestion> assessmentQuestions = new ArrayList<>();
        for (AssessmentQuestionDTO assessmentQuestionDTO : assessmentDTO.getQuestions()){
            AssessmentQuestion assessmentQuestion = new AssessmentQuestion(assessmentQuestionDTO);
            assessmentQuestionRepository.save(assessmentQuestion);
            assessmentQuestions.add(assessmentQuestion);
        }
        assessment.setQuestions(assessmentQuestions);

        // Save the assessment in the database
        assessmentRepository.save(assessment);
    }

    public Assessment getAssessment(Long courseId) {
        Optional<Assessment> assessment = assessmentRepository.findByCourseCourseId(courseId);
        return assessment.orElse(null);
    }

    public List<Assessment> getAllAssessment() {
        return assessmentRepository.findAll();
    }

    public void updateAssessment(AssessmentDTO assessmentDTO) {
        Optional<Assessment> assessmentOpt = assessmentRepository.findByCourseCourseId(assessmentDTO.getCourseId());
        if (assessmentOpt.isPresent()) {
            Assessment assessment = assessmentOpt.get();
            assessment.setTotalMarks(assessmentDTO.getTotalMarks());
            assessment.setPassingMarks(assessmentDTO.getPassingMarks());
            assessment.setDuration(assessmentDTO.getDuration());

            List<AssessmentQuestion> assessmentQuestions = new ArrayList<>();
            for (AssessmentQuestionDTO assessmentQuestionDTO : assessmentDTO.getQuestions()){
                AssessmentQuestion assessmentQuestion = new AssessmentQuestion(assessmentQuestionDTO);
                assessmentQuestionRepository.save(assessmentQuestion);
                assessmentQuestions.add(assessmentQuestion);
            }
            assessment.setQuestions(assessmentQuestions);

            // Save the assessment in the database
            assessmentRepository.save(assessment);
        } else {
            throw new RuntimeException("Assessment not found");
        }
    }

    public String evaluateAssessment(AssessmentSubmissionDTO submissionDTO) {
        // Scoring Logic
        // Fetch the assessment using the assessmentId
        Assessment assessment = assessmentRepository.findById(submissionDTO.getAssessmentId())
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        List<String> answers = submissionDTO.getAnswers();
        List<AssessmentQuestion> assessmentQuestions = assessment.getQuestions();
        int score = 0;
        String result = "";
        for (int i = 0; i < answers.size(); i++) {
            if(answers.get(i).equals(assessmentQuestions.get(i).getCorrectOption()))
                score++;
        }

        if (score >= assessment.getPassingMarks()){
            result = "Congratulations!! Assessment Cleared Successfully!!";
            Optional<CourseProgress> courseProgressOpt = courseProgressRepository.findByEmployeeEmployeeIdAndCourseCourseId(submissionDTO.getEmployeeId(), assessment.getCourse().getCourseId());
            if(courseProgressOpt.isPresent()) {
                CourseProgress courseProgress = courseProgressOpt.get();
                courseProgress.setStatus("COMPLETED");
                courseProgressRepository.save(courseProgress);
                Optional<CourseAssignment> courseAssignmentOpt = courseAssignmentRepository.findByEmployeeEmployeeIdAndCourseCourseId(
                        courseProgress.getEmployee().getEmployeeId(),
                        courseProgress.getCourse().getCourseId()
                );
                if (courseAssignmentOpt.isPresent()){
                    CourseAssignment courseAssignment = courseAssignmentOpt.get();
                    courseAssignment.setStatus("COMPLETED");
                    courseAssignmentRepository.save(courseAssignment);
                } else
                    throw new RuntimeException("CourseAssignment is not found");
            } else
                throw new RuntimeException("courseProgress is not found");
        }
        else{
            result = "We're sorry!! You could not pass the Assessment";
            Optional<CourseProgress> courseProgressOpt = courseProgressRepository.findByEmployeeEmployeeIdAndCourseCourseId(submissionDTO.getEmployeeId(), assessment.getCourse().getCourseId());
            if(courseProgressOpt.isPresent()) {
                CourseProgress courseProgress = courseProgressOpt.get();
                courseProgress.setProgressPercentage(0L);
                courseProgressRepository.save(courseProgress);
            }
        }

        //Recording the Assessment
        EmployeeAssessment employeeAssessment = new EmployeeAssessment();
        Optional<Employee> employeeOpt = employeeRepository.findById(submissionDTO.getEmployeeId());
        employeeOpt.ifPresent(employeeAssessment::setEmployee);
        employeeAssessment.setAssessment(assessment);
        employeeAssessment.setResult(score >= assessment.getPassingMarks() ? AssessmentResult.PASS : AssessmentResult.FAIL);
        employeeAssessment.setScore(score);
        employeeAssessment.setAttemptedDate(LocalDateTime.now());
        employeeAssessmentRepository.save(employeeAssessment);

        return result;
    }

    public List<EmployeeAssessment> getAssessmentsByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        return employeeAssessmentRepository.findByEmployeeEmployeeId(employee.getEmployeeId());
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }
}
