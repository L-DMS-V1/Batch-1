package com.Infosys.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EmployeeAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeAssessmentId;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Assessment assessment;

    private int score;
    private String status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAttemptedDate() {
        return attemptedDate;
    }

    public void setAttemptedDate(LocalDateTime attemptedDate) {
        this.attemptedDate = attemptedDate;
    }
}
