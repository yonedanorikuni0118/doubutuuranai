// 診断データ
const questions = [
    // E vs I (外向・内向)
    { id: 0, text: "パーティーや集まりで、エネルギーを得られると感じる", axis: "EI", direction: 1 },
    { id: 1, text: "一人で過ごす時間が必要で、それによって充電できる", axis: "EI", direction: -1 },
    { id: 2, text: "初対面の人とでも気軽に話すことができる", axis: "EI", direction: 1 },
    { id: 3, text: "深い関係の少数の友人を好む", axis: "EI", direction: -1 },
    { id: 4, text: "グループ活動が好きで、人と一緒にいると活力が湧く", axis: "EI", direction: 1 },
    
    // S vs N (感覚・直観)
    { id: 5, text: "具体的な事実やデータを重視する", axis: "SN", direction: 1 },
    { id: 6, text: "可能性や未来のビジョンについて考えるのが好き", axis: "SN", direction: -1 },
    { id: 7, text: "現実的で実用的なアプローチを好む", axis: "SN", direction: 1 },
    { id: 8, text: "抽象的な概念やアイデアに興味がある", axis: "SN", direction: -1 },
    { id: 9, text: "詳細に注意を払い、正確さを大切にする", axis: "SN", direction: 1 },
    
    // T vs F (思考・感情)
    { id: 10, text: "論理的な分析に基づいて決断を下す", axis: "TF", direction: 1 },
    { id: 11, text: "人の気持ちや調和を重視して決断する", axis: "TF", direction: -1 },
    { id: 12, text: "客観的な真実を追求することが重要だ", axis: "TF", direction: 1 },
    { id: 13, text: "他人の感情に共感しやすい", axis: "TF", direction: -1 },
    { id: 14, text: "効率性と公平性を優先する", axis: "TF", direction: 1 },
    
    // J vs P (判断・知覚)
    { id: 15, text: "計画を立てて、それに従うことが好き", axis: "JP", direction: 1 },
    { id: 16, text: "柔軟性を保ち、自発的に行動することを好む", axis: "JP", direction: -1 },
    { id: 17, text: "締め切りを守り、物事を早めに終わらせる", axis: "JP", direction: 1 },
    { id: 18, text: "複数の選択肢を検討し続けることを好む", axis: "JP", direction: -1 },
    { id: 19, text: "整理整頓された環境が好き", axis: "JP", direction: 1 }
];

// 回答の選択肢
const options = [
    { value: 1, label: "全く同意しない" },
    { value: 2, label: "同意しない" },
    { value: 3, label: "どちらでもない" },
    { value: 4, label: "同意する" },
    { value: 5, label: "強く同意する" }
];

// MBTIタイプの詳細情報
const mbtiTypes = {
    INTJ: {
        name: "建築家",
        description: "想像力が豊かで、戦略的な思考の持ち主。あらゆる物事に対して計画を立てる。",
        color: "purple",
        traits: ["戦略的思考", "独立心", "完璧主義", "分析的"]
    },
    INTP: {
        name: "論理学者",
        description: "革新的な発明家で、知識に対する飽くなき探究心を持つ。",
        color: "purple",
        traits: ["論理的", "創造的", "客観的", "知識欲"]
    },
    ENTJ: {
        name: "指揮官",
        description: "大胆で想像力豊か、かつ強い意志を持つリーダー。常に道を見つけるか、道を切り開く。",
        color: "purple",
        traits: ["リーダーシップ", "戦略的", "効率的", "決断力"]
    },
    ENTP: {
        name: "討論者",
        description: "賢くて好奇心旺盛な思考家。知的挑戦には必ず受けて立つ。",
        color: "purple",
        traits: ["革新的", "機知に富む", "好奇心旺盛", "議論好き"]
    },
    INFJ: {
        name: "提唱者",
        description: "物静かで神秘的だが、人々を非常に勇気づける飽くなき理想主義者。",
        color: "teal",
        traits: ["洞察力", "理想主義", "共感力", "決意"]
    },
    INFP: {
        name: "仲介者",
        description: "詩人肌で親切な利他主義者。良い物事のためなら、いつでも懸命に手を貸す。",
        color: "teal",
        traits: ["理想主義", "共感的", "創造的", "柔軟性"]
    },
    ENFJ: {
        name: "主人公",
        description: "カリスマ性があり、人々を励ますリーダー。聞く人を魅了する。",
        color: "teal",
        traits: ["カリスマ性", "共感力", "説得力", "理想主義"]
    },
    ENFP: {
        name: "運動家",
        description: "情熱的で独創力があり、かつ社交的な自由人。常に笑ったり微笑む理由を見つけられる。",
        color: "teal",
        traits: ["熱意", "創造性", "社交的", "楽観的"]
    },
    ISTJ: {
        name: "管理者",
        description: "実用的で事実に基づいた思考の持ち主。その信頼性は紛れもなく、本物。",
        color: "blue",
        traits: ["責任感", "実用的", "誠実", "組織的"]
    },
    ISFJ: {
        name: "擁護者",
        description: "非常に献身的で心の温かい擁護者。いつでも大切な人を守る準備ができている。",
        color: "blue",
        traits: ["献身的", "忠実", "思いやり", "実用的"]
    },
    ESTJ: {
        name: "幹部",
        description: "優秀な管理者で、物事や人々を管理する能力にかけては、右に出る者はいない。",
        color: "blue",
        traits: ["組織力", "実用的", "誠実", "決断力"]
    },
    ESFJ: {
        name: "領事",
        description: "非常に思いやりがあり社交的で、人気がある。常に人の手助けをする準備ができている。",
        color: "blue",
        traits: ["協調性", "思いやり", "社交的", "責任感"]
    },
    ISTP: {
        name: "巨匠",
        description: "大胆で実践的な思考を持つ実験者。あらゆる道具を使いこなす。",
        color: "amber",
        traits: ["実践的", "柔軟性", "分析的", "冷静"]
    },
    ISFP: {
        name: "冒険家",
        description: "柔軟性と魅力がある芸術家。常に進んで探索や経験をする準備ができている。",
        color: "amber",
        traits: ["芸術的", "柔軟性", "思いやり", "好奇心"]
    },
    ESTP: {
        name: "起業家",
        description: "賢くてエネルギッシュで、非常に鋭い知覚の持ち主。危険と隣り合わせの人生を心から楽しむ。",
        color: "amber",
        traits: ["行動的", "大胆", "社交的", "実践的"]
    },
    ESFP: {
        name: "エンターテイナー",
        description: "自発性がありエネルギッシュで熱心なエンターテイナー。周りの人が退屈することは決してない。",
        color: "amber",
        traits: ["社交的", "活発", "楽観的", "柔軟性"]
    }
};

// 状態管理
let currentQuestion = 0;
let answers = {};

// DOM要素の取得
const testScreen = document.getElementById('testScreen');
const resultScreen = document.getElementById('resultScreen');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const progressFill = document.getElementById('progressFill');
const currentNum = document.getElementById('currentNum');
const totalNum = document.getElementById('totalNum');
const progressPercent = document.getElementById('progressPercent');
const restartBtn = document.getElementById('restartBtn');

/**
 * 初期化関数
 */
function init() {
    totalNum.textContent = questions.length;
    renderQuestion();
    setupEventListeners();
}

/**
 * イベントリスナーの設定
 */
function setupEventListeners() {
    backBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    finishBtn.addEventListener('click', calculateResult);
    restartBtn.addEventListener('click', restart);
}

/**
 * 質問を表示
 */
function renderQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    
    // 進捗バーの更新
    updateProgress();
    
    // 選択肢の表示
    renderOptions();
    
    // ナビゲーションボタンの表示制御
    updateNavigationButtons();
}

/**
 * 進捗バーを更新
 */
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    currentNum.textContent = currentQuestion + 1;
    progressPercent.textContent = Math.round(progress);
}

/**
 * 選択肢を表示
 */
function renderOptions() {
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.label;
        
        // 既に回答済みの場合は選択状態を表示
        if (answers[currentQuestion] === option.value) {
            btn.classList.add('selected');
        }
        
        btn.addEventListener('click', () => selectOption(option.value));
        optionsContainer.appendChild(btn);
    });
}

/**
 * ナビゲーションボタンの表示を更新
 */
function updateNavigationButtons() {
    // 戻るボタン: 最初の質問でなければ表示
    backBtn.classList.toggle('hidden', currentQuestion === 0);
    
    // 次へボタン: 回答済みで、最後の質問でなければ表示
    const isAnswered = answers[currentQuestion] !== undefined;
    const isLastQuestion = currentQuestion === questions.length - 1;
    nextBtn.classList.toggle('hidden', !isAnswered || isLastQuestion);
    
    // 完了ボタン: 回答済みで、最後の質問の場合に表示
    finishBtn.classList.toggle('hidden', !isAnswered || !isLastQuestion);
}

/**
 * 選択肢を選択
 */
function selectOption(value) {
    answers[currentQuestion] = value;
    renderQuestion();
}

/**
 * 次の質問へ進む
 */
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
}

/**
 * 前の質問に戻る
 */
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

/**
 * 結果を計算
 */
function calculateResult() {
    const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    
    // 各質問の回答をスコアに変換
    questions.forEach(q => {
        const answer = answers[q.id] || 3; // 未回答は中立(3)として扱う
        const score = (answer - 3) * q.direction;
        scores[q.axis] += score;
    });

    // MBTIタイプを決定
    const type = 
        (scores.EI > 0 ? 'E' : 'I') +
        (scores.SN > 0 ? 'S' : 'N') +
        (scores.TF > 0 ? 'T' : 'F') +
        (scores.JP > 0 ? 'J' : 'P');

    showResult(type);
}

/**
 * 結果を表示
 */
function showResult(type) {
    const result = mbtiTypes[type];
    
    // 画面を切り替え
    testScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // MBTIバッジを表示
    const mbtiBadge = document.getElementById('mbtiBadge');
    mbtiBadge.textContent = type;
    mbtiBadge.className = 'mbti-badge ' + result.color;

    // タイトルと説明を表示
    document.getElementById('resultTitle').textContent = result.name;
    document.getElementById('resultDescription').textContent = result.description;

    // 特徴を表示
    renderTraits(result.traits);

    // タイプの詳細説明を表示
    renderTypeExplanation(type);

    // ページトップにスクロール
    window.scrollTo(0, 0);
}

/**
 * 特徴カードを表示
 */
function renderTraits(traits) {
    const traitsGrid = document.getElementById('traitsGrid');
    traitsGrid.innerHTML = '';
    
    traits.forEach(trait => {
        const div = document.createElement('div');
        div.className = 'trait-card';
        div.textContent = trait;
        traitsGrid.appendChild(div);
    });
}

/**
 * タイプの詳細説明を表示
 */
function renderTypeExplanation(type) {
    const typeExplanation = document.getElementById('typeExplanation');
    
    const explanations = {
        'E': '外向型 - エネルギーを外の世界から得る',
        'I': '内向型 - エネルギーを内面から得る',
        'S': '感覚型 - 具体的な事実を重視',
        'N': '直観型 - 可能性とパターンを重視',
        'T': '思考型 - 論理的な分析を重視',
        'F': '感情型 - 人の気持ちと調和を重視',
        'J': '判断型 - 計画的で組織的',
        'P': '知覚型 - 柔軟で適応的'
    };
    
    typeExplanation.innerHTML = `
        <h2>あなたの性格タイプについて</h2>
        <div class="type-detail"><strong>E/I:</strong> ${explanations[type[0]]}</div>
        <div class="type-detail"><strong>S/N:</strong> ${explanations[type[1]]}</div>
        <div class="type-detail"><strong>T/F:</strong> ${explanations[type[2]]}</div>
        <div class="type-detail"><strong>J/P:</strong> ${explanations[type[3]]}</div>
    `;
}

/**
 * 診断をリスタート
 */
function restart() {
    currentQuestion = 0;
    answers = {};
    testScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    renderQuestion();
    window.scrollTo(0, 0);
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);