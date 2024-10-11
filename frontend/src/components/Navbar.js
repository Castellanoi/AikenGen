import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function Navbar({ onToggleTheme, currentTheme }) {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* Nombre de la App a la izquierda */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AikenGen
        </Typography>

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
