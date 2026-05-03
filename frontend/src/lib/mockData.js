/**
 * Static mock data for demo deployments (e.g. GitHub Pages) where
 * the Laravel backend isn't available. Mirrors the shape returned
 * by the Laravel API resources, so the React code is unchanged.
 *
 * To regenerate from a live Laravel: hit each /api/v1/* endpoint
 * and paste the .data field below.
 */

export const mockSettings = {
  id: 1,
  logo: null,
  logo_dark: null,
  favicon: null,
  site_name: { en: 'Golden Future Care', ar: 'Golden Future Care' },
  site_tagline: {
    en: 'Advanced solutions for network infrastructure',
    ar: 'حلول متقدمة للبنية التحتية للشبكات',
  },
  hero_title: {
    en: 'Advanced solutions for network infrastructure',
    ar: 'حلول متقدمة لشبكات الاتصال والبنية التحتية',
  },
  hero_subtitle: {
    en: 'Reliable cabling and connectivity for businesses, contractors, and system integrators.',
    ar: 'كابلات وحلول اتصال موثوقة للشركات والمقاولين ومتكاملي الأنظمة.',
  },
  hero_cta_text: { en: 'Explore products', ar: 'استكشف المنتجات' },
  about_short: {
    en: 'Golden Future Care supplies premium network cabling sourced from leading global manufacturers. We serve enterprises, contractors, and integrators across the Kingdom of Saudi Arabia with an unwavering commitment to quality and on-time delivery.',
    ar: 'تعمل Golden Future Care على توريد كابلات الشبكات عالية الجودة من كبار المصنّعين العالميين، وتخدم الشركات والمقاولين ومتكاملي الأنظمة في كافة أنحاء المملكة العربية السعودية، بالتزام راسخ بمعايير الجودة وسرعة التنفيذ.',
  },
  phone_primary: '+966 50 395 9933',
  email_primary: 'itmohgamal@gf-care.com',
  address_line: { en: 'Riyadh, KSA', ar: 'الرياض، المملكة العربية السعودية' },
  whatsapp: '+966503959933',
  twitter: 'https://x.com/',
  linkedin: 'https://www.linkedin.com/',
  working_hours: {
    en: 'Sunday to Thursday — 9:00 AM to 6:00 PM',
    ar: 'الأحد إلى الخميس — من 9 صباحاً إلى 6 مساءً',
  },
};

export const mockServices = [
  {
    id: 1, slug: 'copper-cat6', icon: 'cable', order: 1, is_featured: true, image: null,
    title: { en: 'Copper Cat6', ar: 'كابلات نحاسية Cat6' },
    short_description: {
      en: 'High-performance Cat6 copper cabling for gigabit networks and structured cabling systems.',
      ar: 'كابلات نحاسية Cat6 عالية الأداء لشبكات الجيجابت وأنظمة الكابلات المنظمة.',
    },
    description: {
      en: '<p>Cat6 copper cabling supports gigabit Ethernet up to 100 meters and is the standard choice for modern enterprise structured cabling.</p><p>Variants include UTP, F/UTP, and SF/UTP shielding options for different deployment environments.</p>',
      ar: '<p>كابلات Cat6 النحاسية تدعم شبكات Gigabit Ethernet لمسافة تصل إلى 100 متر، وهي الاختيار القياسي لأنظمة الكابلات المنظمة في المؤسسات الحديثة.</p><p>تشمل الأنواع المتوفرة خيارات الحماية UTP و F/UTP و SF/UTP لمختلف بيئات التركيب.</p>',
    },
    features: [
      { en: 'Up to 1 Gbps over 100m', ar: 'سرعة حتى 1 جيجابت لمسافة 100 متر' },
      { en: 'UTP / F/UTP / SF/UTP options', ar: 'خيارات حماية UTP / F/UTP / SF/UTP' },
      { en: 'LSZH and PVC jacket options', ar: 'خيارات الغلاف LSZH و PVC' },
      { en: 'TIA/EIA certified', ar: 'مطابق لمعايير TIA/EIA' },
    ],
  },
  {
    id: 2, slug: 'copper-cat6a', icon: 'cable', order: 2, is_featured: true, image: null,
    title: { en: 'Copper Cat6A', ar: 'كابلات نحاسية Cat6A' },
    short_description: {
      en: 'Augmented Cat6A cabling for 10 Gigabit Ethernet over the full 100-meter channel.',
      ar: 'كابلات Cat6A المُعزّزة لشبكات 10 جيجابت لمسافة 100 متر كاملة.',
    },
    description: {
      en: '<p>Cat6A is the modern choice for 10 GbE networks, supporting full bandwidth over the entire 100-meter channel with reduced alien crosstalk.</p><p>Ideal for data centers, healthcare, and high-density enterprise deployments where future-proofing is essential.</p>',
      ar: '<p>Cat6A هي الاختيار الحديث لشبكات 10 جيجابت، تدعم النطاق الترددي الكامل لمسافة 100 متر مع تقليل التداخل بين الكابلات.</p><p>مثالية لمراكز البيانات والمنشآت الصحية والشركات ذات الكثافة العالية حيث يكون التجهيز للمستقبل ضرورياً.</p>',
    },
    features: [
      { en: '10 Gbps over 100m', ar: 'سرعة 10 جيجابت لمسافة 100 متر' },
      { en: 'Reduced alien crosstalk', ar: 'تقليل التداخل بين الكابلات' },
      { en: 'Shielded constructions available', ar: 'إصدارات محمية متوفرة' },
      { en: 'PoE+ and PoE++ ready', ar: 'يدعم PoE+ و PoE++' },
    ],
  },
  {
    id: 3, slug: 'fiber-optic', icon: 'circuit-board', order: 3, is_featured: true, image: null,
    title: { en: 'Fiber Optic', ar: 'كابلات الألياف البصرية' },
    short_description: {
      en: 'Single-mode and multi-mode fiber for backbones, data centers, and long-distance connectivity.',
      ar: 'كابلات ألياف بصرية أحادية ومتعددة الأنماط للعمود الفقري ومراكز البيانات والمسافات الطويلة.',
    },
    description: {
      en: '<p>Comprehensive fiber portfolio: OS2 single-mode for long-haul and FTTx, OM3/OM4/OM5 multi-mode for data center and campus backbones.</p><p>Available in indoor, outdoor, armored, and tactical constructions.</p>',
      ar: '<p>تشكيلة كاملة من كابلات الألياف البصرية: OS2 أحادية النمط للمسافات الطويلة وشبكات FTTx، و OM3/OM4/OM5 متعددة الأنماط لمراكز البيانات والعمود الفقري للحرم الجامعي.</p><p>متوفرة بإصدارات داخلية وخارجية ومدرّعة وتكتيكية.</p>',
    },
    features: [
      { en: 'OS2 single-mode (G.652.D)', ar: 'OS2 أحادية النمط (G.652.D)' },
      { en: 'OM3/OM4/OM5 multi-mode', ar: 'OM3/OM4/OM5 متعددة الأنماط' },
      { en: 'Indoor / outdoor / armored', ar: 'داخلية / خارجية / مدرّعة' },
      { en: 'Pre-terminated assemblies', ar: 'تجميعات جاهزة مسبقاً' },
    ],
  },
  {
    id: 4, slug: 'accessories', icon: 'package', order: 4, is_featured: true, image: null,
    title: { en: 'Accessories', ar: 'الإكسسوارات' },
    short_description: {
      en: 'Patch panels, racks, modules, faceplates, and full passive networking accessories.',
      ar: 'لوحات التوصيل والـ rack والوحدات والإطارات وكل إكسسوارات الشبكات السلبية.',
    },
    description: {
      en: '<p>Complete passive networking ecosystem: patch panels, keystone modules, faceplates, racks, cable managers, and patch cords.</p><p>All accessories are tested for compatibility with our cable lines for end-to-end channel performance.</p>',
      ar: '<p>منظومة كاملة من إكسسوارات الشبكات السلبية: لوحات التوصيل، وحدات Keystone، الإطارات، الـ rack، منظمات الكابلات، وكابلات التوصيل القصيرة.</p><p>جميع الإكسسوارات مُختبرة للتوافق مع كابلاتنا لضمان أداء القناة من النهاية للنهاية.</p>',
    },
    features: [
      { en: 'Patch panels (24/48 port)', ar: 'لوحات توصيل (24/48 منفذ)' },
      { en: 'Keystone modules and faceplates', ar: 'وحدات Keystone والإطارات' },
      { en: '19" racks and cable managers', ar: 'Rack 19 إنش ومنظمات الكابلات' },
      { en: 'Patch cords (Cat6/6A, fiber)', ar: 'كابلات توصيل (Cat6/6A، فايبر)' },
    ],
  },
];

export const mockSolutions = [
  {
    id: 1, slug: 'data-centers', icon: 'server', order: 1,
    title: { en: 'Data Centers', ar: 'مراكز البيانات' },
    short_description: { en: 'Structured cabling for modern data centers.', ar: 'كابلات منظمة لمراكز البيانات الحديثة.' },
    description: { en: '<p>End-to-end cabling solutions for hyperscale and enterprise data centers.</p>', ar: '<p>حلول كابلات متكاملة لمراكز البيانات الكبرى والمؤسسية.</p>' },
  },
  {
    id: 2, slug: 'enterprise', icon: 'building-2', order: 2,
    title: { en: 'Enterprise', ar: 'القطاع المؤسسي' },
    short_description: { en: 'Reliable LAN infrastructure for offices and campuses.', ar: 'بنية تحتية موثوقة للمكاتب والمجمعات.' },
    description: { en: '<p>Scalable structured cabling for offices, campuses, and multi-site organizations.</p>', ar: '<p>كابلات منظمة قابلة للتوسع للمكاتب والمجمعات والشركات متعددة الفروع.</p>' },
  },
  {
    id: 3, slug: 'healthcare', icon: 'heart-pulse', order: 3,
    title: { en: 'Healthcare', ar: 'القطاع الصحي' },
    short_description: { en: 'Hospital-grade cabling for clinical environments.', ar: 'كابلات بمعايير المستشفيات.' },
    description: { en: '<p>Cabling tested for clinical environments — supporting medical imaging, EMR, and IoMT devices.</p>', ar: '<p>كابلات مُختبرة للبيئات السريرية — تدعم الأشعة الطبية وأنظمة السجلات الإلكترونية وأجهزة IoMT.</p>' },
  },
  {
    id: 4, slug: 'government', icon: 'landmark', order: 4,
    title: { en: 'Government', ar: 'الجهات الحكومية' },
    short_description: { en: 'Compliant cabling for ministries and public sector.', ar: 'كابلات متوافقة مع معايير القطاع العام.' },
    description: { en: '<p>Cabling that meets local procurement and security requirements for public sector deployments.</p>', ar: '<p>كابلات تلبي متطلبات الشراء والأمن المحلية للمشاريع الحكومية والقطاع العام.</p>' },
  },
];

export const mockPartners = [
  { id: 1, name: 'Chatsworth Products', order: 1, logo: null },
  { id: 2, name: 'CORNING',             order: 2, logo: null },
  { id: 3, name: 'COMMSCOPE',           order: 3, logo: null },
  { id: 4, name: 'BOREAS',              order: 4, logo: null },
  { id: 5, name: 'Panduit',             order: 5, logo: null },
  { id: 6, name: 'Belden',              order: 6, logo: null },
  { id: 7, name: 'Legrand',             order: 7, logo: null },
  { id: 8, name: 'R&M',                 order: 8, logo: null },
];

export const mockProjects = [];
export const mockTeam = [];
export const mockBlog = { data: [], current_page: 1, last_page: 1 };
