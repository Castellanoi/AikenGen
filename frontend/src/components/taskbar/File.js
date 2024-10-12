import React from 'react';
import { Button, MenuItem, MenuList, Paper, Popper, Fade, ClickAwayListener, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

export default function File({ open, anchorEl, onMenuOpen, onMenuClose, onMenuHover, onKeyDown }) {
    const { t } = useTranslation();
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
                {t('menuFile')}
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
                                <MenuList id="file-menu" aria-labelledby="file-button" autoFocusItem={open} onKeyDown={onKeyDown}>
                                    <MenuItem onClick={onMenuClose}>
                                        <ListItemIcon>
                                            <AddBoxIcon fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('actNew')}
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                                            Ctrl+N
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={onMenuClose}>
                                        <ListItemIcon>
                                            <UploadFileIcon fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('actLoad')}
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                                            Ctrl+O
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={onMenuClose}>
                                        <ListItemIcon>
                                            <SaveIcon fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('actSave')}
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                                            Ctrl+S
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={onMenuClose}>
                                        <ListItemIcon>
                                            <SaveAsIcon fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('actSaveAs')}
                                        </ListItemText>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                                            Ctrl+Shift+S
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={onMenuClose}>
                                        <ListItemIcon>
                                            <CloseIcon fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t('actExit')}
                                        </ListItemText>
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
