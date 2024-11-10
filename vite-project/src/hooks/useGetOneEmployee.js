import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useGetOneEmployee(url) {
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function GetData() {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data); // Ensure only the data is set
            } catch (err) {
                setError(err); // Catch and set any errors
            } finally {
                setLoading(false); // End loading
            }
        }
        GetData();
    }, [url]); // Add `url` as a dependency

    return { loading, data, error };
}

export default useGetOneEmployee;
