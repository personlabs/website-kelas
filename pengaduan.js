/* Extracted page-specific JavaScript for pengaduan.html. */

const form = document.getElementById('complaintForm');
    const formContainer = document.getElementById('formContainer');
    const thankYouContainer = document.getElementById('thankYouContainer');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let reporterNameInput = document.getElementById('reporterName').value.trim();
        const isAnonymous = document.getElementById('isAnonymous').checked;
        
        let reporterName = (isAnonymous || reporterNameInput === '') ? 'Anonim (Dirahasiakan)' : reporterNameInput;
        let category = document.getElementById('category').value;
        let fullMessage = document.getElementById('fullMessage').value;
        
        let now = new Date();
        let timeSent = now.toLocaleString('id-ID', { 
            dateStyle: 'full', 
            timeStyle: 'medium' 
        });

        // Ubah tombol jadi status loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

        // Gunakan FormData untuk mengirim data secara stabil ke Formspree
        const formData = new FormData();
        formData.append('Nama_Pengirim', reporterName);
        formData.append('Kategori', category);
        formData.append('Isi_Saran', fullMessage);
        formData.append('Tanggal_Kirim', timeSent);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formContainer.style.display = 'none';
                thankYouContainer.style.display = 'block';
                form.reset();
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        alert('Gagal: ' + data.errors.map(err => err.message).join(', '));
                    } else {
                        alert('Gagal mengirim saran, silakan coba lagi.');
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Saran';
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan jaringan atau koneksi.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Saran';
        });
    });

(function () {
  const nameInput = document.getElementById('reporterName');
  const anonymousInput = document.getElementById('isAnonymous');
  const messageInput = document.getElementById('fullMessage');
  const count = document.getElementById('charCount');
  const newSuggestionButton = document.getElementById('newSuggestionBtn');

  function syncAnonymousState() {
    if (!nameInput || !anonymousInput) return;
    nameInput.disabled = anonymousInput.checked;
    if (anonymousInput.checked) nameInput.value = '';
  }

  if (anonymousInput) anonymousInput.addEventListener('change', syncAnonymousState);
  if (messageInput && count) {
    messageInput.addEventListener('input', function () { count.textContent = String(messageInput.value.length); });
  }
  if (newSuggestionButton) {
    newSuggestionButton.addEventListener('click', function () { window.location.reload(); });
  }
  syncAnonymousState();
})();
