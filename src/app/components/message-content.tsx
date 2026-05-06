interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  // Simple code block parser
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // Extract language and code
          const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
          const language = match?.[1] || "";
          const code = match?.[2] || "";

          return (
            <div key={index} className="rounded-lg overflow-hidden">
              {language && (
                <div className="bg-black/30 px-4 py-2 text-xs text-[#00B4CC] font-mono border-b border-white/10">
                  {language}
                </div>
              )}
              <pre className="bg-black/30 p-4 overflow-x-auto">
                <code
                  className="text-sm font-mono text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {code}
                </code>
              </pre>
            </div>
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap">
            {part}
          </p>
        );
      })}
    </div>
  );
}
