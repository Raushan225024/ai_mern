import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import History from "./history";
import PromptBox from "./prompt_box";

function Home() {
  const messages = useSelector((state) => state.chat.messages);

  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  const messageRefs = useRef({});

  const hasMessages = messages.length > 0;

  // Scroll to clicked question
  useEffect(() => {
    if (selectedMessageIndex === null) return;

    const element = messageRefs.current[selectedMessageIndex];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedMessageIndex]);

  // History question click
  const handleQuestionClick = (index) => {
    setSelectedMessageIndex(index);
  };

  return (
    <div
      className="
        w-screen
        h-screen
        p-4

        bg-[#e0e5ec]
      "
    >
      {/* Main Neumorphic Container */}
      <div
        className="
          w-full
          h-full

          flex

          overflow-hidden

          rounded-[30px]

          bg-[#e0e5ec]

          shadow-[12px_12px_24px_#bec3c9,-12px_-12px_24px_#ffffff]
        "
      >

        {/* ================= LEFT : HISTORY ================= */}

        <aside
          className="
            w-[20%]
            h-full

            p-5

            bg-[#e0e5ec]

            border-r
            border-[#cfd4da]/50

            overflow-y-auto

            scrollbar-thin
          "
        >
          <History
            onQuestionClick={handleQuestionClick}
          />
        </aside>


        {/* ================= RIGHT : CHAT ================= */}

        <main
          className="
            w-[80%]
            h-full

            relative

            flex
            flex-col

            bg-[#e0e5ec]
          "
        >

          {/* ================= CHAT AREA ================= */}

          <div
            className={`
              flex-1

              overflow-y-auto

              px-8
              py-8

              ${
                !hasMessages
                  ? "flex items-center justify-center"
                  : "pb-32"
              }
            `}
          >

            {hasMessages ? (

              <div
                className="
                  max-w-4xl
                  mx-auto
                  w-full

                  space-y-6
                "
              >

                {messages.map((message, index) => (

                  <div
                    key={index}

                    ref={(element) => {
                      messageRefs.current[index] = element;
                    }}

                    className={`
                      flex

                      ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >

                    {/* ================= MESSAGE ================= */}

                    <div
                      className={`
                        max-w-[75%]

                        px-5
                        py-3

                        rounded-[20px]

                        text-gray-700

                        leading-6

                        transition-all
                        duration-300

                        ${
                          message.role === "user"

                            ? `
                              bg-[#e0e5ec]

                              shadow-[7px_7px_14px_#bec3c9,-7px_-7px_14px_#ffffff]
                            `

                            : `
                              bg-[#e0e5ec]

                              shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]
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

              /* ================= EMPTY CHAT ================= */

              <div
                className="
                  w-full

                  flex
                  justify-center
                "
              >
                <PromptBox />
              </div>

            )}

          </div>


          {/* ================= FIXED PROMPT ================= */}

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