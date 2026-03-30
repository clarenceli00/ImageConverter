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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>('JPG');
  const [loading, setLoading] = useState(false);

  // 1. Centralized API URL from Environment Variables
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const handleConvert = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('format', format.toLowerCase());

    try {
      // 2. Updated call to use the Dynamic URL
      const response = await axios.post(`${API_BASE_URL}/api/convert`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `converted-image.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();

      // 3. Clean up the URL object to free memory
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Conversion failed", error);
      alert("Failed to connect to the backend.");
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

          <FileDropZone
            onFileSelect={(file) => setSelectedFile(file)}
            currentFile={selectedFile}
          />

          <Divider />

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