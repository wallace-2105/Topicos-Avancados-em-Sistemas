/**
 * Simulado Interativo - Tópicos Avançados em Sistemas de Informação II
 * Modo Avaliação / Exame Pedagógico com Diagnóstico Completo de Acertos e Erros
 */

// Banco de metadados das 30 questões (respostas corretas, tópicos e justificativas)
const EXAM_DATABASE = {
    1: {
        correct: 'B',
        difficulty: 'facil',
        category: 'DevOps',
        topic: 'Cultura DevOps',
        justification: 'DevOps é uma mudança cultural fundamentada na colaboração estreita entre quem constrói o software (Dev) e quem mantém a infraestrutura (Ops). O objetivo é acelerar o lead time de entrega, elevar a estabilidade e eliminar silos departamentais por meio de automação e responsabilidade compartilhada.'
    },
    2: {
        correct: 'B',
        difficulty: 'facil',
        category: 'DevOps',
        topic: 'Integração Contínua (CI)',
        justification: 'A Integração Contínua foca na integração frequente de código ao branch principal (ao menos diariamente). Cada integração é verificada por um build e testes automatizados para que falhas de integração sejam identificadas e corrigidas rapidamente.'
    },
    3: {
        correct: 'A',
        difficulty: 'facil',
        category: 'DevOps',
        topic: 'Continuous Delivery vs Deployment',
        justification: 'Em Continuous Delivery, o pipeline automatiza testes e staging, deixando o artefato 100% pronto para produção, mas o release final depende de aprovação humana de negócio. Em Continuous Deployment, não há intervenção humana: passou em todos os testes, vai direto para produção.'
    },
    4: {
        correct: 'C',
        difficulty: 'facil',
        category: 'DevOps',
        topic: 'Containers vs Virtualização',
        justification: 'Contêineres isolam aplicações no nível de processo (utilizando namespaces e cgroups do Linux), compartilhando o mesmo kernel do SO hospedeiro, dispensando o overhead de executar um SO completo por instância como ocorre nas VMs.'
    },
    5: {
        correct: 'A',
        difficulty: 'facil',
        category: 'DevOps',
        topic: 'Infraestrutura como Código (IaC)',
        justification: 'IaC trata a infraestrutura com os mesmos rigores do código de software: definições em arquivos de texto, controle de versão (Git), testes automatizados, repetibilidade e eliminação de configuração manual propensa a erros.'
    },
    6: {
        correct: 'B',
        difficulty: 'facil',
        category: 'Design Thinking',
        topic: 'Tripé da Inovação',
        justification: 'A inovação pelo Design Thinking ocorre na interseção do que é Desejável pelos usuários (humano), Factível pela tecnologia existente (técnico) e Viável para o modelo de negócios sustentável (econômico).'
    },
    7: {
        correct: 'B',
        difficulty: 'facil',
        category: 'Design Thinking',
        topic: 'Pilares do Design Thinking',
        justification: 'Os pilares do Design Thinking são: Empatia (compreender profundamente as dores e o contexto do outro), Colaboração (equipes multidisciplinares co-criando) e Experimentação (aprender rápido errando cedo e barato por meio de protótipos).'
    },
    8: {
        correct: 'C',
        difficulty: 'facil',
        category: 'Design Thinking',
        topic: 'Matriz CSD',
        justification: 'A Matriz CSD organiza o conhecimento inicial da equipe em Certezas (o que já é fato comprovado), Suposições (o que o time acredita ou supõe, mas precisa testar/validar) e Dúvidas (o que ainda é totalmente desconhecido e exige pesquisa exploratória).'
    },
    9: {
        correct: 'B',
        difficulty: 'facil',
        category: 'Ágil e Qualidade',
        topic: 'Scrum (Product Owner)',
        justification: 'O Product Owner (PO) é a voz do negócio e do usuário perante o Scrum Team. Cabe exclusivamente a ele definir prioridades, manter o Product Backlog transparente e maximizar o retorno de valor entregue pela equipe.'
    },
    10: {
        correct: 'A',
        difficulty: 'facil',
        category: 'Ágil e Qualidade',
        topic: 'Governança ITIL',
        justification: 'O ITIL é uma biblioteca de práticas amplamente adotada mundialmente para ITSM. Ele padroniza a gestão do ciclo de vida dos serviços de TI (incidentes, problemas, mudanças, requisições) com foco na co-criação de valor.'
    },
    11: {
        correct: 'B',
        difficulty: 'medio',
        category: 'DevOps',
        topic: 'Terraform vs Ansible',
        justification: 'Terraform é excelente para orquestração/provisionamento de infraestrutura (criar VMs, VPCs, balanceadores mantendo o estado de infra), enquanto Ansible é ideal para gerenciamento de configuração (configurar o SO, usuários e pacotes das máquinas criadas).'
    },
    12: {
        correct: 'A',
        difficulty: 'medio',
        category: 'DevOps',
        topic: 'Kubernetes (Pod)',
        justification: 'O Pod é a unidade atômica no Kubernetes. Contêineres no mesmo Pod compartilham o mesmo contexto de rede (localhost entre si com o mesmo IP do Pod) e podem compartilhar volumes de armazenamento declarados.'
    },
    13: {
        correct: 'B',
        difficulty: 'medio',
        category: 'DevOps',
        topic: 'Pipeline CI/CD',
        justification: 'O pipeline deve seguir o princípio do fail fast (falhe rápido com menor custo): validações estáticas e testes unitários rodam primeiro (rápidos e baratos), seguidos por integração, deploy em ambientes intermediários e, por fim, produção.'
    },
    14: {
        correct: 'A',
        difficulty: 'medio',
        category: 'DevOps',
        topic: 'Tripé da Observabilidade',
        justification: 'O tripé da observabilidade é composto por Métricas (dados numéricos agregados ao longo do tempo), Logs (registros pontuais de eventos com contexto) e Tracing (o caminho completo que uma requisição percorre através dos microsserviços).'
    },
    15: {
        correct: 'B',
        difficulty: 'medio',
        category: 'Design Thinking',
        topic: 'Imersão (Shadowing)',
        justification: 'O Shadowing (sombreamento) coloca o pesquisador como uma sombra do usuário em seu ambiente real, permitindo capturar o que os usuários realmente fazem (que frequentemente difere do que dizem em entrevistas formais).'
    },
    16: {
        correct: 'C',
        difficulty: 'medio',
        category: 'Design Thinking',
        topic: 'Síntese (Mapa de Empatia)',
        justification: 'O Mapa de Empatia é a ferramenta central de síntese que sintetiza as observações da imersão em quadrantes humanizados (o que vê, ouve, pensa/sente, diz/faz, além de dores e necessidades), servindo de base para a criação de personas.'
    },
    17: {
        correct: 'B',
        difficulty: 'medio',
        category: 'Design Thinking',
        topic: 'Protótipos de Baixa Fidelidade',
        justification: 'Protótipos de baixa fidelidade são rápidos e baratos de criar e descartar. Eles focam em testar a ideia e o fluxo macro. Como não parecem acabados, os usuários e stakeholders sentem-se mais à vontade para criticar e sugerir mudanças profundas.'
    },
    18: {
        correct: 'B',
        difficulty: 'medio',
        category: 'Design Thinking',
        topic: 'Protótipos de Alta Fidelidade',
        justification: 'A alta fidelidade se justifica para validar detalhes de interface gráfica, testar a percepção de valor com usuários reais de forma quase idêntica ao produto final e orientar a implementação precisa pela engenharia de software antes do código definitivo ser escrito.'
    },
    19: {
        correct: 'D',
        difficulty: 'medio',
        category: 'Ágil e Qualidade',
        topic: 'Scrum (Sprint Retrospective)',
        justification: 'A Sprint Retrospective foca na melhoria contínua do time e dos processos (ao contrário da Sprint Review, que foca no incremento de produto entregue aos stakeholders). Na retrospectiva, o time discute o que funcionou bem, o que falhou e o que fará de diferente na próxima Sprint.'
    },
    20: {
        correct: 'B',
        difficulty: 'medio',
        category: 'DevOps',
        topic: 'Métricas DORA',
        justification: 'As métricas DORA equilibram velocidade (Deployment Frequency e Lead Time for Changes) com estabilidade/confiabilidade (Change Failure Rate e Time to Restore Service). Times de alta performance entregam rápido com baixíssima taxa de erro e rápida recuperação.'
    },
    21: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'DevOps + Design Thinking Integrados',
        justification: 'DevOps garante entrega rápida e com alta qualidade técnica de código. Contudo, se as etapas de Imersão e Testes de Design Thinking forem ignoradas, a organização apenas construirá coisas inúteis ou indesejadas em velocidade recorde. Eficiência técnica sem desejabilidade resulta em produto fracassado.'
    },
    22: {
        correct: 'C',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'IaC Drift & Governança',
        justification: 'Mudanças manuais fora do controle de versão criam Drift e quebram a reprodutibilidade. A boa prática é tratar a alteração de emergência: se válida, deve ser imediatamente refletida no código do Terraform e versionada no Git, reforçando políticas de que nenhum humano deve ter acesso de escrita direta em produção.'
    },
    23: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'Estratégia Canary Deployment',
        justification: 'O Canary Deployment introduz a nova versão para uma fração mínima do tráfego real (ex: 5%), funcionando como o canário nas minas de carvão. Se houver anomalia, o impacto atinge apenas 5% dos usuários e o rollback é imediato; se estável, o tráfego é ampliado progressivamente.'
    },
    24: {
        correct: 'C',
        difficulty: 'dificil',
        category: 'Design Thinking',
        topic: 'Matriz CSD em Arquitetura',
        justification: 'Certezas só são itens com evidências e dados empíricos irrefutáveis. Afirmar que a nuvem reduzirá 50% sem modelagem é mera Suposição (ou desejo). Perguntas sem resposta são Dúvidas objetivas. Essa clareza orienta o que precisa ser pesquisado antes de comprometer o orçamento.'
    },
    25: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'Ágil e Qualidade',
        topic: 'ITIL x DevOps (Mudanças Padrão)',
        justification: 'O ITIL 4 prevê as Mudanças Padrão (baixo risco, repetíveis, com procedimento testado). Quando o pipeline de CI/CD atesta segurança, testes e conformidade, a mudança é pré-aprovada e executada automaticamente, reservando a atenção do CAB para mudanças de alto impacto.'
    },
    26: {
        correct: 'A',
        difficulty: 'dificil',
        category: 'Design Thinking',
        topic: 'Feature Flags & Experimentação Real',
        justification: 'Essa é a união perfeita entre DT e DevOps: o pilar de Experimentação (testar hipóteses com usuários reais) ganha escalabilidade e segurança técnica através de Feature Flags e deploys contínuos, reduzindo drasticamente o risco financeiro e de produto.'
    },
    27: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'Observabilidade (SLIs/SLOs e Usuário)',
        justification: 'SLIs e SLOs devem refletir a satisfação do usuário. Um sistema lento a ponto de ser inútil é indistinguível de um sistema fora do ar do ponto de vista do cliente. Bons SLOs mensuram tanto sucesso quanto latência máxima aceitável.'
    },
    28: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'Design Thinking',
        topic: 'Síntese DT & Arquitetura Offline-First',
        justification: 'No Design Thinking, a síntese do problema define a direção estratégica. Aqui, o requisito de ponta é a tolerância a falhas de conexão, direcionando imediatamente os arquitetos para soluções Offline-First (CRDTs, SQLite local, Service Workers, sincronização em background).'
    },
    29: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'DevSecOps & Velocidade de Pipeline',
        justification: 'Em DevSecOps, o feedback rápido do desenvolvedor é sagrado. Scanners lentos (como DAST completo) jamais devem bloquear o fluxo síncrono de commit/PR diário. A arquitetura de esteira deve paralelizar e desacoplar verificações pesadas em jobs assíncronos programados.'
    },
    30: {
        correct: 'B',
        difficulty: 'dificil',
        category: 'DevOps',
        topic: 'Post-Mortem Blameless & Resiliência',
        justification: 'Na cultura DevOps e no Design Thinking, assume-se que seres humanos erram inevitavelmente. A engenharia responsável busca entender por que o sistema facilitou ou permitiu que uma única ação humana causasse uma catástrofe. O foco do Post-mortem Sem Culpa é o aprimoramento contínuo das defesas do sistema.'
    }
};

// Estado da sessão do simulado
const userAnswers = {};
let isExamSubmitted = false;
const TOTAL_QUESTIONS = 30;

/**
 * Seleciona a opção do usuário durante a prova.
 * @param {number} qNumber Número da questão (1 a 30)
 * @param {string} option Opção selecionada ('A', 'B', 'C', 'D')
 */
function selectOption(qNumber, option) {
    if (isExamSubmitted) return; // Não altera após envio

    userAnswers[qNumber] = option;

    const card = document.getElementById(`q${qNumber}`);
    if (!card) return;

    const optionItems = card.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.classList.remove('selected');
        const radio = item.querySelector('input[type="radio"]');
        if (radio && radio.value === option) {
            radio.checked = true;
            item.classList.add('selected');
        }
    });

    updateExamProgress();
}

/**
 * Atualiza o painel superior de progresso enquanto o aluno responde.
 */
function updateExamProgress() {
    const answeredCount = Object.keys(userAnswers).length;
    const statTotal = document.getElementById('stat-total');
    const progressBarFill = document.getElementById('progress-bar-fill');

    if (statTotal) {
        statTotal.innerText = `${answeredCount} / ${TOTAL_QUESTIONS}`;
    }

    if (progressBarFill) {
        const percentage = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
        progressBarFill.style.width = `${percentage}%`;
    }
}

/**
 * Finaliza e avalia o simulado completo.
 * Exibe relatório de acertos, erros, análise por dificuldade, por tópico e pontos a reforçar.
 */
function submitExam() {
    if (isExamSubmitted) {
        alert('Este simulado já foi finalizado! Caso queira realizar novamente, clique no botão "Reiniciar".');
        return;
    }

    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < TOTAL_QUESTIONS) {
        const confirmSend = confirm(
            `Atenção: Você respondeu ${answeredCount} de ${TOTAL_QUESTIONS} questões.\n\n` +
            `Para obter o diagnóstico de aprendizado mais preciso para a sua prova, é altamente recomendável responder todas as 30.\n\n` +
            `Deseja finalizar e enviar o simulado mesmo assim?`
        );
        if (!confirmSend) return;
    }

    isExamSubmitted = true;

    // Métricas para o relatório
    let totalCorrect = 0;
    let totalWrong = 0;

    const diffStats = {
        facil: { correct: 0, total: 10 },
        medio: { correct: 0, total: 10 },
        dificil: { correct: 0, total: 10 }
    };

    const categoryStats = {
        'DevOps': { correct: 0, total: 0 },
        'Design Thinking': { correct: 0, total: 0 },
        'Ágil e Qualidade': { correct: 0, total: 0 }
    };

    const strengthsList = [];
    const reviewList = [];

    // Avalia cada questão individualmente
    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
        const meta = EXAM_DATABASE[q];
        const selected = userAnswers[q];
        const isCorrect = (selected === meta.correct);

        // Contabiliza categorias
        categoryStats[meta.category].total++;
        if (isCorrect) {
            totalCorrect++;
            diffStats[meta.difficulty].correct++;
            categoryStats[meta.category].correct++;
        } else {
            totalWrong++;
            reviewList.push({
                qNumber: q,
                topic: meta.topic,
                category: meta.category,
                userAns: selected || 'Não respondida',
                correctAns: meta.correct,
                justification: meta.justification
            });
        }

        // Revela o gabarito visual no card da questão
        revealQuestionFeedback(q, meta.correct, selected, meta.justification, isCorrect);
    }

    // Identifica pontos fortes
    for (const [catName, catData] of Object.entries(categoryStats)) {
        const pct = Math.round((catData.correct / catData.total) * 100);
        if (pct >= 70) {
            strengthsList.push(`<strong>${catName}:</strong> ${catData.correct} de ${catData.total} acertos (${pct}%). Excelente domínio conceitual.`);
        }
    }

    if (strengthsList.length === 0) {
        strengthsList.push('Você acertou questões distribuídas por todos os blocos, mas recomendamos uma revisão global dos fundamentos.');
    }

    // Renderiza o card com o Resultado Geral e Diagnóstico
    renderDiagnosticReport(totalCorrect, totalWrong, diffStats, categoryStats, strengthsList, reviewList);

    // Rola suavemente até o relatório
    const resultCard = document.getElementById('result-card');
    if (resultCard) {
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Revela a resposta comentada em cada card de questão.
 */
function revealQuestionFeedback(qNumber, correctAnswer, selectedAnswer, justification, isCorrect) {
    const card = document.getElementById(`q${qNumber}`);
    if (!card) return;

    const feedbackBox = card.querySelector('.feedback-box');
    const optionItems = card.querySelectorAll('.option-item');

    optionItems.forEach(item => {
        const radio = item.querySelector('input[type="radio"]');
        if (radio) {
            radio.disabled = true;
            if (radio.value === correctAnswer) {
                item.classList.add('correct-revealed');
            } else if (radio.value === selectedAnswer && !isCorrect) {
                item.classList.add('incorrect-revealed');
            }
        }
    });

    if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
            <div class="feedback-title ${isCorrect ? 'correto' : 'incorreto'}">
                ${isCorrect ? '✔ Acertou! (Sua resposta: ' + selectedAnswer + ')' : '✖ Errou! (Sua resposta: ' + (selectedAnswer || 'Em branco') + ' | Gabarito: ' + correctAnswer + ')'}
            </div>
            <div class="feedback-body">
                <strong>Justificativa do Professor:</strong> ${justification}
            </div>
        `;
    }
}

/**
 * Monta e exibe o painel de Diagnóstico Pedagógico de Desempenho.
 */
function renderDiagnosticReport(correct, wrong, diffStats, catStats, strengths, reviewItems) {
    const pctGeral = Math.round((correct / TOTAL_QUESTIONS) * 100);
    
    // Elementos principais
    document.getElementById('result-score-val').innerText = `${correct} / ${TOTAL_QUESTIONS}`;
    document.getElementById('result-percent-val').innerText = `${pctGeral}% de Aproveitamento`;

    let statusMsg = '';
    if (pctGeral >= 80) {
        statusMsg = '🎉 Excelente! Nível altíssimo de prontidão para gabaritar a avaliação acadêmica.';
    } else if (pctGeral >= 60) {
        statusMsg = '👍 Bom desempenho! Você atingiu a média, mas precisa reforçar os tópicos onde mais errou.';
    } else {
        statusMsg = '⚠️ Atenção: Desempenho abaixo do ideal. Recomendamos reler o Guia Teórico "Desmistificando os Desafios" antes de tentar novamente.';
    }
    document.getElementById('result-status-text').innerText = statusMsg;

    // Barras por dificuldade
    setBarValue('bar-facil', 'val-facil', diffStats.facil.correct, diffStats.facil.total);
    setBarValue('bar-medio', 'val-medio', diffStats.medio.correct, diffStats.medio.total);
    setBarValue('bar-dificil', 'val-dificil', diffStats.dificil.correct, diffStats.dificil.total);

    // Barras por categoria
    setBarValue('bar-cat-devops', 'val-cat-devops', catStats['DevOps'].correct, catStats['DevOps'].total);
    setBarValue('bar-cat-dt', 'val-cat-dt', catStats['Design Thinking'].correct, catStats['Design Thinking'].total);
    setBarValue('bar-cat-agile', 'val-cat-agile', catStats['Ágil e Qualidade'].correct, catStats['Ágil e Qualidade'].total);

    // Lista de Pontos Fortes
    const strengthsContainer = document.getElementById('list-strengths');
    strengthsContainer.innerHTML = strengths.map(s => `<li>${s}</li>`).join('');

    // Lista de Pontos a Reforçar (Onde errou mais)
    const reviewContainer = document.getElementById('list-review');
    if (reviewItems.length === 0) {
        reviewContainer.innerHTML = '<li>Incrível! Você não errou nenhuma questão no simulado.</li>';
    } else {
        // Agrupa os erros por tópico para criar um plano de estudo eficiente
        const groupedErrors = {};
        reviewItems.forEach(item => {
            const key = `[${item.category}] ${item.topic}`;
            if (!groupedErrors[key]) groupedErrors[key] = [];
            groupedErrors[key].push(`Questão ${item.qNumber}`);
        });

        const errorHtml = Object.entries(groupedErrors).map(([topicKey, qList]) => {
            return `<li><strong>${topicKey}</strong>: Erro em ${qList.join(', ')}. Estude as justificativas dessas questões no quiz abaixo.</li>`;
        }).join('');

        reviewContainer.innerHTML = errorHtml;
    }
}

function setBarValue(barId, valId, score, total) {
    const pct = Math.round((score / total) * 100);
    const bar = document.getElementById(barId);
    const val = document.getElementById(valId);
    if (bar) bar.style.width = `${pct}%`;
    if (val) val.innerText = `${score}/${total} (${pct}%)`;
}

/**
 * Filtra as questões exibidas na tela por nível de dificuldade.
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
    if (!confirm('Deseja reiniciar o simulado? Suas respostas atuais serão limpas para uma nova tentativa.')) {
        return;
    }

    // Limpa estado
    for (const key in userAnswers) delete userAnswers[key];
    isExamSubmitted = false;

    // Reseta dashboard
    updateExamProgress();

    // Oculta resultado
    const resultCard = document.getElementById('result-card');
    if (resultCard) resultCard.style.display = 'none';

    // Restaura cards de questões
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

    const examSection = document.getElementById('simulado');
    if (examSection) {
        examSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
