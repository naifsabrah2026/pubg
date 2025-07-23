<?php
class SEOHelper {
    private static $defaultTitle = 'متجر حسابات PUBG Mobile - أفضل الحسابات والأسعار';
    private static $defaultDescription = 'متجر متخصص في بيع حسابات PUBG Mobile المميزة. حسابات كونكر وآيس بأفضل الأسعار. تسليم فوري وضمان شامل.';
    private static $defaultKeywords = 'PUBG Mobile, حسابات ببجي, كونكر, آيس, أسلحة نادرة, سكنز, متجر حسابات';
    private static $siteName = 'PUBG Mobile Store';
    private static $siteUrl = 'https://pubgstore.com';
    
    public static function generateMetaTags($page = 'home', $data = []) {
        $meta = self::getPageMeta($page, $data);
        
        echo "<!-- Basic Meta Tags -->\n";
        echo "<title>{$meta['title']}</title>\n";
        echo "<meta name=\"description\" content=\"{$meta['description']}\">\n";
        echo "<meta name=\"keywords\" content=\"{$meta['keywords']}\">\n";
        echo "<meta name=\"author\" content=\"" . self::$siteName . "\">\n";
        echo "<meta name=\"robots\" content=\"{$meta['robots']}\">\n";
        
        // Open Graph Tags
        echo "\n<!-- Open Graph Meta Tags -->\n";
        echo "<meta property=\"og:title\" content=\"{$meta['title']}\">\n";
        echo "<meta property=\"og:description\" content=\"{$meta['description']}\">\n";
        echo "<meta property=\"og:type\" content=\"{$meta['og_type']}\">\n";
        echo "<meta property=\"og:url\" content=\"{$meta['canonical']}\">\n";
        echo "<meta property=\"og:image\" content=\"{$meta['image']}\">\n";
        echo "<meta property=\"og:site_name\" content=\"" . self::$siteName . "\">\n";
        echo "<meta property=\"og:locale\" content=\"ar_SA\">\n";
        
        // Twitter Card Tags
        echo "\n<!-- Twitter Card Meta Tags -->\n";
        echo "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";
        echo "<meta name=\"twitter:title\" content=\"{$meta['title']}\">\n";
        echo "<meta name=\"twitter:description\" content=\"{$meta['description']}\">\n";
        echo "<meta name=\"twitter:image\" content=\"{$meta['image']}\">\n";
        
        // Additional SEO Tags
        echo "\n<!-- Additional SEO Tags -->\n";
        echo "<link rel=\"canonical\" href=\"{$meta['canonical']}\">\n";
        
        if (!empty($meta['prev'])) {
            echo "<link rel=\"prev\" href=\"{$meta['prev']}\">\n";
        }
        
        if (!empty($meta['next'])) {
            echo "<link rel=\"next\" href=\"{$meta['next']}\">\n";
        }
        
        // Structured Data
        echo "\n<!-- Structured Data -->\n";
        echo "<script type=\"application/ld+json\">\n";
        echo json_encode(self::generateStructuredData($page, $data), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        echo "\n</script>\n";
    }
    
    private static function getPageMeta($page, $data) {
        $currentUrl = self::getCurrentUrl();
        
        switch ($page) {
            case 'home':
                return [
                    'title' => self::$defaultTitle,
                    'description' => self::$defaultDescription,
                    'keywords' => self::$defaultKeywords,
                    'robots' => 'index, follow',
                    'og_type' => 'website',
                    'canonical' => self::$siteUrl,
                    'image' => self::$siteUrl . '/assets/images/og-home.jpg'
                ];
                
            case 'product':
                $product = $data['product'] ?? [];
                $title = !empty($product['title']) ? 
                    $product['title'] . ' - ' . self::$siteName : 
                    'منتج - ' . self::$siteName;
                
                $description = !empty($product['description']) ? 
                    substr(strip_tags($product['description']), 0, 160) . '...' : 
                    self::$defaultDescription;
                
                $keywords = self::$defaultKeywords;
                if (!empty($product['rank_name'])) {
                    $keywords .= ', ' . $product['rank_name'];
                }
                if (!empty($product['category'])) {
                    $keywords .= ', ' . $product['category'];
                }
                
                $image = self::$siteUrl . '/assets/images/og-product.jpg';
                if (!empty($product['images'])) {
                    $images = json_decode($product['images'], true);
                    if (!empty($images[0])) {
                        $image = self::$siteUrl . '/' . $images[0];
                    }
                }
                
                return [
                    'title' => $title,
                    'description' => $description,
                    'keywords' => $keywords,
                    'robots' => 'index, follow',
                    'og_type' => 'product',
                    'canonical' => $currentUrl,
                    'image' => $image
                ];
                
            case 'accounts':
                return [
                    'title' => 'جميع حسابات PUBG Mobile - ' . self::$siteName,
                    'description' => 'تصفح مجموعتنا الكاملة من حسابات PUBG Mobile المميزة. حسابات كونكر وآيس وكراون بأفضل الأسعار.',
                    'keywords' => self::$defaultKeywords . ', جميع الحسابات, تصفح الحسابات',
                    'robots' => 'index, follow',
                    'og_type' => 'website',
                    'canonical' => $currentUrl,
                    'image' => self::$siteUrl . '/assets/images/og-accounts.jpg'
                ];
                
            case 'terms':
                return [
                    'title' => 'الشروط والأحكام - ' . self::$siteName,
                    'description' => 'اطلع على شروط وأحكام استخدام متجر حسابات PUBG Mobile وسياسات الخصوصية والضمان.',
                    'keywords' => 'شروط الاستخدام, أحكام, سياسة الخصوصية, ضمان',
                    'robots' => 'index, follow',
                    'og_type' => 'article',
                    'canonical' => $currentUrl,
                    'image' => self::$siteUrl . '/assets/images/og-terms.jpg'
                ];
                
            default:
                return [
                    'title' => self::$defaultTitle,
                    'description' => self::$defaultDescription,
                    'keywords' => self::$defaultKeywords,
                    'robots' => 'index, follow',
                    'og_type' => 'website',
                    'canonical' => $currentUrl,
                    'image' => self::$siteUrl . '/assets/images/og-default.jpg'
                ];
        }
    }
    
    private static function generateStructuredData($page, $data) {
        $baseData = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => self::$siteName,
            'url' => self::$siteUrl,
            'logo' => self::$siteUrl . '/assets/images/logo.png',
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+966-50-123-4567',
                'contactType' => 'customer service',
                'availableLanguage' => 'Arabic'
            ],
            'sameAs' => [
                'https://twitter.com/pubgstore',
                'https://instagram.com/pubgstore',
                'https://telegram.me/pubgstore'
            ]
        ];
        
        switch ($page) {
            case 'product':
                $product = $data['product'] ?? [];
                if (!empty($product)) {
                    return [
                        '@context' => 'https://schema.org',
                        '@type' => 'Product',
                        'name' => $product['title'] ?? '',
                        'description' => strip_tags($product['description'] ?? ''),
                        'image' => !empty($product['images']) ? 
                            array_map(function($img) {
                                return self::$siteUrl . '/' . $img;
                            }, json_decode($product['images'], true)) : [],
                        'offers' => [
                            '@type' => 'Offer',
                            'price' => $product['price'] ?? 0,
                            'priceCurrency' => 'SAR',
                            'availability' => 'https://schema.org/InStock',
                            'seller' => [
                                '@type' => 'Organization',
                                'name' => self::$siteName
                            ]
                        ],
                        'brand' => [
                            '@type' => 'Brand',
                            'name' => 'PUBG Mobile'
                        ],
                        'category' => $product['category'] ?? 'Gaming Account'
                    ];
                }
                break;
                
            case 'home':
                return [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'name' => self::$siteName,
                    'url' => self::$siteUrl,
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => self::$siteUrl . '/search?q={search_term_string}',
                        'query-input' => 'required name=search_term_string'
                    ]
                ];
        }
        
        return $baseData;
    }
    
    private static function getCurrentUrl() {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        
        return $protocol . '://' . $host . $uri;
    }
    
    public static function generateSitemap() {
        $db = new Database();
        
        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // الصفحات الثابتة
        $staticPages = [
            ['url' => '', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => 'accounts', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => 'terms', 'priority' => '0.5', 'changefreq' => 'monthly']
        ];
        
        foreach ($staticPages as $page) {
            $sitemap .= self::generateSitemapUrl(
                self::$siteUrl . '/' . $page['url'],
                date('Y-m-d'),
                $page['changefreq'],
                $page['priority']
            );
        }
        
        // صفحات المنتجات
        $products = $db->fetchAll("SELECT id, updated_at FROM products WHERE status = 'active'");
        foreach ($products as $product) {
            $sitemap .= self::generateSitemapUrl(
                self::$siteUrl . '/product.php?id=' . $product['id'],
                date('Y-m-d', strtotime($product['updated_at'])),
                'weekly',
                '0.8'
            );
        }
        
        $sitemap .= '</urlset>';
        
        file_put_contents('sitemap.xml', $sitemap);
        return true;
    }
    
    private static function generateSitemapUrl($url, $lastmod, $changefreq, $priority) {
        return "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>{$lastmod}</lastmod>\n" .
               "    <changefreq>{$changefreq}</changefreq>\n" .
               "    <priority>{$priority}</priority>\n" .
               "  </url>\n";
    }
    
    public static function generateRobotsTxt() {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Disallow: /admin/\n";
        $robots .= "Disallow: /includes/\n";
        $robots .= "Disallow: /logs/\n";
        $robots .= "Disallow: /config/\n";
        $robots .= "\n";
        $robots .= "Sitemap: " . self::$siteUrl . "/sitemap.xml\n";
        
        file_put_contents('robots.txt', $robots);
        return true;
    }
}

// دالة مساعدة لإنشاء meta tags
function seo_meta($page = 'home', $data = []) {
    SEOHelper::generateMetaTags($page, $data);
}
?>
