<?php
// معالج الأخطاء المتقدم
class ErrorHandler {
    private static $logFile = 'logs/error.log';
    private static $isProduction = false;
    
    public static function init() {
        // تحديد البيئة
        self::$isProduction = !in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', 'dev.pubgstore.com']);
        
        // إعداد معالج الأخطاء
        set_error_handler([self::class, 'handleError']);
        set_exception_handler([self::class, 'handleException']);
        register_shutdown_function([self::class, 'handleFatalError']);
        
        // إعداد التقارير
        if (self::$isProduction) {
            error_reporting(0);
            ini_set('display_errors', 0);
            ini_set('log_errors', 1);
            ini_set('error_log', self::$logFile);
        } else {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        }
        
        // إنشاء مجلد السجلات إذا لم يكن موجوداً
        $logDir = dirname(self::$logFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
    }
    
    public static function handleError($severity, $message, $file, $line) {
        if (!(error_reporting() & $severity)) {
            return false;
        }
        
        $errorInfo = [
            'type' => 'Error',
            'severity' => self::getSeverityName($severity),
            'message' => $message,
            'file' => $file,
            'line' => $line,
            'timestamp' => date('Y-m-d H:i:s'),
            'url' => $_SERVER['REQUEST_URI'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'ip' => self::getClientIP()
        ];
        
        self::logError($errorInfo);
        
        if (!self::$isProduction) {
            self::displayError($errorInfo);
        } else {
            self::showUserFriendlyError();
        }
        
        return true;
    }
    
    public static function handleException($exception) {
        $errorInfo = [
            'type' => 'Exception',
            'severity' => get_class($exception),
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->get TraceAsString(),
            'timestamp' => date('Y-m-d H:i:s'),
            'url' => $_SERVER['REQUEST_URI'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'ip' => self::getClientIP()
        ];
        
        self::logError($errorInfo);
        
        if (!self::$isProduction) {
            self::displayError($errorInfo);
        } else {
            self::showUserFriendlyError();
        }
    }
    
    public static function handleFatalError() {
        $error = error_get_last();
        
        if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
            $errorInfo = [
                'type' => 'Fatal Error',
                'severity' => self::getSeverityName($error['type']),
                'message' => $error['message'],
                'file' => $error['file'],
                'line' => $error['line'],
                'timestamp' => date('Y-m-d H:i:s'),
                'url' => $_SERVER['REQUEST_URI'] ?? '',
                'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
                'ip' => self::getClientIP()
            ];
            
            self::logError($errorInfo);
            
            if (!self::$isProduction) {
                self::displayError($errorInfo);
            } else {
                self::showUserFriendlyError();
            }
        }
    }
    
    private static function logError($errorInfo) {
        $logMessage = sprintf(
            "[%s] %s: %s in %s on line %d\n",
            $errorInfo['timestamp'],
            $errorInfo['type'],
            $errorInfo['message'],
            $errorInfo['file'],
            $errorInfo['line']
        );
        
        if (isset($errorInfo['trace'])) {
            $logMessage .= "Stack trace:\n" . $errorInfo['trace'] . "\n";
        }
        
        $logMessage .= "URL: " . $errorInfo['url'] . "\n";
        $logMessage .= "IP: " . $errorInfo['ip'] . "\n";
        $logMessage .= "User Agent: " . $errorInfo['user_agent'] . "\n";
        $logMessage .= str_repeat('-', 80) . "\n";
        
        file_put_contents(self::$logFile, $logMessage, FILE_APPEND | LOCK_EX);
        
        // إرسال تنبيه للمطورين في الأخطاء الحرجة
        if (in_array($errorInfo['severity'], ['Fatal Error', 'Error', 'Parse Error'])) {
            self::notifyDevelopers($errorInfo);
        }
    }
    
    private static function displayError($errorInfo) {
        if (headers_sent()) {
            echo "<div style='background: #f8d7da; color: #721c24; padding: 15px; margin: 10px; border: 1px solid #f5c6cb; border-radius: 5px;'>";
        } else {
            http_response_code(500);
            echo "<!DOCTYPE html><html><head><title>خطأ في النظام</title><meta charset='UTF-8'></head><body>";
            echo "<div style='font-family: Arial, sans-serif; background: #f8d7da; color: #721c24; padding: 20px; margin: 20px; border: 1px solid #f5c6cb; border-radius: 5px;'>";
        }
        
        echo "<h3>🚨 {$errorInfo['type']}: {$errorInfo['severity']}</h3>";
        echo "<p><strong>الرسالة:</strong> " . htmlspecialchars($errorInfo['message']) . "</p>";
        echo "<p><strong>الملف:</strong> " . htmlspecialchars($errorInfo['file']) . "</p>";
        echo "<p><strong>السطر:</strong> {$errorInfo['line']}</p>";
        echo "<p><strong>الوقت:</strong> {$errorInfo['timestamp']}</p>";
        
        if (isset($errorInfo['trace'])) {
            echo "<details><summary>تفاصيل الخطأ</summary>";
            echo "<pre>" . htmlspecialchars($errorInfo['trace']) . "</pre>";
            echo "</details>";
        }
        
        echo "</div>";
        
        if (!headers_sent()) {
            echo "</body></html>";
        }
    }
    
    private static function showUserFriendlyError() {
        if (headers_sent()) {
            return;
        }
        
        http_response_code(500);
        
        // التحقق من نوع الطلب
        $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
                  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
        
        if ($isAjax) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => 'حدث خطأ في النظام. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.',
                'error_code' => 'SYSTEM_ERROR_' . time()
            ], JSON_UNESCAPED_UNICODE);
        } else {
            include 'error_pages/500.php';
        }
        
        exit;
    }
    
    private static function getSeverityName($severity) {
        $severities = [
            E_ERROR => 'Fatal Error',
            E_WARNING => 'Warning',
            E_PARSE => 'Parse Error',
            E_NOTICE => 'Notice',
            E_CORE_ERROR => 'Core Error',
            E_CORE_WARNING => 'Core Warning',
            E_COMPILE_ERROR => 'Compile Error',
            E_COMPILE_WARNING => 'Compile Warning',
            E_USER_ERROR => 'User Error',
            E_USER_WARNING => 'User Warning',
            E_USER_NOTICE => 'User Notice',
            E_STRICT => 'Strict Standards',
            E_RECOVERABLE_ERROR => 'Recoverable Error',
            E_DEPRECATED => 'Deprecated',
            E_USER_DEPRECATED => 'User Deprecated'
        ];
        
        return $severities[$severity] ?? 'Unknown Error';
    }
    
    private static function getClientIP() {
        $ipKeys = ['HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
        
        foreach ($ipKeys as $key) {
            if (!empty($_SERVER[$key])) {
                $ips = explode(',', $_SERVER[$key]);
                return trim($ips[0]);
            }
        }
        
        return 'Unknown';
    }
    
    private static function notifyDevelopers($errorInfo) {
        // يمكن إضافة إرسال إيميل أو إشعار Slack هنا
        // مثال بسيط لحفظ الأخطاء الحرجة في ملف منفصل
        $criticalLogFile = 'logs/critical_errors.log';
        $message = json_encode($errorInfo, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
        file_put_contents($criticalLogFile, $message, FILE_APPEND | LOCK_EX);
    }
    
    public static function logCustomError($message, $context = []) {
        $errorInfo = [
            'type' => 'Custom Log',
            'severity' => 'Info',
            'message' => $message,
            'context' => $context,
            'timestamp' => date('Y-m-d H:i:s'),
            'url' => $_SERVER['REQUEST_URI'] ?? '',
            'ip' => self::getClientIP()
        ];
        
        self::logError($errorInfo);
    }
    
    public static function logSecurityEvent($event, $details = []) {
        $securityLogFile = 'logs/security.log';
        
        $logEntry = [
            'event' => $event,
            'details' => $details,
            'timestamp' => date('Y-m-d H:i:s'),
            'ip' => self::getClientIP(),
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'url' => $_SERVER['REQUEST_URI'] ?? ''
        ];
        
        $logMessage = json_encode($logEntry, JSON_UNESCAPED_UNICODE) . "\n";
        file_put_contents($securityLogFile, $logMessage, FILE_APPEND | LOCK_EX);
    }
}

// تهيئة معالج الأخطاء
ErrorHandler::init();

// دالة مساعدة لتسجيل الأخطاء المخصصة
function logError($message, $context = []) {
    ErrorHandler::logCustomError($message, $context);
}

// دالة مساعدة لتسجيل الأحداث الأمنية
function logSecurityEvent($event, $details = []) {
    ErrorHandler::logSecurityEvent($event, $details);
}
?>
