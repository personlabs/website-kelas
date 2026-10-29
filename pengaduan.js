(() => {
  'use strict';

  const form = document.getElementById('complaintForm');
  const formContainer = document.getElementById('formContainer');
  const thankYouContainer = document.getElementById('thankYouContainer');
  const submitBtn = document.getElementById('submitBtn');
  const nameInput = document.getElementById('reporterName');
  const anonymousInput = document.getElementById('isAnonymous');
  const messageInput = document.getElementById('fullMessage');
  const count = document.getElementById('charCount');
  const newSuggestionButton = document.getElementById('newSuggestionBtn');

  if (!form) return;

  const syncAnonymousState = () => {
    if (!nameInput || !anonymousInput) return;
    nameInput.disabled = anonymousInput.checked;
    if (anonymousInput.checked) nameInput.value = '';
  };

  anonymousInput?.addEventListener('change', syncAnonymousState);

  messageInput?.addEventListener('input', () => {
    if (count) count.textContent = String(messageInput.value.length);
  });

  newSuggestionButton?.addEventListener('click', () => window.location.reload());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const category = document.getElementById('category')?.value?.trim() || '';
    const fullMessage = messageInput?.value?.trim() || '';
    const reporterNameInput = nameInput?.value?.trim() || '';
    const reporterName = anonymousInput?.checked || !reporterNameInput
      ? 'Anonim (Dirahasiakan)'
      : reporterNameInput;

    if (!category || !fullMessage) {
      form.reportValidity();
      return;
    }

    const now = new Date();
    const timeSent = now.toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Mengirim...';

    const formData = new FormData();
    formData.append('Nama_Pengirim', reporterName);
    formData.append('Kategori', category);
    formData.append('Isi_Saran', fullMessage);
    formData.append('Tanggal_Kirim', timeSent);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        let message = 'Gagal mengirim saran, silakan coba lagi.';
        try {
          const data = await response.json();
          if (Array.isArray(data.errors) && data.errors.length) {
            message = 'Gagal: ' + data.errors.map(error => error.message).join(', ');
          }
        } catch (_) {}
        throw new Error(message);
      }

      formContainer.style.display = 'none';
      if (thankYouContainer) thankYouContainer.style.display = 'block';
      form.reset();
      syncAnonymousState();
      if (count) count.textContent = '0';
    } catch (error) {
      console.error(error);
      alert(error.message || 'Terjadi kesalahan jaringan atau koneksi.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Kirim Saran';
    }
  });

  syncAnonymousState();
})();
