import type { Locale } from '../i18n';

type ExperienceCopy = {
  reading: { definitionTitle: string; definitionBody: string; instrumentChecklist: string; comparisonDetails: string; journeyDetails: string; grainDetails: string };
  illustration: string; fieldCaption: string; grainCaption: string;
  architecture: { note: string; protocols: string[]; market: string[]; connection: string; foundation: string; roles: string[] };
  audience: { label: string; prepare: string; items: { label: string; checklist: string[]; cta: string }[] };
  comparison: { labels: string[]; values: string[][] };
  journey: { who: string; evidence: string; actors: string[]; outputs: string[] };
  jump: string;
};

export const experienceCopy = {
  en: {
    reading: {
      definitionTitle: 'What does tokenization mean here?',
      definitionBody: 'A digital instrument connects asset evidence with documented rights. The instrument’s terms define what its holder can claim; a token does not automatically confer ownership of land or grain.',
      instrumentChecklist: 'The four questions behind an instrument', comparisonDetails: 'Compare evidence and financing purpose',
      journeyDetails: 'Who acts, and what is documented at each step', grainDetails: 'Stored grain: evidence, rights and responsibilities',
    },
    illustration: 'AI-generated illustration', fieldCaption: 'A growing season. Not a specific financed field.', grainCaption: 'Grain storage. Not a CommodityChain facility.',
    architecture: {
      note: 'Platform model · not live activity',
      protocols: ['Verify the asset', 'Define the rights', 'Issue & mint', 'Redeem & burn'],
      market: ['Submit orders', 'Match & execute', 'Clear obligations', 'Settle the trade'],
      connection: 'Instrument rules ↔ market records', foundation: 'Distinct responsibilities across the lifecycle',
      roles: ['Independent verification', 'Participant eligibility', 'Registration of rights'],
    },
    audience: { label: 'Find your starting point', prepare: 'For a first conversation', items: [
      { label: 'Farmer / asset owner', checklist: ['Asset type and location', 'Season plan or stored-grain context', 'The financing question you want to explore'], cta: 'Discuss your financing needs' },
      { label: 'Elevator / trade partner', checklist: ['Storage or trading role', 'Available records and verification process', 'The connection you want to explore'], cta: 'Discuss a partnership' },
      { label: 'Investor / finance partner', checklist: ['Your organisation and role', 'The proposed instrument that interests you', 'Questions about evidence, rights and eligibility'], cta: 'Discuss participation requirements' },
    ] },
    comparison: { labels: ['Starting point', 'Supporting evidence', 'Financing purpose'], values: [
      ['A pool of future agricultural contracts', 'Field documents, production plan and independent seasonal observations', 'Explore financing for the coming growing season'],
      ['Identified grain already in storage', 'Warehouse receipt, storage records and grain quantity and condition', 'Explore financing and market access for stored grain'],
    ] },
    journey: { who: 'Who acts', evidence: 'What this establishes',
      actors: ['Farmer + independent verifier', 'Issuer', 'Eligible investors + exchange, clearing and registrar', 'Farmer + independent verifier + issuer'],
      outputs: ['A documented field and production plan, with independent checks.', 'Instrument documents setting out rights, obligations and risks.', 'An agreed transaction, settlement and registration of rights.', 'Seasonal evidence and completion under the instrument’s terms.'],
    },
    jump: 'Jump to a section',
  },
  zh: {
    reading: {
      definitionTitle: '这里的代币化意味着什么？',
      definitionBody: '数字工具将资产证据与文件载明的权利连接起来。工具条款决定持有人可以主张何种权利；代币并不自动赋予土地或粮食所有权。',
      instrumentChecklist: '了解一项工具的四个问题', comparisonDetails: '比较核验依据与融资目的',
      journeyDetails: '各阶段的参与方与记录内容', grainDetails: '仓储粮食：证据、权利与责任',
    },
    illustration: 'AI 生成的插图', fieldCaption: '生长季概念图，并非具体获得融资的地块。', grainCaption: '粮食仓储概念图，并非 CommodityChain 的设施。',
    architecture: {
      note: '平台模型 · 并非实时业务',
      protocols: ['核验资产', '界定权利', '发行与铸造', '赎回与销毁'],
      market: ['提交订单', '撮合与成交', '清算义务', '交易结算'],
      connection: '工具规则 ↔ 市场记录', foundation: '全生命周期中的明确分工',
      roles: ['独立核验', '参与者资格', '权利登记'],
    },
    audience: { label: '选择您的起点', prepare: '首次洽谈前可准备', items: [
      { label: '农户 / 资产所有者', checklist: ['资产类型与所在地', '种植季计划或仓储粮食情况', '希望探讨的融资问题'], cta: '洽谈融资需求' },
      { label: '粮仓 / 贸易合作伙伴', checklist: ['您在仓储或贸易中的角色', '现有记录与核验流程', '希望探讨的合作方式'], cta: '洽谈合作' },
      { label: '投资者 / 金融合作伙伴', checklist: ['您的机构与角色', '您感兴趣的拟议工具', '关于证据、权利和准入的问题'], cta: '洽谈参与要求' },
    ] },
    comparison: { labels: ['起点', '核验依据', '融资目的'], values: [
      ['未来农业合同池', '地块文件、生产计划和独立的季节性观测', '探索下一种植季的融资'],
      ['已识别的仓储粮食', '仓单、仓储记录及粮食数量和状况', '探索仓储粮食融资及市场准入'],
    ] },
    journey: { who: '参与方', evidence: '形成的依据',
      actors: ['农户与独立核验方', '发行人', '合格投资者、交易所、清算所及登记机构', '农户、独立核验方与发行人'],
      outputs: ['经独立检查的地块文件及生产计划。', '载明权利、义务和风险的工具文件。', '达成的交易、结算及权利登记。', '季节性证据及按工具条款完成的履约。'],
    },
    jump: '跳转至章节',
  },
  ru: {
    reading: {
      definitionTitle: 'Что здесь означает токенизация?',
      definitionBody: 'Цифровой инструмент связывает данные об активе с документально закреплёнными правами. Условия инструмента определяют требования его держателя; токен не означает автоматического владения землёй или зерном.',
      instrumentChecklist: 'Четыре вопроса об инструменте', comparisonDetails: 'Сравнить подтверждения и задачи финансирования',
      journeyDetails: 'Кто участвует и что фиксируется на каждом этапе', grainDetails: 'Зерно на хранении: подтверждения, права и ответственность',
    },
    illustration: 'Иллюстрация, созданная ИИ', fieldCaption: 'Сезон выращивания, не конкретное финансируемое поле.', grainCaption: 'Хранение зерна, не объект CommodityChain.',
    architecture: {
      note: 'Модель платформы · не текущие операции',
      protocols: ['Проверка актива', 'Определение прав', 'Выпуск токенов', 'Погашение и сжигание'],
      market: ['Подача заявок', 'Заключение сделок', 'Клиринг обязательств', 'Расчёт по сделке'],
      connection: 'Правила инструмента ↔ рыночные записи', foundation: 'Раздельная ответственность на всём жизненном цикле',
      roles: ['Независимая проверка', 'Допуск участников', 'Регистрация прав'],
    },
    audience: { label: 'Выберите свою отправную точку', prepare: 'Для первого разговора', items: [
      { label: 'Фермер / владелец актива', checklist: ['Тип и местонахождение актива', 'План сезона или сведения о зерне на хранении', 'Задача финансирования, которую хотите обсудить'], cta: 'Обсудить финансирование' },
      { label: 'Элеватор / торговый партнёр', checklist: ['Ваша роль в хранении или торговле', 'Доступные записи и порядок проверки', 'Вариант взаимодействия, который хотите обсудить'], cta: 'Обсудить партнёрство' },
      { label: 'Инвестор / финансовый партнёр', checklist: ['Ваша организация и роль', 'Интересующий вас предполагаемый инструмент', 'Вопросы о подтверждениях, правах и допуске'], cta: 'Обсудить требования к участию' },
    ] },
    comparison: { labels: ['Отправная точка', 'Подтверждающие сведения', 'Задача финансирования'], values: [
      ['Пул будущих агроконтрактов', 'Документы на поля, производственный план и независимые сезонные наблюдения', 'Финансирование предстоящего сезона'],
      ['Идентифицированное зерно на хранении', 'Складская расписка, записи о хранении, количестве и состоянии зерна', 'Финансирование и выход на рынок для зерна на хранении'],
    ] },
    journey: { who: 'Кто участвует', evidence: 'Что формируется',
      actors: ['Фермер и независимый верификатор', 'Эмитент', 'Допущенные инвесторы, биржа, клиринг и реестр', 'Фермер, независимый верификатор и эмитент'],
      outputs: ['Документированные поля и производственный план с независимой проверкой.', 'Документы инструмента с правами, обязательствами и рисками.', 'Согласованная сделка, расчёт и регистрация прав.', 'Сезонные подтверждения и завершение по условиям инструмента.'],
    },
    jump: 'Перейти к разделу',
  },
  kk: {
    reading: {
      definitionTitle: 'Мұнда токенизация нені білдіреді?',
      definitionBody: 'Цифрлық құрал актив туралы деректерді құжатталған құқықтармен байланыстырады. Ұстаушының талап ету құқықтарын құрал шарттары анықтайды; токен жерге немесе астыққа автоматты түрде иелік етуді білдірмейді.',
      instrumentChecklist: 'Құралға қатысты төрт сұрақ', comparisonDetails: 'Дәлелдер мен қаржыландыру мақсатын салыстыру',
      journeyDetails: 'Әр кезеңде кім қатысады және не құжатталады', grainDetails: 'Сақтаудағы астық: дәлелдер, құқықтар және жауапкершілік',
    },
    illustration: 'ЖИ жасаған иллюстрация', fieldCaption: 'Өсіру маусымы. Нақты қаржыландырылатын алқап емес.', grainCaption: 'Астық сақтау орны. CommodityChain нысаны емес.',
    architecture: {
      note: 'Платформа моделі · нақты уақыттағы операциялар емес',
      protocols: ['Активті тексеру', 'Құқықтарды анықтау', 'Токендерді шығару', 'Өтеу және жою'],
      market: ['Өтінімдерді беру', 'Мәмілелерді жасау', 'Міндеттемелер клирингі', 'Мәміле бойынша есеп айырысу'],
      connection: 'Құрал ережелері ↔ нарық жазбалары', foundation: 'Өмірлік цикл бойындағы бөлек жауапкершілік',
      roles: ['Тәуелсіз тексеру', 'Қатысушыларды жіберу', 'Құқықтарды тіркеу'],
    },
    audience: { label: 'Бастапқы нүктеңізді таңдаңыз', prepare: 'Алғашқы әңгімеге дайындық', items: [
      { label: 'Фермер / актив иесі', checklist: ['Активтің түрі мен орналасқан жері', 'Маусым жоспары немесе сақтаудағы астық туралы мәлімет', 'Талқылағыңыз келетін қаржыландыру мәселесі'], cta: 'Қаржыландыруды талқылау' },
      { label: 'Элеватор / сауда серіктесі', checklist: ['Сақтау немесе саудадағы рөліңіз', 'Қолжетімді жазбалар мен тексеру тәртібі', 'Талқылағыңыз келетін ынтымақтастық түрі'], cta: 'Серіктестікті талқылау' },
      { label: 'Инвестор / қаржы серіктесі', checklist: ['Ұйымыңыз бен рөліңіз', 'Сізді қызықтыратын ұсынылатын құрал', 'Дәлелдер, құқықтар және қатысу туралы сұрақтар'], cta: 'Қатысу талаптарын талқылау' },
    ] },
    comparison: { labels: ['Бастапқы нүкте', 'Растайтын мәліметтер', 'Қаржыландыру мақсаты'], values: [
      ['Болашақ агрокелісімшарттар пулы', 'Алқап құжаттары, өндірістік жоспар және тәуелсіз маусымдық бақылаулар', 'Алдағы егіс маусымын қаржыландыруды қарастыру'],
      ['Сақтаудағы сәйкестендірілген астық', 'Қойма қолхаты, сақтау жазбалары, астықтың мөлшері мен күйі', 'Сақтаудағы астықты қаржыландыру және нарыққа шығару'],
    ] },
    journey: { who: 'Кім қатысады', evidence: 'Не қалыптасады',
      actors: ['Фермер және тәуелсіз верификатор', 'Эмитент', 'Рұқсат етілген инвесторлар, биржа, клиринг және тізілім', 'Фермер, тәуелсіз верификатор және эмитент'],
      outputs: ['Тәуелсіз тексерілген алқап құжаттары мен өндірістік жоспар.', 'Құқықтары, міндеттемелері мен тәуекелдері көрсетілген құрал құжаттары.', 'Келісілген мәміле, есеп айырысу және құқықтарды тіркеу.', 'Маусымдық растаулар және құрал шарттарына сай аяқтау.'],
    },
    jump: 'Бөлімге өту',
  },
} satisfies Record<Locale, ExperienceCopy>;
