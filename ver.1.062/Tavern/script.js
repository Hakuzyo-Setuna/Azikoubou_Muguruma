// ナビゲーションの固定処理
window.addEventListener('scroll', function () {
    const navContainer = document.querySelector('.nav-container');
    const headerHeight = document.querySelector('header').offsetHeight;

    // スクロール位置がヘッダーの高さを超えたら、ナビゲーションを固定
    if (window.scrollY > headerHeight) {
        navContainer.classList.add('nav-fixed');
    } else {
        navContainer.classList.remove('nav-fixed');
    }
});

////////////////////////////////
const csvUrl = "../編集用/Menu.csv"; // CSV の URL を指定

// ページ読み込み時に CSV を取得
window.onload = async function () {
    const csvArray = await loadCSV();
    if (csvArray.length === 0) return;

    // すべての .image-container を取得し、HTMLのdata属性に基づいて列を表示
    document.querySelectorAll(".image-container").forEach(container => {
        const columnIndex = parseInt(container.dataset.column, 10);
        displayImages(csvArray, columnIndex, container.id);
    });
    document.querySelectorAll(".Daily-container").forEach(container => {
        const columnIndex = parseInt(container.dataset.column, 10);
        displayImages(csvArray, columnIndex, container.id);
    });
    document.querySelectorAll(".Rec-container").forEach(container => {
        const columnIndex = parseInt(container.dataset.column, 10);
        displayImages(csvArray, columnIndex, container.id);
    });
};

// CSV を取得してパースする関数
async function loadCSV() {
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("CSV の取得に失敗しました");
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        alert(error.message);
        return [];
    }
}

// CSV を 2D 配列に変換する関数
function parseCSV(csv) {
    return csv.split("\n").map(row => row.split(","));
}

// 指定された列の画像を表示する関数
function displayImages(csvArray, columnIndex, containerId) {
    const images = csvArray.slice(1).map(row => row[columnIndex - 1]); // 1行目(ヘッダー)を除外

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // 既存の内容をクリア

    images.forEach(img => {
        if (img) {
            const imgElement = document.createElement("img");
            imgElement.src = `../lmageSave/${img.trim()}`;
            imgElement.alt = img;
            container.appendChild(imgElement);
        }
    });
}