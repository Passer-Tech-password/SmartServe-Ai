export default function MessageBubble({
  text,
  isMe,
}: {
  text: string;
  isMe: boolean;
}) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
          isMe
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
