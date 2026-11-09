const bossSessionClears = new Set();
// Each chapter is a boss encounter. Reading the handouts remains available.
function mountBoss(lesson) {
  const stage = LESSONS.indexOf(lesson);
  const form = document.querySelector('#quiz');
  const names = ['句型守衛','時鐘巫師','助動騎士','子句幽靈','關係魔像','假設術士','代名忍者'];
  const key = id => 'grammar-boss-clear-' + id;
  const cleared = id => { if (bossSessionClears.has(id)) return true;  try { return localStorage.getItem(key(id)) === 'yes'; } catch { return false; } };
  const next = LESSONS[stage + 1];
  const pass = Math.ceil(lesson.quiz.length * .8);
  let index = 0, score = 0;
  const arena = document.createElement('section');
  arena.className = 'boss-arena';
  form.classList.add('print-quiz');
  form.after(arena);
  arena.style.setProperty('--boss-color', ['#75e2ac','#b1a1ff','#7ed7ff','#ff9eaa','#efb778','#d4a1ff','#a9df74'][stage % 7]);
  const sprite = '<div class="boss-sprite" aria-hidden="true"><i></i><b></b><em></em></div>';
  const boss = esc(names[stage % names.length]);
  function render() {
    const locked = LESSONS.slice(0, stage).find(item => !cleared(item.id));
    arena.innerHTML = `<div class="boss-banner">${sprite}<div><span class="eyebrow">STAGE ${String(stage + 1).padStart(2,'0')} / BOSS</span><h3>${boss}</h3><p>${locked ? '先通過前面的關卡，我在這裡等你。' : '準備好了嗎？每題只有一次作答機會！'}</p></div></div><div class="boss-body"></div>`;
    const body = arena.querySelector('.boss-body');
    if (locked) {
      body.innerHTML = `<p>🔒 尚未解鎖</p><a class="primary" href="#${locked.id}/practice">挑戰 ${esc(locked.title)} ▸</a>`;
      return;
    }
    const question = lesson.quiz[index];
    if (!question) {
      const won = score >= pass;
      if (won) { bossSessionClears.add(lesson.id); try { localStorage.setItem(key(lesson.id),'yes'); localStorage.setItem('grammar-completed-'+lesson.id,'yes'); } catch {} }
      body.innerHTML = `<h3>${won ? '★ 關卡通過！' : '再挑戰一次吧！'}</h3><p>答對 ${score} / ${lesson.quiz.length} 題。通關需要答對 ${pass} 題。</p><button class="secondary" type="button">重新挑戰</button> ${won && next ? `<a class="primary" href="#${next.id}/practice">下一關 ▸</a>` : '<a class="secondary" href="#">回到關卡地圖</a>'}`;
      body.querySelector('button').onclick = () => { index = 0; score = 0; render(); };
      return;
    }
    body.innerHTML = `<p class="quest-progress">第 ${index + 1} / ${lesson.quiz.length} 題 · 已答對 ${score} 題 <progress aria-label="答題進度" value="${index}" max="${lesson.quiz.length}"></progress></p><h4 lang="en">${esc(question.question)}</h4><div class="boss-options">${question.options.map((option, i) => `<button type="button" class="secondary" data-answer="${i}">${'ABCD'[i]}. ${esc(option)}</button>`).join('')}</div><p class="source">${esc(question.source)}</p><div class="boss-feedback" role="status"></div><a class="boss-review" href="#${lesson.id}/notes">回看講義</a>`;
    body.querySelectorAll('[data-answer]').forEach(button => {
      button.onclick = () => {
        const correct = Number(button.dataset.answer) === question.answer;
        score += Number(correct);
        body.querySelectorAll('[data-answer]').forEach(option => {
          option.disabled = true;
          if (Number(option.dataset.answer) === question.answer) option.classList.add('correct');
        });
        const feedback = body.querySelector('.boss-feedback');
        feedback.innerHTML = `<p><strong>${correct ? '命中！' : '這題失手了。'} 正解 ${'ABCD'[question.answer]}</strong><br>${esc(question.explanation)}</p><button type="button" class="primary">${index + 1 === lesson.quiz.length ? '查看結算' : '下一題 ▸'}</button>`;
        feedback.querySelector('button').onclick = () => { index++; render(); };
        feedback.querySelector('button').focus();
      };
    });
  }
  render();
}
