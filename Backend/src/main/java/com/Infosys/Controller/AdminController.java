package com.Infosys.Controller;

import com.Infosys.Entity.TrainingRequest;
import com.Infosys.Service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private TrainingRequestService trainingRequestService;

    @PutMapping("/acceptRequest/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.acceptRequest(requestId);
        return ResponseEntity.ok("Request accepted successfully");
    }

    @PutMapping("/rejectRequest/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.rejectRequest(requestId);
        return ResponseEntity.ok("Request rejected successfully");
    }
    @GetMapping("/getAllRequests")
    public ResponseEntity<List<TrainingRequest>> getAllRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }
}
