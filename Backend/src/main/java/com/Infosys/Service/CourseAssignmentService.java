package com.Infosys.Service;

import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Repository.CourseAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseAssignmentService {

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    public CourseAssignment assignCourse(CourseAssignment courseAssignment) {
        return courseAssignmentRepository.save(courseAssignment);
    }

    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentRepository.findAll();
    }

    public CourseAssignment updateAssignmentStatus(int assignmentId, String status) {
        CourseAssignment assignment = courseAssignmentRepository.findById(assignmentId).orElse(null);
        if (assignment != null) {
            assignment.setStatus(status);
            return courseAssignmentRepository.save(assignment);
        }
        return null;
    }
}
