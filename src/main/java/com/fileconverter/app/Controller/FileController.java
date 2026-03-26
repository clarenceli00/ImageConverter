package com.fileconverter.app.Controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fileconverter.app.Service.FileUtil;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FileController {

    private final FileUtil imageService;

    // Constructor injection is the best practice
    public FileController(FileUtil imageService) {
        this.imageService = imageService;
    }

@PostMapping("/convert")
public ResponseEntity<byte[]> convert(
    @RequestParam("file") MultipartFile file, 
    @RequestParam("format") String format
) {
    try {
        // Pass the format (from select menu) and the file's input stream
        byte[] converted = imageService.convert(format, file.getInputStream());

        if (converted.length == 0) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=converted." + format)
                .contentType(MediaType.parseMediaType("image/" + format))
                .body(converted);
    } catch (IOException e) {
        return ResponseEntity.internalServerError().build();
    }
    }
}

