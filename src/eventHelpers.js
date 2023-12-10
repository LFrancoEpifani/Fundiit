export const fetchEvents = () => {
  return fetch("http://localhost:4000/events")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

export const deleteEvent = (id) => {
  return fetch(`http://localhost:4000/events/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(() => id)
  .catch((error) => {
    console.error('Error deleting event:', error);
    throw error; // Propagate the error to handle it in the component
  });
};

export const addEvent = (formData) => {
  return fetch(`http://localhost:4000/events/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error adding event:', error);
    throw error; // Propagate the error to handle it in the component
  });
};