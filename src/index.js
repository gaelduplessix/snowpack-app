fetch('/api/hello.json')
  .then((res) => res.json())
  .then(
    (res) =>
      (document.getElementById('api').innerHTML = JSON.stringify(
        { res },
        null,
        4,
      )),
  );

const webSocket = new WebSocket('wss://localhost:8080/ws');
webSocket.onerror = (err) => {
  console.error(err);
};
webSocket.onopen = () => {
  webSocket.send('Hello world');
};
webSocket.onmessage = (res) => {
  console.log('HERE!', res);
  document.getElementById('ws').innerHTML = JSON.stringify(res.data, null, 4);
};
