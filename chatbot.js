const init = () => {
  console.log("Aquarium chat works");
};

const url = "http://localhost:5678/webhook/9f4f1094-36a9-4911-bb98-143e970dac84/chat";

const doApi = async (_prompt) => {
  const chat_id = Date.now();
  const body = {
    chatInput: _prompt,
    action: "sendMessage",
    sessionId: chat_id,
  };

  try {
    const res = await axios({
      method: "POST",
      url: url,
      headers: {},
      data: body,
    });

    const data = res.data;
    addMessage(data.output || "לא התקבלה תשובה", "bot");
    console.log(data);
  } catch (err) {
    console.log("שגיאה:", err);
    addMessage("אירעה שגיאה בחיבור לשרת", "bot");
  }
};

function addMessage(text, sender = "user") {
  const chatMessages = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const onSub = (e) => {
  e.preventDefault();
  console.log("form send");

  const input = document.getElementById("user-input");
  const input_val = input.value.trim();
  if (!input_val) return;

  addMessage(input_val, "user");

  doApi(input_val);

  input.value = "";
};

document.getElementById("chat-form").addEventListener("submit", onSub);

init();
