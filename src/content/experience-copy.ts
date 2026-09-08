import type { Locale } from '../i18n';

type ExperienceCopy = {
  illustration: string; fieldCaption: string; grainCaption: string;
  architecture: { note: string; protocols: string[]; market: string[]; connection: string; foundation: string; roles: string[] };
  audience: { label: string; prepare: string; items: { label: string; checklist: string[]; cta: string }[] };
  comparison: { labels: string[]; values: string[][] };
  journey: { who: string; evidence: string; actors: string[]; outputs: string[] };
  jump: string;
};

export const experienceCopy = {
  en: {
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
  ru: {
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
