package com.Infosys.Repository;

import com.Infosys.Entity.Course;
import com.Infosys.Entity.CourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {
    List<CourseAssignment> findByEmployeeEmployeeId(Long employeeId);
    List<CourseAssignment> findByCourse(Course course);
}
