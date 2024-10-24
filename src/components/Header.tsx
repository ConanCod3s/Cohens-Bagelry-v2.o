import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Drawer,
    IconButton,
    Popover,
    Stack,
    Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { header } from '../theme/Base';
import getPages from '../router/GetPages';
import LoginContainer from './LoginContainer';
import { useUser } from '../services/providers/User';
import { useSnackbar } from 'notistack';

const Header = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { userInfo } = useUser();
    const pages = getPages();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        // Event listener for window resize
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDrawerToggle = (open: boolean) => {
        setDrawerOpen(open);
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => setAnchorEl(null);

    const handleNavigation = (path: string) => {
        if (path.includes('History')) {
            if (userInfo?.uid) {
                path = `/Order/${userInfo?.uid}/History`;
            } else {
                enqueueSnackbar(
                    'There is an issue loading your history.',
                    { variant: 'warning' }
                );
                return;
            }
        }

        navigate(path.replace(' ', ''));
        if (drawerOpen) setDrawerOpen(false);
    };

    // Function to render navigation buttons
    const renderNavButtons = () => (
        pages.map((page, sakuin) => {
            if (page.path === '/' || page.showOnlyOnMenu) return null;
            return (
                <Button
                    key={page.path + '' + sakuin}
                    onClick={() => handleNavigation(page.path)}
                    sx={(theme) => ({ my: 2, color: theme.palette.primary.dark })}>
                    {page.path.replace('/', '')}
                </Button>
            );
        })
    );

    return (
        <AppBar position='sticky' sx={{ height: header }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Button sx={{ color: 'white' }} onClick={() => navigate('/')}>
                    <Stack>
                        <Typography
                            variant='h6'
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Cohen's Bagelry
                        </Typography>
                        <Typography
                            variant='caption'
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            "That Bagel Place"
                        </Typography>
                    </Stack>
                </Button>

                {/* Navigation and Profile Options */}
                {windowWidth > 600 ? (
                    <Fragment>
                        <Box sx={{ flexGrow: 1 }}>
                            {renderNavButtons()}
                        </Box>
                        <Box>
                            <IconButton onClick={handlePopoverOpen} sx={{ alignContent: 'center' }}>
                                <AccountCircleIcon />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Stack direction={'column'} spacing={1} sx={{ p: 2 }}>
                                    {userInfo && (
                                        <Button onClick={() => handleNavigation('History')}>
                                            Order History
                                        </Button>
                                    )}
                                    <LoginContainer />
                                </Stack>
                            </Popover>
                        </Box>
                    </Fragment>
                ) : (
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={() => handleDrawerToggle(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>

            {/* Drawer for Small Screens */}
            <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={() => handleDrawerToggle(false)}
                sx={{ '& .MuiDrawer-paper': { width: '250px', padding: 2 } }}>
                <Grid container direction='column' justifyContent='space-between' height='100%'>
                    <Grid item >
                        <Stack>
                            {renderNavButtons()}
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction='column' spacing={1} sx={{ p: 2 }}>
                            {userInfo && (
                                <Button onClick={() => handleNavigation('History')}>
                                    Order History
                                </Button>
                            )}
                            <LoginContainer />
                        </Stack>
                    </Grid>
                </Grid>
            </Drawer>
        </AppBar>
    );
};

export default Header;
