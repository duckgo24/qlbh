// Layout component
import { Box } from "@mui/material";
import Footer from "./footer";
import Header from "./header";

function Layout({ children }) {
    return (
        <Box className=" bg-gray-200">
            <Box className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </Box>
        </Box>

    );
}

export default Layout;
