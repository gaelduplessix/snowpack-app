fetch('/api/hello.json')
  .then((res) => res.json())
  .then(
    (res) =>
      (document.getElementById('main').innerHTML = JSON.stringify(
        { res },
        null,
        4,
      )),
  );
