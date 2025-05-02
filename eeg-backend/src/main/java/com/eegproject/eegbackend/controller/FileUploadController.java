package com.eegproject.eegbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/eeg")
@CrossOrigin // Enables CORS – useful when connecting from your React frontend
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
    private final String UPLOAD_DIR = "uploads/";

    /**
     * Endpoint to handle file uploads.
     * URL: /api/eeg/upload
     *
     * @param file the file to be uploaded
     * @return a response with a message indicating success or failure
     */
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        logger.info("Received file upload request.");

        if (file.isEmpty()) {
            logger.warn("Upload failed: No file selected.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            // Ensure the upload directory exists; create if not
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                boolean created = uploadDir.mkdirs();
                if (created) {
                    logger.info("Created upload directory: {}", UPLOAD_DIR);
                } else {
                    logger.error("Failed to create upload directory.");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Could not create upload directory.");
                }
            }

            // Save the file
            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            File destFile = new File(filePath);
            file.transferTo(destFile);

            logger.info("File uploaded successfully: {}", filePath);
            return ResponseEntity.ok("File uploaded successfully: " + filePath);

        } catch (IOException e) {
            logger.error("Error uploading file: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + e.getMessage());
        }
    }
}
