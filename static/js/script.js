const parts = {
    head: ['Hoofd A', 'Hoofd B', 'Hoofd C'],
    body: ['Lichaam A', 'Lichaam B', 'Lichaam C'],
    legs: ['Benen A', 'Benen B', 'Benen C']
  };
  
  const indices = { head: 0, body: 0, legs: 0 };
  
  function changePart(part, direction) {
    indices[part] = (indices[part] + direction + parts[part].length) % parts[part].length;
    document.getElementById(part).textContent = parts[part][indices[part]];
  }
  
  function randomize() {
    for (let part in parts) {
      indices[part] = Math.floor(Math.random() * parts[part].length);
      document.getElementById(part).textContent = parts[part][indices[part]];
    }
  }
  
  document.getElementById('info').addEventListener('click', function() {
    alert('Dit project verzamelt tekeningen van leraren en splitst ze op in hoofd, lichaam en benen. Je kunt ze mixen voor grappige combinaties!');
  });
  