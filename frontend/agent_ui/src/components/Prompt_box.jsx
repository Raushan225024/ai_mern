import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/chatSlices";
import arrow from "../assets/arrow.png";
console.log("Arrow image path:", arrow);
function PromptBox() {
  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setMessage(e.target.value);

    // Auto adjust height
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    // 1. Add user message to Redux
    dispatch(
      addMessage({
        role: "user",
        content: trimmedMessage,
      })
    );

    try {
      // 2. API request
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // 3. Add AI response to Redux
      dispatch(
        addMessage({
          role: "assistant",
          content: data.response,
        })
      );
    } catch (error) {
      console.error("Chat API error:", error);
    }

    // 4. Clear input
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    // Enter = send
    // Shift + Enter = new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div
        className="
          w-[70%]
          min-h-[64px]
          flex
          items-end
          gap-3
          px-5
          py-3
          rounded-3xl

          bg-gray-200

          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]

          focus-within:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
          
          transition-all
        "
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about me"
          className="
            flex-1
            resize-none
            overflow-hidden
            bg-transparent
            outline-none
            border-none
            text-gray-700
            placeholder-gray-500
            text-base
            leading-6
            max-h-40
          "
        />

        {/* Arrow Button */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="
            shrink-0
            w-11
            h-11
            rounded-full

            flex
            items-center
            justify-center

            bg-gray-200

            shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]

            active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]

            disabled:opacity-40
            disabled:cursor-not-allowed

            transition-all
          "
        >
          <img
            src={arrow}
            alt="Send"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default PromptBox;