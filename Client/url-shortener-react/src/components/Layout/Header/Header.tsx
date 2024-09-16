import {AppBar, Box, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import {styles} from "./styles";
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";

function Header() {
    const { user, logOut } = useAuth();

    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="default" sx={styles.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap sx={styles.toolbarTitle}>
                       Url shortener
                    </Typography>
                    <Link to="/">
                        <Button>
                            View Urls
                        </Button>
                    </Link>
                    <a href={`${process.env.REACT_APP_URL_REDIRECT_URL}/about`}>
                        <Button>
                            About
                        </Button>
                    </a>
                    {!user ?
                    <Box sx={styles.authBox}>
                         <Link to="/login">
                                    <Button color="primary" variant="outlined" sx={styles.authButton}>
                                        Login
                                    </Button>
                                </Link>
                            <Link to="/register">
                                <Button color="primary" variant="outlined" sx={styles.authButton}>
                                    Register
                                </Button>
                            </Link>
                    </Box>
                        :
                        <Box sx={styles.authBox}>
                        <Button onClick={logOut} color="primary" variant="outlined" sx={styles.authButton}>
                            Logout
                        </Button>
                        </Box>}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;