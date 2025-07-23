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
            'trace' => $exception->get
