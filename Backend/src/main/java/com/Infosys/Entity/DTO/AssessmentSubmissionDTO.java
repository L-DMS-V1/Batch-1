package com.Infosys.Entity.DTO;

import java.util.List;

public class AssessmentSubmissionDTO {
    private Long assessmentId;
    private Long employeeId;
<<<<<<< HEAD
    private int score;
=======
    private List<String> answers;
//    private int score;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a

    // Getters and Setters
    public Long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Long assessmentId) {
        this.assessmentId = assessmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

<<<<<<< HEAD
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
=======
    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }
}