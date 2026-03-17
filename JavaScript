const API = 'http://localhost:3000';
let token = '';

async function loginAdmin() {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: 'admin', password: '1234'})
  });
  const data = await res.json();
  token = data.token;
  loadBookings();
}

async function loadBookings() {
  const res = await fetch(`${API}/bookings`, {
    headers: { Authorization: token }
  });
  const bookings = await res.json();
  document.getElementById('bookingList').innerHTML = bookings.map(b => `
    <div>${b.name} - ${b.service}</div>
  `).join('');
}
