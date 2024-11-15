package com.Infosys.Service;

import com.Infosys.Entity.Course;
import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.DTO.CourseAssignmentDTO;
import com.Infosys.Entity.DTO.CourseProgressDTO;
import com.Infosys.Entity.Employee;
import com.Infosys.Repository.CourseAssignmentRepository;
import com.Infosys.Repository.CourseRepository;
import com.Infosys.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseAssignmentService {

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseProgressService courseProgressService;

    public CourseAssignment assignCourse(CourseAssignmentDTO courseAssignmentDTO) {
        CourseAssignment courseAssignment = new CourseAssignment();

        Optional<Course> courseOpt = courseRepository.findByCourseId(courseAssignmentDTO.getCourseId());
        courseOpt.ifPresent(courseAssignment::setCourse);
        courseOpt.ifPresent(course -> courseAssignment.setCourseDuration(course.getDuration()));

        Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(courseAssignmentDTO.getEmployeeId());
        employeeOpt.ifPresent(courseAssignment::setEmployee);

        courseAssignment.setStatus(courseAssignmentDTO.getStatus());
        courseAssignment.setDeadline(courseAssignmentDTO.getDeadline());

        // Creating a CourseProgress with 0 Progress
        CourseProgressDTO courseProgressDTO = new CourseProgressDTO();
        employeeOpt.ifPresent(employee -> courseProgressDTO.setEmployeeId(employee.getEmployeeId()));
        courseOpt.ifPresent(course -> courseProgressDTO.setCourseId(course.getCourseId()));
        courseProgressDTO.setProgressPercentage(0L);
        courseProgressDTO.setStatus(courseAssignmentDTO.getStatus());
        courseProgressService.updateCourseProgress(courseProgressDTO);

        return courseAssignmentRepository.save(courseAssignment);
    }

    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentRepository.findAll();
    }

    public CourseAssignment updateAssignmentStatus(Long assignmentId, String status) {
        CourseAssignment assignment = courseAssignmentRepository.findById(assignmentId).orElse(null);
        if (assignment != null) {
            assignment.setStatus(status);
            return courseAssignmentRepository.save(assignment);
        }
        return null;
    }

    public List<CourseAssignment> getAssignmentsByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        return courseAssignmentRepository.findByEmployeeEmployeeId(employee.getEmployeeId());
    }
}
