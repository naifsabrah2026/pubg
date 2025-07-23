export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">شروط المتجر</h1>

        {/* شروط بيع الحساب */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">شروط بيع حسابك لنا</h2>
          <div className="bg-gray-900 border border-yellow-400 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">1- تصفير حسابك من كل الارتباطات</h3>
            <ul className="space-y-3 text-white text-lg">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                إزالة كل بريد إلكتروني في اللعبة
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                إزالة كل حساب تواصل اجتماعي (منصة X تويتر، منصة الفيس بوك وغيرها) إذا تواجد في اللعبة
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                اجعل فقط ارتباط الهاتف الخاص بك في اللعبة
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك وسنرسله لك لكي تضيف الإيميل الجديد وتقوم بحذف رقم
                هاتفك
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                سنرسل أموالك خلال 21 يوم لسياسة شركة ببجي للاسترجاع
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-400 mb-4 mt-8">2- تواصل معنا على الواتساب</h3>
            <div className="bg-green-600 text-white p-4 rounded-lg text-center">
              <p className="text-xl font-bold">+967777826667</p>
            </div>
          </div>
        </section>

        {/* شروط شراء الحساب */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">شروط شراء حساب</h2>
          <div className="bg-gray-900 border border-yellow-400 rounded-lg p-6">
            <ul className="space-y-4 text-white text-lg">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                قم باختيار الحساب ثم قم بإضافة معلوماتك واضغط على إرسال إلى الواتساب
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك (اسمك ورقمك وهاتفك) وكذلك سيتم إرسال معلومات الحساب الذي
                تريده
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                جميع الحسابات مضمونة 100% مع إمكانية الاسترداد حسب الشروط
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                التسليم فوري بعد تأكيد الدفع
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                دعم فني متاح 24/7 لحل أي مشكلة
              </li>
            </ul>

            <div className="mt-8 bg-green-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">للتواصل والشراء</h3>
              <p className="text-2xl font-bold">+967777826667</p>
            </div>
          </div>
        </section>

        {/* معلومات إضافية */}
        <section>
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">معلومات مهمة</h2>
          <div className="bg-gray-900 border border-yellow-400 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">الضمانات</h3>
                <ul className="space-y-2 text-white">
                  <li>• ضمان على جميع الحسابات</li>
                  <li>• إمكانية الاسترداد</li>
                  <li>• دعم فني مستمر</li>
                  <li>• تسليم آمن ومضمون</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">طرق الدفع</h3>
                <ul className="space-y-2 text-white">
                  <li>• تحويل بنكي</li>
                  <li>• محافظ إلكترونية</li>
                  <li>• كاش عند التسليم (حسب المنطقة)</li>
                  <li>• عملات رقمية</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
