export default function PostEvent() {
    fetch(`${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event:"test",
            date:"2025-05-07",
            time_from:"10:00",
            time_to:"17:00", 
            event_description:"testing event"
        }),
    }).then((response) => {
        if (response.ok) {
            console.log('Event posted successfully!');
            alert('Event posted successfully!');
        } else {
            console.error('Failed to post event.');
            alert('Failed to post event. Please try again later.');
        }
    }).catch((error) => {
        console.error('Error:', error);
        alert('Error posting event. Please try again later.');
    });
}