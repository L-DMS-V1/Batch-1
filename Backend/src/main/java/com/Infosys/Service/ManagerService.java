package com.Infosys.Service;

import com.Infosys.Entity.DTO.TrainingRequestDTO;
import com.Infosys.Entity.DTO.UserDTO;
import com.Infosys.Entity.Manager;
import com.Infosys.Entity.TrainingRequest;
import com.Infosys.Repository.ManagerRepository;
import com.Infosys.Repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private ManagerRepository managerRepository;

    public void addManager(UserDTO userDTO) {
        // This method is similar to createUser
        Manager manager = new Manager();
        manager.setAccountId(userDTO.getAccountId());
        manager.setAccountName(userDTO.getAccountName());
        manager.setUsername(userDTO.getUsername());
        manager.setEmail(userDTO.getEmail());
        manager.setPassword(userDTO.getPassword());
        managerRepository.save(manager);
    }

    public void requestForm(TrainingRequestDTO trainingRequestDTO) {
        // Get the username of the authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        TrainingRequest trainingRequest = new TrainingRequest();
        trainingRequest.setCourseName(trainingRequestDTO.getCourseName());
        trainingRequest.setDescription(trainingRequestDTO.getDescription());
        trainingRequest.setConcepts(trainingRequestDTO.getConcepts());
        trainingRequest.setDuration(trainingRequestDTO.getDuration());
        trainingRequest.setEmployeePosition(trainingRequestDTO.getEmployeePosition());
        trainingRequest.setRequiredEmployees(trainingRequestDTO.getRequiredEmployees());
        trainingRequest.setStatus("PENDING");
        trainingRequest.setManagerUsername(username);
        trainingRepository.save(trainingRequest);

    }

    public List<TrainingRequest> getRequestByManagerName(String requestorname) {
        return trainingRepository.findByManagerUsername(requestorname);
    }

    public TrainingRequest getRequestByRequestId(Long requestId) {
        return trainingRepository.findByRequestId(requestId);
    }


}