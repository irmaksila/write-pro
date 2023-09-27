import { LoadingButton } from "@mui/lab";
import {Box, Button, Skeleton, TextField, Typography} from "@mui/material";
import React from "react";
import { GptService } from "~services/gpt.service";


function GrammarChecker() {
    const gptService = new GptService()
    const [isLoading, setIsLoading] = React.useState(false);
    const [prompt, setPrompt] = React.useState('Write me a 200 words paragraphs about unicorns');
    const [response, setResponse] = React.useState(null);
    const handleClick = () => {
        setIsLoading(true)
        const pro = 'Fix the grammar mistakes on this text and return me only the new text:'+ prompt
        gptService.sendPrompt(pro).then(res => {
            setResponse(res)
        }).catch(console.error).finally(() =>
            setIsLoading(false)
        );
    }
    return (
        <Box
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
                rows={4}
                variant="filled"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPrompt(event.target.value);
                    console.log(prompt)
                }}
            />
            <LoadingButton loading={isLoading} loadingIndicator="Loading…"
                           variant="outlined" onClick={() => handleClick()}
                           sx={{mt: 3, mb: 2}}
            >
                Check grammar
            </LoadingButton>
            <Typography component="span">{isLoading ? <Skeleton height={120} width={300} sx={{maxWidth:'100%'}}
                                                                variant="rounded"/> : response}</Typography>

        </Box>
    );
}

export default GrammarChecker;