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

// CSVを配列に変換する関数
function parseCSV(csv) {
    const rows = csv.split('\n'); // 行ごとに分割
    return rows.map(row => row.split(',')); // 各行をカンマで分割
}

async function displayColumnFromHTML(csvFilePath) {
    // CSVファイルを読み込む
    const response = await fetch( csvFilePath );
    if (!response.ok) throw new Error(`${csvFilePath} が見つかりません。`);
    const csvText = await response.text(); // CSVファイルをテキストとして取得
    const csvData = parseCSV(csvText); // CSVをパースして配列に変換


    const table = document.getElementById("csvTable");
    const columnIndex = parseInt(table.getAttribute("data-column"), 7); // HTML指定の列を取得

    // テーブルの内容をクリア
    table.innerHTML = "";

    // 指定した列のデータを取得し、画像を表示
    csvData.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // ヘッダーをスキップ

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const img = document.createElement("img");

        img.src = '../lmageSave/' + row[columnIndex - 1]; // 画像パスを作成
        img.alt = row[columnIndex - 1]; // alt属性に画像名を設定

        td.appendChild(img);
        tr.appendChild(td);
        table.appendChild(tr);
    });
}