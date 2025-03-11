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

async function csvloader(Path, number) {
    try {
        // CSVファイルを取得
        const response = await fetch(Path);
        if (!response.ok) throw new Error(`${Path} が見つかりません。`);

        // CSVをテキストとして取得し、配列に変換
        const csvText = await response.text();
        const csvData = parseCSV(csvText); // CSVを配列に変換する関数

        const table = document.getElementById("csvTable");

        // 画像の保存先フォルダ
        const imageBaseUrl = "../lmageSave/";

        // デバッグ：CSVデータをコンソールに出力して確認
        console.log("CSV Data:", csvData);

        // ヘッダーをスキップして、各行の `number` 列にある画像を表示
        csvData.slice(1).forEach((row, index) => {
            console.log(`Row ${index + 1}:`, row);  // 各行の内容を確認

            // `number` 列の画像ファイルを取得
            let imagesToDisplay = row[number - 1]?.split(',') || [];

            // デバッグ：画像リストを確認
            console.log(`Images in column ${number}:`, imagesToDisplay);

            imagesToDisplay.forEach(image => {
                if (image.trim()) { // 空の画像パスを無視
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let img = document.createElement("img");

                    // 画像パスの前後の改行コードを削除
                    image = image.trim(); 

                    // デバッグ：画像パスをコンソールに表示
                    console.log("Loading image:", image);

                    img.src = imageBaseUrl + image; // 画像のパスを設定
                    img.alt = "CSV画像";
                    img.style.width = "150px"; // 画像サイズ調整
                    img.style.height = "auto";

                    img.onload = () => {
                        console.log("Image loaded successfully:", img.src);
                    };
                    img.onerror = (err) => {
                        console.error("Error loading image:", img.src, err);
                    };

                    td.appendChild(img);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
            });
        });

    } catch (error) {
        console.error("エラー:", error);
    }
}

// CSVを配列に変換する関数
function parseCSV(csv) {
    // 改行とカンマを使ってCSVを分割
    return csv.split("\n")
        .map(row => row.split(",").map(cell => cell.trim())) // 空白を削除
        .filter(row => row.length === 7); // 7列ある行だけをフィルタリング
}
