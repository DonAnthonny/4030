<body>

  <h1>4030</h1>


  <section>
    <h2>ویژگی‌هاز تا اینجا</h2>
    <ul>
      <li>تولید و بررسی OTP</li>
      <li>ثبت‌نام کاربر پس از تایید OTP</li>
      <li>صدور توکن JWT برای احراز هویت</li>
      <li>مدیریت نقش‌ها (Roles و Guards)</li>
      <li>ارتباط WebSocket با اعتبارسنجی JWT</li>
      <li>قابلیت توسعه برای اتصال به پنل پیامکی کاوه نگار</li>
    </ul>
  </section>

  <section>
    <h2>نصب و راه‌اندازی</h2>
    <ol>
      <li>کلون کردن مخزن:
        <pre><code>git clone &lt;repository-url&gt;
cd &lt;project-folder&gt;</code></pre>
      </li>
      <li>نصب وابستگی‌ها:
        <pre><code>npm install</code></pre>
      </li>
      <li>ساخت فایل <code>.env</code> و اضافه کردن متغیرهای زیر:
        <pre><code>JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_connection_string
# KAVENEGAR_API_KEY=your_kavenegar_api_key_here  (فعلاً استفاده نمی‌شود)</code></pre>
      </li>
      <li>اجرای برنامه:
        <pre><code>npm run start</code></pre>
      </li>
    </ol>
  </section>

  <section>
   <h1>مستندات APIهای پروژه</h1>

  <section>
    <h2>درخواست OTP</h2>
    <p><strong>مسیر:</strong> <code>POST /auth/request-otp</code></p>
    <p><strong>ورودی:</strong></p>
    <pre><code>{
  "phone": "09038522822"
}</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{
  "message": "کد OTP برای 09038522822 ارسال شد."
}</code></pre>
  </section>

  <section>
    <h2>تایید OTP</h2>
    <p><strong>مسیر:</strong> <code>POST /auth/verify-otp</code></p>
    <p><strong>ورودی:</strong> (اگر کاربر جدید باشد، <code>firstName</code> و <code>lastName</code> اجباری است)</p>
    <pre><code>{
  "phone": "09038522822",
  "otp": "123456",
  "firstName": "پوریا",
  "lastName": "یاسربی",
  "email": "optional@example.com",  /* اختیاری */
  "referralCode": "optionalCode123" /* اختیاری */
}</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{
  "access_token": "JWT_TOKEN_HERE"
}</code></pre>
  </section>

  <section>
    <h2>توضیحات کلی</h2>
    <ul>
      <li>پس از درخواست OTP، کد در کنسول لاگ می‌شود (در آینده با پنل پیامکی واقعی جایگزین می‌شود).</li>
      <li>در مرحله تایید OTP اگر کاربر وجود داشت، مستقیماً توکن JWT صادر می‌شود.</li>
      <li>اگر کاربر جدید بود، پس از تایید OTP اطلاعات تکمیلی دریافت و سپس توکن صادر می‌شود.</li>
       <li>WebSocket پس از ورود موفق فعال می‌شود و کاربر می‌تواند از ارتباط بلادرنگ برای مواردی مانند اطلاع‌رسانی، موقعیت و درخواست سرویس استفاده کند.</li>
      <li>فایل <code>test.html</code> برای تست WebSocket در محیط مرورگر فراهم شده است.</li>
    </ul>
  </section>
  <section>
    <h2>نکات آینده</h2>
    <ul>
      <li>اتصال به پنل پیامکی کاوه نگار برای ارسال واقعی OTP</li>
      <li>افزودن محدودیت ارسال OTP (rate limit)</li>
      <li>فتچ با فرانت</li>
      <li>افزایش امنیت WebSocket و توکن‌ها (رفرش توکن، انقضای دقیق‌تر)</li>
      
   
  </section>

  <section>
    <h2>ساختار پروژه</h2>
    <ul>
      <li><code>src/auth/</code>: مدیریت احراز هویت، JWT و OTP</li>
      <li><code>src/users/</code>: مدیریت کاربران</li>
      <li><code>src/sms/</code>: ارسال پیامک (فعلاً لاگ)</li>
      <li><code>src/websocket/</code>: گیت‌وی WebSocket با JWT</li>
      <li><code>src/config/</code>: تنظیمات و متغیرهای محیطی</li>
    </ul>
  </section>

  <hr />

 
</body>
