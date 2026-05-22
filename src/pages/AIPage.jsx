import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your FocusOS AI assistant 🤖 I can help you plan your day, break down tasks, suggest study strategies, or answer any questions. What do you need help with?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  // Auto scroll to bottom when new message appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are FocusOS AI, a helpful productivity assistant for students and professionals. Help users manage tasks, plan their day, study better, and stay focused. Keep answers concise and actionable.',
            },
            ...messages,
            userMessage,
          ],
          max_tokens: 500,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message)
      }

      const aiReply = data.choices[0].message.content
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }])

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Sorry, I could not connect right now. Please check your API key and try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Assistant 🤖</h1>
        <p className="text-slate-400 mt-1">Ask me anything about productivity, tasks or studying</p>
      </div>

      {/* Chat Box */}
      <div className="flex flex-col flex-1 bg-[#111118] border border-white/10 rounded-xl overflow-hidden">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-sm'
                      : 'bg-[#1A1A24] text-slate-200 border border-white/10 rounded-bl-sm'
                    }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading dots */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[#1A1A24] border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Auto scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4 flex gap-3">
          <input
            type="text"
            placeholder="Ask anything... (e.g. Help me plan my study schedule)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={loading}
            className="flex-1 bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default AIPage