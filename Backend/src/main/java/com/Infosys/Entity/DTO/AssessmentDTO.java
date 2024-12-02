package com.Infosys.Entity.DTO;


<<<<<<< HEAD
public class AssessmentDTO {
    private Long courseId;
    private String assessmentType;  // Add assessmentType field
    private int totalMarks;
=======
import java.util.List;

public class AssessmentDTO {
    private Long courseId;
    private List<AssessmentQuestionDTO> questions;
    private int totalMarks;
    private int passingMarks;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    private int duration;  // Add duration field

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

<<<<<<< HEAD
    public String getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(String assessmentType) {
        this.assessmentType = assessmentType;
=======
    public List<AssessmentQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AssessmentQuestionDTO> questions) {
        this.questions = questions;
    }

    public int getPassingMarks() {
        return passingMarks;
    }

    public void setPassingMarks(int passingMarks) {
        this.passingMarks = passingMarks;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
