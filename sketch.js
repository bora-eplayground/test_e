let page = 1;

// --------------------
// 이미지
// --------------------
let diceSheet;
let diceFrames = [];
const DICE_COLS = 5;
const DICE_ROWS = 2;
const HOME_DICE_FRAME = 9;
let valueFrameMap = [0, 0, 5, 2, 7, 9, 4]; 
// index 1~6 사용
// 실제 결과 숫자는 텍스트로도 함께 표시해서 헷갈리지 않게 처리

// --------------------
// 홈 아이콘
// --------------------
let homeIcons = [];

// --------------------
// 주사위
// --------------------
let diceA;
let diceB;

// --------------------
// 직업 카드
// --------------------
let jobDeck = [];
let myCards = [];
let selectedCard = null;
let flyingCard = null;
let nextCardId = 1;

const CARD_W = 130;
const CARD_H = 180;
const MAX_HAND = 5;

function preload() {
  // p5.js 프로젝트에 JPG 파일을 업로드해야 합니다.
  diceSheet = loadImage("2307-w019-n002-1160B-p15-1160.jpg");
}

function setup() {
  createCanvas(1200, 820);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CORNER);

  buildDiceFrames();

  homeIcons = [
    {
      type: "dice",
      label: "주사위",
      action: () => {
        page = 2;
      }
    },
    {
      type: "job",
      label: "직업카드",
      action: () => {
        page = 3;
      }
    }
  ];

  diceA = createDice(width / 2 - 170, height / 2 + 10, 260);
  diceB = createDice(width / 2 + 170, height / 2 + 10, 260);

  jobDeck = [
    {
      title: "퍼실리테이터",
      emoji: "🗣️",
      summary: "사람들이 의견을 나누고 함께 결정하도록 돕는 역할",
      description:
        "퍼실리테이터는 회의, 수업, 토론에서 사람들이 편하게 말하고 함께 생각을 정리할 수 있도록 돕는 사람입니다. 직접 정답을 말하기보다 질문을 던지고 대화를 이끌어 모두가 참여하도록 돕습니다."
    },
    {
      title: "게임기획자",
      emoji: "🎮",
      summary: "게임의 규칙, 이야기, 목표를 설계하는 사람",
      description:
        "게임기획자는 어떤 캐릭터가 나오고, 어떤 규칙으로 진행되며, 어떤 미션을 수행하는지 계획합니다. 사람들이 재미있게 게임할 수 있도록 전체 구조를 만드는 직업입니다."
    },
    {
      title: "드론조종사",
      emoji: "🚁",
      summary: "드론을 조종해 촬영·점검·탐사를 하는 사람",
      description:
        "드론조종사는 드론을 안전하게 조종하여 사진과 영상을 찍거나 시설을 점검하고 넓은 지역을 살펴보는 일을 합니다. 기술 이해와 안전수칙이 모두 중요합니다."
    },
    {
      title: "데이터사이언티스트",
      emoji: "📊",
      summary: "많은 정보를 분석해 의미 있는 답을 찾는 사람",
      description:
        "데이터사이언티스트는 다양한 데이터를 분석하여 사람들이 궁금해하는 문제의 답을 찾습니다. 어떤 상품이 인기 있는지, 어떤 변화가 생길지를 예측하는 데 도움을 줍니다."
    },
    {
      title: "스마트팜관리자",
      emoji: "🌱",
      summary: "기술을 활용해 농작물을 효율적으로 키우는 사람",
      description:
        "스마트팜관리자는 온도, 습도, 빛, 물의 양을 자동으로 조절하는 시스템을 활용해 작물을 키웁니다. 농업과 기술을 함께 이해해야 하는 직업입니다."
    },
    {
      title: "로봇개발자",
      emoji: "🤖",
      summary: "사람을 돕는 로봇을 설계하고 만드는 사람",
      description:
        "로봇개발자는 로봇이 어떤 움직임을 하고 어떤 일을 할지 설계합니다. 기계, 전자, 소프트웨어를 함께 활용해 실제로 작동하는 로봇을 만드는 직업입니다."
    },
    {
      title: "웹툰작가",
      emoji: "✍️",
      summary: "그림과 이야기로 웹툰을 만드는 사람",
      description:
        "웹툰작가는 등장인물, 이야기, 장면 구성을 생각하고 그림과 글로 작품을 완성합니다. 창의적인 아이디어와 꾸준히 작업하는 힘이 중요합니다."
    },
    {
      title: "환경컨설턴트",
      emoji: "♻️",
      summary: "환경 문제를 줄일 방법을 제안하는 사람",
      description:
        "환경컨설턴트는 공기, 물, 쓰레기, 에너지 같은 환경 문제를 살펴보고 더 나은 방법을 제안합니다. 기관이나 기업이 환경을 덜 해치도록 돕는 역할을 합니다."
    },
    {
      title: "도서관사서",
      emoji: "📚",
      summary: "책과 정보를 찾기 쉽게 정리하고 안내하는 사람",
      description:
        "도서관사서는 책을 분류하고, 필요한 자료를 찾도록 도와주며, 독서 프로그램을 운영하기도 합니다. 단순히 책을 보관하는 것이 아니라 정보를 연결해 주는 역할입니다."
    },
    {
      title: "기상연구원",
      emoji: "🌦️",
      summary: "날씨와 기후를 연구하고 예측하는 사람",
      description:
        "기상연구원은 비, 바람, 온도, 구름 같은 자료를 분석해 날씨 변화를 연구합니다. 재난 대비와 생활 정보 제공에도 중요한 역할을 합니다."
    },
    {
      title: "수의사",
      emoji: "🐶",
      summary: "동물의 건강을 돌보고 치료하는 사람",
      description:
        "수의사는 반려동물과 다양한 동물의 건강을 살피고 치료합니다. 예방접종, 검사, 수술 등 동물의 생명을 지키는 중요한 일을 합니다."
    },
    {
      title: "특수교사",
      emoji: "🧩",
      summary: "학생의 특성과 필요에 맞게 배우도록 돕는 교사",
      description:
        "특수교사는 학생마다 다른 학습 방법과 지원이 필요하다는 점을 고려해 맞춤형 수업을 진행합니다. 학생이 스스로 성장하도록 돕는 중요한 역할을 합니다."
    },
    {
      title: "도시재생전문가",
      emoji: "🏙️",
      summary: "오래된 지역을 더 살기 좋게 바꾸는 사람",
      description:
        "도시재생전문가는 낡은 건물, 골목, 지역 시설을 새롭게 바꾸는 계획을 세웁니다. 주민들이 더 편리하고 안전하게 생활할 수 있도록 공간을 다시 디자인합니다."
    },
    {
      title: "유전자연구원",
      emoji: "🧬",
      summary: "생명체의 유전 정보를 연구하는 사람",
      description:
        "유전자연구원은 생명체의 특징과 질병, 유전 원리를 연구합니다. 의학, 생명과학, 농업 등 여러 분야에서 중요한 정보를 찾는 역할을 합니다."
    },
    {
      title: "소방관",
      emoji: "🚒",
      summary: "화재와 사고 현장에서 사람을 돕고 구조하는 사람",
      description:
        "소방관은 화재를 끄는 일뿐 아니라 사고 현장에서 구조 활동을 하고 응급 상황에 대응합니다. 사람들의 생명과 안전을 지키는 매우 중요한 직업입니다."
    }
  ];

  diceA.value = floor(random(1, 7));
  diceB.value = floor(random(1, 7));
  diceA.frameIndex = valueFrameMap[diceA.value];
  diceB.frameIndex = valueFrameMap[diceB.value];
}

function draw() {
  drawBackground();

  if (page === 1) {
    drawHomePage();
  } else if (page === 2) {
    updateDiceAnimation(diceA);
    updateDiceAnimation(diceB);
    drawDicePage();
  } else if (page === 3) {
    updateFlyingCard();
    drawJobCardPage();
  }
}

function mousePressed() {
  if (page === 1) {
    checkHomeIconClick();
  } else if (page === 2) {
    handleDicePageClick();
  } else if (page === 3) {
    handleJobPageClick();
  }
}

// ======================================================
// 배경
// ======================================================
function drawBackground() {
  background(243, 246, 251);

  noStroke();
  fill(233, 239, 247);
  ellipse(140, 140, 260, 260);
  ellipse(width - 140, 150, 220, 220);
  ellipse(width / 2, height + 40, 980, 340);
  ellipse(width / 2, -20, 500, 120);
}

// ======================================================
// 주사위 프레임 만들기
// 업로드한 JPG는 5열 x 2행 배치 구조로 사용
// ======================================================

function buildDiceFrames() {
  diceFrames = [];

  let cellW = diceSheet.width / DICE_COLS;
  let cellH = diceSheet.height / DICE_ROWS;

  for (let r = 0; r < DICE_ROWS; r++) {
    for (let c = 0; c < DICE_COLS; c++) {
      diceFrames.push({
        sx: c * cellW,
        sy: r * cellH,
        sw: cellW,
        sh: cellH
      });
    }
  }
}


function createDice(x, y, size) {
  return {
    x: x,
    y: y,
    size: size,
    value: 1,
    frameIndex: 0,
    targetValue: 1,
    timer: 0,
    duration: 0,
    animating: false,
    rot: 0,
    scaleNow: 1,
    bounceY: 0,
    finalFrame: 0
  };
}

// ======================================================
// 1. 시작 화면
// ======================================================
function drawHomePage() {
  fill(35);
  textSize(38);
  text("시작 화면", width / 2, 85);

  fill(92);
  textSize(18);
  text("아이콘을 눌러 기능을 선택하세요", width / 2, 125);

  drawCenteredIcons(homeIcons, width / 2, height / 2 + 15, 140, 58);
}

function drawCenteredIcons(iconList, centerX, centerY, iconSize, gap) {
  let positions = getCenteredIconPositions(iconList.length, centerX, centerY, iconSize, gap);

  for (let i = 0; i < iconList.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    let hover = isInsideRect(mouseX, mouseY, x, y, iconSize, iconSize + 18);

    noStroke();
    fill(0, 18);
    rect(x, y + 12, iconSize, iconSize + 18, 26);

    stroke(185);
    strokeWeight(2);
    fill(255);
    rect(x, y + (hover ? -4 : 0), iconSize, iconSize + 18, 26);

    if (iconList[i].type === "dice") {
  drawHomeDiceIcon(x, y - 18 + (hover ? -4 : 0), 82);
} else if (iconList[i].type === "job") {
  drawHomeJobCardIcon(x, y - 18 + (hover ? -4 : 0), 70);
}

noStroke();
fill(40);
textSize(18);
text(iconList[i].label, x, y + 42 + (hover ? -4 : 0));
  }
}

function drawHomeDiceIcon(x, y, size) {
  push();
  translate(x, y - 8);
  rotate(-0.08);

  noStroke();
  fill(0, 18);
  ellipse(8, 38, size * 0.9, 20);

  imageMode(CENTER);

  let f = diceFrames[HOME_DICE_FRAME];
  image(
    diceSheet,
    0,
    0,
    size,
    size,
    f.sx,
    f.sy,
    f.sw,
    f.sh
  );

  pop();
}



function drawHomeJobCardIcon(x, y, size) {
  push();
  translate(x, y);

  drawCardBack(10, -8, size, size * 1.2, 0.08);
  drawCardBack(0, 0, size, size * 1.2, -0.04);

  pop();
}

function getCenteredIconPositions(count, centerX, centerY, iconSize, gap) {
  let positions = [];
  let totalWidth = count * iconSize + (count - 1) * gap;
  let startX = centerX - totalWidth / 2 + iconSize / 2;

  for (let i = 0; i < count; i++) {
    positions.push({
      x: startX + i * (iconSize + gap),
      y: centerY
    });
  }
  return positions;
}

function checkHomeIconClick() {
  let iconSize = 140;
  let gap = 58;
  let positions = getCenteredIconPositions(homeIcons.length, width / 2, height / 2 + 15, iconSize, gap);

  for (let i = 0; i < homeIcons.length; i++) {
    if (isInsideRect(mouseX, mouseY, positions[i].x, positions[i].y, iconSize, iconSize + 18)) {
      homeIcons[i].action();
      return;
    }
  }
}

// ======================================================
// 2. 주사위 페이지
// ======================================================
function drawDicePage() {
  fill(35);
  textSize(32);
  text("주사위", width / 2, 60);

  fill(92);
  textSize(18);
  if (diceA.animating || diceB.animating) {
    text("주사위를 굴리는 중입니다", width / 2, 95);
  } else {
    text("주사위를 클릭하면 굴러갑니다", width / 2, 95);
  }

  drawButton(100, 45, 120, 44, "뒤로가기");

  drawImageDice(diceA);
  drawImageDice(diceB);

  drawDiceResultPanel(width / 2, height - 120);

  fill(80);
  textSize(17);
  text("이미지 주사위 + 굴러가는 애니메이션이 적용된 버전입니다", width / 2, height - 45);
}

//주사이 이미지 수정

function drawImageDice(d) {
  let boxSize = d.size;
  let boxX = d.x;
  let boxY = d.y - d.bounceY;

  let boxLeft = boxX - boxSize / 2;
  let boxTop = boxY - boxSize / 2;

  // 클리핑 여백
  let clipLeftPad = 4;
  let clipRightPad = 4;
  let clipTopPad = 10;
  let clipBottomPad = 4;

  // 이미지 표시 크기와 위치
  let imgSize = d.size * 0.92;
  let imgYOffset = 12;

  push();

  // 흰 박스
  noStroke();
  fill(255);
  rect(boxX, boxY, boxSize, boxSize, 0);

  // 박스 안쪽만 보이도록 자르기
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(
    boxLeft + clipLeftPad,
    boxTop + clipTopPad,
    boxSize - clipLeftPad - clipRightPad,
    boxSize - clipTopPad - clipBottomPad
  );
  drawingContext.clip();

  translate(boxX, boxY);
  rotate(d.rot);
  scale(d.scaleNow);

  imageMode(CENTER);

  let f = diceFrames[d.frameIndex];
  image(
    diceSheet,
    0,
    imgYOffset,
    imgSize,
    imgSize,
    f.sx,
    f.sy,
    f.sw,
    f.sh
  );

  drawingContext.restore();

  // 위쪽 혹시 남는 부분 한 번 더 흰색으로 덮기
  noStroke();
  fill(255);
  rect(boxX, boxTop + 5, boxSize, 12, 0);

  pop();

  // 숫자 표시
  noStroke();
  fill(255);
  rect(d.x, d.y + d.size / 2 + 34, 72, 42, 20);

  fill(35);
  textSize(22);
  text(d.value, d.x, d.y + d.size / 2 + 34);
}

function drawDiceResultPanel(x, y) {
  noStroke();
  fill(0, 14);
  rect(x + 8, y + 8, 300, 86, 20);

  stroke(185);
  strokeWeight(2);
  fill(255);
  rect(x, y, 300, 86, 20);

  noStroke();
  fill(70);
  textSize(16);
  text("결과", x, y - 18);

  fill(35);
  textSize(24);
  text(diceA.value + "  +  " + diceB.value + "  =  " + (diceA.value + diceB.value), x, y + 18);
}

function startDiceRoll() {
  if (diceA.animating || diceB.animating) return;

  startSingleDiceRoll(diceA, int(random(30, 42)));
  startSingleDiceRoll(diceB, int(random(34, 46)));
}

function startSingleDiceRoll(d, dur) {
  d.animating = true;
  d.timer = 0;
  d.duration = dur;
  d.targetValue = floor(random(1, 7));
  d.finalFrame = valueFrameMap[d.targetValue];
}

function updateDiceAnimation(d) {
  if (!d.animating) {
    d.rot *= 0.82;
    d.scaleNow = lerp(d.scaleNow, 1, 0.2);
    d.bounceY = lerp(d.bounceY, 0, 0.2);
    return;
  }

  d.timer++;

  // 굴러가는 느낌
  d.frameIndex = floor(random(diceFrames.length));
  d.rot = sin(frameCount * 0.55 + d.x * 0.01) * 0.18;
  d.scaleNow = 1 + abs(sin(d.timer * 0.45)) * 0.06;
  d.bounceY = abs(sin(d.timer * 0.38)) * 18;

  if (d.timer >= d.duration) {
    d.animating = false;
    d.value = d.targetValue;
    d.frameIndex = d.finalFrame;
    d.rot = 0;
    d.scaleNow = 1;
    d.bounceY = 0;
  }
}

function handleDicePageClick() {
  if (isInsideRect(mouseX, mouseY, 100, 45, 120, 44)) {
    page = 1;
    return;
  }

  let hitSize = 260;

  if (
    isInsideRect(mouseX, mouseY, diceA.x, diceA.y, hitSize, hitSize) ||
    isInsideRect(mouseX, mouseY, diceB.x, diceB.y, hitSize, hitSize)
  ) {
    startDiceRoll();
  }
}

// ======================================================
// 3. 직업 카드 페이지
// ======================================================
function drawJobCardPage() {
  fill(35);
  textSize(32);
  text("직업 카드", width / 2, 52);

  fill(92);
  textSize(17);
  text("카드 더미를 눌러 뽑고, 내 카드 중 하나를 눌러 설명을 확인하세요", width / 2, 86);

  drawButton(100, 42, 120, 42, "뒤로가기");
  drawButton(width - 110, 42, 132, 42, "카드 비우기");

  drawDeckArea();
  drawHandArea();
  drawDescriptionPanel();

  if (flyingCard) {
    drawFlyingCard();
  }
}

function drawDeckArea() {
  let deckX = 190;
  let deckY = 270;
  let hover = isInsideRect(mouseX, mouseY, deckX, deckY, CARD_W + 30, CARD_H + 30);

  fill(45);
  textSize(22);
  text("카드 더미", deckX, 118);

  // 더미 그림자
  noStroke();
  fill(0, 16);
  rect(deckX + 10, deckY + 12, CARD_W + 16, CARD_H + 16, 16);

  // 카드 더미 (교육용 카드 뒷면)
  drawCardBack(deckX + 12, deckY - 10, CARD_W, CARD_H, 0.10);
  drawCardBack(deckX + 6, deckY - 5, CARD_W, CARD_H, 0.05);
  drawCardBack(deckX, deckY + (hover ? -6 : 0), CARD_W, CARD_H, 0);

  fill(90);
  textSize(15);
  if (flyingCard) {
    text("카드가 날아오는 중", deckX, 388);
  } else if (myCards.length < MAX_HAND) {
    text("클릭해서 1장 뽑기", deckX, 388);
  } else {
    text("최대 5장까지 보관 가능", deckX, 388);
  }

  fill(70);
  textSize(15);
  text("내 카드: " + myCards.length + " / " + MAX_HAND, deckX, 416);
}

function drawCardBack(x, y, w, h, angleValue) {
  push();
  translate(x, y);
  rotate(angleValue);

  stroke(80, 110, 185);
  strokeWeight(2);
  fill(104, 136, 221);
  rect(0, 0, w, h, 14);

  noStroke();
  fill(132, 158, 232);
  rect(0, 0, w - 18, h - 18, 12);

  stroke(255, 150);
  strokeWeight(1.5);
  noFill();
  rect(0, 0, w - 28, h - 28, 10);

  noStroke();
  fill(255, 230);
  textSize(16);
  text("JOB", 0, 40);

  textSize(26);
  text("⭐", 0, -26);

  fill(255, 235);
  circle(-30, -5, 10);
  circle(30, -5, 10);
  circle(-18, 18, 8);
  circle(18, 18, 8);

  pop();
}

function drawHandArea() {
  fill(45);
  textSize(22);
  text("내 앞의 카드", width / 2, 495);

  let positions = getHandPositions();

  for (let i = 0; i < MAX_HAND; i++) {
    let x = positions[i].x;
    let y = positions[i].y;

    if (i < myCards.length) {
      let isSelected = selectedCard && selectedCard.id === myCards[i].id;
      drawFrontCard(myCards[i], x, y, isSelected);
    } else {
      stroke(212);
      strokeWeight(2);
      fill(249);
      rect(x, y, CARD_W, CARD_H, 12);

      noStroke();
      fill(175);
      textSize(14);
      text("빈 자리", x, y);
    }
  }
}

function drawFrontCard(card, x, y, isSelected) {
  let drawY = isSelected ? y - 12 : y;

  noStroke();
  fill(0, 16);
  rect(x, drawY + 8, CARD_W, CARD_H, 12);

  stroke(isSelected ? 70 : 132);
  strokeWeight(isSelected ? 4 : 2);
  fill(255);
  rect(x, drawY, CARD_W, CARD_H, 12);

  noStroke();
  textSize(38);
  text(card.emoji, x, drawY - 46);

  fill(35);
  textSize(17);
  text(card.title, x, drawY + 14);

  fill(110);
  textSize(12);
  text("눌러서 설명 보기", x, drawY + 60);
}

function drawDescriptionPanel() {
  let panelX = 835;
  let panelY = 270;
  let panelW = 610;
  let panelH = 320;

  let left = panelX - panelW / 2;
  let top = panelY - panelH / 2;
  let pad = 28;
  let innerW = panelW - pad * 2;

  // 그림자
  noStroke();
  fill(0, 16);
  rect(panelX + 8, panelY + 8, panelW, panelH, 18);

  // 본체
  stroke(182);
  strokeWeight(2);
  fill(255);
  rect(panelX, panelY, panelW, panelH, 18);

  // 카드가 선택되지 않았을 때
  if (!selectedCard) {
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    fill(120);
    textSize(22);
    text("카드를 선택하세요", panelX, panelY - 24);

    fill(142);
    textSize(16);
    text("내 앞에 놓인 직업카드를 누르면\n이곳에 직업 설명이 표시됩니다.", panelX, panelY + 34);
    pop();
    return;
  }

  push();
  textAlign(LEFT, TOP);

  // 제목
  noStroke();
  fill(35);
  textSize(28);
  text(selectedCard.emoji + " " + selectedCard.title, left + pad, top + 22);

  // 한 줄 소개 제목
  fill(90);
  textSize(15);
  text("한 줄 소개", left + pad, top + 78);

  // 한 줄 소개 내용
  fill(45);
  textSize(17);
  drawWrappedTextBlock(selectedCard.summary, left + pad, top + 104, innerW, 26, 2);

  // 직업 설명 제목
  fill(90);
  textSize(15);
  text("직업 설명", left + pad, top + 162);

  // 직업 설명 내용
  fill(45);
  textSize(16);
  drawWrappedTextBlock(selectedCard.description, left + pad, top + 188, innerW, 24, 4);

  pop();
}

function drawWrappedTextBlock(str, x, y, maxWidth, lineHeight, maxLines) {
  let lines = [];
  let current = "";
  let chars = Array.from(str);

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i];

    if (ch === "\n") {
      lines.push(current);
      current = "";
      continue;
    }

    let testLine = current + ch;

    if (textWidth(testLine) > maxWidth && current !== "") {
      lines.push(current);
      current = ch;

      if (maxLines && lines.length >= maxLines) {
        break;
      }
    } else {
      current = testLine;
    }
  }

  if ((!maxLines || lines.length < maxLines) && current !== "") {
    lines.push(current);
  }

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, y + i * lineHeight);
  }
}

function handleJobPageClick() {
  if (isInsideRect(mouseX, mouseY, 100, 42, 120, 42)) {
    page = 1;
    return;
  }

  if (isInsideRect(mouseX, mouseY, width - 110, 42, 132, 42)) {
    if (!flyingCard) {
      myCards = [];
      selectedCard = null;
    }
    return;
  }

  // 카드 더미 클릭
  if (isInsideRect(mouseX, mouseY, 190, 270, CARD_W + 30, CARD_H + 30)) {
    startFlyingJobCard();
    return;
  }

  // 내 카드 클릭
  let positions = getHandPositions();
  for (let i = 0; i < myCards.length; i++) {
    if (isInsideRect(mouseX, mouseY, positions[i].x, positions[i].y, CARD_W, CARD_H)) {
      if (selectedCard && selectedCard.id === myCards[i].id) {
        selectedCard = null;
      } else {
        selectedCard = myCards[i];
      }
      return;
    }
  }
}

function startFlyingJobCard() {
  if (flyingCard) return;
  if (myCards.length >= MAX_HAND) return;

  let slot = getHandPositions()[myCards.length];
  let picked = getRandomJobCard();

  flyingCard = {
    card: picked,
    startX: 190,
    startY: 270,
    endX: slot.x,
    endY: slot.y,
    p: 0,
    startRot: random(-0.35, 0.35),
    endRot: random(-0.05, 0.05),
    startScale: 0.86,
    endScale: 1.0
  };
}

function updateFlyingCard() {
  if (!flyingCard) return;

  flyingCard.p += 0.08;

  if (flyingCard.p >= 1) {
    flyingCard.p = 1;
    myCards.push(flyingCard.card);
    flyingCard = null;
  }
}

function drawFlyingCard() {
  if (!flyingCard) return;

  let t = easeOutCubic(flyingCard.p);
  let x = lerp(flyingCard.startX, flyingCard.endX, t);
  let y = lerp(flyingCard.startY, flyingCard.endY, t) - sin(t * PI) * 120;
  let rot = lerp(flyingCard.startRot, flyingCard.endRot, t);
  let sc = lerp(flyingCard.startScale, flyingCard.endScale, t);

  push();
  translate(x, y);
  rotate(rot);
  scale(sc);

  drawFrontCardAtOrigin(flyingCard.card);

  pop();
}

function drawFrontCardAtOrigin(card) {
  noStroke();
  fill(0, 16);
  rect(0, 8, CARD_W, CARD_H, 12);

  stroke(132);
  strokeWeight(2);
  fill(255);
  rect(0, 0, CARD_W, CARD_H, 12);

  noStroke();
  textSize(38);
  text(card.emoji, 0, -46);

  fill(35);
  textSize(17);
  text(card.title, 0, 14);

  fill(110);
  textSize(12);
  text("새 카드", 0, 60);
}

function getRandomJobCard() {
  let available = jobDeck.filter(job => {
    return !myCards.some(card => card.title === job.title);
  });

  if (available.length === 0) {
    available = jobDeck;
  }

  let base = random(available);
  return {
    id: nextCardId++,
    title: base.title,
    emoji: base.emoji,
    summary: base.summary,
    description: base.description
  };
}

function getHandPositions() {
  let positions = [];
  let gap = 18;
  let totalWidth = MAX_HAND * CARD_W + (MAX_HAND - 1) * gap;
  let startX = width / 2 - totalWidth / 2 + CARD_W / 2;
  let y = 640;

  for (let i = 0; i < MAX_HAND; i++) {
    positions.push({
      x: startX + i * (CARD_W + gap),
      y: y
    });
  }

  return positions;
}

// ======================================================
// 버튼 / 유틸
// ======================================================
function drawButton(x, y, w, h, label) {
  let hover = isInsideRect(mouseX, mouseY, x, y, w, h);

  noStroke();
  fill(0, 14);
  rect(x, y + 5, w, h, 12);

  stroke(120);
  strokeWeight(2);
  fill(hover ? 248 : 255);
  rect(x, y, w, h, 12);

  noStroke();
  fill(40);
  textSize(17);
  text(label, x, y);
}

function isInsideRect(px, py, cx, cy, w, h) {
  return (
    px > cx - w / 2 &&
    px < cx + w / 2 &&
    py > cy - h / 2 &&
    py < cy + h / 2
  );
}

function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}
