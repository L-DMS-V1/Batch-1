package com.Infosys.Repository;

import com.Infosys.Entity.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Long> {
<<<<<<< HEAD
    List<AssessmentQuestion> findByAssessmentAssessmentId(Long assessmentId);
=======
//    List<AssessmentQuestion> findByAssessmentAssessmentId(Long assessmentId);
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
}
