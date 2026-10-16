const genres = [  // ข้อมูลของแนวหนัง
  ["โรแมนติก", "Romantic", "หนังเกี่ยวกับความรักและความสัมพันธ์", "About Time, Pride & Prejudice"],
  ["ตลก", "Comedy", "หนังสนุกที่ทำให้หัวเราะและผ่อนคลาย", "Home Alone, The Hangover"],
  ["สยองขวัญ", "Horror", "หนังลึกลับและน่ากลัวที่ทำให้ลุ้น", "A Quiet Place, The Conjuring"],
  ["อีโรติก", "Erotic", "หนังความสัมพันธ์ที่เข้มข้นสำหรับผู้ใหญ่", "The Handmaiden, The Dreamers"],
  ["แอนิเมชัน", "Animation", "หนังการ์ตูนสีสันสดใสและสร้างสรรค์", "Inside Out, Spirited Away"]
];

const questions = [  // คำตอบลำดับเดียวกันในทุกข้อจะตรงกับแนวหนังลำดับเดียวกันด้านบน
  { title: "สีไหนที่คุณชอบที่สุด?", type: "color", choices: ["ชมพู", "เหลือง", "ดำ", "แดงไวน์", "ส้มสดใส"] },
  { title: "ฉากแบบไหนที่คุณชอบที่สุด?", choices: ["คู่รักใต้แสงดาว", "กลุ่มเพื่อนหัวเราะ", "บ้านลึกลับยามค่ำ", "ดอกไม้ใต้แสงเทียน", "โลกภาพวาดสีสด"] },
  { title: "ถ้าได้ไปต่างโลก คุณอยากไปที่ไหน?", choices: ["เมืองแห่งความรัก", "เมืองที่ทุกคนชอบเล่นมุก", "บ้านผีสิง", "งานเลี้ยงหน้ากาก", "โลกการ์ตูน"] },
  { title: "วันหยุดสุดสัปดาห์ คุณอยากทำอะไรมากที่สุด?", choices: ["ไปเดต", "ดูโชว์ตลก", "เล่นเกมลึกลับ", "ดินเนอร์ใต้แสงเทียน", "วาดรูป"] },
  { title: "คุณอยากรู้สึกอย่างไรหลังดูหนัง?", choices: ["อบอุ่นหัวใจ", "หัวเราะ", "กลัวและลุ้น", "ลึกซึ้ง", "สดใส"] },
  { title: "เพลงประกอบแบบไหนที่คุณชอบ?", choices: ["เพลงรักฟังสบาย", "เพลงสนุกจังหวะเร็ว", "เสียงลึกลับชวนขนลุก", "เพลงแจ๊สช้า ๆ", "เพลงสดใสเหมือนการ์ตูน"] },
  { title: "ตัวละครแบบไหนที่คุณอยากติดตาม?", choices: ["คนที่กำลังตามหารัก", "คนพูดเก่งชวนหัวเราะ", "นักสืบผู้กล้า", "คนแปลกหน้าที่มีเสน่ห์", "ตัวละครในโลกการ์ตูน"] },
  { title: "สถานที่แบบไหนดึงดูดคุณ?", choices: ["สวนดอกไม้", "เวทีแสดงตลก", "คฤหาสน์เก่า", "ห้องเต้นรำใต้แสงเทียน", "เมืองสีสันสดใส"] },
  { title: "คุณอยากหยิบสิ่งของชิ้นไหน?", choices: ["จดหมายรัก", "หนังสือมุกตลก", "กุญแจเก่า", "ดอกกุหลาบ", "สมุดวาดภาพ"] },
  { title: "ตอนจบแบบไหนถูกใจคุณ?", choices: ["ความรักสมหวัง", "ทุกคนหัวเราะด้วยกัน", "เฉลยปริศนาหักมุม", "ความสัมพันธ์ที่เข้มข้น", "บทเรียนจากโลกจินตนาการ"] }
];
const colors = ["#f9a8b5", "#facc15", "#111827", "#881337", "#fb923c"];
const $ = id => document.getElementById(id);
let current = 0;
let answers = Array(questions.length).fill(-1);

// แสดงการ์ดข้อมูลแนวหนัง
$("genreGrid").innerHTML = genres.map(g => `<article class="genre-card"><h3>${g[0]} (${g[1]})</h3><p>${g[2]}</p></article>`).join("");

function showQuestion() {
  $("startScreen").hidden = true;
  $("resultScreen").hidden = true;
  $("questionScreen").hidden = false;
  $("counter").textContent = `ข้อ ${current + 1} จาก ${questions.length}`;
  $("questionText").textContent = questions[current].title;
  $("progress").setAttribute("aria-valuenow", current + 1);
  $("bar").style.width = ((current + 1) / questions.length) * 100 + "%";

  $("answers").innerHTML = questions[current].choices.map((choice, i) => {
    let picture = "";
    if (current === 0) picture = `<span class="swatch" style="background:${colors[i]}"></span>`;
    return `<button type="button" class="answer ${answers[current] === i ? "selected" : ""}" aria-pressed="${answers[current] === i}">${picture}${choice}</button>`;
  }).join("");

  $("answers").querySelectorAll("button").forEach((button, i) => {
    button.onclick = () => { answers[current] = i; showQuestion(); };
  });
  $("backButton").disabled = current === 0;
  $("nextButton").disabled = answers[current] === -1;
  $("nextButton").textContent = current === questions.length - 1 ? "ดูผลลัพธ์ →" : "ข้อต่อไป →";
}

function showResult() {
  const scores = Array(genres.length).fill(0);
  answers.forEach(answer => scores[answer]++); // คำตอบหนึ่งข้อ = หนึ่งคะแนน
  let winner = answers[answers.length - 1]; // ถ้าคะแนนเสมอกัน ใช้คำตอบข้อสุดท้าย (เอาง่ายๆ คือ ตัดสินที่ คำตอบท้าย)
  scores.forEach((score, i) => { if (score > scores[winner]) winner = i; });

  $("rName").textContent = `${genres[winner][0]} (${genres[winner][1]})`;
  $("rDesc").textContent = "คุณน่าจะชอบ" + genres[winner][2];
  $("rMovies").textContent = genres[winner][3];
  $("scores").innerHTML = scores.map((score, i) => {
    const percent = score * 100 / questions.length;
    return `<div class="score-row"><span class="score-name">${genres[i][0]}</span><div class="score-bar"><div class="score-fill" style="width:${percent}%"></div></div><span class="score-percent">${percent}%</span></div>`;
  }).join("");
  $("questionScreen").hidden = true;
  $("resultScreen").hidden = false;
}

function startQuiz() { current = 0; answers = Array(questions.length).fill(-1); showQuestion(); }
$("startBtn").onclick = startQuiz;
$("restartBtn").onclick = startQuiz;
$("backButton").onclick = () => { if (current > 0) { current--; showQuestion(); } };
$("nextButton").onclick = () => {
  if (answers[current] === -1) return;
  if (current < questions.length - 1) { current++; showQuestion(); }
  else showResult();
};

$("menuBtn").onclick = () => {    // เมนูมือถือ อาจไม่จำแต่โจทย์มันเขียนไว้
  $("menu").classList.toggle("show");
  $("menuBtn").setAttribute("aria-expanded", $("menu").classList.contains("show"));
};
$("menu").querySelectorAll("a").forEach(link => link.onclick = () => {
  $("menu").classList.remove("show");
  $("menuBtn").setAttribute("aria-expanded", "false");
});
