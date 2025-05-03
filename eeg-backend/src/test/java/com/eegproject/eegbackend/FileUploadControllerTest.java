package com.eegproject.eegbackend;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import com.eegproject.eegbackend.controller.FileUploadController; // Ensure this import matches the actual package of FileUploadController

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class FileUploadControllerTest {

    private FileUploadController fileUploadController;

    @BeforeEach
    void setUp() {
        fileUploadController = new FileUploadController();
    }

    @AfterEach
    void tearDown() {
        File uploadsDir = new File("uploads");
        if (uploadsDir.exists()) {
            deleteDirectory(uploadsDir);
        }
    }

    private void deleteDirectory(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    file.delete();
                }
            }
        }
        directory.delete();
    }

    @Test
    void testUploadEmotionFile_Success() throws IOException {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.mat", "application/octet-stream", "dummy content".getBytes()
        );

        MultipartFile spyFile = Mockito.spy(mockFile);
        doNothing().when(spyFile).transferTo(any(File.class));

        ResponseEntity<String> response = fileUploadController.uploadEmotionFile(spyFile);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody().contains("File uploaded successfully"));
    }

    @Test
    void testUploadLieFile_InvalidFileType() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.txt", "text/plain", "dummy content".getBytes()
        );

        ResponseEntity<String> response = fileUploadController.uploadLieFile(mockFile);

        assertNotNull(response);
        assertEquals(400, response.getStatusCode().value());
        assertTrue(response.getBody().contains("Invalid file type for lie detection"));
    }

    @Test
    void testUploadSeizureFile_EmptyFile() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "", "application/octet-stream", new byte[0]
        );

        ResponseEntity<String> response = fileUploadController.uploadSeizureFile(mockFile);

        assertNotNull(response);
        assertEquals(400, response.getStatusCode().value());
        assertTrue(response.getBody().contains("Please select a file to upload"));
    }

    @Test
    void testHandleFileUpload_DirectoryCreationFailure() {
        MultipartFile mockFile = Mockito.mock(MultipartFile.class);
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getOriginalFilename()).thenReturn("test.csv");

        FileUploadController controllerSpy = Mockito.spy(fileUploadController);

        File mockDir = Mockito.mock(File.class);
        doReturn(mockDir).when(controllerSpy).createFeatureDirectory(anyString());
        when(mockDir.exists()).thenReturn(false);
        when(mockDir.mkdirs()).thenReturn(false);

        ResponseEntity<String> response = controllerSpy.uploadLieFile(mockFile);

        assertNotNull(response);
        assertEquals(500, response.getStatusCode().value());
        assertTrue(response.getBody().contains("Could not create feature directory"));
    }
}
