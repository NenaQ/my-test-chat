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
  const message = document.getElementById('message').value;
  db.ref('messages').push({ text: message, timestamp: Date.now() });
}

db.ref('messages').on('child_added', snapshot => {
  const msg = snapshot.val().text;
  const div = document.createElement('div');
  div.className = 'msg';
  div.textContent = msg;
  document.getElementById('chat').appendChild(div);
});
