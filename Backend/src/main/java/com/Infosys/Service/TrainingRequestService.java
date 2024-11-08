package com.Infosys.Service;

import com.Infosys.Entity.RequestStatus;
import com.Infosys.Entity.TrainingRequest;
import com.Infosys.Repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingRequestService {

    @Autowired
    private TrainingRepository trainingRepository;

    public void acceptRequest(Long requestId) {
        TrainingRequest trainingRequest = trainingRepository.findByRequestId(requestId);
        if (trainingRequest != null) {
            trainingRequest.setStatus(RequestStatus.ACCEPTED);
            trainingRepository.save(trainingRequest);
        }
    }

    public void rejectRequest(Long requestId) {
        TrainingRequest trainingRequest = trainingRepository.findByRequestId(requestId);
        if (trainingRequest != null) {
            trainingRequest.setStatus(RequestStatus.REJECTED);
            trainingRepository.save(trainingRequest);
        }
    }
    public List<TrainingRequest> getAllRequests() {
        return trainingRepository.findAll();
    }
}