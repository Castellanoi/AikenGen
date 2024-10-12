import React from 'react';
import { Button, MenuItem, MenuList, Paper, Popper, Fade, ClickAwayListener } from '@mui/material';

export default function File({ open, anchorEl, onMenuOpen, onMenuClose, onMenuHover }) {
  return (
    <>
      <Button
        aria-controls={open ? 'file-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onMenuOpen}
        onMouseEnter={onMenuHover}
        color="inherit"
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        Archivo
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={50}>
            <Paper>
              <ClickAwayListener onClickAway={onMenuClose}>
                <MenuList id="file-menu" aria-labelledby="file-button">
                  <MenuItem onClick={onMenuClose}>Nuevo</MenuItem>
                  <MenuItem onClick={onMenuClose}>Guardar</MenuItem>
                  <MenuItem onClick={onMenuClose}>Cargar</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
