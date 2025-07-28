<body>

  <h1>4030</h1>

  <p>این پروژه سیستم احراز هویت بر پایه شماره موبایل و کد OTP است. در حال حاضر، ارسال OTP در کنسول لاگ می‌شود و امکان اتصال WebSocket با اعتبارسنجی JWT فراهم شده است. ارسال پیامک واقعی و سایر امکانات در آینده افزوده می‌شوند.</p>

  <section>
    <h2>ویژگی‌ها</h2>
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
    <h2>APIها</h2>

    <h3>درخواست OTP</h3>
    <p><strong>مسیر:</strong> <code>POST /auth/request-otp</code></p>
    <p><strong>ورودی:</strong></p>
    <pre><code>{ "phone": "09038522822" }</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{ "message": "کد OTP برای 09038522822 ارسال شد." }</code></pre>

    <h3>تایید OTP</h3>
    <p><strong>مسیر:</strong> <code>POST /auth/verify-otp</code></p>
    <p><strong>ورودی (اگر کاربر جدید است نام و نام خانوادگی اجباری است):</strong></p>
    <pre><code>{
  "phone": "09038522822",
  "otp": "123456",
  "firstName": "پوریا",
  "lastName": "یاسربی",
  "email": "optional@example.com",       /* اختیاری */
  "referralCode": "optionalCode123"      /* اختیاری */
}</code></pre>
    <p><strong>خروجی:</strong></p>
    <pre><code>{ "access_token": "JWT_TOKEN_HERE" }</code></pre>
  </section>

  <section>
    <h2>WebSocket</h2>
    <p>برای اتصال به WebSocket باید توکن JWT را هنگام اتصال ارسال کنید:</p>
    <pre><code>const socket = io('http://localhost:3000', {
  query: { token: 'YOUR_JWT_TOKEN' }
});</code></pre>

    <p>پس از اتصال موفق، می‌توانید پیام ارسال و دریافت کنید:</p>
    <pre><code>socket.emit('message', 'سلام سرور!');
socket.on('messageResponse', msg =&gt; {
  console.log('پیام از سرور:', msg);
});</code></pre>
  </section>

  <section>
    <h2>نمونه اتصال فرانت با Fetch API</h2>
    <h3>درخواست OTP</h3>
    <pre><code>fetch('http://localhost:3000/auth/request-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '09038522822' })
}).then(res =&gt; res.json())
  .then(data =&gt; console.log(data));</code></pre>

    <h3>تایید OTP و دریافت توکن</h3>
    <pre><code>fetch('http://localhost:3000/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '09038522822',
    otp: '123456',
    firstName: 'پوریا',     /* اگر کاربر جدید است */
    lastName: 'یاسربی',
    email: 'optional@example.com',   /* اختیاری */
    referralCode: 'optionalCode123'  /* اختیاری */
  })
}).then(res =&gt; res.json())
  .then(data =&gt; {
    console.log('توکن دریافت شد:', data.access_token);
    // ذخیره توکن در localStorage یا state
  });</code></pre>
  </section>

  <section>
    <h2>نکات آینده</h2>
    <ul>
      <li>اتصال به پنل پیامکی کاوه نگار برای ارسال واقعی OTP</li>
      <li>افزودن محدودیت ارسال OTP (rate limit)</li>
      <li>پیاده‌سازی صفحه فرانت برای ورود و ثبت‌نام کامل کاربر</li>
      <li>افزایش امنیت WebSocket و توکن‌ها (رفرش توکن، انقضای دقیق‌تر)</li>
    </ul>
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

  <footer>
    &copy; 2025 پروژه NestJS احراز هویت - توسعه یافته توسط شما
  </footer>

</body>
