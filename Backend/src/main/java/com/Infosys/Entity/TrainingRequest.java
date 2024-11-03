package com.Infosys.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TrainingRequestTable1")
public class TrainingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestId;

    @Column(name = "course_Name")
    private String courseName;

    @Column(name = "description")
    private String description;

    @Column(name = "concepts")
    private String concepts;

    @Column(name = "duration")
    private String duration;

    @Column(name = "employee_Position")
    private String employeePosition;

    @Column(name = "required_Employees")
    private int requiredEmployees;

    @Column(name = "status")
    private String status;

    @Column(name = "manager_Username")
    private String managerUsername;

    public long getRequestId() {
        return requestId;
    }

    public void setRequestId(long requestId) {
        this.requestId = requestId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConcepts() {
        return concepts;
    }

    public void setConcepts(String concepts) {
        this.concepts = concepts;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public int getRequiredEmployees() {
        return requiredEmployees;
    }

    public void setRequiredEmployees(int requiredEmployees) {
        this.requiredEmployees = requiredEmployees;
    }

    public String getStatus() {return status;}

    public void setStatus(String status) {
        this.status = status;
    }

    public String getManagerUsername() {
        return managerUsername;
    }

    public void setManagerUsername(String managerUsername) {
        this.managerUsername = managerUsername;
    }


    @Override
    public String toString() {
        return "TrainingRequest{" +
                "requestId=" + requestId +
                ", courseName='" + courseName + '\'' +
                ", description='" + description + '\'' +
                ", concepts='" + concepts + '\'' +
                ", duration='" + duration + '\'' +
                ", employeePosition='" + employeePosition + '\'' +
                ", requiredEmployees=" + requiredEmployees + '\'' +
                ", status='" + status + '\'' +
                ", managerUsername='" + managerUsername +
                '}';
    }
}
