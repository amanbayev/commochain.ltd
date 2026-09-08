import type { Locale } from '../i18n';
import { publicSiteCopy } from './public-site-copy.ts';

type Item = { title: string; body: string };
type OverviewCopy = {
  nav: { overview: string; infrastructure: string; assets: string; company: string; contact: string };
  hero: string; readOverview: string; textView: string; download: string; downloadFormat: string;
  overview: { eyebrow: string; title: string; body: string; status: string; statusBody: string; audienceTitle: string; audiences: Item[] };
  process: { eyebrow: string; title: string; body: string; engines: Item[]; stepsTitle: string; steps: Item[] };
  grain: { eyebrow: string; title: string; body: string; imageCaption: string; facts: Item[]; structuresTitle: string; structures: Item[]; evidenceTitle: string; evidenceBody: string; note: string; watch: string; more: string; concepts: Item[] };
  company: { eyebrow: string; title: string; body: string; shareholder: string; shareholderBody: string; partnershipLabel: string; partnershipTitle: string; partnershipBody: string; licence: string; recordNote: string };
  enquiry: { title: string; body: string; name: string; email: string; organisation: string; project: string; placeholder: string; submit: string; notice: string; prepared: string; copy: string; copied: string; copyFailed: string; draft: string; nextTitle: string; nextBody: string };
};

const baseOverviewCopy = {
  en: {
    nav: { overview: 'Overview', infrastructure: 'How it works', assets: 'Launch protocols', company: 'Company', contact: 'Contact' },
    hero: 'Built on verified agricultural data. Field-to-Finance and stored-grain protocols. At launch stage.',
    readOverview: 'Read the overview', textView: 'Text version', download: 'Download overview', downloadFormat: 'HTML · read offline or print',
    overview: {
      eyebrow: 'The starting point', title: 'Two starting points. One platform.',
      body: 'Farmers need capital before harvest. Stored grain needs a route to financing and markets. CommodityChain is developing investment-token infrastructure for both, connecting verifiable agricultural data with defined rights and market infrastructure.',
      status: 'At launch stage', statusBody: 'Field-to-finance and grain protocols are the starting point. We welcome project and partnership discussions; the examples on this site are not a catalogue of products available to buy.',
      audienceTitle: 'Who is this conversation for?',
      audiences: [
        { title: 'Farmers & asset owners', body: 'Explore financing for the next growing season, or a route from stored grain to financing and market access.' },
        { title: 'Elevators & trade partners', body: 'Connect storage, asset verification and records with the needs of millers, exporters and traders.' },
        { title: 'Investors & finance partners', body: 'Understand the asset evidence, contractual rights and participation requirements behind a proposed instrument.' },
      ],
    },
    process: {
      eyebrow: 'The platform architecture', title: 'Two engines. One connected lifecycle.',
      body: 'CommodityChain is built around a market core and a protocols engine. Together, they connect how an asset is represented with how its instrument moves through a market.',
      engines: [
        { title: 'Market core', body: 'The exchange and clearing-house layer: orders, execution, clearing and settlement.' },
        { title: 'Protocols engine', body: 'The asset lifecycle: how assets are tokenized, verified and issued, and how their tokens are settled, minted and burned.' },
      ],
      stepsTitle: 'From the asset to the instrument',
      steps: [
        { title: 'What is the asset?', body: 'Identify the asset, where it is and what evidence supports it.' },
        { title: 'What are the rights?', body: 'Define the rights, obligations and terms in the instrument’s documentation.' },
        { title: 'Who can participate?', body: 'Establish the relevant permissions, jurisdiction and participant requirements.' },
        { title: 'How would it operate?', body: 'Set out issuance, transaction records, execution and settlement as distinct stages.' },
      ],
    },
    grain: {
      eyebrow: 'The grain example', title: 'Grain in storage. Value in motion.',
      body: 'The starting example is a token linked to a warehouse receipt for stored grain. The proposed lifecycle connects grain intake and verification with issuance, market activity, settlement and redemption.',
      imageCaption: 'Illustration of the commodity’s origin.',
      facts: [
        { title: 'The asset', body: 'Specify the stored grain. Keep it distinct from a future-harvest structure.' },
        { title: 'The evidence', body: 'Identify the storage location, supporting records and the parties responsible for the asset.' },
        { title: 'The rights', body: 'Describe exactly what the instrument represents and the obligations attached to it.' },
        { title: 'The participants', body: 'Define the roles of the asset owner, relevant service providers and eligible participants.' },
      ],
      structuresTitle: 'Three possible instrument structures',
      structures: [
        { title: 'Warehouse-receipt token', body: 'A digital representation linked to a receipt for stored grain. The instrument defines the grain, the holder’s rights and the delivery or redemption terms.' },
        { title: 'Tokenized forward', body: 'An instrument linked to a future-delivery contract. Its terms define the commodity, grade, delivery location and delivery window.' },
        { title: 'Inventory & receivables note', body: 'A financing structure linked to stored inventory or trade receivables, with its security, payment priorities and obligations documented.' },
      ],
      evidenceTitle: 'The physical link matters',
      evidenceBody: 'The Transparent Elevator concept connects the digital record to storage evidence: weighing, temperature and humidity monitoring, and grain quantity and condition records. Each project must establish which evidence and checks are in place.',
      note: 'Illustrative concept. Availability, rights and participation depend on the documentation and requirements of a specific instrument.',
      watch: 'See the grain chapter', more: 'In development: the next asset protocols',
      concepts: [
        { title: 'Music IP & royalties', body: 'Tokenization of defined music intellectual-property rights and royalty interests.' },
        { title: 'In-game assets', body: 'Tokenization of digital objects and the rights associated with them within a game ecosystem.' },
        { title: 'Water-facility projects', body: 'A water-well token concept linked to construction of a new premium still-water facility. Rights would relate to the project, not ownership of groundwater.' },
      ],
    },
    company: {
      eyebrow: 'The company behind the story', title: 'A conversation with Commodity Chain Ltd.',
      body: 'Commodity Chain Ltd. is at launch stage, with AIFC TechHub among its shareholders. Explore the company and regulatory records alongside the platform’s development plans.',
      shareholder: 'AIFC TechHub', shareholderBody: 'Listed in the company register as Tech Hub Limited, an active shareholder.',
      partnershipLabel: 'Strategic innovation partnership', partnershipTitle: 'Testing real-world asset tokenization.',
      partnershipBody: 'A strategic partnership with AIFC, through TechHub, to explore and test real-world asset (RWA) tokenization as an innovation initiative.',
      licence: 'AFSA licence record',
      recordNote: 'The record lists Operating an Exchange and Operating a Clearing House for a facility for Investment Tokens. Consult the linked record for the current status and scope.',
    },
    enquiry: {
      title: 'Tell us about your project.', body: 'A short introduction is enough to start: the asset, its location and what you would like to explore.',
      name: 'Your name', email: 'Work email', organisation: 'Organisation', project: 'Your project',
      placeholder: 'What is the asset, where is it located, and what would you like to discuss?',
      submit: 'Prepare an email', notice: 'Review your draft, then open it in your email app and send it to info@commochain.ltd. This form does not send or store your enquiry.',
      prepared: 'Your draft is ready. Nothing has been sent. Open it in your email app, or copy the text below.',
      copy: 'Copy enquiry', copied: 'Enquiry copied', copyFailed: 'Copying was unavailable. Select and copy your draft below.', draft: 'Your email draft',
      nextTitle: 'A useful first conversation', nextBody: 'Include the asset type and location, the parties involved and the question you want to resolve. Please leave confidential documents out of this initial enquiry.',
    },
  },
  ru: {
    nav: { overview: 'Обзор', infrastructure: 'Как это работает', assets: 'Протоколы запуска', company: 'Компания', contact: 'Контакты' },
    hero: 'Проверенные агроданные. Field-to-Finance и зерновые протоколы. На этапе запуска.',
    readOverview: 'Читать обзор', textView: 'Текстовая версия', download: 'Скачать обзор', downloadFormat: 'HTML · для чтения и печати',
    overview: {
      eyebrow: 'Отправная точка', title: 'Две отправные точки. Одна платформа.',
      body: 'Фермеру нужен капитал до урожая. Зерну на хранении нужен путь к финансированию и рынкам. CommodityChain разрабатывает инфраструктуру инвестиционных токенов для обеих задач, связывая проверяемые агроданные с определёнными правами и рыночной инфраструктурой.',
      status: 'На этапе запуска', statusBody: 'Начинаем с протоколов «от поля к финансированию» и зерновых протоколов. Приглашаем к обсуждению проектов и партнёрств; примеры на сайте не являются каталогом доступных для покупки продуктов.',
      audienceTitle: 'Для кого это обсуждение?',
      audiences: [
        { title: 'Фермеры и владельцы активов', body: 'Обсудите финансирование следующего сезона или путь от зерна на хранении к финансированию и выходу на рынок.' },
        { title: 'Элеваторы и торговые партнёры', body: 'Свяжите хранение, проверку актива и учёт с потребностями мельниц, экспортёров и трейдеров.' },
        { title: 'Инвесторы и финансовые партнёры', body: 'Изучите сведения об активе, договорные права и требования к участию в предполагаемом инструменте.' },
      ],
    },
    process: {
      eyebrow: 'Архитектура платформы', title: 'Два ядра. Единый жизненный цикл.',
      body: 'В основе CommodityChain — рыночное ядро и движок протоколов. Они связывают цифровое представление актива с обращением инструмента на рынке.',
      engines: [
        { title: 'Рыночное ядро', body: 'Биржевая и клиринговая инфраструктура: заявки, заключение сделок, клиринг и расчёты.' },
        { title: 'Движок протоколов', body: 'Жизненный цикл актива: токенизация, проверка и выпуск, а также расчёты, создание и сжигание токенов.' },
      ],
      stepsTitle: 'От актива к инструменту',
      steps: [
        { title: 'Что представляет собой актив?', body: 'Определить актив, его местонахождение и подтверждающие сведения.' },
        { title: 'Какие права возникают?', body: 'Определить права, обязательства и условия в документах инструмента.' },
        { title: 'Кто может участвовать?', body: 'Установить применимые разрешения, юрисдикцию и требования к участникам.' },
        { title: 'Как будет работать структура?', body: 'Описать выпуск, учёт транзакций, заключение сделок и расчёты как отдельные этапы.' },
      ],
    },
    grain: {
      eyebrow: 'Пример с зерном', title: 'Зерно на хранении. Капитал в движении.',
      body: 'Начальный пример — токен, связанный со складской распиской на зерно. Предлагаемый жизненный цикл связывает приёмку и проверку зерна с выпуском, рыночными операциями, расчётами и погашением.',
      imageCaption: 'Иллюстрация происхождения сырьевого актива.',
      facts: [
        { title: 'Актив', body: 'Описать зерно на хранении. Отделить эту структуру от инструмента, связанного с будущим урожаем.' },
        { title: 'Подтверждающие сведения', body: 'Указать место хранения, подтверждающие документы и ответственных за актив участников.' },
        { title: 'Права', body: 'Точно описать, что представляет собой инструмент и какие обязательства с ним связаны.' },
        { title: 'Участники', body: 'Определить роли владельца актива, поставщиков соответствующих услуг и допущенных участников.' },
      ],
      structuresTitle: 'Три возможные структуры инструмента',
      structures: [
        { title: 'Токен складской расписки', body: 'Цифровое представление, связанное с распиской на зерно на хранении. Инструмент определяет зерно, права держателя и условия поставки или погашения.' },
        { title: 'Токенизированный форвард', body: 'Инструмент, связанный с договором будущей поставки. Условия определяют товар, класс, место и срок поставки.' },
        { title: 'Инструмент под запасы и дебиторскую задолженность', body: 'Структура финансирования, связанная с запасами или торговой дебиторской задолженностью, с документированными обеспечением, приоритетами платежей и обязательствами.' },
      ],
      evidenceTitle: 'Связь с физическим активом',
      evidenceBody: 'Концепция «Прозрачный элеватор» связывает цифровую запись с данными хранения: взвешиванием, мониторингом температуры и влажности, учётом количества и состояния зерна. Для каждого проекта необходимо определить фактически доступные сведения и проверки.',
      note: 'Иллюстративная концепция. Доступность, права и участие зависят от документов и требований конкретного инструмента.',
      watch: 'Перейти к главе о зерне', more: 'В разработке: следующие протоколы активов',
      concepts: [
        { title: 'Музыкальные права и роялти', body: 'Токенизация определённых прав на музыкальную интеллектуальную собственность и роялти.' },
        { title: 'Внутриигровые активы', body: 'Токенизация цифровых объектов и связанных с ними прав в игровой экосистеме.' },
        { title: 'Проекты водных объектов', body: 'Концепция токена водяной скважины для строительства нового объекта по производству премиальной негазированной воды. Права связаны с проектом, а не с владением подземными водами.' },
      ],
    },
    company: {
      eyebrow: 'Компания, стоящая за историей', title: 'Диалог с Commodity Chain Ltd.',
      body: 'Commodity Chain Ltd. находится на этапе запуска. Среди акционеров — AIFC TechHub. Изучите сведения о компании и регуляторные записи вместе с планами развития платформы.',
      shareholder: 'AIFC TechHub', shareholderBody: 'В реестре компании указан как Tech Hub Limited, действующий акционер.',
      partnershipLabel: 'Стратегическое инновационное партнёрство', partnershipTitle: 'Тестирование токенизации реальных активов.',
      partnershipBody: 'Стратегическое партнёрство с МФЦА через TechHub для изучения и тестирования токенизации реальных активов (RWA) в рамках инновационной инициативы.',
      licence: 'Запись о лицензии AFSA',
      recordNote: 'В записи указаны Operating an Exchange и Operating a Clearing House для площадки Investment Tokens. Актуальный статус и объём деятельности смотрите по ссылке.',
    },
    enquiry: {
      title: 'Расскажите о вашем проекте.', body: 'Для начала достаточно краткого описания: актив, его местонахождение и вопрос, который вы хотите обсудить.',
      name: 'Ваше имя', email: 'Рабочая почта', organisation: 'Организация', project: 'Ваш проект',
      placeholder: 'Что представляет собой актив, где он находится и что вы хотите обсудить?',
      submit: 'Подготовить письмо', notice: 'Проверьте черновик, затем откройте его в почтовой программе и отправьте на info@commochain.ltd. Эта форма не отправляет и не сохраняет обращение.',
      prepared: 'Черновик готов. Письмо ещё не отправлено. Откройте его в почтовой программе или скопируйте текст ниже.',
      copy: 'Скопировать обращение', copied: 'Обращение скопировано', copyFailed: 'Не удалось скопировать. Выделите и скопируйте текст ниже.', draft: 'Черновик письма',
      nextTitle: 'Что поможет начать разговор', nextBody: 'Укажите тип и местонахождение актива, участников проекта и вопрос, который вы хотите решить. Не прикладывайте конфиденциальные документы к первому обращению.',
    },
  },
  kk: {
    nav: { overview: 'Шолу', infrastructure: 'Жұмыс тәртібі', assets: 'Бастапқы хаттамалар', company: 'Компания', contact: 'Байланыс' },
    hero: 'Тексерілген агродеректер. Field-to-Finance және астық хаттамалары. Іске қосылу кезеңінде.',
    readOverview: 'Шолуды оқу', textView: 'Мәтіндік нұсқа', download: 'Шолуды жүктеу', downloadFormat: 'HTML · оқу және басып шығару үшін',
    overview: {
      eyebrow: 'Бастапқы қадам', title: 'Екі бастапқы нүкте. Бір платформа.',
      body: 'Фермерге өнім жинауға дейін капитал қажет. Сақтаудағы астыққа қаржыландыру мен нарыққа жол қажет. CommodityChain екі міндетке де арналған инвестициялық токендер инфрақұрылымын әзірлеуде: тексерілетін агродеректерді айқын құқықтармен және нарық инфрақұрылымымен байланыстырады.',
      status: 'Іске қосылу кезеңінде', statusBody: '«Егістіктен қаржыландыруға» және астық хаттамаларынан бастаймыз. Жобалар мен серіктестіктерді талқылауға шақырамыз; сайттағы мысалдар сатып алуға қолжетімді өнімдер каталогы емес.',
      audienceTitle: 'Бұл талқылау кімге арналған?',
      audiences: [
        { title: 'Фермерлер мен актив иелері', body: 'Келесі маусымды қаржыландыруды немесе сақтаудағы астықтан қаржыландыруға және нарыққа шығуға дейінгі жолды талқылаңыз.' },
        { title: 'Элеваторлар мен сауда серіктестері', body: 'Сақтауды, активті тексеруді және есепке алуды диірмендердің, экспорттаушылардың және трейдерлердің қажеттіліктерімен байланыстырыңыз.' },
        { title: 'Инвесторлар мен қаржы серіктестері', body: 'Ұсынылатын құралға қатысты актив деректерін, шарттық құқықтарды және қатысу талаптарын зерделеңіз.' },
      ],
    },
    process: {
      eyebrow: 'Платформа архитектурасы', title: 'Екі қозғалтқыш. Біртұтас өмірлік цикл.',
      body: 'CommodityChain негізінде нарық ядросы және хаттамалар қозғалтқышы жатыр. Олар активтің цифрлық бейнесін құралдың нарықтағы айналымымен байланыстырады.',
      engines: [
        { title: 'Нарық ядросы', body: 'Биржалық және клирингтік инфрақұрылым: өтінімдер, мәмілелер, клиринг және есеп айырысу.' },
        { title: 'Хаттамалар қозғалтқышы', body: 'Активтің өмірлік циклі: токенизациялау, тексеру және шығару, сондай-ақ токендер бойынша есеп айырысу, оларды жасау және жою.' },
      ],
      stepsTitle: 'Активтен құралға',
      steps: [
        { title: 'Актив қандай?', body: 'Активті, оның орналасқан жерін және оны растайтын деректерді анықтау.' },
        { title: 'Қандай құқықтар бар?', body: 'Құқықтарды, міндеттемелерді және шарттарды құрал құжаттарында айқындау.' },
        { title: 'Кім қатыса алады?', body: 'Тиісті рұқсаттарды, юрисдикцияны және қатысушыларға қойылатын талаптарды белгілеу.' },
        { title: 'Құрылым қалай жұмыс істейді?', body: 'Шығаруды, транзакцияларды есепке алуды, мәмілелерді және есеп айырысуды бөлек кезеңдер ретінде сипаттау.' },
      ],
    },
    grain: {
      eyebrow: 'Астық мысалы', title: 'Астық сақтауда. Капитал айналымда.',
      body: 'Бастапқы мысал — сақтаудағы астыққа қойма қолхатымен байланысты токен. Ұсынылатын өмірлік цикл астықты қабылдау мен тексеруді шығарумен, нарықтық операциялармен, есеп айырысумен және өтеумен байланыстырады.',
      imageCaption: 'Шикізат активінің шығу тегінің көрнекі бейнесі.',
      facts: [
        { title: 'Актив', body: 'Сақтаудағы астықты сипаттау. Бұл құрылымды болашақ өнімге байланысты құралдан ажырату.' },
        { title: 'Растайтын деректер', body: 'Сақтау орнын, растайтын құжаттарды және активке жауапты тараптарды көрсету.' },
        { title: 'Құқықтар', body: 'Құралдың нені білдіретінін және оған қатысты міндеттемелерді нақты сипаттау.' },
        { title: 'Қатысушылар', body: 'Актив иесінің, тиісті қызмет көрсетушілердің және рұқсат етілген қатысушылардың рөлдерін айқындау.' },
      ],
      structuresTitle: 'Құралдың үш ықтимал құрылымы',
      structures: [
        { title: 'Қойма қолхатының токені', body: 'Сақтаудағы астыққа қолхатпен байланысты цифрлық бейне. Құрал астықты, ұстаушының құқықтарын және жеткізу немесе өтеу шарттарын айқындайды.' },
        { title: 'Токенизацияланған форвард', body: 'Болашақ жеткізу шартымен байланысты құрал. Шарттар тауарды, сапа класын, жеткізу орны мен мерзімін айқындайды.' },
        { title: 'Қорлар мен дебиторлық берешекке байланысты құрал', body: 'Қорларға немесе сауда дебиторлық берешегіне байланысты, қамтамасыз етілуі, төлем басымдықтары және міндеттемелері құжатталған қаржыландыру құрылымы.' },
      ],
      evidenceTitle: 'Нақты активпен байланыс',
      evidenceBody: '«Ашық элеватор» тұжырымдамасы цифрлық жазбаны сақтау деректерімен байланыстырады: өлшеу, температура мен ылғалдылықты бақылау, астық мөлшері мен күйін есепке алу. Әр жоба үшін қолда бар деректер мен тексерулерді анықтау қажет.',
      note: 'Көрнекі тұжырымдама. Қолжетімділік, құқықтар және қатысу нақты құралдың құжаттары мен талаптарына байланысты.',
      watch: 'Астық бөліміне өту', more: 'Әзірленуде: келесі актив хаттамалары',
      concepts: [
        { title: 'Музыкалық құқықтар мен роялти', body: 'Музыкалық зияткерлік меншікке және роялтиге қатысты айқындалған құқықтарды токенизациялау.' },
        { title: 'Ойын ішіндегі активтер', body: 'Ойын экожүйесіндегі цифрлық нысандар мен оларға қатысты құқықтарды токенизациялау.' },
        { title: 'Су нысандары жобалары', body: 'Премиум газсыз су өндіретін жаңа нысанның құрылысына арналған су ұңғымасы токенінің тұжырымдамасы. Құқықтар жерасты суларына меншікке емес, жобаға қатысты.' },
      ],
    },
    company: {
      eyebrow: 'Оқиғаның артындағы компания', title: 'Commodity Chain Ltd. компаниясымен диалог.',
      body: 'Commodity Chain Ltd. іске қосылу кезеңінде. Акционерлердің қатарында AIFC TechHub бар. Компания туралы деректерді, реттеуші жазбаларды және платформаның даму жоспарларын қарастырыңыз.',
      shareholder: 'AIFC TechHub', shareholderBody: 'Компания тізілімінде Tech Hub Limited атауымен белсенді акционер ретінде көрсетілген.',
      partnershipLabel: 'Стратегиялық инновациялық серіктестік', partnershipTitle: 'Нақты активтерді токенизациялауды сынау.',
      partnershipBody: 'Инновациялық бастама аясында нақты активтерді (RWA) токенизациялауды зерттеу және сынау үшін TechHub арқылы АХҚО-мен стратегиялық серіктестік.',
      licence: 'AFSA лицензиясы туралы жазба',
      recordNote: 'Жазбада Investment Tokens алаңы үшін Operating an Exchange және Operating a Clearing House қызметтері көрсетілген. Өзекті мәртебе мен қызмет ауқымын сілтемеден қараңыз.',
    },
    enquiry: {
      title: 'Жобаңыз туралы айтыңыз.', body: 'Бастау үшін қысқаша сипаттама жеткілікті: актив, оның орналасқан жері және талқылағыңыз келетін мәселе.',
      name: 'Атыңыз', email: 'Жұмыс поштасы', organisation: 'Ұйым', project: 'Жобаңыз',
      placeholder: 'Актив қандай, қайда орналасқан және нені талқылағыңыз келеді?',
      submit: 'Хат дайындау', notice: 'Нобайды тексеріп, пошта қолданбасында ашыңыз да, info@commochain.ltd мекенжайына жіберіңіз. Бұл нысан өтінішті жібермейді және сақтамайды.',
      prepared: 'Хат нобайы дайын. Әлі ештеңе жіберілген жоқ. Оны пошта қолданбасында ашыңыз немесе төмендегі мәтінді көшіріңіз.',
      copy: 'Өтінішті көшіру', copied: 'Өтініш көшірілді', copyFailed: 'Көшіру мүмкін болмады. Төмендегі мәтінді белгілеп, көшіріңіз.', draft: 'Хат нобайы',
      nextTitle: 'Алғашқы әңгімеге қажет мәліметтер', nextBody: 'Активтің түрі мен орналасқан жерін, жобаға қатысатын тараптарды және шешкіңіз келетін мәселені көрсетіңіз. Алғашқы өтінішке құпия құжаттарды қоспаңыз.',
    },
  },
} satisfies Record<Locale, OverviewCopy>;

// Shared current facts feed the homepage, optional story and printable overview.
export const overviewCopy = Object.fromEntries(Object.entries(baseOverviewCopy).map(([key, value]) => {
  const current = publicSiteCopy[key as Locale];
  return [key, { ...value, hero: current.intro,
    overview: { ...value.overview, body: current.intro, status: current.stage, statusBody: current.stageBody },
    company: { ...value.company, title: current.company, body: current.stageBody,
      shareholderBody: current.shareholderBody, partnershipTitle: current.partnershipTitle,
      partnershipBody: current.shareholderBody, licence: current.licenceLabel, recordNote: current.scope },
  }];
})) as Record<Locale, OverviewCopy>;
