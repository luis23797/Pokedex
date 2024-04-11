import { useEffect, useState } from "react";

export function useFetch(url){
    const [data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const getData = async(url)=>{
            try{
                const res = await fetch(url);
                if(!res.ok){
                    throw{
                        err:true,
                        status:res.status,
                        statusText:!res.statusText? 'Ocurrio un error':res.statusText,
                    }
                }
                let data = await res.json();
                setPending(false);
                setData(data);
                setError({err:false});
            }catch(error){
              setPending(false);
              setError(error);  
            }
        }
        getData(url);
    },[url])
    return {data,isPending,error};
}