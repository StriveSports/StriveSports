export default async function updateReportStatus(id, statusN,message) {
    if (!message){
        message = '';
    }

    const link = `${import.meta.env.VITE_API_URL}/reports/` + id;
    const response =fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: statusN,
            message: message
        })
    }).then((response) => {
        if (!response.ok) {
            alert('Network response was not ok' + response.statusText);
            return;
        }
        alert('Status updated successfully!');
        return;
    })
}