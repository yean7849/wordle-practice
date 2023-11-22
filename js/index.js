const 정답 = "IMCYS";

let attempts = 0;
let index = 0;
let 타이머 = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.classList.add("gameoverMessage");
    div.innerText = "게임이 종료됐습니다.";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(타이머);
  };

  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        block.style.background = "green";
        맞은_갯수 += 1;
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "yellow";
      } else {
        block.style.background = "gray";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover(); // 함수 호출을 위해 () 추가
    else nextline();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      handleEnterkey();
    } else if (event.key === "Enter") {
      handleEnterkey();
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handlekeydown);
}

const startTimer = () => {
  const 시작_시간 = new Date();

  function timer() {
    const 현재_시간 = new Date();
    const 흐른_시간 = new Date(현재_시간 - 시작_시간);
    const minutes = 흐른_시간.getMinutes().toString().padStart(2, "0");
    const seconds = 흐른_시간.getSeconds().toString().padStart(2, "0");

    const timeString = `${minutes}:${seconds}`;
    document.querySelector(".time").innerText = timeString;
  }

  // 이전에 생성된 타이머가 있다면 정지시킴
  clearInterval(타이머);

  // 새로운 타이머 시작
  타이머 = setInterval(timer, 1000);
};

appStart();
startTimer();
