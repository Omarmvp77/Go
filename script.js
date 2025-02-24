document.addEventListener("DOMContentLoaded", loadLinks);

function generateTrackingUrl() {
    const originalUrl = document.getElementById("originalUrl").value;
    if (!originalUrl) return alert("يرجى إدخال رابط صحيح!");

    const uniqueId = uuid.v4().slice(0, 8);
    const trackingUrl = `${window.location.origin}/track.html?id=${uniqueId}`;

    saveLink(uniqueId, originalUrl, trackingUrl);
    loadLinks();
}

function saveLink(id, originalUrl, trackingUrl) {
    let links = JSON.parse(localStorage.getItem("trackedLinks")) || [];
    links.push({ id, originalUrl, trackingUrl, clicks: 0, details: [] });
    localStorage.setItem("trackedLinks", JSON.stringify(links));
}

function loadLinks() {
    const linksList = document.getElementById("linksList");
    linksList.innerHTML = "";

    let links = JSON.parse(localStorage.getItem("trackedLinks")) || [];
    links.forEach(link => {
        const li = document.createElement("li");
        li.classList = "p-3 bg-gray-800 rounded flex justify-between items-center";
        li.innerHTML = `
            <div>
                <p>📌 <a href="${link.trackingUrl}" target="_blank" class="text-blue-400">${link.trackingUrl}</a></p>
                <p class="text-gray-400 text-sm">الزيارات: ${link.clicks}</p>
            </div>
        `;
        linksList.appendChild(li);
    });
}