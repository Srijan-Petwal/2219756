

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlqYW5wZXR3YWwuMjIwMTEyMzUyQGdlaHUuYWMuaW4iLCJleHAiOjE3NTI1NTc4MTgsImlhdCI6MTc1MjU1NjkxOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjQxZTRkN2Y0LTA1M2EtNDUxMi05ZGI4LTlhZGZhZjczYjM4ZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNyaWphbiBwZXR3YWwiLCJzdWIiOiJmN2NlODIwNC0yOGY1LTQzZjYtYjExOS0xYjMzM2M5NWJkMGMifSwiZW1haWwiOiJzcmlqYW5wZXR3YWwuMjIwMTEyMzUyQGdlaHUuYWMuaW4iLCJuYW1lIjoic3JpamFuIHBldHdhbCIsInJvbGxObyI6IjIyMTk3NTYiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiJmN2NlODIwNC0yOGY1LTQzZjYtYjExOS0xYjMzM2M5NWJkMGMiLCJjbGllbnRTZWNyZXQiOiJHRXR0cGp3U1p5dHJnWHZHIn0.oGHsxGpXYHuhSvhRT41pUn1zb-SYfC0AgRJm-mzAFSE"

export async function log(level, pkg, message) {
  const stack = "frontend";

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    if (!response.ok) {
      console.error("logging Error", await response.text());
    } else {
      const data = await response.json();
      console.log( data);
    }
  } catch (err) {
    console.error( err.message);
  }
}
