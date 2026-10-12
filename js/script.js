/**
 * Simulado Interativo - Tópicos Avançados em Sistemas de Informação II
 * Lógica de interação, pontuação, filtragem e verificação comentada.
 */

// Estado global do simulado
const userAnswers = {};
const answeredQuestions = new Set();
let correctCount = 0;
let wrongCount = 0;
const TOTAL_QUESTIONS = 30;

/**
 * Seleciona uma opção para a questão especificada.
 * @param {number} qNumber Número da questão
 * @param {string} option Letra da alternativa ('A', 'B', 'C', 'D')
 */
function selectOption(qNumber, option) {
    // Se a questão já foi verificada e bloqueada, não altera
    const card = document.getElementById(`q${qNumber}`);
    if (!card) return;

    userAnswers[qNumber] = option;

    // Atualiza visualmente o card de opções
    const optionItems = card.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.classList.remove('selected');
        const radio = item.querySelector('input[type="radio"]');
        if (radio && radio.value === option) {
            radio.checked = true;
            item.classList.add('selected');
        }
    });
}

/**
 * Revela o gabarito, destaca alternativas corretas/incorretas e exibe justificativa.
 * @param {number} qNumber Número da questão
 * @param {string} correctAnswer Letra correta
 * @param {string} justification Explicação acadêmica do professor
 */
function revealAnswer(qNumber, correctAnswer, justification) {
    const card = document.getElementById(`q${qNumber}`);
    if (!card) return;

    const feedbackBox = document.getElementById(`feedback_${qNumber}`);
    const optionItems = card.querySelectorAll('.option-item');
    const selected = userAnswers[qNumber];

    if (!selected) {
        alert('Por favor, selecione uma alternativa antes de verificar a resposta!');
        return;
    }

    // Destaca correta em verde e a selecionada incorreta em vermelho
    optionItems.forEach(item => {
        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
            if (radio.value === correctAnswer) {
                item.classList.add('correct-revealed');
            } else if (radio.value === selected && selected !== correctAnswer) {
                item.classList.add('incorrect-revealed');
            }
        }
    });

    const isCorrect = (selected === correctAnswer);

    // Renderiza a caixa de feedback comentada
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = `
        <div class="feedback-title ${isCorrect ? 'correto' : 'incorreto'}">
            ${isCorrect ? '✔ Parabéns! Resposta Correta' : '✖ Resposta Incorreta (Alternativa Correta: ' + correctAnswer + ')'}
        </div>
        <div class="feedback-body">
            <strong>Justificativa do Professor:</strong> ${justification}
        </div>
    `;

    // Atualiza estatísticas (somente uma vez por questão)
    if (!answeredQuestions.has(qNumber)) {
        answeredQuestions.add(qNumber);
        if (isCorrect) {
            correctCount++;
        } else {
            wrongCount++;
        }
        updateDashboard();
    }

    // Trava os inputs de rádio da questão após verificação
    const radios = card.querySelectorAll('input[type="radio"]');
    radios.forEach(r => r.disabled = true);
}

/**
 * Atualiza o painel superior fixo de estatísticas em tempo real.
 */
function updateDashboard() {
    const totalAnswered = answeredQuestions.size;
    const statTotal = document.getElementById('stat-total');
    const statCorrect = document.getElementById('stat-correct');
    const statWrong = document.getElementById('stat-wrong');
    const statAccuracy = document.getElementById('stat-accuracy');

    if (statTotal) statTotal.innerText = `${totalAnswered} / ${TOTAL_QUESTIONS}`;
    if (statCorrect) statCorrect.innerText = correctCount;
    if (statWrong) statWrong.innerText = wrongCount;

    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    if (statAccuracy) statAccuracy.innerText = `${accuracy}%`;
}

/**
 * Filtra as questões na tela por nível de dificuldade.
 * @param {string} level 'todas' | 'facil' | 'medio' | 'dificil'
 * @param {HTMLElement} btnElement Botão clicado
 */
function filterQuestions(level, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const cards = document.querySelectorAll('.question-card');
    cards.forEach(card => {
        const cardLevel = card.getAttribute('data-difficulty');
        if (level === 'todas' || cardLevel === level) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Reinicia o simulado para novo ciclo de estudos.
 */
function resetQuiz() {
    if (!confirm('Deseja realmente reiniciar todo o simulado e zerar sua pontuação?')) {
        return;
    }

    // Limpa estados
    for (let key in userAnswers) delete userAnswers[key];
    answeredQuestions.clear();
    correctCount = 0;
    wrongCount = 0;
    updateDashboard();

    // Restaura visualmente todos os cards
    const cards = document.querySelectorAll('.question-card');
    cards.forEach(card => {
        const optionItems = card.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            item.classList.remove('selected', 'correct-revealed', 'incorrect-revealed');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = false;
                radio.disabled = false;
            }
        });

        const feedbackBox = card.querySelector('.feedback-box');
        if (feedbackBox) {
            feedbackBox.style.display = 'none';
            feedbackBox.innerHTML = '';
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
