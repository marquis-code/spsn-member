import { computed, ref } from "vue";
const notifications = ref([
  {
    id: "1",
    title: "Membership Renewal",
    message: "Your membership for the 2026 cycle has been successfully validated.",
    time: "2 hours ago",
    type: "success",
    read: false
  },
  {
    id: "2",
    title: "Abstract Submission",
    message: "Your research paper #AB-2045 is now under review by the scientific committee.",
    time: "5 hours ago",
    type: "info",
    read: false
  },
  {
    id: "3",
    title: "Payment Reminder",
    message: "The early bird registration for the Winter Conference ends in 48 hours.",
    time: "Yesterday",
    type: "warning",
    read: true
  }
]);
const useNotifications = () => {
  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);
  const markAsRead = (id) => {
    const notification = notifications.value.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };
  const markAllAsRead = () => {
    notifications.value.forEach((n) => n.read = true);
  };
  const addNotification = (notif) => {
    const newNotif = {
      ...notif,
      id: Math.random().toString(36).substring(7),
      read: false,
      time: "Just now"
    };
    notifications.value.unshift(newNotif);
  };
  const playNotificationSound = () => {
  };
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    playNotificationSound
  };
};
export {
  useNotifications as u
};
//# sourceMappingURL=useNotifications-Dn8u0OVl.js.map
