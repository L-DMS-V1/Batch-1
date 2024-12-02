package com.Infosys.Service;

import com.Infosys.Entity.Course;
import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Entity.CourseProgress;
import com.Infosys.Entity.DTO.CourseProgressDTO;
import com.Infosys.Entity.Employee;
<<<<<<< HEAD
=======
import com.Infosys.Filter.JWTFilter;
import com.Infosys.Repository.CourseAssignmentRepository;
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
import com.Infosys.Repository.CourseProgressRepository;
import com.Infosys.Repository.CourseRepository;
import com.Infosys.Repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CourseProgressService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseProgressRepository courseProgressRepository;

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    private static final Logger logger = LoggerFactory.getLogger(CourseProgressService.class);

    // Update the course progress or create a new entry if not found
    public void updateCourseProgress(CourseProgressDTO courseProgressDTO) {
        Optional<CourseProgress> courseProgressOpt = courseProgressRepository
                .findByEmployeeEmployeeIdAndCourseCourseId(courseProgressDTO.getEmployeeId(), courseProgressDTO.getCourseId());

        if (courseProgressOpt.isPresent()) {
            // Update existing progress
            CourseProgress courseProgress = courseProgressOpt.get();
            courseProgress.setProgressPercentage(courseProgressDTO.getProgressPercentage());
<<<<<<< HEAD
            if (courseProgressDTO.getProgressPercentage() == 100L) {
                courseProgress.setStatus("COMPLETED");
            } else {
                courseProgress.setStatus(courseProgressDTO.getStatus());
            }
=======
            courseProgress.setStatus(courseProgressDTO.getStatus());
>>>>>>> c8e912b9ec6699b22d587ac7d819a2657c6e0f8a
            courseProgress.setLastAccessedDate(LocalDateTime.now());
            courseProgressRepository.save(courseProgress);
            logger.info("Course progress updated: {}", courseProgress);
        } else {
            // Create new progress entry
            CourseProgress courseProgress = new CourseProgress();

            Optional<Course> courseOpt = courseRepository.findByCourseId(courseProgressDTO.getCourseId());
            if (courseOpt.isPresent()) {
                courseProgress.setCourse(courseOpt.get());
            } else {
                logger.error("Course not found with ID: {}", courseProgressDTO.getCourseId());
                throw new RuntimeException("Course not found");
            }

            Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(courseProgressDTO.getEmployeeId());
            if (employeeOpt.isPresent()) {
                courseProgress.setEmployee(employeeOpt.get());
            } else {
                logger.error("Employee not found with ID: {}", courseProgressDTO.getEmployeeId());
                throw new RuntimeException("Employee not found");
            }

            courseProgress.setProgressPercentage(courseProgressDTO.getProgressPercentage());
            courseProgress.setStatus(courseProgressDTO.getStatus());
            courseProgress.setLastAccessedDate(LocalDateTime.now());
            courseProgressRepository.save(courseProgress);
            logger.info("New course progress created: {}", courseProgress);
        }
    }

    // Get the course progress of an employee by username
    public List<CourseProgress> getCourseProgress(String username) {
        List<CourseProgress> courseProgressList = courseProgressRepository.findByEmployeeUsername(username);
        logger.info("Course progress retrieved for username {}: {}", username, courseProgressList);
        return courseProgressList;
    }

    // Get all course progress entries
    public List<CourseProgress> getAllCourseProgress() {
        List<CourseProgress> allCourseProgress = courseProgressRepository.findAll();
        logger.info("All course progress entries retrieved: {}", allCourseProgress);
        return allCourseProgress;
    }
}
