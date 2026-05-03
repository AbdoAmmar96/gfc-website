<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Solution;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seeds Golden Future Care content with real contact info and product categories.
 * All copy is editable through Filament admin at /admin.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // === Admin user ===
        User::updateOrCreate(
            ['email' => 'admin@gfc-it.com'],
            [
                'name' => 'Site Administrator',
                'password' => Hash::make('ChangeMe!2026'),
                'email_verified_at' => now(),
            ]
        );

        // === Site settings ===
        Setting::updateOrCreate(['id' => 1], [
            'site_name'     => ['en' => 'Golden Future Care', 'ar' => 'Golden Future Care'],
            'site_tagline'  => [
                'en' => 'Advanced solutions for network infrastructure',
                'ar' => 'حلول متقدمة للبنية التحتية للشبكات',
            ],
            'hero_title'    => [
                'en' => 'Advanced solutions for network infrastructure',
                'ar' => 'حلول متقدمة لشبكات الاتصال والبنية التحتية',
            ],
            'hero_subtitle' => [
                'en' => 'Reliable cabling and connectivity for businesses, contractors, and system integrators.',
                'ar' => 'كابلات وحلول اتصال موثوقة للشركات والمقاولين ومتكاملي الأنظمة.',
            ],
            'hero_cta_text' => ['en' => 'Explore products', 'ar' => 'استكشف المنتجات'],
            'about_short'   => [
                'en' => 'Golden Future Care supplies premium network cabling sourced from leading global manufacturers. We serve enterprises, contractors, and integrators across the Kingdom of Saudi Arabia with an unwavering commitment to quality and on-time delivery.',
                'ar' => 'تعمل Golden Future Care على توريد كابلات الشبكات عالية الجودة من كبار المصنّعين العالميين، وتخدم الشركات والمقاولين ومتكاملي الأنظمة في كافة أنحاء المملكة العربية السعودية، بالتزام راسخ بمعايير الجودة وسرعة التنفيذ.',
            ],
            'phone_primary' => '+966 50 395 9933',
            'email_primary' => 'itmohgamal@gf-care.com',
            'address_line'  => [
                'en' => 'Riyadh, KSA',
                'ar' => 'الرياض، المملكة العربية السعودية',
            ],
            'whatsapp'      => '+966503959933',
            'twitter'       => 'https://x.com/',
            'linkedin'      => 'https://www.linkedin.com/',
            'working_hours' => [
                'en' => 'Sunday to Thursday — 9:00 AM to 6:00 PM',
                'ar' => 'الأحد إلى الخميس — من 9 صباحاً إلى 6 مساءً',
            ],
        ]);

        // === Product categories ===
        $products = [
            [
                'slug' => 'copper-cat6',
                'icon' => 'cable',
                'order' => 1, 'is_featured' => true,
                'title' => ['en' => 'Copper Cat6', 'ar' => 'كابلات نحاسية Cat6'],
                'short_description' => [
                    'en' => 'High-performance Cat6 copper cabling for gigabit networks and structured cabling systems.',
                    'ar' => 'كابلات نحاسية Cat6 عالية الأداء لشبكات الجيجابت وأنظمة الكابلات المنظمة.',
                ],
                'description' => [
                    'en' => '<p>Cat6 copper cabling supports gigabit Ethernet up to 100 meters and is the standard choice for modern enterprise structured cabling.</p><p>Variants include UTP, F/UTP, and SF/UTP shielding options for different deployment environments.</p>',
                    'ar' => '<p>كابلات Cat6 النحاسية تدعم شبكات Gigabit Ethernet لمسافة تصل إلى 100 متر، وهي الاختيار القياسي لأنظمة الكابلات المنظمة في المؤسسات الحديثة.</p><p>تشمل الأنواع المتوفرة خيارات الحماية UTP و F/UTP و SF/UTP لمختلف بيئات التركيب.</p>',
                ],
                'features' => [
                    ['en' => 'Up to 1 Gbps over 100m', 'ar' => 'سرعة حتى 1 جيجابت لمسافة 100 متر'],
                    ['en' => 'UTP / F/UTP / SF/UTP options', 'ar' => 'خيارات حماية UTP / F/UTP / SF/UTP'],
                    ['en' => 'LSZH and PVC jacket options', 'ar' => 'خيارات الغلاف LSZH و PVC'],
                    ['en' => 'TIA/EIA certified', 'ar' => 'مطابق لمعايير TIA/EIA'],
                ],
            ],
            [
                'slug' => 'copper-cat6a',
                'icon' => 'cable',
                'order' => 2, 'is_featured' => true,
                'title' => ['en' => 'Copper Cat6A', 'ar' => 'كابلات نحاسية Cat6A'],
                'short_description' => [
                    'en' => 'Augmented Cat6A cabling for 10 Gigabit Ethernet over the full 100-meter channel.',
                    'ar' => 'كابلات Cat6A المُعزّزة لشبكات 10 جيجابت لمسافة 100 متر كاملة.',
                ],
                'description' => [
                    'en' => '<p>Cat6A is the modern choice for 10 GbE networks, supporting full bandwidth over the entire 100-meter channel with reduced alien crosstalk.</p><p>Ideal for data centers, healthcare, and high-density enterprise deployments where future-proofing is essential.</p>',
                    'ar' => '<p>Cat6A هي الاختيار الحديث لشبكات 10 جيجابت، تدعم النطاق الترددي الكامل لمسافة 100 متر مع تقليل التداخل بين الكابلات.</p><p>مثالية لمراكز البيانات والمنشآت الصحية والشركات ذات الكثافة العالية حيث يكون التجهيز للمستقبل ضرورياً.</p>',
                ],
                'features' => [
                    ['en' => '10 Gbps over 100m', 'ar' => 'سرعة 10 جيجابت لمسافة 100 متر'],
                    ['en' => 'Reduced alien crosstalk', 'ar' => 'تقليل التداخل بين الكابلات'],
                    ['en' => 'Shielded constructions available', 'ar' => 'إصدارات محمية متوفرة'],
                    ['en' => 'PoE+ and PoE++ ready', 'ar' => 'يدعم PoE+ و PoE++'],
                ],
            ],
            [
                'slug' => 'fiber-optic',
                'icon' => 'circuit-board',
                'order' => 3, 'is_featured' => true,
                'title' => ['en' => 'Fiber Optic', 'ar' => 'كابلات الألياف البصرية'],
                'short_description' => [
                    'en' => 'Single-mode and multi-mode fiber for backbones, data centers, and long-distance connectivity.',
                    'ar' => 'كابلات ألياف بصرية أحادية ومتعددة الأنماط للعمود الفقري ومراكز البيانات والمسافات الطويلة.',
                ],
                'description' => [
                    'en' => '<p>Comprehensive fiber portfolio: OS2 single-mode for long-haul and FTTx, OM3/OM4/OM5 multi-mode for data center and campus backbones.</p><p>Available in indoor, outdoor, armored, and tactical constructions.</p>',
                    'ar' => '<p>تشكيلة كاملة من كابلات الألياف البصرية: OS2 أحادية النمط للمسافات الطويلة وشبكات FTTx، و OM3/OM4/OM5 متعددة الأنماط لمراكز البيانات والعمود الفقري للحرم الجامعي.</p><p>متوفرة بإصدارات داخلية وخارجية ومدرّعة وتكتيكية.</p>',
                ],
                'features' => [
                    ['en' => 'OS2 single-mode (G.652.D)', 'ar' => 'OS2 أحادية النمط (G.652.D)'],
                    ['en' => 'OM3/OM4/OM5 multi-mode', 'ar' => 'OM3/OM4/OM5 متعددة الأنماط'],
                    ['en' => 'Indoor / outdoor / armored', 'ar' => 'داخلية / خارجية / مدرّعة'],
                    ['en' => 'Pre-terminated assemblies', 'ar' => 'تجميعات جاهزة مسبقاً'],
                ],
            ],
            [
                'slug' => 'accessories',
                'icon' => 'package',
                'order' => 4, 'is_featured' => true,
                'title' => ['en' => 'Accessories', 'ar' => 'الإكسسوارات'],
                'short_description' => [
                    'en' => 'Patch panels, racks, modules, faceplates, and full passive networking accessories.',
                    'ar' => 'لوحات التوصيل والـ rack والوحدات والإطارات وكل إكسسوارات الشبكات السلبية.',
                ],
                'description' => [
                    'en' => '<p>Complete passive networking ecosystem: patch panels, keystone modules, faceplates, racks, cable managers, and patch cords.</p><p>All accessories are tested for compatibility with our cable lines for end-to-end channel performance.</p>',
                    'ar' => '<p>منظومة كاملة من إكسسوارات الشبكات السلبية: لوحات التوصيل، وحدات Keystone، الإطارات، الـ rack، منظمات الكابلات، وكابلات التوصيل القصيرة.</p><p>جميع الإكسسوارات مُختبرة للتوافق مع كابلاتنا لضمان أداء القناة من النهاية للنهاية.</p>',
                ],
                'features' => [
                    ['en' => 'Patch panels (24/48 port)', 'ar' => 'لوحات توصيل (24/48 منفذ)'],
                    ['en' => 'Keystone modules and faceplates', 'ar' => 'وحدات Keystone والإطارات'],
                    ['en' => '19" racks and cable managers', 'ar' => 'Rack 19 إنش ومنظمات الكابلات'],
                    ['en' => 'Patch cords (Cat6/6A, fiber)', 'ar' => 'كابلات توصيل (Cat6/6A، فايبر)'],
                ],
            ],
        ];
        foreach ($products as $p) Service::updateOrCreate(['slug' => $p['slug']], $p);

        // === Industry Solutions ===
        $solutions = [
            ['slug' => 'data-centers', 'icon' => 'server', 'order' => 1,
             'title' => ['en' => 'Data Centers', 'ar' => 'مراكز البيانات'],
             'short_description' => ['en' => 'Structured cabling for modern data centers.', 'ar' => 'كابلات منظمة لمراكز البيانات الحديثة.'],
             'description' => ['en' => '<p>End-to-end cabling solutions for hyperscale and enterprise data centers.</p>', 'ar' => '<p>حلول كابلات متكاملة لمراكز البيانات الكبرى والمؤسسية.</p>'],
            ],
            ['slug' => 'enterprise', 'icon' => 'building-2', 'order' => 2,
             'title' => ['en' => 'Enterprise', 'ar' => 'القطاع المؤسسي'],
             'short_description' => ['en' => 'Reliable LAN infrastructure for offices and campuses.', 'ar' => 'بنية تحتية موثوقة للمكاتب والمجمعات.'],
             'description' => ['en' => '<p>Scalable structured cabling for offices, campuses, and multi-site organizations.</p>', 'ar' => '<p>كابلات منظمة قابلة للتوسع للمكاتب والمجمعات والشركات متعددة الفروع.</p>'],
            ],
            ['slug' => 'healthcare', 'icon' => 'heart-pulse', 'order' => 3,
             'title' => ['en' => 'Healthcare', 'ar' => 'القطاع الصحي'],
             'short_description' => ['en' => 'Hospital-grade cabling for clinical environments.', 'ar' => 'كابلات بمعايير المستشفيات.'],
             'description' => ['en' => '<p>Cabling tested for clinical environments — supporting medical imaging, EMR, and IoMT devices.</p>', 'ar' => '<p>كابلات مُختبرة للبيئات السريرية — تدعم الأشعة الطبية وأنظمة السجلات الإلكترونية وأجهزة IoMT.</p>'],
            ],
            ['slug' => 'government', 'icon' => 'landmark', 'order' => 4,
             'title' => ['en' => 'Government', 'ar' => 'الجهات الحكومية'],
             'short_description' => ['en' => 'Compliant cabling for ministries and public sector.', 'ar' => 'كابلات متوافقة مع معايير القطاع العام.'],
             'description' => ['en' => '<p>Cabling that meets local procurement and security requirements for public sector deployments.</p>', 'ar' => '<p>كابلات تلبي متطلبات الشراء والأمن المحلية للمشاريع الحكومية والقطاع العام.</p>'],
            ],
        ];
        foreach ($solutions as $s) Solution::updateOrCreate(['slug' => $s['slug']], $s);

        // === Sample projects (placeholders) ===
        $projects = [
            ['slug' => 'placeholder-project-1', 'order' => 1, 'is_featured' => true, 'completed_at' => '2025-09-15',
             'title' => ['en' => 'Replace with real project name', 'ar' => 'يُستبدل باسم المشروع الفعلي'],
             'industry' => ['en' => 'Data Center', 'ar' => 'مركز بيانات'],
             'summary' => ['en' => 'Short summary describing what was delivered. Replace via admin.', 'ar' => 'ملخص قصير يصف ما تم تسليمه. يُستبدل من لوحة التحكم.']],
            ['slug' => 'placeholder-project-2', 'order' => 2, 'is_featured' => true, 'completed_at' => '2025-06-30',
             'title' => ['en' => 'Replace with real project name', 'ar' => 'يُستبدل باسم المشروع الفعلي'],
             'industry' => ['en' => 'Healthcare', 'ar' => 'القطاع الصحي'],
             'summary' => ['en' => 'Short summary describing what was delivered. Replace via admin.', 'ar' => 'ملخص قصير يصف ما تم تسليمه. يُستبدل من لوحة التحكم.']],
            ['slug' => 'placeholder-project-3', 'order' => 3, 'is_featured' => true, 'completed_at' => '2025-03-12',
             'title' => ['en' => 'Replace with real project name', 'ar' => 'يُستبدل باسم المشروع الفعلي'],
             'industry' => ['en' => 'Education', 'ar' => 'التعليم'],
             'summary' => ['en' => 'Short summary describing what was delivered. Replace via admin.', 'ar' => 'ملخص قصير يصف ما تم تسليمه. يُستبدل من لوحة التحكم.']],
        ];
        foreach ($projects as $p) Project::updateOrCreate(['slug' => $p['slug']], $p);

        // === Suppliers (logo files to be uploaded via admin) ===
        $suppliers = [
            ['name' => 'Chatsworth Products', 'order' => 1, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'CORNING',             'order' => 2, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'COMMSCOPE',           'order' => 3, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'BOREAS',              'order' => 4, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'Panduit',             'order' => 5, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'Belden',              'order' => 6, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'Legrand',             'order' => 7, 'logo' => 'partners/placeholder.svg'],
            ['name' => 'R&M',                 'order' => 8, 'logo' => 'partners/placeholder.svg'],
        ];
        foreach ($suppliers as $s) Partner::updateOrCreate(['name' => $s['name']], $s);

        // === Team (placeholders) ===
        $team = [
            ['order' => 1, 'name' => ['en' => 'Replace via admin', 'ar' => 'يُستبدل من لوحة التحكم'], 'position' => ['en' => 'Chief Executive Officer', 'ar' => 'الرئيس التنفيذي']],
            ['order' => 2, 'name' => ['en' => 'Replace via admin', 'ar' => 'يُستبدل من لوحة التحكم'], 'position' => ['en' => 'Chief Technology Officer', 'ar' => 'الرئيس التقني']],
            ['order' => 3, 'name' => ['en' => 'Replace via admin', 'ar' => 'يُستبدل من لوحة التحكم'], 'position' => ['en' => 'Head of Sales', 'ar' => 'مدير المبيعات']],
        ];
        foreach ($team as $i => $member) {
            TeamMember::updateOrCreate(['id' => $i + 1], $member);
        }

        // === Sample blog posts ===
        $posts = [
            ['slug' => 'placeholder-post-1', 'published_at' => '2026-04-15',
             'title' => ['en' => 'Replace with real article title', 'ar' => 'يُستبدل بعنوان مقال حقيقي'],
             'category' => ['en' => 'Networking', 'ar' => 'الشبكات'],
             'excerpt' => ['en' => 'Short excerpt. Replace via admin.', 'ar' => 'مقتطف قصير. يُستبدل من لوحة التحكم.'],
             'content' => ['en' => '<p>Full article content goes here.</p>', 'ar' => '<p>محتوى المقال الكامل هنا.</p>']],
            ['slug' => 'placeholder-post-2', 'published_at' => '2026-03-20',
             'title' => ['en' => 'Replace with real article title', 'ar' => 'يُستبدل بعنوان مقال حقيقي'],
             'category' => ['en' => 'Cabling', 'ar' => 'الكابلات'],
             'excerpt' => ['en' => 'Short excerpt. Replace via admin.', 'ar' => 'مقتطف قصير. يُستبدل من لوحة التحكم.'],
             'content' => ['en' => '<p>Full article content goes here.</p>', 'ar' => '<p>محتوى المقال الكامل هنا.</p>']],
        ];
        foreach ($posts as $p) BlogPost::updateOrCreate(['slug' => $p['slug']], $p);
    }
}
