<?php
class SEOHelper {
    private $title = '';
    private $description = '';
    private $keywords = '';
    private $image = '';
    private $url = '';
    private $type = 'website';
    
    public function setTitle($title) {
        $this->title = $title;
    }
    
    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setKeywords($keywords) {
        $this->keywords = $keywords;
    }
    
    public function setImage($image) {
        $this->image = $image;
    }
    
    public function setUrl($url) {
        $this->url = $url;
    }
    
    public function setType($type) {
        $this->type = $type;
    }
    
    public function generateMetaTags() {
        $currentUrl = $this->url ?: $this->getCurrentUrl();
        $defaultImage = SITE_URL . '/public/placeholder-logo.png';
        $image = $this->image ?: $defaultImage;
        
        $html = '';
        
        // Basic Meta Tags
        $html .= '<title>' . htmlspecialchars($this->title) . '</title>' . "\n";
        $html .= '<meta name="description" content="' . htmlspecialchars($this->description) . '">' . "\n";
        $html .= '<meta name="keywords" content="' . htmlspecialchars($this->keywords) . '">' . "\n";
        $html .= '<meta name="robots" content="index, follow">' . "\n";
        $html .= '<meta name="author" content="' . SITE_NAME . '">' . "\n";
        
        // Open Graph Tags
        $html .= '<meta property="og:title" content="' . htmlspecialchars($this->title) . '">' . "\n";
        $html .= '<meta property="og:description" content="' . htmlspecialchars($this->description) . '">' . "\n";
        $html .= '<meta property="og:image" content="' . htmlspecialchars($image) . '">' . "\n";
        $html .= '<meta property="og:url" content="' . htmlspecialchars($currentUrl) . '">' . "\n";
        $html .= '<meta property="og:type" content="' . htmlspecialchars($this->type) . '">' . "\n";
        $html .= '<meta property="og:site_name" content="' . SITE_NAME . '">' . "\n";
        $html .= '<meta property="og:locale" content="ar_SA">' . "\n";
        
        // Twitter Card Tags
        $html .= '<meta name="twitter:card" content="summary_large_image">' . "\n";
        $html .= '<meta name="twitter:title" content="' . htmlspecialchars($this->title) . '">' . "\n";
        $html .= '<meta name="twitter:description" content="' . htmlspecialchars($this->description) . '">' . "\n";
        $html .= '<meta name="twitter:image" content="' . htmlspecialchars($image) . '">' . "\n";
        
        // Structured Data
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => SITE_NAME,
            'url' => SITE_URL,
            'description' => $this->description,
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => SITE_URL . '/search.php?q={search_term_string}',
                'query-input' => 'required name=search_term_string'
            ]
        ];
        
        $html .= '<script type="application/ld+json">' . json_encode($structuredData, JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
        
        return $html;
    }
    
    private function getCurrentUrl() {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        return $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }
}
?>
