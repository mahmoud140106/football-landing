self.addEventListener("push", (event) => {
    if (event.data) {
        const data = event.data.json();
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: "/logo192.png",
            badge: "/logo192.png",
            vibrate: [200, 100, 200],
        });
    }
});
