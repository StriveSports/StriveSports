async function getEvents() {
    fetch(`${import.meta.env.VITE_API_URL}/events`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (response.ok) {
            alert('Events fetched successfully');
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
}

export default getEvents;