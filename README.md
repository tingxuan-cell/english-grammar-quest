# 英文小教室
以自備《文法(2).pdf》題目整理的文法講義網站。包含五大句型、時態、助動詞、名詞子句、關係子句、假設語氣及代名詞。原教材含進階內容，非全部為國一程度。

## 功能
七個單元、35 題教材選題、補充白話說明、中英例句、單元搜尋、程度篩選、即時評分與解析、重做、瀏覽器本機練習紀錄、列印版面。
原 PDF 多頁為空白筆記頁；本站講解與答案解析屬補充整理，不是原教材附解。

## 本機使用
直接用瀏覽器開啟 `dist/index.html`，或在專案根目錄執行 `python3 -m http.server 8000 --directory dist`，瀏覽 http://localhost:8000 。無套件安裝或建置步驟。

## 新增單元
先閱讀 `AGENTS.md`。在 `dist/data/lessons.js` 增加完整單元物件；首頁、導覽與單元頁會依資料自動產生。
示範提示：「請先閱讀 AGENTS.md，依現有格式新增被動語態單元。此單元屬補充內容，五題練習標示補充自編題，並驗證所有答案。沿用既有版型，讓首頁和導覽自動加入新單元。」

## GitHub Pages
將完整專案上傳 GitHub。使用 GitHub Actions 部署 `dist`，已附 `.github/workflows/pages.yml`。Repository → Settings → Pages → Source 選 GitHub Actions。部署成功後可取得公開網站連結。
目前提供的預覽網站不是 GitHub Repository；作業繳交前仍須建立使用者自己的 GitHub Repository。

## 資料來源與隱私
題目節選自使用者提供的教材，來源頁碼與原題號顯示於題目下方。無第三方字型、追蹤、分析與帳號功能。localStorage 僅保存各單元是否練習過，不跨裝置同步。
