package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.SeizureResult;
import com.eegproject.eegbackend.repository.SeizureResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seizure")
@CrossOrigin
public class SeizureResultController {

    @Autowired
    private SeizureResultRepository seizureRepo;

    @PostMapping("/save")
    public SeizureResult saveSeizureResult(@RequestBody SeizureResult result) {
        return seizureRepo.save(result);
    }

    @GetMapping("/all")
    public List<SeizureResult> getAllResults() {
        return seizureRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<SeizureResult> getResultsByUser(@PathVariable String userId) {
        return seizureRepo.findByUserId(userId);
    }
}
