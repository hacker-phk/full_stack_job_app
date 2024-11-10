import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useGetEmployee(url) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const reFetch= async() => {
        try {
            const res = await axios.get("http://localhost:5000/employee", { withCredentials: true });
            console.log(res.data);
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get("http://localhost:5000/employee", { withCredentials: true });
                console.log(res.data);
                setData(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [url]);

    return { data, loading , reFetch};
}

export default useGetEmployee;
