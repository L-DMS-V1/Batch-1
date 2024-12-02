package com.Infosys.Controller;

<<<<<<< HEAD
=======
import com.Infosys.Entity.Assessment;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
import com.Infosys.Entity.DTO.AssessmentDTO;
import com.Infosys.Entity.DTO.AssessmentSubmissionDTO;
import com.Infosys.Service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
=======
import java.util.List;

>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createAssessment(@RequestBody AssessmentDTO assessmentDTO) {
        assessmentService.createAssessment(assessmentDTO);
        return new ResponseEntity<>("Assessment created successfully", HttpStatus.CREATED);
    }

<<<<<<< HEAD
    @PostMapping("/submit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> submitAssessment(@RequestBody AssessmentSubmissionDTO submissionDTO) {
        int score = assessmentService.evaluateAssessment(submissionDTO);
        String message = score >= 60 ? "Congratulations, you passed!" : "You failed. The course will be reassigned.";
        return new ResponseEntity<>(message, HttpStatus.OK);
=======
    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateAssessment(@RequestBody AssessmentDTO assessmentDTO) {
        assessmentService.updateAssessment(assessmentDTO);
        return new ResponseEntity<>("Assessment updated successfully", HttpStatus.CREATED);
    }

    @GetMapping("/getAllAssessments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        List<Assessment> assessmentList =  assessmentService.getAllAssessment();
        return new ResponseEntity<>(assessmentList, HttpStatus.CREATED);
    }

    @GetMapping("/getAssessment/{courseId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Assessment> getAssessment(@PathVariable("courseId") Long courseId) {
        Assessment assessment = assessmentService.getAssessment(courseId);
        return new ResponseEntity<>(assessment,HttpStatus.OK);
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> submitAssessment(@RequestBody AssessmentSubmissionDTO submissionDTO) {
        String result = assessmentService.evaluateAssessment(submissionDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }
}
