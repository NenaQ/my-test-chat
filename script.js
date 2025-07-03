const firebaseConfig = {
  apiKey: "AIzaSyD1K5SeKGVGF036SgSw1fLFoOMEIQoF7jM",
  authDomain: "my-test-chat-1.firebaseapp.com",
  databaseURL: "https://my-test-chat-1-default-rtdb.firebaseio.com",
  projectId: "my-test-chat-1",
  storageBucket: "my-test-chat-1.firebasestorage.app",
  messagingSenderId: "179182654810",
  appId: "1:179182654810:web:06b5c60bcf4d8246dc0f63",
  measurementId: "G-DGFMBR9Z0V"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


function sendMessage() {
  const input = document.getElementById('message');
  const text = input.value.trim();
  
  if (text !== "") {
    db.ref('messages').push({
      text: text,
      timestamp: Date.now()
    });
    input.value = ""; 
    input.focus();   
  }
}


document.getElementById('message').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});


db.ref('messages').on('child_added', snapshot => {
  const data = snapshot.val();
  function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const msgDate = new Date(date);
  const msgDay = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());

  if (msgDay.getTime() === today.getTime()) {
    return 'сегодня';
  } else if (msgDay.getTime() === yesterday.getTime()) {
    return 'вчера';
  } else {
   
    const day = String(msgDate.getDate()).padStart(2, '0');
    const month = String(msgDate.getMonth() + 1).padStart(2, '0'); 
    const year = msgDate.getFullYear();
    return `${day}.${month}.${year}`;
  }
}

const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const dateLabel = formatDate(data.timestamp);

  const chat = document.getElementById('chat');

  const msgDiv = document.createElement('div');
  msgDiv.className = 'message';

  msgDiv.innerHTML = `
  <div class="msg-text">${data.text}</div>
  <div class="msg-time">${dateLabel} в ${time}</div>
  `;  

  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight; 
});
