/* ========================================
   星読みの導き - JavaScript
   ======================================== */

/* ===== 星座データ ===== */
const zodiacData = [
  { id: "aries",       name: "牡羊座", date: "3/21 ~ 4/19",   symbol: "♈" },
  { id: "taurus",      name: "牡牛座", date: "4/20 ~ 5/20",   symbol: "♉" },
  { id: "gemini",      name: "双子座", date: "5/21 ~ 6/21",   symbol: "♊" },
  { id: "cancer",      name: "蟹座",   date: "6/22 ~ 7/22",   symbol: "♋" },
  { id: "leo",         name: "獅子座", date: "7/23 ~ 8/22",   symbol: "♌" },
  { id: "virgo",       name: "乙女座", date: "8/23 ~ 9/22",   symbol: "♍" },
  { id: "libra",       name: "天秤座", date: "9/23 ~ 10/23",  symbol: "♎" },
  { id: "scorpio",     name: "蠍座",   date: "10/24 ~ 11/22", symbol: "♏" },
  { id: "sagittarius", name: "射手座", date: "11/23 ~ 12/21", symbol: "♐" },
  { id: "capricorn",   name: "山羊座", date: "12/22 ~ 1/19",  symbol: "♑" },
  { id: "aquarius",    name: "水瓶座", date: "1/20 ~ 2/18",   symbol: "♒" },
  { id: "pisces",      name: "魚座",   date: "2/19 ~ 3/20",   symbol: "♓" },
];

/* SVGアイコン（シンプルな星座モチーフ） */
const icons = {
  aries: `<svg viewBox="0 0 64 64"><path d="M12 44c0-12 8-22 20-22s20 10 20 22"/><circle cx="18" cy="20" r="5"/><circle cx="46" cy="20" r="5"/></svg>`,
  taurus: `<svg viewBox="0 0 64 64"><circle cx="32" cy="36" r="16"/><path d="M16 36c-8 0-12-6-12-12s6-10 12-10 12 6 12 6M36 20c0 0 4-6 12-6s12 4 12 10-4 12-12 12"/></svg>`,
  gemini: `<svg viewBox="0 0 64 64"><path d="M20 8v48M44 8v48"/><circle cx="20" cy="14" r="5"/><circle cx="44" cy="14" r="5"/><circle cx="20" cy="50" r="5"/><circle cx="44" cy="50" r="5"/></svg>`,
  cancer: `<svg viewBox="0 0 64 64"><circle cx="20" cy="20" r="10"/><circle cx="44" cy="44" r="10"/><path d="M20 30c6 8 18 8 24 0"/></svg>`,
  leo: `<svg viewBox="0 0 64 64"><circle cx="22" cy="22" r="12"/><path d="M32 32c8 0 16 6 16 16s-8 12-16 12c-6 0-10-4-10-10"/></svg>`,
  virgo: `<svg viewBox="0 0 64 64"><path d="M18 8v36c0 8 6 12 14 12s14-4 14-12V8"/><path d="M32 8v28"/><path d="M46 8v28"/></svg>`,
  libra: `<svg viewBox="0 0 64 64"><path d="M12 16h40M16 24h32M20 32c0 10 8 18 18 18s18-8 18-18"/></svg>`,
  scorpio: `<svg viewBox="0 0 64 64"><path d="M12 20c0-6 5-10 10-10s10 5 10 10-5 10-10 10-10-5-10-10z"/><path d="M32 20c0-6 5-10 10-10s10 5 10 10-5 10-10 10-10-5-10-10z"/><path d="M48 28l6 12"/><path d="M52 36l4-2"/></svg>`,
  sagittarius: `<svg viewBox="0 0 64 64"><path d="M12 52L52 12"/><path d="M52 12H28"/><path d="M52 12V36"/></svg>`,
  capricorn: `<svg viewBox="0 0 64 64"><circle cx="24" cy="20" r="10"/><path d="M34 28c6 0 12 6 12 14s-6 12-12 12-10-6-10-12"/></svg>`,
  aquarius: `<svg viewBox="0 0 64 64"><path d="M8 20l8-6 8 6 8-6 8 6 8-6 8 6"/><path d="M8 36l8-6 8 6 8-6 8 6 8-6 8 6"/></svg>`,
  pisces: `<svg viewBox="0 0 64 64"><circle cx="18" cy="20" r="8"/><circle cx="46" cy="44" r="8"/><path d="M26 20c6 0 10 8 10 16s-4 16-10 16"/></svg>`,
};

/* 占いテキストデータ */
const fortunes = {
  total: [
    "今日は勢いが大事やで。思い切った行動が吉。迷ったら前に進むんが正解や。",
    "周りとの調和がカギになる日や。無理に突出せんと、みんなと一緒にいくんがええで。",
    "小さな幸せを見つける心が大事や。常の中に隠れた宝物を探してみてな。",
    "変化を恐れんと受け入れることで、新しい世界が開けるかもしれへんで。",
    "今日は自分を信じる日や。あんたの直感、ほんまにええ線いっとるで。",
    "少しゆっくりする日や。はよ動かんでも、じっくり考えた方がええ結果になるわ。",
    "チャンスの訪れる日や。目を離さんように。思わぬところで宝が転がっとるで。",
    "人の話をよく聞く日や。誰かの一言が、あんたの人生を変えるヒントになるかもしれへん。",
  ],
  love: [
    "素直な気持ちを伝えると吉。照れくさくても、言葉にすると相手の心が動くわ。",
    "偶然の出会いに注目や。いつもの帰り道が、今日は特別な道になるかもしれへんで。",
    "相手の気持ちを思いやる優しさが、恋を深めるわ。自分だけやなく、相手の目線で見て。",
    "今日は待つことが大事や。焦んと、自然な流れに身を任せた方がええ結果になるで。",
    "気になる人には、ちょっとした笑顔が効果的や。アホな話で笑わせてみてもええんちゃう？",
    "過去の恋を振り返る日や。昔の経験が、今の恋に活きてくかもしれへんで。",
  ],
  work: [
    "新しいアイデアが閃く日や。メモしとかんと忘れるで、すぐ書き留めとけよ。",
    "チームワークが光る日や。一人で抱えんと、みんなで力を合わせるんが吉や。",
    "細かい作業に向いてる日や。雑になりやすいところを、丁寧に仕上げると評価されるわ。",
    "上司や先輩との会話でヒントが得られるで。遠慮せんと質問してみてな。",
    "少し発想を転換すると、詰まってた問題がスッと解けるかもしれへんで。",
    "今日は計画を立てる日や。将来のビジョンを描くと、明日への活力になるわ。",
  ],
  colors: ["真紅", "瑠璃色", "翡翠色", "金色", "銀色", "藤色", "珊瑚色", "墨色", "桃色", "藍色", "茜色", "檸檬色"],
  items: ["ハンカチ", "古い鍵", "水晶", "本", "ペン", "鏡", "花", "石", "写真", "財布", "計", "リング"],
};

/* ===== ユーティリティ関数 ===== */

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
  }
  return Math.abs(h);
}

function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function formatDate() {
  const d = new Date();
  const w = ["日", "月", "火", "水", "木", "金", "土"];
  return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " (" + w[d.getDay()] + ")";
}

function getFortune(zodiacId) {
  const seedBase = hashString(todayKey() + zodiacId);
  const rng = (mod) => Math.floor(seededRandom(seedBase + mod) * mod);

  const totalStar  = 1 + rng(5);
  const loveStar   = 1 + rng(5);
  const workStar   = 1 + rng(5);
  const moneyStar  = 1 + rng(5);
  const healthStar = 1 + rng(5);

  const totalMsg = fortunes.total[rng(fortunes.total.length)];
  const loveMsg  = fortunes.love[rng(fortunes.love.length)];
  const workMsg  = fortunes.work[rng(fortunes.work.length)];
  const color    = fortunes.colors[rng(fortunes.colors.length)];
  const item     = fortunes.items[rng(fortunes.items.length)];
  const number   = 1 + rng(99);

  const other = zodiacData.filter((z) => z.id !== zodiacId);
  const compat = other[rng(other.length)].name;

  return {
    totalStar, loveStar, workStar, moneyStar, healthStar,
    totalMsg, loveMsg, workMsg, color, item, number, compat,
  };
}

/* ===== 星評価表示 ===== */
function renderStars(count) {
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    const cls = i <= count ? "on" : "";
    html += `<svg class="star-icon ${cls}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  html += "</span>";
  return html;
}

/* ===== 星座カード生成 ===== */
function initZodiacGrid() {
  const grid = document.getElementById("zodiacGrid");
  if (!grid) return;

  zodiacData.forEach((z) => {
    const card = document.createElement("div");
    card.className = "zodiac-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="icon-wrap">${icons[z.id]}</div>
      <div class="name">${z.symbol} ${z.name}</div>
      <div class="date-range">${z.date}</div>
    `;
    card.addEventListener("click", () => showResult(z));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") showResult(z);
    });
    grid.appendChild(card);
  });
}

/* ===== 結果表示 ===== */
function showResult(z) {
  const panel = document.getElementById("resultPanel");
  const resultIcon = document.getElementById("resultIcon");
  const resultTitle = document.getElementById("resultTitle");
  const resultDate = document.getElementById("resultDate");

  if (!panel) return;

  const f = getFortune(z.id);

  if (resultIcon) resultIcon.innerHTML = icons[z.id];
  if (resultTitle) resultTitle.textContent = z.symbol + " " + z.name + "の運勢";
  if (resultDate) resultDate.textContent = formatDate();

  const scoreTotal  = document.getElementById("scoreTotal");
  const scoreLove   = document.getElementById("scoreLove");
  const scoreWork   = document.getElementById("scoreWork");
  const scoreMoney  = document.getElementById("scoreMoney");
  const scoreHealth = document.getElementById("scoreHealth");

  if (scoreTotal)  scoreTotal.innerHTML  = renderStars(f.totalStar);
  if (scoreLove)   scoreLove.innerHTML   = renderStars(f.loveStar);
  if (scoreWork)   scoreWork.innerHTML   = renderStars(f.workStar);
  if (scoreMoney)  scoreMoney.innerHTML  = renderStars(f.moneyStar);
  if (scoreHealth) scoreHealth.innerHTML = renderStars(f.healthStar);

  const messageText = document.getElementById("messageText");
  const loveText    = document.getElementById("loveText");
  const workText    = document.getElementById("workText");

  if (messageText) messageText.textContent = f.totalMsg;
  if (loveText)    loveText.textContent    = f.loveMsg;
  if (workText)    workText.textContent    = f.workMsg;

  const luckyNumber = document.getElementById("luckyNumber");
  const luckyColor  = document.getElementById("luckyColor");
  const luckyItem   = document.getElementById("luckyItem");
  const compatible  = document.getElementById("compatible");

  if (luckyNumber) luckyNumber.textContent = f.number;
  if (luckyColor)  luckyColor.textContent  = f.color;
  if (luckyItem)   luckyItem.textContent   = f.item;
  if (compatible)  compatible.textContent  = f.compat;

  panel.classList.add("active");
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  panel.focus({ preventScroll: true });
}

/* ===== 閉じるボタン ===== */
function initCloseButton() {
  const closeBtn = document.getElementById("closeBtn");
  const panel = document.getElementById("resultPanel");
  if (closeBtn && panel) {
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("active");
    });
  }
}

/* ===== 日付表示 ===== */
function initDateDisplay() {
  const el = document.getElementById("dateToday");
  if (el) el.textContent = formatDate();
}

/* ===== 星空キャンバス ===== */
function initStarfield() {
  const c = document.getElementById("starfield");
  if (!c) return;
  const ctx = c.getContext("2d");
  let W, H;
  const stars = [];
  const STAR_COUNT = 150;

  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      dir: Math.random() > 0.5 ? 1 : -1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0.2) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 248, 219, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  draw();
}

/* ===== 初化 ===== */
document.addEventListener("DOMContentLoaded", () => {
  initDateDisplay();
  initStarfield();
  initZodiacGrid();
  initCloseButton();
});
