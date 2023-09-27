import {
    AppBar,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    Link,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography
} from "@mui/material"
import {Copyright, LockOutlined, Menu, Settings} from '@mui/icons-material';
import {useState} from "react"
import React from "react"
import Translator from "./translator";
import GrammarChecker from "./grammar-checker";
import AI from "./ai";
import {GptService} from "~services/gpt.service";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function IndexPopup() {
    const gptService = new GptService();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Stack minWidth={350} minHeight={500}>
                <Container component="main" sx={{
                    minWidth: 300,
                    padding: 'unset',
                }}>
                    <CssBaseline/>
                    <Box sx={{flexGrow: 1, width: '100%'}}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" component="div"
                                            sx={{flexGrow: 1}}>
                                    WritePro
                                </Typography>
                                <IconButton
                                    color="inherit"
                                    size="large"
                                    aria-label="settings"
                                    sx={{ml: 2}}
                                >
                                    <Settings/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange}
                              aria-label="basic tabs example"
                              variant="scrollable"
                              scrollButtons={true}
                              allowScrollButtonsMobile
                        >
                            <Tab label="AI" {...a11yProps(0)} />
                            <Tab label="grammar check" {...a11yProps(1)} />
                            <Tab label="Translate" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <Box>
                        <CustomTabPanel value={value} index={0}>
                            <AI/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <GrammarChecker/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Translator/>
                        </CustomTabPanel>
                    </Box>
                </Container>
            </Stack>
        </>
    )
}

export default IndexPopup