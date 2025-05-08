package com.eegproject.eegbackend.repository;

import com.eegproject.eegbackend.model.EmotionResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmotionResultRepository extends MongoRepository<EmotionResult, String> {
    List<EmotionResult> findByUserId(String userId);
}
