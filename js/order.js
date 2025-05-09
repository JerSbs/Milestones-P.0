// === EVENT UTAMA: Saat DOM sudah siap, jalankan semua logika form ===
document.addEventListener('DOMContentLoaded', function () {

  // === Ambil elemen-elemen penting dari halaman ===
  const form = document.getElementById('orderForm');
  const summary = document.getElementById('summary');
  const totalPriceElement = document.getElementById('totalPrice');
  const dateInput = document.getElementById('date');
  const slotInfo = document.getElementById('slotInfo');
  const submitBtn = document.getElementById('submitBtn');

  // === Tentukan tanggal minimal (hari ini) berdasarkan zona waktu GMT+7 ===
  const now = new Date();
  const jakartaOffset = 7 * 60 * 60 * 1000;
  const jakartaTime = new Date(now.getTime() + jakartaOffset);
  const today = jakartaTime.toISOString().split('T')[0];
  dateInput.min = today;

  // === Konfigurasi slot harian & data penyimpanan sementara ===
  const SLOT_LIMIT = 2;
  const orders = {};

  // === Fungsi bantu: Format angka ke format mata uang Rupiah ===
  function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  // === Fungsi: Nonaktifkan semua input quantity saat awal jika checkbox belum dicentang ===
  function initializeQuantityFields() {
    document.querySelectorAll('.product-check').forEach(checkbox => {
      const qtyInput = document.getElementById('qty-' + checkbox.id);
      qtyInput.disabled = !checkbox.checked;
    });
  }

  // === Fungsi: Aktifkan/Nonaktifkan tombol submit sesuai validasi ===
  function toggleSubmitButton(total) {
    const selectedDate = dateInput.value;
    const currentSlot = orders[selectedDate] || 0;
    const slotAvailable = selectedDate && currentSlot < SLOT_LIMIT;

    if (total <= 0 || !slotAvailable) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-secondary');
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-secondary');
    }
  }

  // === Fungsi: Hitung total harga & tampilkan ringkasan pesanan ===
  function calculateTotalAndSummary() {
    let total = 0;
    summary.innerHTML = '';

    document.querySelectorAll('.product-check').forEach(checkbox => {
      const qtyInput = document.getElementById('qty-' + checkbox.id);

      qtyInput.disabled = !checkbox.checked;

      const quantity = parseInt(qtyInput.value);
      const price = parseInt(checkbox.dataset.price);
      const label = document.querySelector(`label[for="${checkbox.id}"]`).textContent;

      if (checkbox.checked && !isNaN(quantity) && quantity > 0) {
        const subtotal = quantity * price;
        total += subtotal;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between';
        li.innerHTML = `<span>${quantity}x ${label}</span><span>${formatRupiah(subtotal)}</span>`;
        summary.appendChild(li);
      }
    });

    totalPriceElement.textContent = formatRupiah(total);
    toggleSubmitButton(total);
  }

  // === Fungsi: Tampilkan informasi slot yang tersisa berdasarkan tanggal yang dipilih ===
  function checkSlotAvailability() {
    const selectedDate = dateInput.value;
    const currentSlot = orders[selectedDate] || 0;
    const remaining = SLOT_LIMIT - currentSlot;

    if (!selectedDate) {
      slotInfo.textContent = '';
      slotInfo.classList.remove('text-danger');
      slotInfo.classList.add('text-muted');
    } else if (remaining <= 0) {
      slotInfo.textContent = 'Slot penuh. Silahkan pilih tanggal yang lain.';
      slotInfo.classList.add('text-danger');
      slotInfo.classList.remove('text-muted');
    } else {
      slotInfo.textContent = `Tersisa ${remaining} slot`;
      slotInfo.classList.remove('text-danger');
      slotInfo.classList.add('text-muted');
    }
  }

  // === Fungsi: Reset form setelah pesanan dikirim ===
  function resetForm() {
    form.reset();
    summary.innerHTML = '';
    totalPriceElement.textContent = formatRupiah(0);
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-secondary');
    dateInput.dispatchEvent(new Event('change'));
    initializeQuantityFields();
  }

  // === Event: Ketika tanggal diubah ===
  dateInput.addEventListener('change', () => {
    checkSlotAvailability();
    calculateTotalAndSummary();
  });

  // === Event: Saat input quantity atau checkbox produk berubah ===
  const inputs = document.querySelectorAll('.product-check, .product-qty');
  inputs.forEach(input => {
    input.addEventListener('input', calculateTotalAndSummary);
  });

  // === Event: Saat form disubmit, proses pesanan & simpan slot ===
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedDate = dateInput.value;
    const currentSlot = orders[selectedDate] || 0;
    orders[selectedDate] = currentSlot + 1;
    alert('Pesanan Anda berhasil dikirim!');
    resetForm();
  });

  // === Inisialisasi awal saat halaman pertama kali dimuat ===
  initializeQuantityFields();
  if (dateInput.value) {
    dateInput.dispatchEvent(new Event('change'));
  } else {
    toggleSubmitButton(0);
  }
});
