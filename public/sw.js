self.addEventListener("push", (event) => {
    if (!event.data) {
        console.warn("Push event received without data!");
        return;
    }

    let notificationData;
    try {
        notificationData = event.data.json();
    } catch (error) {
        notificationData = { title: "Notification", message: event.data.text() };
    }

    self.registration.showNotification(notificationData.title, {
        body: notificationData.message,
        icon: "/titleIcon.png",
        badge: "/titleIcon.png",
        vibrate: [200, 100, 200],
        data: { url: "https://livefootballia.com/" } // URL to open
    });
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Close the notification

    const urlToOpen = event.notification.data?.url || "https://livefootballia.com/";

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            for (let client of clientList) {
                if (client.url === urlToOpen && "focus" in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
