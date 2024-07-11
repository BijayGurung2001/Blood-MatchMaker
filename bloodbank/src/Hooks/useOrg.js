import { useEffect, useState } from "react";

function useOrg(url){
    const[orgData, setOrgData]=useState([])
    useEffect(()=>{
        const fetchdata=async()=>{
            try {
                const res=await fetch(url);
                const data=res.json();
     
                setOrgData(data)
            } catch (error) {
                console.log(error)
            }
          
        }
        fetchdata()
    },[url])
    return {orgData}
}
export {useOrg}