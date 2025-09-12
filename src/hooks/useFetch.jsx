import { useEffect, useState } from "react";

export function useFetch(url){
    const [data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const controller = new AbortController();

        const getData = async(url)=>{
            try{
                const res = await fetch(url, { signal: controller.signal });

                if(!res.ok){
                    // controlamos 404 específicamente
                    const customError = {
                        err: true,
                        status: res.status,
                        statusText: res.status === 404 ? 'Not Found' : res.statusText || 'Ocurrió un error'
                    };
                    setData(null);
                    setPending(false);
                    return setError(customError); // ya atrapado, no se propaga
                }

                const json = await res.json();
                setData(json);
                setPending(false);
                setError({ err:false });
            }catch(err){
                if(err.name !== "AbortError"){ // ignoramos abortos
                    setData(null);
                    setPending(false);
                    setError({ err:true, status: null, statusText: err.message || 'Error' });
                }
            }
        }

        if(url) getData(url);

        return () => controller.abort();
    },[url]);

    return {data,isPending,error};
}
