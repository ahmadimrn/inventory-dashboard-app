import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: "#828693ff",
        },

        secondary: {
            main: "#f6ececff",
        },

        background: {
            default: "#2a2a2a",
            secondary: "#1a1a1a",
            navbar: "#0a0a0aff",
        },

        divider: "#3e3d3dff",

        text: {
            primary: "#e0e0e0",
            secondary: "#b1b1b1ff",
        },
    },

    typography: {
        fontFamily: "Poppins, Arial, sans-serif",
    },
});

export default theme;
