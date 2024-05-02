import ollama from "ollama";
import readline from "readline-sync";

let user_messages = [];
let system_messages = [];

(async () => {
  let input;

  do {
    input = readline.question("You: ");
    process.stdout.write("Ollama: ");

    const message = [...user_messages, ...system_messages, { role: "user", content: input }];

    const response = await ollama.chat({
      model: "llama3-gradient",
      messages: message,
      stream: true,
    });

    let response_message = "";

    for await (const part of response) {
      process.stdout.write(part.message.content);
      response_message += part.message.content;
    }

    user_messages.push({ role: "user", content: input });
    system_messages.push({ role: "assistant", content: response_message });

    process.stdout.write("\n");
  } while (input !== "exit");
})();
