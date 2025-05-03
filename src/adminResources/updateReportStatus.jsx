export default function updateReportStatus(id, statusN) {
    const link = `${import.meta.env.VITE_API_URL}/reports/` + id;
    alert('sending message...');
    const response = fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: statusN
        })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    alert('Status updated successfully');
    return response;
}