
document.getElementById("setupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = new FormData(this);
  const data = Object.fromEntries(form.entries());
  const result = document.getElementById("result");

  result.textContent = "جارٍ إنشاء الحساب...";

  try {
    const response = await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const answer = await response.json();

    if (response.ok) {
      result.textContent = "تم إنشاء حساب المدير بنجاح. افتحي صفحة الإدارة وسجّلي الدخول.";
      this.reset();
    } else {
      result.textContent = answer.error || "تعذر إنشاء الحساب.";
    }
  } catch {
    result.textContent = "حدث خطأ في الاتصال. تحققي من نشر الموقع.";
  }
});
