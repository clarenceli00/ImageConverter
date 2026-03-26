import React from 'react'; // Removed useState
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// Define the interface for TypeScript
interface FileTypeSelectProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function FileTypeSelect({ value, onChange }: FileTypeSelectProps) {
  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="file-type-select-label">Format</InputLabel>
      <Select
        labelId="file-type-select-label"
        id="file-type-select"
        label="Format"
        value={value} // Controlled by parent prop
        onChange={(e) => onChange(e.target.value)} // Calls parent function
      >
        <MenuItem value="JPG">
          <ListItemIcon><ImageIcon fontSize="small" /></ListItemIcon>
          <ListItemText>JPG</ListItemText>
        </MenuItem>
        <MenuItem value="BMP">
          <ListItemIcon><ImageIcon fontSize="small" /></ListItemIcon>
          <ListItemText>BMP</ListItemText>
        </MenuItem>
        <MenuItem value="PNG">
          <ListItemIcon><PhotoLibraryIcon fontSize="small" /></ListItemIcon>
          <ListItemText>PNG</ListItemText>
        </MenuItem>
        <MenuItem value="GIF">
          <ListItemIcon><GifIcon fontSize="small" /></ListItemIcon>
          <ListItemText>GIF</ListItemText>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
