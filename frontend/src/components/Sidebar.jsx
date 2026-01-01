import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router";

const drawerWidth = 240;

const Sidebar = () => {
    const drawerLinks = [
        { text: "Products", link: "/products", icon: <InventoryIcon /> },
        { text: "Analytics", link: "/analytics", icon: <DashboardIcon /> },
        { text: "User", link: "/user", icon: <CategoryIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "background.secondary",
                },
            }}
        >
            <Toolbar />
            <List sx={{ p: 2, pt: 5 }}>
                {drawerLinks.map(({ text, link, icon }) => (
                    <ListItem key={link} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={link}
                            sx={{
                                borderRadius: 3,
                                "&.active": {
                                    bgcolor: "action.selected",
                                },
                            }}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
