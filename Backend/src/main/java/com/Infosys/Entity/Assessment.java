package com.Infosys.Entity;

import jakarta.persistence.*;

<<<<<<< HEAD
@Entity
=======
import java.util.List;

@Entity
@Table(name = "assessment_table1")
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assessmentId;

<<<<<<< HEAD
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    private Employee employee;  // Add relationship to Employee

    private int totalMarks;
    private int passPercentage;
    private int score;  // Add score field

    // New fields
    private String assessmentType;  // Add assessment type
=======
    @OneToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    private Course course;

    // ManyToMany relationship
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_mapping",  // Join table name
            joinColumns = @JoinColumn(name = "assessment_id"),  // Foreign key for TrainingRequest
            inverseJoinColumns = @JoinColumn(name = "question_id")   // Foreign key for Employee
    )
    private List<AssessmentQuestion> questions;

    private int totalMarks;
    private int passingMarks;
//    private int score;  // Add score field

    // New fields
//    private String assessmentType;  // Add assessment type
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    private int duration;  // Add duration

    // Getters and Setters
    public Long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Long assessmentId) {
        this.assessmentId = assessmentId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

<<<<<<< HEAD
    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
=======
    public List<AssessmentQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AssessmentQuestion> questions) {
        this.questions = questions;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

<<<<<<< HEAD
    public int getPassPercentage() {
        return passPercentage;
    }

    public void setPassPercentage(int passPercentage) {
        this.passPercentage = passPercentage;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // New getters and setters for assessmentType and duration
    public String getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(String assessmentType) {
        this.assessmentType = assessmentType;
=======
    public int getPassingMarks() {
        return passingMarks;
    }

    public void setPassingMarks(int passingMarks) {
        this.passingMarks = passingMarks;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
