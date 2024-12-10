package com.Infosys.Entity.DTO;

import com.Infosys.Entity.Course;
import com.Infosys.Entity.Employee;
import com.Infosys.Entity.Manager;
import com.Infosys.Entity.RequestStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class TrainingRequestDTO {

    private Long courseId;

    private Long managerId;

    @NotBlank(message = "Employee Position is mandatory")
    private String employeePosition;

    private List<Employee> requiredEmployees;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public @NotBlank(message = "Employee Position is mandatory") String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(@NotBlank(message = "Employee Position is mandatory") String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public List<Employee> getRequiredEmployees() {
        return requiredEmployees;
    }

    public void setRequiredEmployees(List<Employee> requiredEmployees) {
        this.requiredEmployees = requiredEmployees;
    }

    @Override
    public String toString() {
        return "TrainingRequestDTO{" +
                "courseId=" + courseId +
                ", managerId=" + managerId +
                ", employeePosition='" + employeePosition + '\'' +
                ", requiredEmployees=" + requiredEmployees +
                '}';
    }
}
