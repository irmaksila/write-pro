import {Box, Button, Skeleton, TextField, Typography} from "@mui/material";
import React from "react";

interface TranslatorProps {
    children?: React.ReactNode;
}

function Translator(props: TranslatorProps) {
    const {children} = props;
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <Box component="form" noValidate
             sx={{
                 mt: 1, display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
             }}>
            <TextField
                id="filled-textarea"
                label="Text"
                multiline
                fullWidth
                rows={5}
                variant="filled"
            />
            {/*<LoadingButton loading loadingIndicator="Loading…" variant="outlined">
                                    Send Prompt to AI
                            </LoadingButton>*/}
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Translate
            </Button>

            <Typography>{isLoading ?
                <Skeleton variant="rounded" height={120}
                          sx={{
                              mt: 3,
                              mb: 2
                          }}/> : 'h1'}</Typography>
        </Box>
    );
}

export default Translator;