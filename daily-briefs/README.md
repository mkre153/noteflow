# Daily Brief Research Agent System

## 🚀 Quick Start Guide

Your sophisticated daily brief research agent system is ready to keep you ahead of the curve in tech, AI, and your specific areas of interest.

### Basic Usage

```bash
# Standard daily brief (recommended for daily use)
/daily-brief

# Deep research mode (for comprehensive weekly analysis)
/daily-brief deep

# Focused research on specific topics
/daily-brief ai
/daily-brief machine-learning
/daily-brief startups
/daily-brief blockchain

# Advanced AI-coordinated research
/daily-brief-advanced
/daily-brief-advanced deep
/daily-brief-advanced [your-focus-topic]
```

## 🧠 System Architecture

### Multi-Agent Research Network

Your daily brief system deploys **4 specialized research agents** working in parallel:

#### 1. 🤖 Tech News Agent
- **Focus**: AI breakthroughs, product launches, industry updates
- **Sources**: TechCrunch, The Verge, ArXiv, Papers With Code
- **Specialties**: Research papers, model releases, developer tools

#### 2. 📈 Industry Trends Agent
- **Focus**: Social media analysis, community discussions
- **Sources**: Twitter/X, Reddit, HackerNews, GitHub Trending
- **Specialties**: Sentiment analysis, viral content, developer community trends

#### 3. 🕵️ Competitive Intelligence Agent
- **Focus**: Market movements, competitor tracking
- **Sources**: Company blogs, press releases, funding databases
- **Specialties**: Strategic moves, partnerships, new entrants

#### 4. 💡 Opportunity Spotter Agent
- **Focus**: Content ideas, business opportunities, networking
- **Sources**: Community forums, event listings, market analysis
- **Specialties**: Gap identification, timing analysis, action recommendations

## 🎯 Intelligence Features

### Advanced Processing
- ✅ **Story Deduplication**: No duplicate stories across sources
- ✅ **Relevance Scoring**: Personalized ranking based on your interests
- ✅ **Impact Assessment**: High/Medium/Low priority classification
- ✅ **Time Sensitivity**: Immediate/Near-term/Long-term categorization
- ✅ **Source Credibility**: Authority-weighted information
- ✅ **Pattern Recognition**: Cross-platform trend identification

### Personalization Engine
- 📋 **Background Integration**: Uses your `background.md` file for relevance
- 🎯 **Interest Matching**: Aligns findings with your stated focus areas
- 📊 **Learning System**: Adapts based on your engagement patterns
- 🔄 **Context Awareness**: Considers your current projects and goals

## 📂 File Organization

```
daily-briefs/
├── daily-brief-2024-01-15.md      # Today's brief
├── daily-brief-2024-01-14.md      # Yesterday's brief
├── brief-summaries.json           # Analytics and trend tracking
└── README.md                      # This guide
```

## 📊 Brief Structure

Each daily brief contains:

### 🔥 Top Stories
- 3-5 most important developments
- High-impact news requiring your attention
- Breaking announcements and major releases

### 🤖 AI & Tech Updates
- **Research Breakthroughs**: Latest papers and findings
- **Product Launches**: New tools, APIs, and platforms
- **Industry Movements**: Strategic moves and partnerships

### 📈 Trending Discussions
- **Community Sentiment**: What developers are talking about
- **Viral Content**: Popular demos, tutorials, discussions
- **Emerging Patterns**: Cross-platform trends and themes

### 💡 Opportunities & Ideas
- **Content Creation**: Topics with high engagement potential
- **Business Development**: Market gaps and partnership opportunities
- **Networking**: Events, communities, and collaboration chances

### 🎯 Personalized Insights
- **Direct Impact**: Immediately relevant to your work
- **Strategic Opportunities**: Aligned with your skills and goals
- **Learning Path**: Skills and technologies to explore

### 📋 Recommended Actions
- **Today**: High-priority items requiring immediate attention
- **This Week**: Medium-priority planning and preparation
- **This Month**: Strategic initiatives and long-term opportunities

## 🔧 Customization Options

### Focus Topics
Customize research focus with specific topics:

```bash
# AI/ML focused research
/daily-brief artificial-intelligence
/daily-brief machine-learning
/daily-brief deep-learning

# Business & Startup focus
/daily-brief startups
/daily-brief venture-capital
/daily-brief saas

# Technology specific
/daily-brief blockchain
/daily-brief web3
/daily-brief cybersecurity

# Developer tools focus
/daily-brief developer-tools
/daily-brief programming
/daily-brief open-source
```

### Research Modes

#### Standard Mode (Default)
- **Time Window**: 24-48 hours
- **Depth**: Balanced overview
- **Duration**: 2-3 minutes
- **Sources**: 15-20 key publications

#### Deep Mode
- **Time Window**: 48-72 hours
- **Depth**: Comprehensive analysis
- **Duration**: 5-7 minutes
- **Sources**: 30+ diverse sources

#### Focus Mode
- **Time Window**: 24-48 hours
- **Depth**: Topic-specific deep dive
- **Duration**: 3-4 minutes
- **Sources**: Topic-relevant sources only

## 🎓 Advanced Usage

### Background File Integration
Create a `background.md` file to enhance personalization:

```markdown
# Background Profile

## Current Focus
- Building AI-powered applications
- Interested in LLM development
- Working with React/Next.js stack

## Industry
- SaaS development
- B2B AI tools
- Developer productivity

## Skills & Interests
- Machine learning
- Full-stack development
- Technical writing
- Developer relations

## Goals
- Launch AI product by Q2
- Build thought leadership in AI space
- Expand professional network in ML community
```

### Analytics & Tracking

View your brief history and trends:
```bash
# View all briefs
ls daily-briefs/

# Analytics overview
cat daily-briefs/brief-summaries.json

# Pretty-printed analytics (requires jq)
cat daily-briefs/brief-summaries.json | jq

# Search past briefs
grep -r "OpenAI" daily-briefs/
```

### Integration Options

#### Automation
```bash
# Add to crontab for daily automation
0 8 * * * cd /path/to/project && /daily-brief-advanced > /dev/null 2>&1
```

#### Export Formats
- **Markdown**: Default format for reading and archiving
- **JSON**: Structured data in `brief-summaries.json`
- **Email Ready**: Copy-paste sections for team sharing
- **Slack Format**: Formatted for team channels

## 🛠️ Troubleshooting

### Common Issues

#### No Content Generated
- Check internet connection
- Verify search APIs are accessible
- Try with different focus topic

#### Irrelevant Results
- Update your `background.md` file
- Use more specific focus topics
- Try deep mode for better filtering

#### Performance Issues
- Check available disk space
- Clear old brief files if needed
- Use standard mode instead of deep mode

### Error Recovery
- The system includes automatic retry logic
- Partial results are saved even if some agents fail
- Manual sources are suggested when automation fails

## 📈 Optimization Tips

### Maximize Value
1. **Set Clear Background**: Update `background.md` regularly
2. **Use Focused Topics**: Specify areas of interest
3. **Review Analytics**: Track what content you find most valuable
4. **Schedule Regularly**: Daily consistency yields better personalization

### Time Management
- **Morning Brief**: Start day with latest developments
- **Deep Weekly**: Use deep mode for Sunday planning
- **Topic Research**: Use focused mode before important meetings
- **Opportunity Review**: Check opportunities section for quick wins

## 🔄 System Maintenance

### Regular Tasks
- Review and update `background.md` monthly
- Clean old brief files (>30 days) to save space
- Check analytics for personalization improvements

### Updates & Improvements
- Agent definitions are stored in `.claude/agents/`
- Command scripts in `.claude/commands/`
- Customize research sources and priorities as needed

## 🎯 Success Metrics

Track the value you're getting:
- **Time Saved**: ~4-6 hours of manual research per brief
- **Information Coverage**: 20-50 stories analyzed per session
- **Relevance Score**: Personalized filtering increases signal-to-noise ratio
- **Action Items**: Concrete next steps identified daily

## 💡 Pro Tips

### Content Creation
- Use opportunity insights for blog post ideas
- Track trending topics for timely content
- Monitor community discussions for audience pain points

### Business Intelligence
- Watch competitor moves for strategic planning
- Identify market gaps for product opportunities
- Track funding patterns for industry health

### Professional Development
- Follow technology trends for skill planning
- Identify networking events and opportunities
- Stay current with industry thought leadership

---

**🚀 Ready to get started?** Run `/daily-brief` to generate your first intelligent daily brief!