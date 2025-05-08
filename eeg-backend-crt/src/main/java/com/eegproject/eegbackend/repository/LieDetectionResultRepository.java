package com.eegproject.eegbackend.repository;


import com.eegproject.eegbackend.model.LieDetectionResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LieDetectionResultRepository extends MongoRepository<LieDetectionResult, String> {
    List<LieDetectionResult> findByUserId(String userId);
}
