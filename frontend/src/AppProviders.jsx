import { BrowserRouter } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme";

const AppProviders = ({ children }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
    </ThemeProvider>
);

export default AppProviders;
