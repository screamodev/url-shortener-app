const URL_SHORTENER_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/urlshortener`;

export const fetchAllUrls = async () => {
    try {
        const response = await fetch(URL_SHORTENER_BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch URLs');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchUrlById = async (id: number) => {
    try {
        const response = await fetch(`${URL_SHORTENER_BASE_URL}/details/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch URLs');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUrl = async (id: number, token: string) => {
    try {
        const response = await fetch(`${URL_SHORTENER_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete URL');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const shortenUrl = async (originalUrl: string, token?: string) => {
    try {
        const response = await fetch(URL_SHORTENER_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(originalUrl)
        });
        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
