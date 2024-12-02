package com.Infosys.Repository;

import com.Infosys.Entity.Assessment;
import com.Infosys.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
<<<<<<< HEAD
    List<Assessment> findByEmployee(Employee employee);
=======
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    Optional<Assessment> findByCourseCourseId(Long courseId);

}
