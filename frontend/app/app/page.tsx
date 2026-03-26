"use client"
import React, { useState } from 'react';
import { Container, Stack, Typography, Divider, Paper } from '@mui/material';
import { FileDropZone } from './FileUpload'; 
import FileTypeSelect from './FileTypeSelect';
import dynamic from 'next/dynamic';
import axios from 'axios';
const ConvertButton = dynamic(() => import('./ConvertButton'), { 
  ssr: false 
});
const MyFilePage: React.FC = () => {
  // 1. Centralized State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>('JPG');
  const [loading, setLoading] = useState(false);

  // 2. The Conversion Logic
  const handleConvert = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('format', format.toLowerCase());

    try {
      const response = await axios.post('http://localhost:8080/api/convert', formData, {
        responseType: 'blob',
      });

      // Auto-download the result
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `converted-image.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Conversion failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Image Conversion</Typography>
        <Stack spacing={2}>
          <Divider />
          
          {/* 3. Pass props to children */}
          <FileDropZone 
  onFileSelect={(file) => setSelectedFile(file)} 
  currentFile={selectedFile} 
/>
          
          <Divider/>

          <FileTypeSelect 
            value={format} 
            onChange={(newFormat) => setFormat(newFormat)} 
          />

          <ConvertButton 
            onClick={handleConvert} 
            disabled={!selectedFile || loading}
            loading={loading}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default MyFilePage;
