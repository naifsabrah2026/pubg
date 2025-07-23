<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطأ في النظام - PUBG Mobile Store</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Cairo', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .error-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 90%;
            backdrop-filter: blur(10px);
        }
        
        .error-icon {
            font-size: 4rem;
            color: #e74c3c;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .error-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        
        .error-message {
            font-size: 1.1rem;
            color: #7f8c8d;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .error-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            font-family: inherit;
        }
        
        .btn-primary {
            background: linear-gradient(45deg, #ffc107, #ff9800);
            color: #000;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 193, 7, 0.3);
        }
        
        .btn-secondary {
            background: #6c757d;
            color: #fff;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }
        
        .error-code {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #95a5a6;
        }
        
        .loading-spinner {
            display: none;
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #ffc107;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
            .error-container {
                padding: 30px 20px;
            }
            
            .error-title {
                font-size: 1.5rem;
            }
            
            .error-actions {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h1 class="error-title">عذراً، حدث خطأ!</h1>
        <p class="error-message">
            نعتذر عن هذا الإزعاج. حدث خطأ مؤقت في النظام.<br>
            فريقنا التقني يعمل على حل المشكلة.
        </p>
        
        <div class="error-actions">
            <a href="javascript:history.back()" class="btn btn-secondary">
                العودة للخلف
            </a>
            <a href="/" class="btn btn-primary">
                الصفحة الرئيسية
            </a>
            <button onclick="retryPage()" class="btn btn-secondary" id="retryBtn">
                إعادة المحاولة
            </button>
        </div>
        
        <div class="loading-spinner" id="loadingSpinner"></div>
        
        <div class="error-code">
            رمز الخطأ: SYS-<?= date('YmdHis') ?>-<?= substr(md5(uniqid()), 0, 6) ?>
        </div>
    </div>

    <script>
        function retryPage() {
            const retryBtn = document.getElementById('retryBtn');
            const spinner = document.getElementById('loadingSpinner');
            
            retryBtn.style.display = 'none';
            spinner.style.display = 'block';
            
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        
        // إعادة المحاولة التلقائية بعد 30 ثانية
        setTimeout(() => {
            const autoRetryMsg = document.createElement('p');
            autoRetryMsg.style.cssText = 'color: #95a5a6; font-size: 0.9rem; margin-top: 15px;';
            autoRetryMsg.textContent = 'سيتم إعادة المحاولة تلقائياً خلال 30 ثانية...';
            document.querySelector('.error-container').appendChild(autoRetryMsg);
            
            setTimeout(() => {
                location.reload();
            }, 30000);
        }, 5000);
    </script>
</body>
</html>
