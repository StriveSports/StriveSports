const getemails= async()=>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/useremails`);
    const data = await response.json();
    return data
}
export default getemails;