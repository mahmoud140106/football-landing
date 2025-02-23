self.addEventListener("push", (event) => {
    console.log("Received push event:", event);

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

    console.log("Parsed push data:", notificationData);

    self.registration.showNotification(notificationData.title, {
        body: notificationData.message,
        icon: "/titleIcon.png",
        badge: "/titleIcon.png",
        vibrate: [200, 100, 200],
    });
});
