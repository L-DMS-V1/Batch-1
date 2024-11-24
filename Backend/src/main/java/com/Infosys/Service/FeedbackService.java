package com.Infosys.Service;

import com.Infosys.Entity.DTO.FeedbackDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Entity.Feedback;
import com.Infosys.Repository.EmployeeRepository;
import com.Infosys.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Feedback submitFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(feedbackDTO.getEmployeeId());
        employeeOpt.ifPresent(feedback::setEmployee);
        feedback.setRating(feedbackDTO.getRating());
        feedback.setFeedBackEnum(feedbackDTO.getFeedBackEnum());
        feedback.setComment(feedbackDTO.getComment());
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
