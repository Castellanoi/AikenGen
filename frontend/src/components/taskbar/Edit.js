import React from 'react';
import { Button, MenuItem, MenuList, Paper, Popper, Fade, ClickAwayListener } from '@mui/material';

export default function Edit({ open, anchorEl, onMenuOpen, onMenuClose, onMenuHover, onKeyDown }) {
  return (
    <>
      <Button
        aria-controls={open ? 'edit-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onMenuOpen}
        onMouseEnter={onMenuHover}
        color="inherit"
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        Editar
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
                <MenuList id="edit-menu" aria-labelledby="edit-button" autoFocusItem={open} onKeyDown={onKeyDown}>
                  <MenuItem onClick={onMenuClose}>Copiar</MenuItem>
                  <MenuItem onClick={onMenuClose}>Pegar</MenuItem>
                  <MenuItem onClick={onMenuClose}>Cortar</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
