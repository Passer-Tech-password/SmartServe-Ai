import ChatBox from "@/components/ChatBox";

export default function CustomerChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-indigo-600 text-white font-bold">
        SmartServe Support
      </header>

      <ChatBox chatId="default-chat" />
    </div>
  );
}
