// Icon click
document.getElementById("chat-icon")?.addEventListener("click", () => {
  document.getElementById("chatbox-container")?.classList.toggle("chatbox-container-active");
  document.getElementById("chat-icon")?.classList.toggle("icon-container-active");

});

document.getElementById("chat-close")?.addEventListener("click", () => {
  document.getElementById("chatbox-container")?.classList.remove("chatbox-container-active");
  document.getElementById("chat-icon")?.classList.remove("icon-container-active");

});


console.log(stringSimilarity);

// Message handler
let messages = [];


const chatbotDataset = [
  {
    question: ["Hello", "Hi", "Hey", "Hi there", "Hello there", "Hi bot"],
    answer: "Hi there, I'm Glambot! How can i assist you today?",
  },
  {
    question: ["How are you?", "what's up?", "how are you doing?", "How's it going?"],
    answer: "I'm doing great! and you?",
  },
  {
    question: ["good morning"],
    answer: "Good morning!",
  },
  {
    question: ["good evening"],
    answer: "Good evening!",
  },
  {
    question: ["what's your name?", "what do you do?","introduce yourself"],
    answer: "I'm Glambot, your personal beauty advisor! I'm here to help you with all your beauty-related questions and concerns. Whether you're looking for makeup tips, skincare advice, or just need some product recommendations, I'm here to assist you every step of the way. Let's get started!",
  },
  {    question: ["What is the best way to take care of my skin?", "How can I get better skin?","skin","skin tips","skin care tips"],
    answer: "There are many ways to take care of your skin, such as washing your face twice a day, moisturizing regularly, and wearing sunscreen. You can also try using products that are tailored to your skin type.",
  },
  {
    question: ["What makeup products should I use for a natural look?","natural look"],
    answer: "For a natural look, you can use tinted moisturizer, mascara, and a sheer lip color. You can also use a cream blush for a subtle pop of color.",
  },
  {
    question: ["How often should I wash my hair?","hair washing","tips on washing hair"],
    answer: "It depends on your hair type and texture, but generally it's recommended to wash your hair 2-3 times a week. Over-washing can strip your hair of its natural oils and cause damage.",
  },
  {
    question: ["What are some tips for preventing breakouts?","breakouts","stop breakouts"],
    answer: "To prevent breakouts, you can try washing your face twice a day, avoiding touching your face with your hands, and using products that are non-comedogenic. It's also important to maintain a healthy diet and manage stress levels.",
  },
  {
    question: ["What is the best way to apply foundation?","foundation application","put foundation","how to put foundation"],
    answer: "The best way to apply foundation is to start with a small amount and build up coverage as needed. You can use a brush, sponge, or your fingers to blend it out. Make sure to blend well around the edges and down your neck for a seamless finish.",
  },
  {
    question: ["How can I make my lipstick last longer?","lip stick","lip stick tips"],
    answer: "To make your lipstick last longer, you can try using a lip liner to fill in your lips before applying lipstick. You can also blot your lips with a tissue after applying, and then reapply for extra staying power.",
  },
  {    question: ["What are the best skincare products for oily skin?"],
    answer: "Some of the best skincare products for oily skin are oil-free cleansers, toners containing salicylic acid or alpha-hydroxy acids, and lightweight moisturizers that are non-comedogenic and oil-free.",
  },
  {
    question: ["How often should I exfoliate my skin?","skin exfoliation"],
    answer: "It's generally recommended to exfoliate your skin once or twice a week, depending on your skin type and the type of exfoliator you're using. Over-exfoliating can damage your skin, so it's important to be gentle and not do it too often.",
  },
  {
    question: ["What are the best foods for healthy skin?"],
    answer: "Some of the best foods for healthy skin are fruits and vegetables rich in vitamins and antioxidants, such as berries, leafy greens, and sweet potatoes. Other good options include fatty fish, nuts and seeds, and whole grains.",
  },
  {
    question: ["How can I make my hair shinier?","tips for shiny hair"],
    answer: "To make your hair shinier, try using a clarifying shampoo once a week to remove buildup and using a hair mask or conditioner regularly to keep your hair moisturized. You can also rinse your hair with cold water after washing to help seal the cuticle and boost shine.",
  },
  {
    question: ["What's the best way to prevent acne?","acne","give me acne tips","stop acne"],
    answer: "To prevent acne, it's important to keep your skin clean and avoid touching your face too much. Use non-comedogenic skincare products, avoid harsh scrubs and exfoliants, and don't pick at your acne. If you have persistent acne, see a dermatologist for advice.",
  },
  {
    question: ["how do i know my lipstick shade","lipstick color","right lipstick color","right lipstick shade"],
    answer: "1.Determine your skin undertone and tone.<br>2.Try on different shades to find what works best for you. <br> 3.Consider the occasion and your personal style when choosing your shade."
  },
  {
    question: ["Thank you"],
    answer: "Anytime! I'm always happy to help 😊."
  },
  {
    question: ["bye","goodbye","see you soon","thanks bye"],
    answer: "Good bye!."
  }
];

const getAnswer = (question) => {
  let answer = "Sorry, I don't understand. Maybe ask in another way?";
  chatbotDataset.forEach((data) => {
    const result = data.question.map((q) =>
      stringSimilarity.compareTwoStrings(q.toLowerCase(), question.toLowerCase())
    );

    const max = Math.max(...result);

    if (max > 0.5) {
      answer = data.answer;
    }
  });

  return answer;
};

const messageHandler = ({ message, owner }) => {
  const chatBody = document.getElementById("chat-body");
  messages.push({ id: messages.length + 1, message, owner });

  chatBody.innerHTML += `
    <div class="chat-body-${owner === "bot" ? "left" : "right"}">
      <img style="width:60px;" src="images/${owner === "bot" ? "chatbot-circle" : "user"}.png" alt="chat-icon" />
      <p>${message}</p>
    </div>
  `;


  chatBody.scrollTo(0, chatBody.scrollHeight);

  if (owner === "user") {
    document.getElementById("message").value = "";
  }

  if (owner !== "bot") {
    return messageHandler({ message: getAnswer(message), owner: "bot" });
  }
};

// Add listner for button
document.getElementById("send")?.addEventListener("click", () => {
  const input = document.getElementById("message");

  if (!input?.value) return alert("Please enter a message");

  messageHandler({ message: input?.value, owner: "user" });
});

document.getElementById("message")?.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const input = document.getElementById("message");

    if (!input?.value) return alert("Please enter a message");

    messageHandler({ message: input?.value, owner: "user" });
  }
});
