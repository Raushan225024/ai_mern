import { useSelector } from "react-redux";
import History from "./history";
import PromptBox from "./prompt_box";

function Home() {
  const messages = useSelector((state) => state.chat.messages);

  const hasMessages = messages.length > 0;

  return (
    <div className="w-screen h-screen bg-[#e0e5ec] p-4">
      <div
        className="
          w-full
          h-full
          flex
          overflow-hidden
          rounded-3xl

          bg-[#e0e5ec]

          shadow-[10px_10px_20px_#bec3c9,-10px_-10px_20px_#ffffff]
        "
      >
        {/* ================= LEFT : HISTORY ================= */}
        <aside
          className="
            w-[20%]
            h-full
            p-4

            border-r
            border-gray-300/50

            overflow-y-auto
          "
        >
          <History />
        </aside>

        {/* ================= RIGHT : CHAT ================= */}
        <main className="w-[80%] h-full relative flex flex-col">
          
          {/* Chat Messages */}
          <div
            className={`
              flex-1
              overflow-y-auto
              px-8
              py-6

              ${!hasMessages
                ? "flex items-center justify-center"
                : "pb-32"
              }
            `}
          >
            {hasMessages ? (
              <div className="max-w-4xl mx-auto w-full space-y-5">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`
                      flex
                      ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        max-w-[75%]
                        px-5
                        py-3
                        rounded-2xl
                        text-gray-700

                        ${
                          message.role === "user"
                            ? `
                              bg-[#e0e5ec]
                              shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_#ffffff]
                            `
                            : `
                              bg-[#e0e5ec]
                              shadow-[inset_5px_5px_10px_#bec3c9,inset_-5px_-5px_10px_#ffffff]
                            `
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No chat available */
              <div className="w-full flex justify-center">
                <PromptBox />
              </div>
            )}
          </div>

          {/* ================= PROMPT ================= */}
          {hasMessages && (
            <div
              className="
                absolute
                bottom-6
                left-0
                right-0

                flex
                justify-center

                px-6
              "
            >
              <PromptBox />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;