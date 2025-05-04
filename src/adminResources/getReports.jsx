async function getReports() {
    
    const response =await fetch(`${import.meta.env.VITE_API_URL}/reports`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const reports = await response.json();
    return reports;

}

export default getReports;