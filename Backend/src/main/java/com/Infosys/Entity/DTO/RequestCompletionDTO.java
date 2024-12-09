package com.Infosys.Entity.DTO;

import java.util.List;

public class RequestCompletionDTO {
    private Long requestId;
    private List<CourseAssignmentDTO> courseAssignmentDTOS;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public List<CourseAssignmentDTO> getCourseAssignmentDTOS() {
        return courseAssignmentDTOS;
    }

    public void setCourseAssignmentDTOS(List<CourseAssignmentDTO> courseAssignmentDTOS) {
        this.courseAssignmentDTOS = courseAssignmentDTOS;
    }
}
