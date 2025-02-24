document.addEventListener("DOMContentLoaded", trackVisit);

function trackVisit() {
    const urlParams = new URLSearchParams(window.location.search);
    const linkId = urlParams.get("id");

    if (!linkId) return;

    let links = JSON.parse(localStorage.getItem("trackedLinks")) || [];
    let link = links.find(l => l.id === linkId);
    
    if (link) {
        const visitorData = {
            timestamp: new Date().toISOString(),
            referrer: document.referrer || "مباشر",
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform
        };

        link.clicks++;
        link.details.push(visitorData);
        localStorage.setItem("trackedLinks", JSON.stringify(links));

        window.location.href = link.originalUrl;  // إعادة التوجيه إلى الرابط الأصلي
    }
}