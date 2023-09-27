import {LoadingButton} from "@mui/lab";
import {Box, Button, Skeleton, TextField, Typography} from "@mui/material";
import React from "react";
import {GptService} from "~services/gpt.service";

function AI() {
    const gptService = new GptService()
    const [isLoading, setIsLoading] = React.useState(false);
    const [prompt, setPrompt] = React.useState('Write me a sentence with 10 words about unicorns');
    const [response, setResponse] = React.useState(null);
    const handleClick = () => {
        setIsLoading(true)
        console.log(prompt)
        gptService.sendPrompt(prompt).then(res => {
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
                label="Prompt"
                multiline
                fullWidth
                rows={4}
                defaultValue="Write me a sentence with 10 words about unicorns"
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
                Send Prompt to AI
            </LoadingButton>
            <Typography component="span">{isLoading ? <Skeleton height={120} width={300} sx={{maxWidth:'100%'}}
                                                            variant="rounded"/> : response}</Typography>

        </Box>
    );
}

export default AI;