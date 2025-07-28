<html lang="fa">

<body>


  <section>
    <h2>ویژگی‌ها تا اینجا</h2>
    <ul>
      <li>متصل به  mongo db</li>
      <li>تولید و اعتبارسنجی OTP</li>
      <li>ثبت نام کاربر پس از تایید OTP</li>
      <li>احراز هویت JWT</li>
      <li>محافظت نقش‌ها (Roles & Guards)</li>
      <li>اتصال WebSocket با JWT</li>
      <li>تست آسان API و WebSocket</li>
      <li>امکان اتصال  به پنل پیامکی واقعی (کاوه‌نگار)</li>
    </ul>
  </section>

  <section>
    <h2>نصب و راه‌اندازی</h2>
    <ol>
      <li>کلون کردن پروژه:
        <pre><code>git clone &lt;repository-url&gt;
cd &lt;project-folder&gt;</code></pre>
      </li>
      <li>نصب پکیج‌ها:
        <pre><code>npm install</code></pre>
      </li>
      <li>ساخت فایل <code>.env</code> و وارد کردن متغیرهای زیر:
        <pre><code>JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_connection_string
# KAVENEGAR_API_KEY=your_kavenegar_api_key_here  # فعلاً استفاده نمی‌شود</code></pre>
      </li>
      <li>اجرای پروژه:
        <pre><code>npm run start</code></pre>
      </li>
    </ol>
  </section>

  <section>
    <h2>APIها</h2>

    <h3>درخواست OTP</h3>
    <p><strong>آدرس:</strong> <code>POST /auth/request-otp</code></p>
    <p><strong>ورودی:</strong></p>
    <pre><code>{
  "phone": "09038522822"
}</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{
  "message": "کد OTP برای 09038522822 ارسال شد."
}</code></pre>

    <h3>تایید OTP</h3>
    <p><strong>آدرس:</strong> <code>POST /auth/verify-otp</code></p>
    <p><strong>ورودی (اگر کاربر ثبت‌نام نکرده باشد نام و نام خانوادگی اجباری است):</strong></p>
    <pre><code>{
  "phone": "09038522822",
  "otp": "123456",
  "firstName": "پوریا",
  "lastName": "یاسربی",
  "email": "optional@example.com",       // اختیاری
  "referralCode": "optionalCode123"      // اختیاری
}</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{
  "access_token": "JWT_TOKEN_HERE"
}</code></pre>
    <p>اگر کاربر ثبت‌نام نکرده باشد، پس از تایید OTP اطلاعات ثبت‌نام دریافت می‌شود و سپس توکن داده می‌شود.</p>
  </section>

  <section>
    <h2>WebSocket</h2>
    <p>برای اتصال WebSocket ابتدا باید توکن JWT را ارسال کنید (مثلاً از طریق query پارامتر <code>token</code>):</p>
    <pre><code>const socket = io('http://localhost:3000', {
  query: { token: 'YOUR_JWT_TOKEN' }
});</code></pre>
    <p>در صورت اعتبارسنجی موفق اتصال برقرار می‌شود. در غیر این صورت اتصال قطع می‌شود.</p>
    <p>ارسال پیام:</p>
    <pre><code>socket.emit('message', 'پیام من');</code></pre>
    <p>دریافت پاسخ:</p>
    <pre><code>socket.on('messageResponse', (msg) => {
  console.log('پیام از سرور:', msg);
});</code></pre>
  </section>

  <section>
    <h2>اتصال به فرانت با Fetch</h2>
    <h3>درخواست OTP</h3>
    <pre><code>fetch('http://localhost:3000/auth/request-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '09038522822' }),
})
  .then(res =&gt; res.json())
  .then(data =&gt; console.log(data));</code></pre>

    <h3>تایید OTP و دریافت توکن</h3>
    <pre><code>fetch('http://localhost:3000/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '09038522822',
    otp: '123456',
    firstName: 'پوریا',     // اگر کاربر جدید است
    lastName: 'یاسربی',
    email: 'optional@example.com',     // اختیاری
    referralCode: 'optionalCode123'     // اختیاری
  }),
})
  .then(res =&gt; res.json())
  .then(data =&gt; {
    console.log('توکن دریافت شده:', data.access_token);
    // توکن را در localStorage یا state ذخیره کنید
  });</code></pre>
  </section>

  <section>
    <h2>نکات مهم برای آینده</h2>
    <ul>
      <li>اتصال به پنل پیامکی کاوه‌نگار با استفاده از <code>KAVENEGAR_API_KEY</code> و جایگزین کردن ارسال OTP در ماژول SMS</li>
      <li>اعمال محدودیت نرخ ارسال OTP برای جلوگیری از سوء استفاده</li>
      <li>پیاده‌سازی صفحه فرانت برای وارد کردن شماره، دریافت OTP و تکمیل ثبت نام</li>
      <li>استفاده از WebSocket برای اطلاع‌رسانی بلادرنگ یا پیام‌های فوری</li>
      <li>افزایش امنیت در JWT و WebSocket (مثلاً رفرش توکن)</li>
    </ul>
  </section>

  <section>
    <h2>ساختار پروژه (خلاصه)</h2>
    <ul>
      <li><code>src/auth/</code> : ماژول احراز هویت، OTP، JWT</li>
      <li><code>src/users/</code> : مدیریت کاربران</li>
      <li><code>src/sms/</code> : ماژول ارسال پیامک (فعلاً لاگ)</li>
      <li><code>src/websocket/</code> : WebSocket Gateway با JWT Auth</li>
      <li><code>src/config/</code> : تنظیمات و env</li>
    </ul>
  </section>

  <section>
    <h2>اجرای تست‌ها</h2>
    <p>تست API و WebSocket با ابزارهایی مثل Postman و یا صفحه تست WebSocket انجام شود.</p>
  </section>

  <section>
    <h2>تماس و پشتیبانی</h2>
    <p>اگر سوال یا مشکل داشتید، در Issues یا پیام خصوصی بپرسید.</p>
  </section>

  <hr />
  <p style="text-align:center; font-size: 0.9em; color: #666;">
    © 2025 پروژه احراز هویت NestJS - توسعه یافته توسط شما
  </p>

</body>
</html>
