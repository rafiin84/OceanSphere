import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Send, Plus, Search, Ship, Wrench, Users, Package,
  Shield, ChevronRight, Bot, User, Zap, Clock, AlertTriangle,
  TrendingUp, FileText, Activity, MessageSquare
} from 'lucide-react'
import { aiInsights, vessels, workOrders } from '@/data/mockData'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const suggestedQueries = [
  { icon: Wrench, text: 'Which vessels have overdue maintenance?', category: 'Maintenance' },
  { icon: Users, text: 'Which crew certificates expire this month?', category: 'Crewing' },
  { icon: Package, text: 'Show critical inventory shortages', category: 'Inventory' },
  { icon: TrendingUp, text: 'Why did fuel consumption increase last month?', category: 'Analytics' },
  { icon: Shield, text: 'Summarize compliance risks for the fleet', category: 'Compliance' },
  { icon: Ship, text: 'Which vessels are performing below benchmark?', category: 'Fleet' },
  { icon: FileText, text: 'Generate procurement recommendations', category: 'Procurement' },
  { icon: Activity, text: 'Fleet health summary and action items', category: 'Overview' },
]

const sampleResponses: Record<string, string> = {
  'Which vessels have overdue maintenance?': `**Overdue Maintenance Summary** — as of June 10, 2026

I've identified **3 vessels** with overdue maintenance items:

**🔴 MV Southern Cross (v004) — CRITICAL**
- Steering Gear Hydraulic Unit (6 Monthly Routine) — **2 days overdue**
- Document of Compliance expired April 2026 — **immediate action required**
- 1 open defect: steering gear hydraulic pressure loss

**🟠 MT Pacific Endeavour (v002) — HIGH**
- Cargo Pump Unit 1 (Annual Inspection) — **3 days overdue**
- IOPP Certificate annual survey — **6 months overdue**
- PSC detention risk: HIGH

**🟡 MV Nordic Star (v001) — MEDIUM**
- Main Engine top overhaul due in **7 days** (June 20)
- Auxiliary Engine 4000h routine due June 25

**Recommended Actions:**
1. Dispatch maintenance team to Southern Cross immediately
2. Contact Framo AS for Pacific Endeavour pump parts (REQ-2026-5521 pending)
3. Pre-position cylinder head gaskets at Rotterdam for Nordic Star

Estimated risk mitigation value: **$420,000 in prevented downtime**`,

  'Which crew certificates expire this month?': `**Crew Certificate Expiry Report** — June 2026

Found **5 certificates** expiring or expired this month requiring immediate action:

**🔴 EXPIRED (Immediate Action Required)**
| Seafarer | Certificate | Expired |
|----------|------------|---------|
| Capt. Alexei Petrov | Master Mariner STCW II/2 | June 10, 2025 |

**🟠 EXPIRING THIS MONTH (June 2026)**
| Seafarer | Certificate | Expires |
|----------|------------|---------|
| 2/E Carlos Santos | Seafarer Book (MARINA) | July 15, 2026 |
| 2/O Dmitri Volkov | Medical Certificate ENG1 | June 30, 2026 |

**📋 Recommended Actions:**
- **Petrov (Master):** Certificate renewal via Russian Register — requires 5-day refresher course. Book immediately.
- **Santos (Seafarer Book):** MARINA Philippines renewal — 30-day lead time. Initiate now.
- **Volkov (Medical):** Arrange shore medical examination at next port. Can be done at Rotterdam.

**Vessel Impact:**
- MV Nordic Star: 2 crew with expiring documents → potential port state control issue
- MV Southern Cross reactivation blocked until manning certificates are valid`,
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-ocean-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-end gap-3', isUser && 'flex-row-reverse')}
    >
      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0',
        isUser ? 'bg-gradient-to-br from-navy-600 to-navy-800' : 'bg-gradient-to-br from-ocean-500 to-teal-500'
      )}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>

      <div className={cn('max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm',
        isUser
          ? 'bg-ocean-700 text-white rounded-br-none'
          : 'bg-white border border-border text-foreground rounded-bl-none'
      )}>
        <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>')
            .replace(/## (.*)/g, '<h3 class="text-sm font-semibold mt-2 mb-1">$1</h3>')
        }} />
        <div className={cn('text-[10px] mt-2 opacity-60', isUser ? 'text-right' : '')}>
          {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  )
}

const initialMessages: ChatMessage[] = [
  {
    id: 'sys1',
    role: 'assistant',
    content: `👋 Welcome to **OceanSphere AI Copilot**

I'm your intelligent maritime operations assistant. I can help you with:

- **Fleet & vessel monitoring** — positions, performance, anomalies
- **Maintenance planning** — overdue jobs, predictive insights, work orders
- **Crew management** — certificate expiry, rotation planning, compliance
- **Procurement** — inventory alerts, supplier recommendations, PO tracking
- **Compliance & HSEQ** — ISM, MARPOL, MLC risk summaries, audit status

What would you like to know about your fleet today?`,
    timestamp: new Date().toISOString(),
  }
]

const conversationHistory = [
  { id: 'c1', title: 'Fleet Health Report', date: '1h ago', preview: 'Summary of fleet performance...' },
  { id: 'c2', title: 'Maintenance Overdue', date: 'Yesterday', preview: 'Southern Cross and Pacific...' },
  { id: 'c3', title: 'Crew Cert Renewal', date: '2 days ago', preview: 'Petrov certificate renewal...' },
  { id: 'c4', title: 'Procurement Q2 Review', date: '3 days ago', preview: 'PO status and vendor...' },
]

export function AICopilot() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeConv, setActiveConv] = useState('c0')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000))

    const responseText = sampleResponses[text] ??
      `I've analyzed your query about **"${text}"** across the OceanSphere fleet data.\n\nBased on current fleet data (7 vessels, 154 crew, ${workOrders.length} active work orders), here is my assessment:\n\n**Key Findings:**\n- Fleet health score: 81/100 (3 vessels below 80)\n- 3 overdue maintenance items requiring immediate attention\n- 8 crew certificates expiring within 30 days\n- Critical spare parts at zero stock level\n\n**Recommended Action:** Review the maintenance and compliance dashboards for specific vessel-level details. Would you like me to drill down into any specific area?`

    const aiMsg: ChatMessage = {
      id: `a${Date.now()}`,
      role: 'assistant',
      content: responseText,
      timestamp: new Date().toISOString(),
    }

    setIsTyping(false)
    setMessages(prev => [...prev, aiMsg])
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-5 -m-1">
      {/* Left Panel — Conversation History */}
      <div className="w-56 flex-shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold">Conversations</div>
          <button className="w-7 h-7 rounded-lg bg-ocean-700 text-white flex items-center justify-center hover:bg-ocean-800 transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input placeholder="Search..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-border rounded-xl text-xs outline-none focus:border-ocean-400" />
        </div>
        <div className="flex-1 overflow-y-auto space-y-1">
          <button onClick={() => setActiveConv('c0')} className={cn('w-full text-left px-3 py-2.5 rounded-xl transition-colors', activeConv === 'c0' ? 'bg-ocean-700 text-white' : 'hover:bg-white/80 text-muted-foreground')}>
            <div className="text-xs font-semibold truncate">New Conversation</div>
            <div className={cn('text-[10px] mt-0.5', activeConv === 'c0' ? 'text-white/70' : 'text-muted-foreground')}>Just now</div>
          </button>
          {conversationHistory.map(conv => (
            <button key={conv.id} onClick={() => setActiveConv(conv.id)} className={cn('w-full text-left px-3 py-2.5 rounded-xl transition-colors', activeConv === conv.id ? 'bg-ocean-700 text-white' : 'hover:bg-white/80')}>
              <div className="text-xs font-semibold truncate">{conv.title}</div>
              <div className={cn('text-[10px] mt-0.5 truncate', activeConv === conv.id ? 'text-white/70' : 'text-muted-foreground')}>{conv.preview}</div>
              <div className={cn('text-[9px] mt-0.5', activeConv === conv.id ? 'text-white/50' : 'text-muted-foreground/60')}>{conv.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Center — Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-ocean-700 to-teal-600">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">OceanSphere AI Copilot</div>
            <div className="text-white/70 text-xs flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online • Fleet data updated 2 min ago
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8fafc]">
          {messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested queries (only when empty) */}
        {messages.length <= 1 && (
          <div className="px-5 pb-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suggested Queries</div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQueries.slice(0, 4).map(q => (
                <button
                  key={q.text}
                  onClick={() => sendMessage(q.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-xl text-xs text-left hover:border-ocean-400 hover:bg-ocean-50 transition-all group text-muted-foreground"
                >
                  <q.icon className="w-3.5 h-3.5 text-ocean-500 flex-shrink-0 group-hover:text-ocean-700" />
                  <span className="truncate">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
                placeholder="Ask anything about your fleet, crew, maintenance, compliance..."
                rows={1}
                className="w-full px-4 py-3 bg-secondary/50 border border-border focus:border-ocean-400 rounded-2xl text-sm outline-none resize-none transition-colors placeholder:text-muted-foreground/60"
                style={{ minHeight: 44, maxHeight: 120 }}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-2xl bg-ocean-700 hover:bg-ocean-800 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground mt-2 text-center">AI Copilot has access to real-time fleet, maintenance, crew, and compliance data.</div>
        </div>
      </div>

      {/* Right Panel — Context */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4">
        {/* Active Insights */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-teal-500" />
            <div className="text-xs font-semibold">AI Insights</div>
          </div>
          <div className="space-y-2">
            {aiInsights.slice(0, 5).map((insight, i) => (
              <button
                key={insight.id}
                onClick={() => sendMessage(insight.title)}
                className={cn('w-full text-left p-2.5 rounded-xl border text-xs transition-all hover:shadow-sm group',
                  insight.severity === 'critical' ? 'bg-red-50 border-red-200 hover:bg-red-100' :
                  insight.severity === 'warning' ? 'bg-amber-50 border-amber-200 hover:bg-amber-100' : 'bg-ocean-50 border-ocean-200 hover:bg-ocean-100'
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="font-semibold leading-tight text-foreground">{insight.title}</div>
                  <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-muted-foreground mt-1 leading-tight line-clamp-2">{insight.recommendation}</div>
                <div className="text-muted-foreground/70 mt-1">{insight.confidence}% confidence</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Context */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4">
          <div className="text-xs font-semibold mb-3">Fleet Context</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vessels</span>
              <span className="font-semibold">7 managed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Crew</span>
              <span className="font-semibold">154 total</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Open WOs</span>
              <span className="font-semibold text-orange-600">{workOrders.filter(w => w.status !== 'completed').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overdue</span>
              <span className="font-semibold text-red-600">3 critical</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-card p-4">
          <div className="text-xs font-semibold mb-2">Quick Queries</div>
          <div className="space-y-1">
            {suggestedQueries.slice(4).map(q => (
              <button
                key={q.text}
                onClick={() => sendMessage(q.text)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs text-left text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors group"
              >
                <q.icon className="w-3 h-3 text-ocean-400 flex-shrink-0" />
                <span className="truncate">{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
