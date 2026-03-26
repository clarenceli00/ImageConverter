import { Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}

export function FileDropZone({ onFileSelect, currentFile }: FileDropZoneProps) {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Send the file up to the parent
      onFileSelect(acceptedFiles[0]); 
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: false 
  });

  return (
    <Paper
      {...getRootProps()}
      elevation={0}
      sx={{
        p: 4,
        border: '2px dashed',
        borderRadius: 4,
        borderColor: isDragActive ? 'primary.main' : 'grey.400',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        textAlign: 'center',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'grey.50',
        },
      }}
    >
      <input {...getInputProps()} />
      
      {/* Use 'currentFile' from PROPS, not local state */}
      {currentFile ? (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: 'success.main' }} />
          <Typography variant="h6" color="success.main">
            File Selected:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            {currentFile.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {(currentFile.size / 1024).toFixed(2)} KB
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, textDecoration: 'underline' }}>
            Click or drag to replace
          </Typography>
        </>
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: 'text.secondary' }} />
          <Typography variant="h6">
            {isDragActive ? "Drop File" : "Drag and drop a file"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Types Supported: JPG, PNG, BMP, GIF
          </Typography>
        </>
      )}
    </Paper>
  );
}