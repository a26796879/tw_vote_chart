# tw_vote_chart
功能：  
台灣選舉資料 搭配圖資 進行視覺化呈現   
(目前只有2018議員) 
  
工具：  
後端：使用 flask & uvicorn  
前端：當使用者 下拉式選單改變值時，使用 Ajax 即時call API取得資料並呈現  
data來源：使用 Odoo 建立圖資及選舉資料 API  ( https://github.com/a26796879/ForTaiwan_odoo )  
GCP：部署環境  
  
使用步驟：  
透過點擊地圖上的各個里，右上方的圓餅圖會即時更新各個候選人的得票數  
再透過下拉選單，調整想看到的縣市/選區/行政區等選項  
直接點擊來玩玩看吧  
http://tsp.myftp.biz/  
  

