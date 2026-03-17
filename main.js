async function submitBooking(e) {
  e.preventDefault();
  const booking = {
    name: document.getElementById('name').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
  };
  await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking),
  });
  alert('Booking submitted!');
}
