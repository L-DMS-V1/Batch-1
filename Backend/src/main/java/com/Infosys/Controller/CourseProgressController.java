package com.Infosys.Controller;

import com.Infosys.Entity.CourseProgress;
import com.Infosys.Entity.DTO.CourseProgressDTO;
import com.Infosys.Service.CourseProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('EMPLOYEE')")
@RequestMapping("/api/course-progress")
public class CourseProgressController {

    @Autowired
    private CourseProgressService courseProgressService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<CourseProgress>> getCourseProgress(@PathVariable("employeeId") Long employeeId) {
        List<CourseProgress> listOfCourseProgress  = courseProgressService.getCourseProgress(employeeId);
        return new ResponseEntity<>(listOfCourseProgress, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCourseProgress(@RequestBody CourseProgressDTO courseProgressDTO) {
        courseProgressService.updateCourseProgress(courseProgressDTO);
        return new ResponseEntity<>("CourseProgress Updated Successfully", HttpStatus.OK);
    }

}
