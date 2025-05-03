package com.eegproject.eegbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("myapp/api/eeg")
@CrossOrigin // Enables CORS – useful when connecting from your React frontend
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
    private final String UPLOAD_DIR = "C:/Users/Asus/OneDrive/Desktop/minorweb/uploads/";

    private static final Map<String, List<String>> ALLOWED_FILE_TYPES = Map.of(
        "emotion", List.of(".mat", ".bdf"),
        "lie", List.of(".csv"),
        "seizure", List.of(".edf", ".csv", ".parquet")
    );

    private boolean isValidFileType(String feature, String fileName) {
        return ALLOWED_FILE_TYPES.getOrDefault(feature, List.of())
                .stream()
                .anyMatch(fileName::endsWith);
    }

    @PostMapping("/emotion/upload")
    public ResponseEntity<String> uploadEmotionFile(@RequestParam("file") MultipartFile file) {
        return handleFileUpload(file, "emotion");
    }

    @PostMapping("/lie/upload")
    public ResponseEntity<String> uploadLieFile(@RequestParam("file") MultipartFile file) {
        return handleFileUpload(file, "lie");
    }

    @PostMapping("/seizure/upload")
    public ResponseEntity<String> uploadSeizureFile(@RequestParam("file") MultipartFile file) {
        return handleFileUpload(file, "seizure");
    }

    private ResponseEntity<String> handleFileUpload(MultipartFile file, String feature) {
        logger.info("Received file upload request for feature: {}", feature);

        if (file.isEmpty()) {
            logger.warn("Upload failed: No file selected.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        if (!isValidFileType(feature, file.getOriginalFilename())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type for " + feature + " detection.");
        }

        try {
            // Ensure the upload directory exists; create if not
            String featureDirPath = UPLOAD_DIR + feature;
            logger.info("Attempting to create directory: {}", featureDirPath);
            File featureDir = createFeatureDirectory(featureDirPath);
            if (!featureDir.exists()) {
                logger.error("Failed to create feature directory: {}", featureDirPath);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Could not create feature directory.");
            }

            // Save the file
            String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = featureDirPath + "/" + uniqueFileName;
            File destFile = new File(filePath);
            file.transferTo(destFile);

            logger.info("File uploaded successfully for feature {}: {}", feature, filePath);
            return ResponseEntity.ok("{\"message\": \"File uploaded successfully\", \"path\": \"" + filePath + "\"}");

        } catch (IOException e) {
            logger.error("Error uploading file for feature {}: {}", feature, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file for feature " + feature + ": " + e.getMessage());
        }
    }

    // Add this method to the FileUploadController class
    public File createFeatureDirectory(String directoryName) {
        File directory = new File(directoryName);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (!created) {
                logger.error("Failed to create directory: {}", directoryName);
            }
        }
        return directory;
    }
}
