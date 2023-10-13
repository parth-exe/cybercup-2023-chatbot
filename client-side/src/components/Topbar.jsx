import React, { useContext, useState, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import { InputBase } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './style.css';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            setAnswer(data.answer);

            const utterance = new SpeechSynthesisUtterance(data.answer);
            utterance.lang = 'en-UK';

            utterance.onstart = () => {
                setIsSpeaking(true);
            };

            utterance.onend = () => {
                setIsSpeaking(false);
            };

            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box display='flex' p={2}>
            <img src={isSpeaking ? 'https://i.imgur.com/1Kc0o0L.gif' : 'https://i.imgur.com/dpfu5ZN.png'} className="gif" alt="Image 1" />
            <Box
                display={'flex'}
                backgroundColor={colors.primary[400]}
                borderRadius={'20px'}
                mt={90}>
                <InputBase
                    sx={{
                        ml: 2,
                        flex: 1,
                        width: 1230,
                        p: 1,
                    }}
                    placeholder='Type your question'
                    value={question}
                    onChange={handleInputChange}
                />
                <IconButton onClick={handleSearch} disableRipple>
                    <SearchRoundedIcon />
                </IconButton>
            </Box>
            {answer && (
                <Box mt={69} ml={-157}>
                    <strong>Answer:</strong> {answer}
                </Box>
            )}
        </Box>
    );
};

export default Topbar;
