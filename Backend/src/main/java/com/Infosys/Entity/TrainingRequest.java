package com.Infosys.Entity;

import com.Infosys.Entity.DTO.EmployeeDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "TrainingRequestTable1")
public class TrainingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestId;

    @Column(name = "employee_Position")
    private String employeePosition;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "training_request_employee", // Join table name
            joinColumns = @JoinColumn(name = "training_request_id"), // Foreign key for TrainingRequest
            inverseJoinColumns = @JoinColumn(name = "employee_id")  // Foreign key for Employee
    )
    private List<Employee> requiredEmployees;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "managerId", referencedColumnName = "managerId")
    private Manager manager;

    public long getRequestId() {
        return requestId;
    }

    public void setRequestId(long requestId) {
        this.requestId = requestId;
    }

    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public List<Employee> getRequiredEmployees() {
        return requiredEmployees;
    }

    public void setRequiredEmployees(List<Employee> requiredEmployees) {
        this.requiredEmployees = requiredEmployees;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }

    @Override
    public String toString() {
        return "TrainingRequest{" +
                "requestId=" + requestId +
                ", employeePosition='" + employeePosition + '\'' +
                ", requiredEmployees=" + requiredEmployees +
                ", status=" + status +
                ", course=" + course +
                ", manager=" + manager +
                '}';
    }
}
