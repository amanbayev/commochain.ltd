import type { Locale } from '../i18n';
import { publicSiteCopy } from './public-site-copy.ts';

type Item = { title: string; body: string };
type FieldCopy = {
  headline: string; eyebrow: string; title: string; body: string;
  comparisonTitle: string; comparison: Item[];
  journeyTitle: string; journey: Item[];
  rolesTitle: string; roles: Item[];
  rightsTitle: string; rights: string; risk: string;
};

export const fieldToFinanceCopy = {
  en: {
    headline: 'Financing before harvest.',
    eyebrow: 'Launch protocols', title: 'The season starts before the grain exists.',
    body: 'Seeds, fuel and fieldwork need funding long before harvest. Field-to-Finance is designed to help farmers seek financing for the next season through instruments linked to a verified pool of future agricultural contracts.',
    comparisonTitle: 'Two starting points. Different evidence.',
    comparison: [
      { title: 'Before harvest · Field-to-Finance', body: 'The grain does not yet exist. Verification starts with fields, land-use documents, production plans and independent seasonal observations.' },
      { title: 'After harvest · Stored grain', body: publicSiteCopy.en.storageSummary },
    ],
    journeyTitle: 'From a field to financing',
    journey: [
      { title: 'Describe and verify', body: 'The farmer submits fields and a production plan. SCAS independently checks documents, field data and satellite evidence.' },
      { title: 'Structure and issue', body: 'The issuer defines an instrument linked to the verified contract pool, with documented investor rights, terms and risks.' },
      { title: 'Place and settle', body: 'Eligible investors participate through the exchange. Clearing handles settlement, the registrar records rights, and funds follow the agreed financing structure.' },
      { title: 'Monitor and complete', body: 'The farmer grows the crop while SCAS provides seasonal evidence. Repayment and completion follow the instrument’s terms; outcomes remain subject to risk.' },
    ],
    rolesTitle: 'Different jobs. Clear responsibilities.',
    roles: [
      { title: 'SCAS · Independent verifier', body: 'Checks fields and seasonal evidence. It does not issue the investment instrument or guarantee the harvest.' },
      { title: 'Issuer', body: 'Creates the investment instrument and takes on the obligations defined in its documentation.' },
      { title: 'Exchange', body: 'Matches buyers and sellers. Primary placement finances a new issue; permitted secondary trading transfers existing positions between investors.' },
      { title: 'Clearing', body: 'Checks the parties’ obligations and coordinates settlement of the agreed trade.' },
      { title: 'Registrar', body: 'Records who holds the instrument after issuance and each transfer.' },
      { title: 'Compliance', body: 'Checks participants, eligibility and transactions under the applicable requirements.' },
    ],
    rightsTitle: 'What does an investor acquire?',
    rights: 'An issuer’s investment instrument, with rights and payments defined by its documents. A link to a future agricultural contract pool does not automatically mean direct ownership of a particular farmer’s grain or land.',
    risk: 'Launch-stage explanation, not an offer. Verification does not guarantee a harvest, repayment, returns or a buyer on the secondary market. Availability, eligibility and obligations depend on the specific instrument and applicable requirements.',
  },
  zh: {
    headline: '收获之前，融资先行。',
    eyebrow: '首发协议', title: '粮食尚未收获，农季已经开始。',
    body: '种子、燃料和田间作业都需要在收获前投入资金。Field-to-Finance 旨在通过与经核验的未来农业合同池挂钩的工具，帮助农户寻求下一季融资。',
    comparisonTitle: '两种起点，不同的核验依据。',
    comparison: [
      { title: '收获前 · Field-to-Finance', body: '粮食尚未形成。核验从地块、土地使用文件、生产计划及独立的季节性观测开始。' },
      { title: '收获后 · 仓储粮食', body: publicSiteCopy.zh.storageSummary },
    ],
    journeyTitle: '从田间到融资',
    journey: [
      { title: '描述与核验', body: '农户提交地块资料及生产计划。SCAS 独立核查文件、田间数据和卫星证据。' },
      { title: '设计与发行', body: '发行人设计与经核验合同池挂钩的工具，并以文件明确投资者权利、条款和风险。' },
      { title: '发行配售与结算', body: '合格投资者通过交易所参与。清算所处理结算，登记机构记录权利，资金按约定的融资结构流转。' },
      { title: '监测与履约', body: '农户种植作物，SCAS 提供季节性证据。偿付及履约按工具条款执行，结果仍受风险影响。' },
    ],
    rolesTitle: '分工不同，责任明确。',
    roles: [
      { title: 'SCAS · 独立核验方', body: '核查地块及季节性证据，不发行投资工具，也不保证收成。' },
      { title: '发行人', body: '创设投资工具，并承担其文件载明的义务。' },
      { title: '交易所', body: '撮合买卖双方。一级市场配售为新发行提供资金；获准的二级市场交易在投资者之间转让已有头寸。' },
      { title: '清算所', body: '核查各方义务，并协调已达成交易的结算。' },
      { title: '登记机构', body: '在发行及每次转让后记录工具的持有人。' },
      { title: '合规', body: '根据适用要求核查参与者、资格及交易。' },
    ],
    rightsTitle: '投资者取得什么？',
    rights: '投资者取得发行人的投资工具，其权利及支付安排由相关文件界定。与未来农业合同池挂钩，并不自动意味着直接拥有某一农户的粮食或土地。',
    risk: '本内容为启动阶段的说明，并非要约。核验不保证收成、偿付、回报或二级市场买方的存在。可用性、参与资格及义务取决于具体工具和适用要求。',
  },
  ru: {
    headline: 'Финансирование до сбора урожая.',
    eyebrow: 'Протоколы на этапе запуска', title: 'Сезон начинается раньше, чем появляется зерно.',
    body: 'Семена, ГСМ и полевые работы требуют средств задолго до урожая. Field-to-Finance предназначен для привлечения финансирования следующего сезона через инструменты, связанные с проверенным пулом будущих агроконтрактов.',
    comparisonTitle: 'Две отправные точки. Разные подтверждения.',
    comparison: [
      { title: 'До урожая · Field-to-Finance', body: 'Зерна ещё нет. Проверка начинается с полей, документов на пользование землёй, производственного плана и независимых наблюдений за сезоном.' },
      { title: 'После урожая · Зерно на хранении', body: publicSiteCopy.ru.storageSummary },
    ],
    journeyTitle: 'От поля к финансированию',
    journey: [
      { title: 'Заявка и проверка', body: 'Фермер описывает поля и производственный план. SCAS независимо проверяет документы, сведения о полях и спутниковые данные.' },
      { title: 'Структурирование и выпуск', body: 'Эмитент оформляет инструмент, связанный с проверенным пулом контрактов, и документирует права инвестора, условия и риски.' },
      { title: 'Размещение и расчёт', body: 'Допущенные инвесторы участвуют через биржу. Клиринг организует расчёт, реестр фиксирует права, а средства направляются по согласованной структуре финансирования.' },
      { title: 'Мониторинг и завершение', body: 'Фермер выращивает урожай, SCAS предоставляет сезонные подтверждения. Погашение и завершение следуют условиям инструмента; риски сохраняются.' },
    ],
    rolesTitle: 'Разные задачи. Понятная ответственность.',
    roles: [
      { title: 'SCAS · Независимый верификатор', body: 'Проверяет поля и сезонные данные. Не выпускает инвестиционный инструмент и не гарантирует урожай.' },
      { title: 'Эмитент', body: 'Выпускает инвестиционный инструмент и принимает обязательства, определённые его документами.' },
      { title: 'Биржа', body: 'Сопоставляет покупателей и продавцов. Первичное размещение финансирует новый выпуск; разрешённая вторичная торговля передаёт существующие позиции между инвесторами.' },
      { title: 'Клиринг', body: 'Проверяет встречные обязательства и организует расчёт по заключённой сделке.' },
      { title: 'Реестр', body: 'Фиксирует держателя инструмента после выпуска и каждой передачи.' },
      { title: 'Комплаенс', body: 'Проверяет участников, допуск и операции согласно применимым требованиям.' },
    ],
    rightsTitle: 'Что приобретает инвестор?',
    rights: 'Инвестиционный инструмент эмитента. Права и выплаты определяются его документами. Связь с пулом будущих агроконтрактов не означает автоматического прямого владения зерном или землёй конкретного фермера.',
    risk: 'Объяснение модели на этапе запуска, не предложение инвестировать. Проверка не гарантирует урожай, погашение, доходность или покупателя на вторичном рынке. Доступность, допуск и обязательства зависят от конкретного инструмента и применимых требований.',
  },
  kk: {
    headline: 'Өнім жинауға дейінгі қаржыландыру.',
    eyebrow: 'Іске қосылу кезеңіндегі хаттамалар', title: 'Маусым астық пайда болғанға дейін басталады.',
    body: 'Тұқымға, жанар-жағармайға және дала жұмыстарына қаражат өнім жиналғанға дейін қажет. Field-to-Finance келесі маусымды тексерілген болашақ агрокелісімшарттар пулымен байланысты құралдар арқылы қаржыландыруға арналған.',
    comparisonTitle: 'Екі бастапқы нүкте. Әртүрлі дәлелдер.',
    comparison: [
      { title: 'Өнімге дейін · Field-to-Finance', body: 'Астық әлі жоқ. Тексеру алқаптардан, жерді пайдалану құжаттарынан, өндірістік жоспардан және маусым барысын тәуелсіз бақылаудан басталады.' },
      { title: 'Өнімнен кейін · Сақтаудағы астық', body: publicSiteCopy.kk.storageSummary },
    ],
    journeyTitle: 'Егістіктен қаржыландыруға дейін',
    journey: [
      { title: 'Өтінім және тексеру', body: 'Фермер алқаптары мен өндірістік жоспарын ұсынады. SCAS құжаттарды, алқап деректерін және спутниктік мәліметтерді тәуелсіз тексереді.' },
      { title: 'Құрылымдау және шығару', body: 'Эмитент тексерілген келісімшарттар пулымен байланысты құралды рәсімдеп, инвестор құқықтарын, шарттар мен тәуекелдерді құжаттайды.' },
      { title: 'Орналастыру және есеп айырысу', body: 'Рұқсат етілген инвесторлар биржа арқылы қатысады. Клиринг есеп айырысуды ұйымдастырады, тізілім құқықтарды тіркейді, қаражат келісілген қаржыландыру құрылымы бойынша бағытталады.' },
      { title: 'Бақылау және аяқтау', body: 'Фермер өнім өсіреді, SCAS маусымдық деректерді растайды. Өтеу және аяқтау құрал шарттарына сай жүргізіледі; тәуекелдер сақталады.' },
    ],
    rolesTitle: 'Әртүрлі міндеттер. Айқын жауапкершілік.',
    roles: [
      { title: 'SCAS · Тәуелсіз верификатор', body: 'Алқаптар мен маусымдық деректерді тексереді. Инвестициялық құралды шығармайды және өнімге кепілдік бермейді.' },
      { title: 'Эмитент', body: 'Инвестициялық құралды шығарып, оның құжаттарында айқындалған міндеттемелерді қабылдайды.' },
      { title: 'Биржа', body: 'Сатып алушылар мен сатушыларды сәйкестендіреді. Бастапқы орналастыру жаңа шығарылымды қаржыландырады; рұқсат етілген қайталама сауда қолданыстағы позицияларды инвесторлар арасында береді.' },
      { title: 'Клиринг', body: 'Тараптардың міндеттемелерін тексеріп, жасалған мәміле бойынша есеп айырысуды ұйымдастырады.' },
      { title: 'Тізілім', body: 'Шығарылымнан және әрбір беруден кейін құрал ұстаушысын тіркейді.' },
      { title: 'Комплаенс', body: 'Қатысушыларды, қатысу құқығын және операцияларды қолданылатын талаптарға сай тексереді.' },
    ],
    rightsTitle: 'Инвестор нені сатып алады?',
    rights: 'Эмитенттің инвестициялық құралын. Құқықтар мен төлемдер оның құжаттарымен айқындалады. Болашақ агрокелісімшарттар пулымен байланыс нақты фермердің астығына немесе жеріне автоматты түрде тікелей иелік етуді білдірмейді.',
    risk: 'Іске қосылу кезеңіндегі модель түсіндірмесі, инвестициялық ұсыныс емес. Тексеру өнімге, өтеуге, табысқа немесе қайталама нарықта сатып алушының болуына кепілдік бермейді. Қолжетімділік, қатысу және міндеттемелер нақты құрал мен қолданылатын талаптарға байланысты.',
  },
} satisfies Record<Locale, FieldCopy>;
