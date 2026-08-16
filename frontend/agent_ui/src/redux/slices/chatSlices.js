import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
  {
    role: "user",
    content: "What is artificial intelligence?",
  },
  {
    role: "assistant",
    content:
      "Artificial Intelligence (AI) is a technology that enables machines to learn, reason, understand information, and perform tasks that normally require human intelligence.",
  },
  {
    role: "user",
    content: "How does machine learning work?",
  },
  {
    role: "assistant",
    content:
      "Machine learning is a subset of AI where a model learns patterns from data and uses those patterns to make predictions or decisions on new data.",
  },
  {
    role: "user",
    content: "What is the difference between AI and ML?",
  },
  {
    role: "assistant",
    content:
      "AI is the broader concept of making machines intelligent, while machine learning is one approach used to achieve AI by allowing systems to learn from data.",
  },
   {
    role: "user",
    content: "What is artificial intelligence?",
  },
  {
    role: "assistant",
    content:
      "Artificial Intelligence (AI) is a technology that enables machines to learn, reason, understand information, and perform tasks that normally require human intelligence.",
  },
  {
    role: "user",
    content: "How does machine learning work?",
  },
  {
    role: "assistant",
    content:
      "Machine learning is a subset of AI where a model learns patterns from data and uses those patterns to make predictions or decisions on new data.",
  },
  {
    role: "user",
    content: "What is the difference between AI and ML?",
  },
  {
    role: "assistant",
    content:
      "AI is the broader concept of making machines intelligent, while machine learning is one approach used to achieve AI by allowing systems to learn from data.",
  },
],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;