import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../hooks/useAuth";
import { deleteUrl, fetchAllUrls, shortenUrl } from "../../api/urlShortener/urlShortenerApi";
import {Link} from "react-router-dom";

type ShortUrl = {
    id: number;
    originalUrl: string;
    shortenedUrl: string;
    createdBy: string;
    createdDate: string;
    userId: string;
};

const Dashboard: React.FC = () => {
    const [urls, setUrls] = useState<ShortUrl[]>([]);
    const [newUrl, setNewUrl] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { user, token } = useAuth();

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const data = await fetchAllUrls();
            setUrls(data);
        } catch (error) {
            console.error('Failed to fetch URLs');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            if (token) {
                await deleteUrl(id, token);
                fetchUrls();
            } else {
                throw new Error("Bearer token doesn't exist.");
            }
        } catch (error) {
            console.error('Failed to delete URL');
        }
    };

    const handleShortenUrl = async () => {
        try {
            if (token) {
                await shortenUrl(newUrl, token);
                setNewUrl('');
                setErrorMessage(null);
                fetchUrls();
            } else {
                throw new Error("Bearer token doesn't exist.");
            }
        } catch (error) {
            setErrorMessage('This URL already exists or an error occurred.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    All Shortened URLs
                </Typography>

                {user && (
                    <>
                        <Box display="flex" gap={2} marginBottom={4}>
                            <TextField
                                fullWidth
                                label="Enter URL to shorten"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                variant="outlined"
                            />
                            <Button variant="contained" color="primary" onClick={handleShortenUrl}>
                                Shorten URL
                            </Button>
                        </Box>
                        {errorMessage && (
                            <Alert severity="error" sx={{ mb: 4 }}>
                                {errorMessage}
                            </Alert>
                        )}
                    </>
                )}
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Original URL</TableCell>
                        <TableCell>Shortened URL</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {urls.map((url) => (
                        <TableRow key={url.id}>
                            <TableCell>{url.originalUrl}</TableCell>
                            <TableCell>
                                <Link to={`/urlDetails/${url.id}`}>
                                    {url.shortenedUrl}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {(user?.role === 'Admin' || user?.id === url.userId) && (
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => handleDelete(url.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Dashboard;
