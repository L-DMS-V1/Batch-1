package com.Infosys.Repository;

import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.Course;
import com.Infosys.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {

    // Find all CourseAssignments for a given Employee
    List<CourseAssignment> findByEmployee(Employee employee);

    // Find all CourseAssignments for a given Course
    List<CourseAssignment> findByCourse(Course course);
<<<<<<< HEAD

    // New method to find assignments by Course Id
    List<CourseAssignment> findByCourse_CourseId(Long courseId);  // This will allow querying by the courseId directly.
=======
    Optional<CourseAssignment> findByEmployeeEmployeeIdAndCourseCourseId(Long employeeId, Long courseId);
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
}
