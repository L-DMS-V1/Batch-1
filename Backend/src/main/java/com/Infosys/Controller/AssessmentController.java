package com.Infosys.Controller;

import com.Infosys.Entity.DTO.AssessmentDTO;
import com.Infosys.Entity.DTO.AssessmentSubmissionDTO;
import com.Infosys.Service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/submit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> submitAssessment(@RequestBody AssessmentSubmissionDTO submissionDTO) {
        int score = assessmentService.evaluateAssessment(submissionDTO);
        String message = score >= 60 ? "Congratulations, you passed!" : "You failed. The course will be reassigned.";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
