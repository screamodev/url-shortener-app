import Header from "./Header/Header";
import {styles} from "./styles";
import {Container} from "@mui/material";

type LayoutProps = {
    children?: React.ReactNode
}

function Layout({children}: LayoutProps) {

    return (
        <>
            <Header />
            <Container sx={styles.main}>
                {children}
            </Container>
        </>
    );
}


export default Layout;