import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, TextField, Box, Divider, createTheme, ThemeProvider } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Taskbar from './Taskbar';
import { useTranslation } from 'react-i18next';

const navbar = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Navbar({ onToggleTheme, currentTheme, isWorkspace }) {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={navbar}>
      <AppBar position="fixed" color="string">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {isWorkspace ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    variant="standard"
                    label={t('menuName')}
                  />
                  <Divider orientation="vertical" sx={{ mx: 1 }} flexItem />
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Taskbar />
                </Box>
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
    </ThemeProvider>
  );
}

export default Navbar;
