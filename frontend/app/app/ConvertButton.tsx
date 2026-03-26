"use client"
import React, { useState, useEffect } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import TransformIcon from '@mui/icons-material/Transform';

interface ConvertButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function ConvertButton({ onClick, disabled, loading }: ConvertButtonProps) {
  // 1. Add a mounted state
  const [isMounted, setIsMounted] = useState(false);

  // 2. Set to true only once we are in the browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. Don't render the dynamic parts until mounted
  if (!isMounted) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Button fullWidth variant="contained" size="large" disabled>
          Convert Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={onClick}
        disabled={disabled}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TransformIcon />}
        sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2, boxShadow: 'none' }}
      >
        {loading ? 'Converting...' : 'Convert Now'}
      </Button>
    </Box>
  );
}