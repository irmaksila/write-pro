import {Check, Delete, Send} from "@mui/icons-material"
import createCache from "@emotion/cache"
import {CacheProvider} from "@emotion/react"
import {
    Box, Button, Container, CssBaseline, Divider, Grid, Paper,
    Skeleton, Stack, TextField, Typography
} from "@mui/material"
import type {
    PlasmoCSConfig,
    PlasmoGetOverlayAnchor,
    PlasmoGetOverlayAnchorList,
    PlasmoWatchOverlayAnchor
} from "plasmo"
import {GptService} from "../services/gpt.service";
import React = require("react")
import {useEffect} from "react";


const styleElement = document.createElement("style")

const styleCache = createCache({
    key: "plasmo-mui-cache",
    prepend: true,
    container: styleElement
})
export const getStyle = () => styleElement

export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"],
    all_frames: true
}
export const getInlineAnchor: PlasmoGetOverlayAnchor = async () =>
    document.querySelector('#wp-after-selection-child')

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
    updatePosition
) => {
    const interval = setInterval(() => {
        updatePosition()
    }, 500)

    // Clear the interval when unmounted
    return () => {
        clearInterval(interval)
    }
}

const PlasmoOverlay = ({anchor}) => {
    const gptService = new GptService();

    const [sentRephrasePrompt, setSentRephrasePrompt] = React.useState(false);
    const [sentGrammarPrompt, setSentGrammarPrompt] = React.useState(false);
    const [selected, setSelected] = React.useState('');
    const [rephraseResponse, setRephraseResponse] = React.useState(null);
    const [grammarResponse, setGrammarResponse] = React.useState(null);
    const [response, setResponse] = React.useState(null);

    useEffect(() => {
        setGrammarResponse(response);
        setRephraseResponse(response)
    }, [response])

    console.log(anchor.element)

    const handleRephrase = () => {
        setSentRephrasePrompt(true)
        setSelected(document.getSelection().toString());
        const pro = 'Rephrase this text adn return me only the new text:' + document.getSelection().toString()
        gptService.sendPrompt(pro).then(res => {
            console.log(res)
            setResponse(res)
        }).catch(console.error).finally(() =>
            setRephraseResponse(false)
        );
    };

    const handleGrammarCheck = () => {
        setSentGrammarPrompt(true)
        setSelected(document.getSelection().toString());
        const pro = 'Fix the grammar mistakes on this text and return me only the new text:' + document.getSelection().toString()
        gptService.sendPrompt(pro).then(res => {
            console.log(res)
            setResponse(res)
        }).catch(console.error).finally(() =>
            setSentGrammarPrompt(false)
        );
    };


    return (
        <CacheProvider value={styleCache}>
            <Stack>
                <Container component="main">
                    <CssBaseline/>
                    <Box sx={{background: 'white', p: 2}}>
                        <Button variant="outlined" onClick={handleRephrase}>
                            Rephrase
                        </Button>
                        <Button variant="contained" endIcon={<Check/>}
                                onClick={handleGrammarCheck}>
                            Grammar
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '30rem',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                        }}
                    >
                        {sentRephrasePrompt ? <>
                                <TextField
                                    id="outlined-textarea"
                                    label="Your Text"
                                    placeholder="Placeholder"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={selected}
                                />
                                <Divider orientation="vertical" flexItem/>
                                <>{rephraseResponse ? <TextField
                                        id="filled-textarea"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={rephraseResponse}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setRephraseResponse(event.target.value);
                                        }}
                                    /> :
                                    <Skeleton height={120} width={400}
                                              variant="rounded"/>}</>
                            </> :
                            null
                        }
                        {sentGrammarPrompt ? <><TextField
                                id="outlined-textarea"
                                label="Multiline Placeholder"
                                placeholder="Placeholder"
                                fullWidth
                                multiline
                                rows={4}
                                value={selected}
                            />
                                <Divider orientation="vertical" flexItem/>
                                <div>{grammarResponse ? <TextField
                                        id="filled-textarea"
                                        label="Response"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        value={grammarResponse}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setGrammarResponse(event.target.value);
                                        }}
                                    /> :
                                    <Skeleton height={120} width={400}
                                              variant="rounded"/>
                                }</div>
                            </> :
                            null
                        }
                    </Box>
                </Container>
            </Stack>
        </CacheProvider>
    )
}

export default PlasmoOverlay