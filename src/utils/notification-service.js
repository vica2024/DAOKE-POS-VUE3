import { throttle } from "./customFunc";
import { useAppStore } from "@/store";
const appStore = useAppStore();
export default class NotificationService {
  messages = []; // 聊天消息列表
  retries = 0; // 连接重试计数
  maxRetries = 5; // 最大重试次数

  constructor(room) {
    this.room = room;
    this.connect();
  }

  // 连接到服务器
  connect() {
    let hostUrl = 'ws://127.0.0.1:8000/ws';
    if (import.meta.env.VITE_SOCKET_SERVER_URL) {
      hostUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
    }
    const wsUrl = `${hostUrl}?type=store&token=${localStorage.getItem("token")}`;
    
    this.ws = new WebSocket(wsUrl);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  onOpen() {
    this.ping();
    this.retries = 0; // Reset retry count on successful connection
    console.log("WebSocket connected");
  }

  ping() {
    this.timer = setInterval(throttle(() => {
      this.send({ type: 'ping' });
    }, 10000), 10000);
  }
  send(data) {
    return new Promise((resolve, reject) => {
      try {
        this.ws.send(JSON.stringify(data));
        resolve({ status: true });
      } catch (e) {
        reject({ status: false });
      }
    });
  }

  onMessage(res) {
    const { data } = res;
    const message = JSON.parse(data);
    if(!['success','ping'].includes(message.type)) {
      appStore.updateMessageCount(1);
    }
    //console.log("Message received:", data,message.type);
  }

  onClose() {
    console.log("WebSocket closed");
    this.reconnect();
  }

  onError(e) {
    console.error("WebSocket error:", e);
  }

  reconnect() {
    if (this.retries < this.maxRetries) {
      this.retries++;
      console.log(`Attempting to reconnect... (${this.retries}/${this.maxRetries})`);
      setTimeout(() => this.connect(), 2000); // Try to reconnect after 2 seconds
    } else {
      console.error("Max retries reached. Could not reconnect.");
    }
  }

  clearPing() {
    clearInterval(this.timer); // Clear ping interval if needed
  }
}
