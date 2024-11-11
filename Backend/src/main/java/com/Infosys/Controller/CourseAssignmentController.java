package com.Infosys.Controller;

import com.Infosys.Entity.CourseAssignment;
import com.Infosys.Service.CourseAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/course-assignments")
public class CourseAssignmentController {

    @Autowired
    private CourseAssignmentService courseAssignmentService;

    @PostMapping
    public CourseAssignment assignCourse(@RequestBody CourseAssignment courseAssignment) {
        return courseAssignmentService.assignCourse(courseAssignment);
    }

    @GetMapping
    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentService.getAllAssignments();
    }

    @PatchMapping("/{assignmentId}/status")
    public CourseAssignment updateAssignmentStatus(@PathVariable int assignmentId, @RequestParam String status) {
        return courseAssignmentService.updateAssignmentStatus(assignmentId, status);
    }
}
