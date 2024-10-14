import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type SettingOption = 'Profile' | 'Account' | 'Dashboard' | 'Logout';
const settings: SettingOption[] = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function SettingsMenu() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Add navigation or logic here
    const handleSettingAction = (setting: SettingOption) => {
        switch (setting) {
            case 'Profile':
                console.log('Navigating to Profile');
                break;
            case 'Account':
                console.log('Navigating to Account');
                break;
            case 'Dashboard':
                console.log('Navigating to Dashboard');
                break;
            case 'Logout':
                console.log('Logging out');
                break;
            default:
                console.warn('Unhandled setting action');
        }
        handleCloseUserMenu();
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map(setting => (
                    <MenuItem key={setting} onClick={() => handleSettingAction(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
