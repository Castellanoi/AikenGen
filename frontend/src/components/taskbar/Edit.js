import React from 'react';
import { Button, MenuItem, MenuList, Paper, Popper, Fade, ClickAwayListener, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SearchIcon from '@mui/icons-material/Search';
import FindReplaceIcon from '@mui/icons-material/FindReplace';

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
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <UndoIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Deshacer
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      Ctrl+Z
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <RedoIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Rehacer
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+Shift+Z 
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <ContentCutIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Cortar
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+X
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <ContentCopyIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Copiar
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+C
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <ContentPasteIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Pegar
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+V
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <SearchIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Buscar
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+F
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onMenuClose}>
                    <ListItemIcon>
                      <FindReplaceIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      Reemplazar
                    </ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Ctrl+H
                    </Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
