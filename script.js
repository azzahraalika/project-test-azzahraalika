const items = [
    { id: 1, title: 'Jeonghan dan Jun tidak bisa ikut serta dalam comeback seventeen oktober nanti', date: '08-12-2024', imageUrl: "assets/img/svt.jpg" },
    { id: 2, title: 'Seventeen memberikan pengumuman akan digelar world tour pada beberapa tempat', date: '08-06-2024', imageUrl: "assets/img/tour.jpeg" },
    { id: 3, title: 'Jadwal Seventeen di paruh tahun 2024', date: '08-06-2024', imageUrl: "assets/img/svt1.jpg" },
    { id: 4, title: 'Fansign yang digelar di beijing dinyatakan ditunda dikarenakan cuaca yang buruk', date: '07-29-2024', imageUrl: "assets/img/fan.jpg" },
    { id: 5, title: 'Seventeen akan comeback dengan mini album ke-12 Oktober mendatang', date: '07-24-2024', imageUrl: "assets/img/wt.jpg" },
    { id: 6, title: 'Seventeen akan mengadakan caratland pada tanggal 23-24 Juli mendatang', date: '07-17-2024', imageUrl: "assets/img/carat.jpeg" },
    { id: 7, title: 'Seventeen akan menjadi salah satu line up Glastonbury Festival 2024', date: '06-28-2024', imageUrl: "assets/img/glas.jpg" },
    { id: 8, title: 'Seventeen menjadi UNESCO First Goodwill Ambassador for Youth', date: '06-26-2024', imageUrl: "assets/img/unes.jpg" },
    { id: 9, title: 'Minghao mengalami cedera pada kakinya saat dia sedang latihan', date: '06-19-2024', imageUrl: "assets/img/the8.jpg" },
    { id: 10, title: 'Jeonghan dan Wonwoo mengeluarkan 1st single album yang berjudul "THIS MAN"', date: '06-04-2024', imageUrl: "assets/img/jw.jpg" },
    { id: 11, title: 'Seventeen menjadi brand ambassador mogu-mogu', date: '05-30-2024', imageUrl: "assets/img/mogu.jpg" },
    { id: 12, title: 'Seventeen menjadi salah satu lineup Lollapaloza Festival yang digelar pada 7 September mendatang', date: '05-08-2024', imageUrl: "assets/img/lol.jpg" },
    { id: 13, title: 'Seventeen akan mengeluarkan album SEVENTEEN BEST ALBUM 17 RIGHT HERE bulan Juli mendatang', date: '04-08-2024', imageUrl: "assets/img/17.jpg" },
    { id: 14, title: 'Seventeen mengadakan tour FOLLOW TO JAPAN tanpa Seungcheol dan Jeonghan dikarenakan ia mengalami cedera pada kakinya', date: '12-06-2023', imageUrl: "assets/img/japan.jpg" },
    { id: 15, title: 'DK akan berpartisipasi mengisi OST drama "Welcome to Samdal-ri" yang akan keluar pada 3 Desember jam 6 PM KST', date: '12-05-2023', imageUrl: "assets/img/dk.jpg" },
    { id: 16, title: 'Jeonghan, Joshua, Hoshi, dan Mingyu akan hadir pada FujiTV Mokuschici Marubatsu-bu', date: '11-30-2023', imageUrl: "assets/img/jjhm.jpg" },
    { id: 17, title: 'Seventeen berhasil meraih daesang Album of the Year pada acara MAMA Award 2023', date: '11-29-2023', imageUrl: "assets/img/mama.jpg" },
    { id: 18, title: 'Seventeen dan BSS masuk ke beberapa nominasi Melon Music Awards 2023', date: '11-28-2023', imageUrl: "assets/img/mma.jpg" },
    { id: 19, title: 'Dino akan menghadiri ARENA HOMME + Korea edisi Desember', date: '11-16-2023', imageUrl: "assets/img/dino.jpg" },
    { id: 20, title: 'Jeonghan menjadi brand ambassador Fred Jewelry', date: '11-11-2023', imageUrl: "assets/img/han.jpg" },
];

const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
const showPerPageSelect = document.getElementById('showPerPage');
const sortBySelect = document.getElementById('sortBy');
const cardList = document.getElementById('cardList');
const pagination = document.getElementById('pagination');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let itemsPerPage = parseInt(showPerPageSelect.value);
let sortBy = sortBySelect.value;
let totalItems = 0;

async function fetchData(page, size, sortBy) {
    const response = await fetch(`${apiUrl}?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sortBy}`);
    const data = await response.json();
    totalItems = data.meta.total; // Asumsi API memberikan informasi total items
    return data.data;
}

async function renderItems() {
    const sortedItems = sortItems(items, sortBy);
    const paginatedItems = paginateItems(sortedItems, itemsPerPage, currentPage);

    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';
    paginatedItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        img.loading = 'lazy';
        card.appendChild(img);

        const content = document.createElement('div');
        content.classList.add('content');

        const date = document.createElement('p');
        date.classList.add('date');
        date.textContent = new Date(item.date).toLocaleDateString();
        content.appendChild(date);

        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = item.title;
        content.appendChild(title);

        card.appendChild(content);
        cardList.appendChild(card);
    });

    renderPagination(sortedItems.length, itemsPerPage, currentPage);
}

function sortItems(items, sortBy) {
    return items.sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });
}

function paginateItems(items, itemsPerPage, currentPage) {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

function renderPagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderItems();
    }
});

nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderItems();
    }
});

showPerPageSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(showPerPageSelect.value);
    currentPage = 1; // Reset to first page
    renderItems();
});

sortBySelect.addEventListener('change', () => {
    sortBy = sortBySelect.value;
    currentPage = 1; // Reset to first page
    renderItems();
});

// Initial render
renderItems();