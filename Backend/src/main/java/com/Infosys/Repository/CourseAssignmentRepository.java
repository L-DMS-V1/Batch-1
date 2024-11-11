package com.Infosys.Repository;

import com.Infosys.Entity.CourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Integer> {
}
