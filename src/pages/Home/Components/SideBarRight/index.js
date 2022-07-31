import React, { useEffect, useState } from "react";
import { Divider, Stack } from "@mui/material";
import DesignBoard from "./DesignBoard";
import DevicesBoard from "./DevicesBoard";

import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import List from "@mui/material/List";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 300;

const openedMixin = (theme) => ({
  paddingTop: "80px",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  paddingTop: "80px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBarRight = ({ printComponentRef }) => {
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [tab, setTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleSelectTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    setOpenDrawer(isMediumScreen);
  }, [isMediumScreen]);

  return (
    <>
      <Drawer variant="permanent" open={openDrawer} anchor="right">
        {!openDrawer && (
          <IconButton
            onClick={handleOpenDrawer}
            style={{ position: "absolute", left: 0, bottom: "50%", zIndex: 2 }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        )}
        <Stack direction="row" alignItems="center" spacing={3}>
          {openDrawer && (
            <IconButton onClick={handleOpenDrawer}>
              <CloseSharpIcon />
            </IconButton>
          )}
          {openDrawer && (
            <Tabs value={tab} onChange={handleSelectTab} centered>
              <Tab label="Design" />
              <Tab label="Devices" />
            </Tabs>
          )}
        </Stack>

        {openDrawer && (
          <>
            <Divider />
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {tab === 0 ? (
                <DesignBoard printComponentRef={printComponentRef} />
              ) : (
                <DevicesBoard />
              )}
            </List>
          </>
        )}
      </Drawer>
    </>
  );
};

export default SideBarRight;
