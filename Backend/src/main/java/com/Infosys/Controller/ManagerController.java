package com.Infosys.Controller;

import com.Infosys.Entity.DTO.TrainingRequestDTO;
import com.Infosys.Entity.TrainingRequest;
import com.Infosys.Service.ManagerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('MANAGER')")
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @PostMapping("/createRequest")
    public ResponseEntity<String> createRequest(@Valid @RequestBody TrainingRequestDTO trainingRequestDTO) {
        managerService.requestForm(trainingRequestDTO);
        return new ResponseEntity<>("Request created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/getRequests")
    public ResponseEntity<List<TrainingRequest>> getRequests() {
        // Get the username of the authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<TrainingRequest> trainingRequests = managerService.getRequestByManagerName(username);
        return ResponseEntity.ok(trainingRequests);
    }

    @GetMapping("/getRequest/{id}")
    public ResponseEntity<TrainingRequest> getRequest(@PathVariable("id") Long requestId) {
        TrainingRequest trainingRequest = managerService.getRequestByRequestId(requestId);
        return ResponseEntity.ok(trainingRequest);
    }

    @PutMapping("/acceptRequest/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable("id") Long requestId) {
        managerService.acceptRequest(requestId);
        return ResponseEntity.ok("Request accepted successfully");
    }

    @PutMapping("/rejectRequest/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable("id") Long requestId) {
        managerService.rejectRequest(requestId);
        return ResponseEntity.ok("Request rejected successfully");
    }
}
