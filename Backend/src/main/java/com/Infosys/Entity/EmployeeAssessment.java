package com.Infosys.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EmployeeAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeAssessmentId;

    @ManyToOne
<<<<<<< HEAD
    private Employee employee;

    @ManyToOne
    private Assessment assessment;

    private int score;
    private String status;
=======
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "assessmentId", referencedColumnName = "assessmentId")
    private Assessment assessment;

    private int score;

    @Enumerated(EnumType.STRING)
    private AssessmentResult result;

>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    private LocalDateTime attemptedDate;

    // Getters and Setters
    public Long getEmployeeAssessmentId() {
        return employeeAssessmentId;
    }

    public void setEmployeeAssessmentId(Long employeeAssessmentId) {
        this.employeeAssessmentId = employeeAssessmentId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

<<<<<<< HEAD
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
=======
    public AssessmentResult getResult() {
        return result;
    }

    public void setResult(AssessmentResult result) {
        this.result = result;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    }

    public LocalDateTime getAttemptedDate() {
        return attemptedDate;
    }

    public void setAttemptedDate(LocalDateTime attemptedDate) {
        this.attemptedDate = attemptedDate;
    }
}
