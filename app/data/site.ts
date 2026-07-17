export interface Category {
  slug: string
  name: string
  nameEn: string
  description: string
}

export interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  date: string
  location: string
  seed: string
}

export const categories: Category[] = [
  { slug: 'taiwan', name: '台灣旅遊', nameEn: 'Taiwan', description: '從山城到海岸，記錄島嶼上最動人的風景。' },
  { slug: 'japan', name: '日本旅遊', nameEn: 'Japan', description: '四季分明的日本，總有拍不完的畫面。' },
  { slug: 'global', name: '環球旅遊', nameEn: 'Global', description: '走得更遠一點，用鏡頭收集世界的顏色。' },
  { slug: 'photography', name: '攝影筆記', nameEn: 'Photography', description: '器材、構圖與後製，關於拍照的大小事。' },
  { slug: 'food', name: '美食記錄', nameEn: 'Food', description: '每一趟旅行，都從一頓好吃的開始。' },
  { slug: 'stay', name: '住宿推薦', nameEn: 'Stay', description: '睡得好，才走得遠，精選住宿分享。' },
  { slug: 'trips', name: '小旅行', nameEn: 'Short Trips', description: '不用出國，也能擁有的週末小旅行。' },
]

export const articles: Article[] = [
  { id: 'jiufen', category: 'taiwan', title: '九份雨夜：燈籠亮起的那一刻', excerpt: '山城的階梯濕濕的，紅燈籠倒映在青石板上，這是九份最迷人的樣子。', date: '2026-02-14', location: '新北・九份', seed: 'jiufen' },
  { id: 'yandui', category: 'taiwan', title: '鹽埕國小的老榕樹下', excerpt: '一棵老樹、一間老校，時間在這裡走得特別慢。', date: '2026-01-22', location: '高雄・鹽埕', seed: 'yandui' },
  { id: 'sun-moon-lake', category: 'taiwan', title: '日月潭騎車環湖一日', excerpt: '沿著環湖公路慢慢騎，山嵐與湖水一直在變換顏色。', date: '2025-12-08', location: '南投・日月潭', seed: 'sunmoonlake' },
  { id: 'ginkgo-utokyo', category: 'japan', title: '東京大學銀杏大道的十一月', excerpt: '滿地金黃的銀杏葉，是每年秋天最期待的畫面。', date: '2025-11-20', location: '東京・本鄉', seed: 'ginkgo' },
  { id: 'roppongi-lights', category: 'japan', title: '六本木點燈夜：城市的另一種溫柔', excerpt: '冬天的東京很冷，但六本木的燈光讓人捨不得回家。', date: '2025-12-24', location: '東京・六本木', seed: 'roppongi' },
  { id: 'kyoto-arashiyama', category: 'japan', title: '嵐山竹林裡的光影', excerpt: '陽光穿過竹葉的縫隙，灑在石板路上，安靜得只聽得見風聲。', date: '2025-10-05', location: '京都・嵐山', seed: 'arashiyama' },
  { id: 'seoul-tower', category: 'global', title: 'N首爾塔下的櫻花季', excerpt: '纜車緩緩上升，整座城市被粉色的櫻花覆蓋。', date: '2026-04-02', location: '首爾・南山', seed: 'nseoultower' },
  { id: 'seoul-forest', category: 'global', title: '首爾林散步：城市裡的呼吸感', excerpt: '在高樓之間找到一片森林，是首爾最讓人驚喜的角落。', date: '2026-04-05', location: '首爾・聖水洞', seed: 'seoulforest' },
  { id: 'kyunghee-univ', category: 'global', title: '慶熙大學的歐風校園', excerpt: '一磚一瓦都像電影場景，難怪是首爾最上鏡的大學。', date: '2026-04-08', location: '首爾・回基洞', seed: 'kyunghee' },
  { id: 'gear-notes', category: 'photography', title: '旅行攝影包該帶什麼？', excerpt: '從機身到腳架，整理這幾年旅拍下來最實用的裝備清單。', date: '2026-03-01', location: '', seed: 'geargear' },
  { id: 'golden-hour', category: 'photography', title: '如何抓住黃金時刻的光線', excerpt: '日出日落前後的三十分鐘，是風景攝影最珍貴的時間。', date: '2026-02-18', location: '', seed: 'goldenhour' },
  { id: 'seoul-cafe', category: 'food', title: '聖水洞老宅咖啡廳巡禮', excerpt: '把老屋改造成咖啡廳是首爾最迷人的日常，每一間都有自己的故事。', date: '2026-04-06', location: '首爾・聖水洞', seed: 'seoulcafe' },
  { id: 'tteokbokki', category: 'food', title: '深夜辣炒年糕地圖', excerpt: '收錄幾間在地人才知道的深夜食堂，微辣、香氣十足。', date: '2026-04-09', location: '首爾', seed: 'tteok' },
  { id: 'jiufen-teahouse', category: 'food', title: '九份茶樓的一壺午後', excerpt: '坐在老茶樓的窗邊，看山、看海，配一壺熱茶剛剛好。', date: '2026-02-15', location: '新北・九份', seed: 'teahouse' },
  { id: 'ryokan-note', category: 'stay', title: '京都町屋民宿住宿心得', excerpt: '推開木門就是另一個時代，安靜、講究、充滿溫度。', date: '2025-10-04', location: '京都', seed: 'ryokan' },
  { id: 'seaside-hotel', category: 'stay', title: '台東海景旅店推薦', excerpt: '打開窗就是太平洋，這樣的早晨值得專程前往。', date: '2025-09-12', location: '台東', seed: 'seaside' },
  { id: 'day-trip-jiaoxi', category: 'trips', title: '礁溪一日小旅行路線', excerpt: '泡湯、吃小吃、看稻田，不用遠行也能徹底放鬆。', date: '2026-01-05', location: '宜蘭・礁溪', seed: 'jiaoxi' },
  { id: 'day-trip-tamsui', category: 'trips', title: '淡水老街半日散策', excerpt: '從老街走到漁人碼頭，剛好趕上一場漂亮的日落。', date: '2025-11-30', location: '新北・淡水', seed: 'tamsui' },
]

export function articlesByCategory(slug: string): Article[] {
  return articles.filter(a => a.category === slug)
}

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
