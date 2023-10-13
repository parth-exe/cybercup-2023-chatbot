import React, { useContext, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import { InputBase } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
const Icons = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display='flex' mt={2}
        ml={160}>
            <IconButton onClick={colorMode.toggleColorMode} disableRipple>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeRoundedIcon />
                ) : (
                    <LightModeRoundedIcon />
                )}
            </IconButton>
            

            <IconButton disableElevation disableRipple>
                <Person2RoundedIcon />
            </IconButton>

            <IconButton disableRipple>
                <SettingsRoundedIcon />
            </IconButton>

            <IconButton disableRipple>
                <LogoutRoundedIcon />
            </IconButton>
    </Box>
    );
};

export default Icons;
