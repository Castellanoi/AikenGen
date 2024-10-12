import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, TextField, Box, Divider, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Taskbar from './Taskbar';

function Navbar({ onToggleTheme, currentTheme, isWorkspace }) {
  return (
    <AppBar position="fixed" color="string">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {isWorkspace ? (
            <>
              <TextField
                variant="standard"
                label="Nombre del archivo"
              />

              <Divider orientation="vertical" sx={{ mx: 1 }} flexItem />

              <Taskbar />
            </>
          ) : (
            <Typography variant="h6">
              AikenGen
            </Typography>
          )}
        </Box>

        {/* Toggle para cambiar el tema */}
        <IconButton edge="end" color="inherit" onClick={onToggleTheme}>
          {currentTheme === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeIcon />}
        </IconButton>
        <Switch
          checked={currentTheme === 'dark'}
          onChange={onToggleTheme}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
