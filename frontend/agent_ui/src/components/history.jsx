import react from "react";
import { useSelector } from "react-redux";

function History({ onQuestionClick }) {
  const messages = useSelector((state) => state.chat.messages);

  // Only get user questions
  const questions = messages
    .map((message, index) => ({
      ...message,
      originalIndex: index,
    }))
    .filter((message) => message.role === "user");

  return (
    <div className="w-[95%] h-[80vh] p-4">
      <div className="h-full overflow-y-auto pr-2 scrollbar-thin">

        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-700 mb-5 px-2">
          History
        </h2>

        {/* Question Stack */}
        <div className="flex flex-col gap-4">

          {questions.length === 0 ? (
            <p className="text-sm text-gray-500 px-2">
              No questions yet
            </p>
          ) : (
            questions.map((question, index) => (
              <button
                key={question.originalIndex}
                onClick={() => onQuestionClick(question.originalIndex)}
                className="
                  w-full
                  h-16
                  px-4
                  text-left
                  rounded-2xl

                  bg-gray-200

                  shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]

                  hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]

                  active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]

                  transition-all
                  duration-200

                  overflow-hidden
                  shrink-0
                "
                title={question.content}
              >
                <div className="flex items-center gap-3">

                  {/* Number */}
                  <span
                    className="
                      shrink-0
                      w-7
                      h-7
                      flex
                      items-center
                      justify-center
                      rounded-full
                      text-xs
                      font-semibold
                      text-gray-600
                      bg-gray-200
                      shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]
                    "
                  >
                    {index + 1}
                  </span>

                  {/* Question */}
                  <span
                    className="
                      text-sm
                      text-gray-700
                      leading-5

                      overflow-hidden
                      text-ellipsis

                      line-clamp-2
                    "
                  >
                    {question.content}
                  </span>

                </div>
              </button>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default History;