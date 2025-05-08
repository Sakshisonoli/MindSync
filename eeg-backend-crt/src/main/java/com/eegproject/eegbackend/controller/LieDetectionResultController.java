package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.LieDetectionResult;
import com.eegproject.eegbackend.repository.LieDetectionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lie")
@CrossOrigin
public class LieDetectionResultController {

    @Autowired
    private LieDetectionResultRepository lieRepo;

    @PostMapping("/save")
    public LieDetectionResult saveLieResult(@RequestBody LieDetectionResult result) {
        return lieRepo.save(result);
    }

   
}


    @GetMapping("/all")
    public List<LieDetectionResult> getAllResults() {
        return lieRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<LieDetectionResult> getResultsByUser(@PathVariable String userId) {
        return lieRepo.findByUserId(userId);
    }
}


