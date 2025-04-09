const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const rulerX = document.getElementById('ruler-x');
    const rulerY = document.getElementById('ruler-y');
    const info = document.getElementById('info');
    const coordsBox = document.getElementById('coords');
    const markerSizeInput = document.getElementById('marker-size');

    let image = new Image();


    function loadImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        image.onload = () => {
          applySize();
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    document.getElementById('img-input').addEventListener('change', (e) => {
      if (e.target.files[0]) {
        loadImage(e.target.files[0]);
      }
    });

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'green';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = '#aaa';
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '#aaa';
      if (e.dataTransfer.files[0]) {
        loadImage(e.dataTransfer.files[0]);
      }
    });

    function applySize() {
      const w = parseInt(document.getElementById('img-width').value);
      const h = parseInt(document.getElementById('img-height').value);
      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(image, 0, 0, w, h);
      drawRulers(w, h);
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      info.textContent = `Mouse: (${x}, ${y})`;
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      const radius = parseInt(markerSizeInput.value);

      ctx.fillStyle = '#ff5e57';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      coordsBox.value += `var(${x},${y});`;
    });

    function clearCoords() {
        navigator.clipboard.writeText(coordsBox.value).then(() => {
          coordsBox.value = '';
        });
    }
    function copyCoords() {
      navigator.clipboard.writeText(coordsBox.value).then(() => {
        
      });
    }