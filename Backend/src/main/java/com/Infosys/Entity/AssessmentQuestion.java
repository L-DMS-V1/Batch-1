package com.Infosys.Entity;

<<<<<<< HEAD
import jakarta.persistence.*;

@Entity
=======
import com.Infosys.Entity.DTO.AssessmentQuestionDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "assessment_question_table1")
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
public class AssessmentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

<<<<<<< HEAD
    @ManyToOne
    private Assessment assessment;
=======
//    @ManyToOne
//    private Assessment assessment;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a

    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;

<<<<<<< HEAD
=======
    public AssessmentQuestion() {
    }

    public AssessmentQuestion(AssessmentQuestionDTO assessmentQuestionDTO) {
        this.questionText = assessmentQuestionDTO.getQuestionText();
        this.optionA = assessmentQuestionDTO.getOptionA();
        this.optionB = assessmentQuestionDTO.getOptionB();
        this.optionC = assessmentQuestionDTO.getOptionC();
        this.optionD = assessmentQuestionDTO.getOptionD();
        this.correctOption = assessmentQuestionDTO.getCorrectOption();
    }

>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    // Getters and Setters
    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

<<<<<<< HEAD
    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

=======
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }
}
