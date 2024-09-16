import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {deleteUrl, fetchUrlById} from '../../api/urlShortener/urlShortenerApi';
import { useAuth } from "../../hooks/useAuth";
import {ShortUrlModel} from "../../config/types/types";

const UrlDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [urlDetails, setUrlDetails] = useState<ShortUrlModel | null>(null);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUrlDetails(Number(id));
        }
    }, [id]);

    const fetchUrlDetails = async (urlId: number) => {
        try {
            const data = await fetchUrlById(urlId);
            setUrlDetails(data);
        } catch (error) {
            console.error('Failed to fetch URL details');
        }
    };

    const handleDelete = async () => {
        try {
            if (urlDetails && token) {
                await deleteUrl(urlDetails.id, token);
                navigate('/');
            } else {
                throw new Error("Bearer token doesn't exist.");
            }
        } catch (error) {
            console.error('Failed to delete URL');
        }
    };

    if (!urlDetails) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    URL Details
                </Typography>

                <Typography variant="body1" gutterBottom>
                    <strong>Original URL:</strong> <a href={urlDetails.originalUrl} target="_blank" rel="noopener noreferrer">{urlDetails.originalUrl}</a>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Shortened URL:</strong> <a href={`${process.env.REACT_APP_URL_REDIRECT_URL}/${urlDetails.shortenedUrl}`} target="_blank" rel="noopener noreferrer">{urlDetails.shortenedUrl}</a>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Created By:</strong> {urlDetails.userId}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Created Date:</strong> {new Date(urlDetails.createdDate).toLocaleString()}
                </Typography>
                {(user?.role === 'Admin' || user?.id === urlDetails.userId) && (
                    <Box marginTop={4}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete URL
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default UrlDetails;
