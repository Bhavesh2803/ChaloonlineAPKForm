document.getElementById('apkForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const status = document.getElementById('status');
  status.textContent = '⏳ Triggering build...';

  const data = {
    retailer_name: retailer_name.value,
    tenant_id: tenant_id.value,
    package_suffix: package_suffix.value,
    start_color: start_color.value,
    center_color: center_color.value,
    end_color: end_color.value,
    button_color: button_color.value,
    white_button_color: white_button_color.value,
    image_url: image_url.value
  };

  try {
    const res = await fetch("/.netlify/functions/triggerBuild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();

    if (res.ok) {
      status.innerHTML = "✅ Build triggered successfully!<br>APK will be ready in few minutes.";
    } else {
      status.innerHTML = "❌ Error triggering build:<br>" + result;
    }
  } catch (err) {
    status.textContent = "❌ Error: " + err.message;
  }
});
