package com.fileconverter.app.Service;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

@Service
public class FileUtil {

    public byte[] convert(String format, InputStream inputStream) {
        try (inputStream; 
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            BufferedImage inputImage = ImageIO.read(inputStream);
            boolean BMPorJPG = format.equalsIgnoreCase("jpg") || format.equalsIgnoreCase("jpeg") || format.equalsIgnoreCase("bmp");
            if (BMPorJPG) {
            // Create a new blank image with NO transparency (RGB)
            BufferedImage rgbImage = new BufferedImage(
                inputImage.getWidth(), 
                inputImage.getHeight(), 
                BufferedImage.TYPE_INT_RGB
                );

                // Paint the original image onto the new one with a WHITE background
                // (Otherwise, transparent areas turn black by default)
                Graphics2D g = rgbImage.createGraphics();
                g.drawImage(inputImage, 0, 0, Color.WHITE, null);
                g.dispose();
                inputImage = rgbImage;
            }
            if (inputImage == null) {
                throw new IOException("Could not read image from the input stream.");
            }
            
            boolean success = ImageIO.write(inputImage, format, outputStream);
            
            if (!success) {
                throw new IOException("Image could not be converted to: " + format);
            }
            
            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }
}
