let jumlah_awal = 0;
const maksimalRefresh = 3;

async function refreshToken() {
const accToken = localStorage.getItem('access_token');
    try {
        // melakukan refrsh ygy
        const response = await fetch('https://backendinfinitywater.hayyalmusafir.com/api/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accToken}`
        },
        body: JSON.stringify({ 
            access_token: accToken 
        })
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
            if (data.access_token) {
            // Simpan token baru ke localStorage
            localStorage.setItem('access_token', data.access_token);
            jumlah_awal++;
            console.log(`Token berhasil diperbarui. Refresh ke-${jumlah_awal}`);
        } else {
            throw new Error('Token baru tidak ditemukan dalam respons API.');
        }

        if (jumlah_awal >= maksimalRefresh) {
            alert('AKSES ANDA TELAH BERAKHIR, SILAHKAN MELAKUKAN LOGIN ULANG!!!');
            localStorage.removeItem('access_token');
            window.location.href = '../login.html';
        }

    } catch (error) {
        console.error('Gagal memperbarui token:', error);
        alert('Gagal memperbarui token. Silakan login ulang.');
        localStorage.removeItem('access_token');
        window.location.href = '../login.html';
    }
}
    
document.addEventListener('DOMContentLoaded', () => {
    console.log('Token Valid')
    
// Ini untuk menjalankan cd refresh 50 menit, karena timeout awal 1 jam
    setInterval(() => {
        console.log('Token Tidak Valid, Memperbarui token...');
        refreshToken().catch(error => console.error('Gagal memperbarui token:', error));
    }, 3000 * 1000);
});