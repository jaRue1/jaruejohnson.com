export interface Article {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  mediumUrl?: string
  tags: string[]
  readTime: string
}

export const articles: Article[] = [
  {
    title: "1.58 Bits Per Weight: Why Microsoft BitNet Changes Local AI",
    slug: "microsoft-bitnet-changes-local-ai",
    date: "2026-11-01",
    excerpt:
      "Every weight in the model is negative one, zero, or positive one. Multiplication disappears. A consumer CPU runs a 100-billion-parameter model. The math behind BitNet is why this works.",
    content: `"Every modern GPU burns hundreds of watts multiplying 32-bit floating-point numbers. Microsoft found a way to skip the multiplication entirely."

If you've been following local AI, you know the bottleneck: memory bandwidth and compute. Running a 70B model means loading 70 billion floating-point weights and multiplying them against your input thousands of times per second. That's why GPUs exist for this workload. That's why an H100 costs $30,000 and draws 700 watts. The entire hardware stack is optimized for one thing: fast floating-point multiplication at scale.

BitNet b1.58 asks a different question: what if we didn't multiply at all?

The project has over 41,000 stars on GitHub, and after digging into the source code and running the benchmarks, I understand why. This isn't an incremental optimization. It's an architectural shift that changes what hardware you need to run AI.

## What BitNet Actually Does

In a standard transformer model, every weight is a floating-point number. FP16 gives you 16 bits of precision per weight. FP32 gives you 32. Quantization (which I've written about before) reduces that to 8 bits or 4 bits, trading some quality for a smaller memory footprint.

BitNet b1.58 takes this to the extreme. Every single weight in the transformer is restricted to one of three values: -1, 0, or +1. That's 1.58 bits per parameter (because log2(3) = 1.58).

| Approach | Bits per weight | Values per weight | Memory for 70B model |
|----------|----------------|-------------------|---------------------|
| FP32 | 32 | ~4.3 billion | ~280 GB |
| FP16 | 16 | ~65,000 | ~140 GB |
| INT8 | 8 | 256 | ~70 GB |
| INT4 | 4 | 16 | ~35 GB |
| BitNet b1.58 | 1.58 | 3 | ~14 GB |

Look at that last row. A 70-billion-parameter model in 14 GB. That's not a typo. That's what happens when every weight is one of three values.

## Why Multiplication Disappears

This is the part that breaks your intuition if you're used to thinking about neural networks as giant matrix multiplications.

In a standard transformer layer, the forward pass looks like this:

\`\`\`
output = input_vector * weight_matrix
\`\`\`

Every element of that matrix multiply is a floating-point multiplication followed by an addition. For a single layer with a 4096-dimensional hidden state, that's millions of multiply-add operations.

When every weight is -1, 0, or +1, the multiplication becomes trivial:

\`\`\`
weight = -1  ->  output -= input    (negate and add)
weight =  0  ->  skip               (zero contribution)
weight = +1  ->  output += input    (just add)
\`\`\`

No floating-point multiplier needed. No FPU. No GPU tensor cores. Just integer addition and subtraction, which every CPU has been doing since the 1970s. The operation that previously required specialized hardware now runs on the most basic arithmetic unit in any processor.

Here's what that looks like in the actual BitNet C++ kernel:

\`\`\`cpp
// Simplified from bitnet.cpp inference kernel
// Instead of: sum += weight[i] * activation[i]  (FP multiply-add)
// BitNet does: branch on ternary weight, add or subtract
for (int i = 0; i < dim; i++) {
    int8_t w = ternary_weight[i];  // -1, 0, or +1
    if (w == 1)       sum += activation[i];
    else if (w == -1) sum -= activation[i];
    // w == 0: skip entirely
}
\`\`\`

In practice, the kernel is heavily vectorized. On x86, it uses AVX-512 instructions to process 64 ternary weights in a single clock cycle. On ARM, it uses NEON SIMD to do the same. The actual implementation packs weights into 2-bit representations and uses lookup tables to dispatch the add/subtract/skip operations in bulk.

## Memory Bandwidth Is the Real Win

Engineers fixate on compute (FLOPS, tokens per second), but the real bottleneck in inference is memory bandwidth: how fast you can move weights from RAM to the processor.

A standard FP16 model with 70B parameters needs to stream 140 GB of weights through memory for every forward pass. At DDR5 bandwidth of roughly 50 GB/s, just loading the weights takes almost 3 seconds. The GPU sits idle waiting for data.

BitNet shrinks that traffic by over 80%. The same 70B model is 14 GB. At the same bandwidth, the weights load in under 300 milliseconds. The processor spends less time waiting and more time computing. This is why BitNet's benchmarks show 2x to 6x speedup over full-precision models on the same hardware, and it's why the speedup grows with model size: bigger models are more bandwidth-bound.

| Platform | Speedup vs FP16 | Energy reduction |
|----------|----------------|-----------------|
| x86 CPU (AVX-512) | 2.37x to 6.17x | 71.9% to 82.2% |
| ARM CPU (NEON) | 1.37x to 5.07x | 55.4% to 70.0% |

Those energy numbers matter too. Running AI inference at 70 to 80% less energy per token means the laptop battery lasts. It means the electricity bill for a home lab drops. It means you can run agents continuously on hardware that doesn't need active cooling.

## What You Can Run Today

Microsoft ships an official model: BitNet-b1.58-2B-4T, a 2.4-billion-parameter model trained on 4 trillion tokens. The community has ported larger architectures:

| Model | Parameters | Platform |
|-------|-----------|----------|
| BitNet-b1.58-2B-4T (official) | 2.4B | x86, ARM |
| bitnet_b1_58-3B (community) | 3.3B | x86, ARM |
| Llama3-8B-1.58-100B-tokens | 8.0B | x86, ARM |
| Falcon3 family | 1B to 10B | x86, ARM |

The setup is more involved than Ollama (for now), but it's a one-time build:

\`\`\`bash
git clone --recursive https://github.com/microsoft/BitNet.git
cd BitNet
conda create -n bitnet-cpp python=3.10
conda activate bitnet-cpp
pip install -r requirements.txt

huggingface-cli download microsoft/BitNet-b1.58-2B-4T-gguf --local-dir models/BitNet-b1.58-2B-4T
python setup_env.py -md models/BitNet-b1.58-2B-4T -q i2_s
\`\`\`

Then run inference:

\`\`\`bash
python run_inference.py -m models/BitNet-b1.58-2B-4T/ggml-model-i2_s.gguf -p "You are a helpful assistant" -cnv
\`\`\`

That's a ternary language model running on your CPU. No GPU. No cloud. No API key.

## What This Means for Agentic AI

This is where I think most people are underestimating the impact.

The current model for AI agents is: your agent runs locally, but the model it calls lives in the cloud. Every tool call, every reasoning step, every iteration of the agent loop sends a request over the internet and waits for a response. You're paying per token. You're dependent on uptime. Your code and your prompts leave your machine.

BitNet makes a different architecture viable. An agent that runs entirely on your laptop, air-gapped if you want, with zero API costs and zero network latency. The model is small enough to fit in RAM. The inference is fast enough on CPU to support iterative agent loops. And the weights never leave your hardware.

For engineers building tools that handle sensitive codebases, proprietary data, or regulated environments, this matters. The question "can I run this without sending data to a third party?" finally has a practical answer for models in the billions of parameters.

## The Tradeoff

I want to be honest about where this stands. A 2.4B ternary model is not Claude. It's not GPT-4. The quality ceiling is lower because you're working with fewer parameters and less precision per parameter. For complex multi-step reasoning, long-form generation, and tasks that require deep world knowledge, bigger models running in the cloud are still better.

But that gap is closing. The community ports are already pushing into the 8B to 10B range. The architectural insight (ternary weights eliminate multiplication) doesn't have a size limit. When someone trains a 70B ternary model from scratch on a quality dataset, that's a model that fits in 14 GB of RAM and runs on a CPU. That changes the calculus for a lot of workloads.

## Why Engineers Should Pay Attention

BitNet isn't just a quantization trick. Standard quantization takes a trained FP16 model and rounds its weights down to fewer bits after training. You're degrading a model that was designed for high precision. BitNet trains natively in 1.58 bits. The model learns to represent knowledge using only -1, 0, and +1 from the start. That's a fundamentally different optimization target, and it's why the quality holds up better than you'd expect for the bit count.

The source code is open. The C++ runtime is readable. The math is simple enough that you can trace it from the paper to the kernel to the output. If you've been wanting to understand how AI inference actually works at the hardware level, BitNet is one of the best starting points because there's so little abstraction between the weights and the arithmetic.

The era of giant GPU clusters isn't over. But the assumption that you need one to run useful models is no longer true. 1.58 bits per weight. Addition instead of multiplication. A consumer CPU instead of a datacenter GPU. The math works, and the code is on GitHub.`,
    tags: ["AI", "Local Inference", "Microsoft", "BitNet", "Architecture"],
    readTime: "7 min read",
  },,

  {
    title: "The Networking Strategy Nobody Teaches Engineers",
    slug: "networking-strategy-nobody-teaches-engineers",
    date: "2026-08-30",
    excerpt:
      "The most valuable professional relationships I've built didn't come from conferences or LinkedIn. They came from one-on-one conversations where two engineers actually talked shop.",
    content: `"Every meaningful opportunity in my career traces back to a single conversation with one person. Not a panel. Not a Slack thread. A conversation."

I've been to the conferences. I've done the meetups. I've posted in the Slack communities, joined the Discord servers, and connected with hundreds of people on LinkedIn. And I can count on one hand the professional relationships that came from any of it.

The relationships that actually changed my trajectory, the ones that led to contracts, collaborations, referrals, and the kind of trust where someone will vouch for you without hesitation, all came from the same place: sitting down with one person and having a real conversation about the work.

Nobody teaches engineers how to network this way. So here's what I've learned doing it.

## Why Passive Networking Doesn't Work

Engineers default to passive networking because it feels efficient. You show up to a conference, you're in a room with 500 people, the math looks great. You join a Slack community with 10,000 members. You attend a meetup and hand out your card. Volume, right?

Except volume isn't the game. At a conference, you have 90-second conversations between talks. You exchange pleasantries with someone while you're both looking at your phones. You connect on LinkedIn afterward, and then what? Neither of you follows up. The connection sits there, a node in a graph that never gets traversed.

Meetups are slightly better because they're smaller, but the format is the same: a presentation, some socializing, and surface-level conversations about what stack everyone uses. You leave with a few names and no real understanding of who those people are or what they're working on.

The problem isn't that these events are useless. It's that they optimize for breadth when what actually matters is depth. One person who genuinely knows your work and trusts your judgment is worth more than 200 people who recognize your name from a conference lanyard.

## The One-on-One Approach

Here's what actually works: reach out to one person. Ask them something specific about their work. Have a conversation.

That's it. That's the strategy.

I started doing this a few years ago, almost by accident. I read a blog post by an engineer who had solved a problem I was actively stuck on. Instead of just bookmarking the post and moving on, I sent them a message. Not "great article!" Something specific. I told them I was dealing with a similar issue, explained what I'd tried, and asked how they'd handled a particular edge case the post didn't cover.

They responded within a day. We went back and forth for a week. By the end of it, I had a solution to my problem and they had context on a use case they hadn't considered. That exchange turned into a relationship where we'd periodically share what we were building, trade notes on tooling, and check in when one of us was evaluating something new.

One message. One real question. That's the entry point.

## Finding the Right People

You don't need to network with everyone. You need to find the people whose work overlaps with yours in interesting ways. Here's where I look:

**Open source contributors.** If you use a library and you've read the source code, you already know more about the maintainer's thinking than most people who attend their conference talk. Reach out about a specific design decision. Ask why they chose one approach over another. Contributors love talking about the why behind their code because most people only ever file issues about the what.

**Blog authors.** If someone writes about a problem you've actually solved (or are solving), that's a conversation waiting to happen. Not flattery. A real exchange between two people who've been in the same trench.

**Conference speakers you actually learned from.** Not the keynote speaker with 50,000 followers. The person who gave a 25-minute talk about a specific problem and clearly built something real. Those people are usually approachable and rarely get the follow-up they deserve.

**Colleagues on adjacent teams.** This is the most overlooked one. The engineer on the platform team who built the thing your service depends on. The person on the data team whose pipeline feeds your feature. You work at the same company and you've probably never had a real conversation about how your systems interact.

Here's a trick: use your version control to figure out who to start with.

\`\`\`bash
git shortlog -sn -- src/modules/payments/
\`\`\`

\`\`\`
    87  Sarah Chen
    34  Marcus Williams
     6  dependabot[bot]
     2  intern-2025
\`\`\`

That output shows you who actually wrote the payments module, ranked by commit count. The person at the top isn't just a colleague. They're the domain expert. Reaching out with "I saw you wrote most of the payments module; I had a question about the retry logic" is the kind of specific, work-grounded opening that starts real conversations.

## What to Actually Talk About

The worst networking conversations are about networking. "What do you do? Where do you work? What's your stack?" Those questions produce Wikipedia answers. Nobody gets excited reciting their LinkedIn summary.

Here's what I've found works:

**Their current challenge.** "What's the hardest technical problem you're working on right now?" People light up when you ask this because it's the thing they're thinking about constantly and nobody at work wants to hear about it for the fourth time. You're a fresh set of ears with no politics attached.

**Something you're building.** Share what you're actually working on. Not a pitch. Not a product demo. Just: "I'm building X and I ran into Y. Have you ever dealt with something like that?" This frames the conversation as two engineers comparing notes, which is exactly what it is.

**A pattern you're both using differently.** You both use event-driven architecture, but they handle retries differently. You both run Postgres, but their indexing strategy is something you haven't seen. The differences between how two competent engineers solve the same class of problem are where the best conversations live.

Here's the template I use for cold outreach:

\`\`\`
Subject: Question about [specific thing they built/wrote]

I [read your post / saw your commit / used your library] on [specific topic].
I'm working on [related problem] and noticed [specific detail].
[One concrete question].

No rush. Appreciate any thoughts.
\`\`\`

Short. Specific. No "let's hop on a call" until there's a reason to.

## How One Conversation Compounds

A single genuine relationship does more work than a hundred weak ties. Here's the compounding effect I've seen play out repeatedly.

You have a real conversation with someone. A few months later, they're hiring and they think of you, not because you applied, but because they know how you think. Or they're building something that needs a skill you mentioned, and they reach out directly. Or someone in their network needs help with exactly the kind of problem you've solved, and your name comes up in a conversation you're not even part of.

I've gotten contract work this way. I've gotten introductions to people I never would have reached on my own. I've had engineers I spoke with once two years ago send me a message saying "I remember you were dealing with X; I just ran into the same thing, here's what worked." That kind of long-term compounding doesn't come from a LinkedIn connection request. It comes from the fact that we had a real exchange and both walked away with something useful.

## Give First

Before you ask anyone for anything (a referral, an introduction, advice on a job) give them something useful. This doesn't need to be grand. Share an article that's relevant to what they told you they're working on. Point them to a tool you've been using that solves a problem they mentioned. Introduce them to someone in your network who's working on a related problem.

The bar is low because most people don't do this at all. When you consistently show up with something valuable and no ask attached, you become the person people want to help when you do eventually need something.

I keep a running note of what the people in my network are working on. When I come across something relevant, a library, a technique, a job posting, I send it their way with a line or two of context. It takes five minutes and it keeps the relationship alive between the conversations that matter.

## Start This Week

Pick one person whose work you respect. Someone whose code you've read, whose blog post taught you something, whose talk made you rethink an approach. Send them a message. Not "let's connect." Something specific about their work that shows you've actually engaged with it.

One conversation. That's how every meaningful professional relationship I've built started. The engineers who figure this out early have a compounding advantage that no amount of conference attendance can match.`,
    tags: ["Career", "Networking", "Professional Development", "Engineering Culture"],
    readTime: "6 min read",
  },,

  {
    title: "Writing Code Forces You to Be Honest",
    slug: "writing-code-forces-you-to-be-honest",
    date: "2026-08-21",
    excerpt:
      "Reading code lets you skim past the hard parts and nod along. Writing it makes you confront every gap in your understanding.",
    content: `"You don't really understand something until you have to build it. Reading gives you the illusion. Writing takes it away."

I've been thinking about this for a while, and it keeps proving itself true in ways I don't expect. There's a fundamental difference between reading code and writing code, and it's not about skill level or experience. It's about honesty.

Reading code lets you lie to yourself. Writing code won't.

## The Illusion of Understanding

You open a pull request. You scan the service layer. You see a function that queries the database, maps the results, and returns them. You nod. Makes sense. You move on.

But you didn't actually understand it. You understood the shape of it. You recognized the pattern. Your brain filled in the gaps with "yeah, that's probably how I'd do it" and kept scrolling. That's not understanding. That's pattern matching dressed up as comprehension.

I catch myself doing this constantly. I'll read through a module and think I get it, and then three days later I need to modify it and realize I missed half the picture. The error handling I glossed over? It's doing something subtle. The naming I didn't question? It's misleading. The edge case buried in a conditional? I skipped right past it because the happy path made sense and my brain was satisfied.

Reading code is a passive act. Your brain is optimized to conserve energy, and "close enough" feels the same as "exactly right" when you're just scanning.

## Writing Forces Every Decision

The moment you open a blank file and start typing, the lying stops. You can't skim past a function signature when you're the one writing it. You have to decide:

- What does this function accept? What types? Are they nullable?
- What does it return? What happens when there's nothing to return?
- What's the name? Not "processData." What does it actually do?
- What fails? What do you do when it fails?

Every line is a commitment. Every variable name is a claim about what that value represents. Every conditional is a statement about what's possible and what isn't. You can't wave your hands at any of it.

Here's a simple example. You're writing a function that looks up a user by email:

\`\`\`typescript
async function findUserByEmail(email: string): Promise<User | null> {
  const normalized = email.trim().toLowerCase()
  if (!normalized.includes("@")) {
    return null
  }
  return this.userRepository.findOne({ where: { email: normalized } })
}
\`\`\`

Reading that, you nod. Writing it, you had to answer six questions: Do I trim? Do I lowercase? What counts as invalid? Do I throw or return null? Do I normalize before or after validation? Does the repository handle its own errors or do I wrap it?

None of those decisions are visible when you're reading. All of them are mandatory when you're writing. That's the honesty. The code forces you to commit to an answer for every question the problem contains, including the ones you didn't know you were supposed to ask.

## The Gap Between "I Get It" and "I Can Build It"

Early in my career, I thought understanding and building were the same skill. They're not. They're not even close.

"I get it conceptually" means you can follow someone else's logic. "I can build it" means you've internalized the problem deeply enough to produce your own logic, handle the edges they handled, and discover the edges they missed. Those are two completely different levels of engagement with the same problem.

I've seen this play out in interviews, in onboarding, in code reviews. Someone says "yeah, I understand how the auth middleware works." Then you ask them to write a guard that checks a custom permission scope, and they stall. Not because they're bad engineers. Because reading the existing middleware gave them a map, and writing a new one requires navigating the actual terrain.

\`\`\`typescript
// Reading this feels like understanding:
@UseGuards(RolesGuard)
@Roles('admin')
async deleteUser() { ... }

// Writing this requires understanding:
@Injectable()
export class ScopedPermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.get<string[]>('scopes', context.getHandler())
    const userScopes = context.switchToHttp().getRequest().user?.scopes ?? []
    return requiredScopes.every(scope => userScopes.includes(scope))
  }
}
\`\`\`

The map is not the territory. Reading gives you the map. Writing makes you walk the ground.

## Code Review Is Where Writing Pays Off

This is the part that surprises people. Code review gets dramatically better when you write regularly, because writing trains you to spot the decisions that reading lets you skip.

When I review a pull request after spending weeks writing code in the same area, I see things I'd never catch otherwise. I notice when an error is swallowed instead of propagated, because I had to make that same decision last week. I notice when a variable name is ambiguous, because I struggled with naming the same concept. I notice when a function does two things, because I had to split one apart myself.

Writing gives you a library of decisions you've already made. Code review is where you compare someone else's decisions to yours and ask: did they see the same problem I did? Did they handle the thing I almost missed?

You can't do that if you've only been reading. You don't have the reference points.

## This Isn't About AI

I want to be clear: this isn't an argument against AI coding agents or LLMs. I use them daily. They're part of my workflow and they make me faster.

But here's what doesn't change: the engineer who reviews and ships the code must understand it deeply enough to defend every line. If an agent writes a function and you merge it, you own it. When it breaks at 2am, "the AI wrote it" isn't an answer. You need to know why that function handles errors the way it does, why it chose that data structure, why the edge case is covered or isn't.

The agent can write the first draft. It can scaffold the boilerplate. It can suggest patterns you haven't considered. But the act of reviewing that output honestly, questioning every decision, and committing to ship it? That's still writing. That's still the confrontation with complexity that makes you better.

The tool changes. The honesty requirement doesn't.

## The Engineers Who Will Matter

There's a version of this industry where everyone reads, nobody writes, and AI fills the gap. I don't think that version works. Not because AI isn't good enough, but because the people deploying it won't be good enough to judge its output.

The engineers who will matter in five years are the ones who still write. Still build. Still confront the complexity instead of skimming past it. Not because writing code is sacred, but because it's the fastest way to develop the judgment that everything else depends on.

You can read a thousand pull requests and learn the shape of good software. But you won't learn the weight of it until you carry it yourself.`,
    tags: ["Software Engineering", "Code Quality", "Career Growth", "Craft"],
    readTime: "5 min read",
  },,

  {
    title: "How an Experienced Engineer Reads a New Codebase",
    slug: "how-an-experienced-engineer-reads-a-new-codebase",
    date: "2026-08-16",
    excerpt:
      "I joined a company running a 20-year-old Ruby on Rails LMS. Thousands of files, years of migrations, and patterns that predate half the team. Here is how I built context without drowning in it.",
    content: `"Your manager says 'ship something this week.' You've been on the team for a few days. Most engineers start opening files one by one. That's why they're lost for a month."

Earlier this year I joined Cypher Learning as a staff engineer. The platform is a learning management system that's been in production for roughly 20 years. That's 20 years of Rails migrations. 20 years of contributors. 20 years of patterns that made sense at the time and now coexist with patterns that replaced them. The codebase is large, and it carries the full weight of its history.

I didn't have months to absorb it by osmosis. I needed to build context fast, figure out where the important logic lived, and start contributing without breaking things that had been working since before I got there.

So I did what I always do: I interrogated the codebase with Git.

Git isn't just version control. It's an X-ray machine. The commit history tells you where the action is, who knows what, and which files actually matter. Most of any large repo is dead weight for your first week. You need to find the 10% that runs the business, and you need to find it fast.

I use a framework I call HEAT. Four steps, each one building on the last. By the end you'll have a working mental model of any codebase, and you won't have read more than a fraction of it.

## H: Hotspots

Every codebase has hotspots: files that get changed constantly. These are where the real business logic lives. They're where bugs keep showing up. They're where features get added. And they're almost never the files you'd guess by looking at the directory tree.

One command ranks every file by how often it's been changed:

\`\`\`bash
git log --pretty=format: --name-only | sort | uniq -c | sort -rn | head -20
\`\`\`

That's it. One line. It prints every file that's ever been committed, counts duplicates, sorts by frequency, and shows you the top 20. Run it on any repo you work in right now and look at the output. I guarantee at least half of those files are ones you interact with daily, and a few will surprise you.

To give you a feel for what this looks like, here's a representative example of the kind of output you'd see on a large Rails LMS (these aren't real numbers from any production codebase, just a realistic illustration):

\`\`\`
    847 app/models/user.rb
    612 app/models/course.rb
    498 config/routes.rb
    431 app/controllers/courses_controller.rb
    387 db/schema.rb
    294 app/models/enrollment.rb
    256 app/models/assignment.rb
    201 Gemfile.lock
    189 app/controllers/api/v1/users_controller.rb
\`\`\`

In a project like this, the User model would be touched hundreds of times over the project's life. That file isn't just a model. It's the center of gravity for the entire platform. Every feature the LMS has ever shipped, from enrollment to grading to notifications, touches the User model. Start there.

The files at the bottom of the list, the ones with two or three commits? Ignore them. They were written once and nobody's had a reason to touch them since. They work. Move on.

On a 20-year-old codebase, the full history can be noisy. You can scope to the last 300 commits to see what's hot right now:

\`\`\`bash
git log --format='%H' -- . | head -300 | xargs -I{} git diff-tree --no-commit-id --name-only -r {} | sort | uniq -c | sort -rn | head -20
\`\`\`

Same idea, tighter window. This shows you what the current team is working on versus what was active five years ago. On a long-lived codebase, the difference is significant.

## E: Entry Points

Hotspots tell you where the action is. Entry points tell you where the action starts.

Every request that hits your application comes in through a door: a route, a controller action, a background job, a webhook handler. Find those doors and you understand the skeleton of the entire system.

For a Rails app, the first thing you read is the routes file:

\`\`\`bash
cat config/routes.rb
\`\`\`

On a 20-year-old LMS, that routes file might be over a thousand lines. Namespaced API routes, admin panels, legacy redirects, and mounted engines all stacked on top of each other. Don't try to memorize it. Skim it and look for the shape: how many namespaces exist, whether the API is versioned, and which resources have the most custom routes.

Then narrow down. If the User model is your hotspot, find every route that touches it:

\`\`\`bash
grep -n "users\|sessions\|registrations\|passwords" config/routes.rb
\`\`\`

For controllers specifically:

\`\`\`bash
grep -rn "def create\|def update\|def destroy" app/controllers/ --include="*.rb" | head -30
\`\`\`

Now you have a map of every door into the system. Combine this with the hotspots: if \`user.rb\` is your number one hotspot, find the controller actions that touch it. That's where you start reading, not at the top of the directory tree.

## The Legacy Gotchas

This is where a 20-year-old codebase gets interesting. The patterns you find in the hotspots aren't always the patterns you'd expect.

**STI (Single Table Inheritance).** In a long-lived Rails app, you'll find models that inherit from other models using the same database table. A \`type\` column determines which class gets instantiated. It's a Rails convention that works until it doesn't, and on a large codebase you can find yourself tracing a method call into a parent class, then a concern, then a module, then back to a child class that overrides it.

\`\`\`bash
grep -rn "< Application" app/models/ --include="*.rb" | head -20
\`\`\`

That shows you which models use STI. Knowing this upfront saves you from the confusion of reading a controller that references a model you can't find a table for.

**Concerns and modules stacked deep.** When a model has been the center of gravity for 20 years, it accumulates behavior. A User model on a mature LMS might include a dozen or more concerns. Imagine something like this:

\`\`\`ruby
class User < ApplicationRecord
  include Authenticatable
  include Enrollable
  include Notifiable
  include Gradeable
  include Reportable
end
\`\`\`

Each concern adds methods, callbacks, scopes, and validations. The model file itself might be small, but the effective class is hundreds of methods spread across dozens of files. Running \`grep -rn "def " app/models/concerns/\` gives you the real surface area.

**Raw SQL and hand-rolled queries.** Older parts of the codebase might bypass ActiveRecord entirely for performance-critical paths:

\`\`\`bash
grep -rn "execute\|find_by_sql\|connection.select" app/ --include="*.rb" | wc -l
\`\`\`

That count tells you how much of the data layer lives outside the ORM. These queries won't show up in model associations or scopes. They're invisible unless you look for them.

**Migrations that tell a story.** On a 20-year-old codebase, the migration history is a timeline of every business decision the product ever made:

\`\`\`bash
ls db/migrate/ | wc -l
ls db/migrate/ | tail -20
\`\`\`

Read the last 20 migration filenames. They tell you what the team is building right now. Read the first 20, and you'll understand the original data model before years of evolution changed it.

## A: One Action, End to End

This is the step that builds your mental model faster than anything else.

Pick one action a user performs. One button click. One form submission. One API call. Then follow it from the route to the controller to the model to the database and back.

Don't try to understand the whole system. Follow one path. On a large LMS, I'd pick something like "student submits an assignment":

1. Find the route: \`POST /courses/:course_id/assignments/:id/submissions\`
2. Open the controller: see what service or model method it calls.
3. Open the model: see what callbacks fire, what validations run, what jobs get enqueued.
4. Check the schema: what tables does this touch? What columns matter?
5. Trace the response back up: what gets returned to the user?

That single path teaches you the conventions of the codebase: how errors are handled, where validation lives, how the ORM is used, what patterns the team follows for async work. On a legacy codebase, this is where you discover the real conventions versus the documented ones. The patterns in the code are the truth. The wiki might be three years out of date.

One complete trace is worth ten partial explorations. The map builds itself once you have one full route from entry to database and back.

## T: Tests

Tests are the most underrated documentation in any codebase, and on a legacy codebase they're also the most honest.

\`\`\`bash
find . -name "*_spec.rb" -o -name "*_test.rb" | wc -l
find . -name "*_spec.rb" -path "*/models/*" | head -20
\`\`\`

Start with the tests for the hotspot files. If \`user.rb\` is your top hotspot, find \`user_spec.rb\` and read it. On an LMS, you'd expect to see test names like these:

\`\`\`
it "enrolls a student in a course"
it "prevents duplicate enrollments"
it "deactivates user without destroying records"
it "cascades notification preferences on role change"
it "scopes visible courses by enrollment status"
\`\`\`

That's five lines, and you already know more about the kinds of things a User model handles than you would from reading 500 lines of implementation. Tests document behavior in a way that comments can't, because tests actually run. If they pass, the behavior they describe is real.

If a hotspot file has no tests, that's also information. On a 20-year-old codebase, untested hotspots are where the risk concentrates. That's good to know before you start changing things.

## Bonus: Who Wrote This?

Here's the one Git command I run that has nothing to do with code and everything to do with getting unblocked:

\`\`\`bash
git shortlog -sn -- app/models/user.rb
\`\`\`

The output gives you a ranked list of contributors. On any long-lived project, you'll see something like:

\`\`\`
    142  developer-a
     87  developer-b
     34  developer-c
      6  dependabot[bot]
\`\`\`

The top contributor has 142 commits on that file. That person isn't just a contributor; they're the institutional knowledge for it. When you have a question about user behavior, that's who you talk to. Not the person with the most Slack messages. The person who wrote the code.

On a team where people have been around for years, this command is even more powerful. You can map entire subsystems to owners:

\`\`\`bash
git shortlog -sn -- app/models/concerns/enrollable.rb
git shortlog -sn -- app/services/grading/
git shortlog -sn -- lib/integrations/
\`\`\`

Three commands, and you have a social map of the codebase. You know exactly who to ask about enrollment logic, grading services, and third-party integrations.

## Putting It All Together

Here's the full sequence. This is exactly what I ran during my first week at Cypher:

1. Run the hotspot command. Identify the top 10 files. Five minutes.
2. Open \`config/routes.rb\`. Map the namespaces, the API versions, and the most active resources. Ten minutes.
3. Pick the highest-traffic route that touches a hotspot. Follow it end to end. Thirty minutes.
4. Read the tests for the files you just traced. Fifteen minutes.
5. Run \`git shortlog\` on the folders you explored. Two minutes.
6. Check for legacy patterns: STI models, concern stacking, raw SQL counts. Ten minutes.

Under ninety minutes, and you have a working mental model. You know where the business logic lives, how requests flow through the system, what legacy patterns to watch for, and who to ask when you get stuck.

Compare that to the alternative: opening files randomly for three days, building a vague sense of the codebase, and still not being confident enough to make a change.

## Why This Works

Not all code is equal. In any codebase, a small fraction of the files contain the vast majority of the business logic. The rest is boilerplate, configuration, one-time setup, or code that was written once and forgotten.

On a 20-year-old LMS, this is even more true. The codebase might have thousands of files, but the core behavior lives in a few dozen models, a few dozen controllers, and a handful of service objects. The rest is scaffolding.

Git history is the filter. It tells you what the team actually cares about, where the complexity lives, and what's been stable long enough to ignore. You're not reading the codebase. You're reading the story of the codebase, and on a 20-year-old project, that story has a lot of chapters. HEAT helps you skip to the ones that matter.

Most codebases are 80% noise and 20% signal. HEAT finds the signal.

If you've got your own tricks for reading a legacy codebase, or you want to compare notes on navigating a long-lived project, reach out. I'm always happy to talk shop.`,
    tags: ["Git", "Developer Productivity", "Legacy Code", "Ruby on Rails", "Engineering"],
    readTime: "9 min read",
  },

  {
    title: "What Is a Forward-Deployed Engineer?",
    slug: "what-is-a-forward-deployed-engineer",
    date: "2026-08-02",
    mediumUrl: "https://medium.com/@jaruejohnson/what-is-a-forward-deployed-engineer-c10f9b2c1296",
    excerpt:
      "Eight months embedded in a Forbes 30 Under 30 company as a forward-deployed engineer: hand-stacking pallets to learn the domain, a 60-day compliance gauntlet, a production deadlock with perfect timing, and the ERP their business now runs on.",
    content: `"What does it mean to be forwardly deployed? Everyone in tech is suddenly hiring for the title, and I just spent eight months living it. This is what the job actually looks like."

One morning, a national distributor sent StrawFish a purchase order for a few hundred cases of product. Before anyone at the company had opened a laptop, the platform had already pulled the order down, confirmed it wasn't a duplicate, resolved the buyer's item numbers, checked the stock, planned the pallets, and queued an acknowledgment back to the partner. Nobody touched that order, and these days, most orders never get touched at all. This is what the platform does, and this is the story of how it got built. Majorlinkx published the [official case study](https://majorlinkx.io/case-studies/13), and what I want to give you here is the part a case study can't: what it was actually like to build.

## The Arrangement

First, the setup, stated once and plainly. My day job is being a full-time staff engineer at Cypher Learning, and outside of that I do contract work for Majorlinkx, a development agency where I was the founding engineer and helped stand up the engineering team. Majorlinkx leadership closed the StrawFish engagement, and I was deployed as the staff engineer on it: the forward-deployed engineer, embedded from December 2025 through July 2026.

Forward-deployed is a post, not a vanity title. You interact directly with the core stakeholders, you take acceptance criteria from the people who sign things, and you own the architecture, the code, the infrastructure, the roadmap, and the incident response when something breaks. The engineer building the system should sit inside the operation, not at the end of a ticket queue.

## Not a Mom-and-Pop

StrawFish makes biodegradable straws out of seashells, and that sentence undersells them badly. They're a Boca Raton company whose founders made the Forbes 30 Under 30 list in 2024 for Social Impact, and their products move through the largest foodservice distributors in the country; do your own research on them. At that scale, a significant portion of their order volume moves through EDI, where partners send purchase orders electronically and expect an answer back in minutes. The clock starts the moment a purchase order lands.

EDI at this level means national distributors expect an answer back in minutes: order confirmed, here's the ship notice, here's the invoice. The volume and the compliance requirements that come with it demand a platform built around how the business actually operates, not rented from a vendor who picked the roadmap. Off the shelf means per-seat pricing forever and a feature set someone else controls. StrawFish chose to build something they would own outright, and Majorlinkx deployed me.

## Learning the Business With My Hands

I had never touched EDI or food distribution before this project, and closing that gap is the entire point of the forward-deployed model. I learned the operation physically: sitting with the C-suite, holding the products, packing sample shipments to feel how orders actually leave the building. When it came time to build the pallet engine, I stacked cases on a real pallet myself. A case stopped being a variable named \`caseCount\` and became an object I had physically lifted, and every requirements conversation got faster because we were finally talking about the same reality.

Embedding also surfaced the edge cases early. What happens when a partner resends a PO, or the carrier API is down at label time, or stock can't cover an order that's already been acknowledged? Those questions come from proximity, not from a requirements document.

## Breaking Down Something This Big

An ERP is inventory plus orders plus EDI plus shipping plus invoicing plus auth plus infrastructure, all at once, and the way through wasn't trying to build everything. It was sequencing.

**Source of truth first.** The first milestone was establishing the ERP as the single source of truth for inventory and orders. Once that was true, every later decision got simpler, because "where does this data go" was never a debate again.

**Then integrations, outward from the core.** The EDI trading partner to receive orders, the carrier API to rate, label, and ship them, and the accounting software to bill for them. Each integration extended the platform's reach.

What kept this honest was constant conversation. I was in the StrawFish office a minimum of three days a week, and we refined requirements ad nauseam: not just what they wanted built, but why they needed it, every single time. The sessions were recorded and became written specs before anything became code, and the archive tells the story better than I can: the first folder is dated December 10, 2025, the most recent is dated the day I'm writing this, and there are 335 spec files in between.

The operational rule was blunt: if it wasn't spoken about, it wasn't implemented. That forced assumptions into the open while they were still cheap, and some of the platform's best behavior came from a stakeholder looking at a shipped screen and saying "we love it, but this is how we actually operate." You only get that sentence if you ship fast enough for them to react to real software.

On the business side, everything ran through [Nexus](/projects/nexus-nexusos/), the client portal Majorlinkx runs on, using a concept we built for this engagement called Project Units: billable units derived straight from the invoice, agreed to by the client before anything gets built. StrawFish always knew what work mapped to what payment, I always knew what done meant, and more than 450 requests closed through that system in eight months.

## The Pallet Engine

This was the hardest technical problem in the platform, and it's the one I'd want another engineer to grill me on.

When a distributor orders hundreds of cases across multiple SKUs, someone has to decide how that becomes pallets on a truck: which cases stack together, how many layers per pallet, what the mixed pallet looks like when the math doesn't come out even, and whether the load hits the fill rate that makes the freight economical. The pallet algorithm is domain-specific knowledge that doesn't exist in a textbook, so I learned it physically, and then I made it software. The engine plans orders into full-truckload pallets with high fill rates, and it isn't a black box: operators drag layers between pallets to override the plan, and the system recalculates around them. The software earns trust by conceding that the floor sometimes knows better.

## The Compliance Gauntlet

Two of the eight months had nothing to do with building features. They were pure compliance, the part of enterprise software nobody puts in the demo.

Here's what surprised me most. Building your own EDI platform means inheriting the full compliance surface that national distributors require. Every EDI partner must certify against scenarios like short shipments and backorders. The rules apply to everyone, so we designed, built, and certified entire exception flows that will almost certainly never run in production. That's the strange economics of enterprise certification: a real slice of the work exists purely to prove you could handle situations the business will never create.

The EDI trading partner onboarding had its own friction: documentation that was out of date in places, expected payloads that weren't documented anywhere, and one of the larger partners sending payloads that didn't match their own spec, with address fields missing and shapes shifting between requests. We had to be exactly right about data that was inconsistently wrong, and I led those communications myself. It's unglamorous work, and it's exactly the work that gets a platform certified.

One certification milestone came with a ten-day deadline. We finished it in seven days, with three days left to spare.

## What It Runs On

The platform is a set of containerized services running in StrawFish's own cloud account: traffic through a web application firewall and CDN, the ERP and CRM UIs served at the edge, API calls into a load balancer, services in private subnets with managed PostgreSQL and Redis, and CI/CD pipelines deploying with migrations gated ahead of each release.

[DIAGRAM:strawfish-platform]

The EDI lifecycle is the spine. Four document types carry an order from "we want product" to "pay us":

| Document | What it is | Direction |
|----------|------------|-----------|
| 850 | Purchase order | Partner to StrawFish |
| 855 | Acknowledgment: confirmed, here's what ships | StrawFish to partner |
| 856 | Advance ship notice: it's on a truck | StrawFish to partner |
| 810 | Invoice | StrawFish to partner |

An 850 lands and becomes an allocated purchase order without anyone opening the app, and acceptance kicks off the return leg: the acknowledgment, the carrier label, the ship notice, and the invoice through the accounting integration, all from one event chain. An order the stock can't cover goes to a human for review, and anything that fails to enqueue sends an alert instead of dying quietly.

[DIAGRAM:edi-lifecycle]

## What It Actually Processes

The platform was built to scale past what StrawFish needs today.

Each order hits the EDI endpoint, gets deduplicated, has its item numbers resolved against the partner's mapping, passes through inventory checks with row-level locking, gets allocated, has its pallets planned, and queues an acknowledgment back to the partner. That entire chain runs through a set of Redis-backed queues and job processors without a human opening a browser.

Per-partner queues process independently and in parallel, which means adding a new trading partner doesn't slow down any existing one. After a successful 856 advance ship notice, the platform generates the 810 invoice in roughly 70 milliseconds on the platform side.

The architecture means StrawFish can onboard new partners and absorb volume growth without a redesign.

The platform can also integrate with any EDI partner. The polling, deduplication, and document exchange logic is configurable per partner, not hardcoded, so onboarding a new trading partner is a configuration change, not a development project. StrawFish now has its own technical arm for EDI, independent of any single network provider.

The team focuses on selling and working exceptions rather than data entry.

The numbers, for scale:

| Metric | Count |
|--------|-------|
| Months, kickoff to live | 8 (roughly 6 build, 2 compliance) |
| Spec files written | 335 |
| Requests closed | 450+ |

Containerized services behind a load balancer, Redis-backed queues for async processing, infrastructure as code across multiple environments, and CI/CD pipelines gating every release. Nuxt and TypeScript on the front, NestJS behind it, PostgreSQL under everything.

## The Day It Deadlocked

One day, a burst of orders from a single trading partner arrived at once. We had recently scaled from one worker task to two, and each worker runs its inventory-check consumer with \`concurrency: 1\`, which sounds safe until you internalize that BullMQ concurrency is per-worker, not per-queue. Two tasks means two consumers.

The inventory check uses \`SELECT ... FOR UPDATE\` on stock rows so the platform can never oversell, and the orders all drew from the same catalog. You can see it coming:

\`\`\`
Worker A: holds stock rows for Order 1, waits on rows held by Worker B
Worker B: holds stock rows for Order 2, waits on rows held by Worker A
Postgres kills one side. BullMQ retries it. The deadlock reforms.
\`\`\`

Recovery took two hours. Killing the deadlocked connections didn't help, because the retries walked straight back into the same trap; the durable fix was Terraform, consolidating the worker topology while the polling cron sat paused so nothing new wandered in.

Then came the cleanup, which is where a platform shows its character. Most of the orders had processed normally, and the rest were stuck or in an inconsistent state where a two-step write got severed mid-deadlock. Every one got a targeted fix the same day: a resubmit escape hatch, the write moved to creation time, and backfills with a recovery note preserved on each corrected row.

**Lesson one: BullMQ concurrency is per-worker.** If your queue guards shared rows with locks, adding workers is how you manufacture deadlocks.

**Lesson two: even the lessons you already know will find you at scale.** Every seasoned engineer knows a multi-step write without a transaction is a data gap, and I knew it too. It got through anyway, in exactly one place, in a large codebase where I was the primary lead. If I'm being honest, it was my only real technical miss of the project, and I'm willing to take it: it was a difficult lesson, but the system failed loudly, the feedback loop surfaced it within hours, and the audit trail made every correction traceable.

**Lesson three: one bigger worker beats two smaller ones at this volume.** When the day comes that demands real parallelism, the answer is lock ordering or advisory locks, not more consumers.

The platform's job was never to be unbreakable. Its job is to break loudly, recover fast, and leave a trail, and that day it did all three.

## Entity Views and the Art of the Half-Step

The ask sounded simple: warehouse workers shouldn't see everything on a purchase order, while logistics admins need a different slice of the same record. Stakeholders wanted what they had before, per-role column visibility on everything.

I did the deep dive on what rebuilding a views engine like that would take, and even with agentic development, the honest answer was too long for power that would mostly go unused. The granularity was only needed on purchase orders, so that's what we built: configurable views scoped to POs, shipped in a fraction of the time, with a clean extension point if it ever needs to generalize.

That's the actual job at this level. It isn't building what was asked for. It's building the smallest thing that makes the request unnecessary.

## The Factory

Now for the part my [Writing Code Isn't Enough Anymore](/blog/writing-code-isnt-enough-anymore/) series has been circling for a year: how one embedded engineer ships a platform that's conventionally quoted in years, in eight months.

The refinement sessions were recorded, and the recordings fed what we call a context agent, whose whole job is holding everything about StrawFish: how the business operates, what's been decided, and why. It lives in a private workspace on infrastructure we control, running local models, so proprietary client data never leaves. If you've read [the DGX Spark article](/blog/i-bought-an-nvidia-dgx-spark/), this is what that hardware is for.

Implementation ran through what we internally call the Factory, a workspace that manages multiple AI coding agents and contexts in parallel, with me as the architect and reviewer across all of them. Features that would normally take weeks came together in days, and when the CEO or CFO raised something new, it could go from request to spec to pull request to production the same day, with status visible in the portal the whole way.

That speed is what made the feedback culture work: stakeholders iterated on live software weekly instead of squinting at mockups for months. And here's the honest core of it: the agents were never the bottleneck. Knowing what to build was the bottleneck. That's why the embedding, the constant refinement, and the pallet stacking mattered. Writing code isn't enough anymore, because the leverage is in knowing exactly what code to write.

## They Own It

The repository has lived in StrawFish's GitHub organization since day one, the infrastructure runs in their cloud account, and the data, the Terraform, and the roadmap are all theirs. That ownership is the point: when a vendor quotes them a price now, they can say no, and when a partner wants something unusual, it's a few weeks of work instead of a ticket in someone else's backlog. The architecture is ready for AI and a CRM layer without a rewrite, with every byte of proprietary data staying on infrastructure they control.

The platform handles the order lifecycle end to end, from EDI intake through invoicing, and scales to meet whatever volume the business grows into. The next user costs nothing to add. The next trading partner is a row in a settings screen. And the platform keeps getting more valuable to StrawFish specifically, because it was molded to their operation one refinement session at a time.

## What This Was Really About

For eight months I was the architect, the product manager, the infrastructure engineer, the integration negotiator, and the person the C-suite reached for when they needed something real by the end of the week. One embedded engineer, with an agent factory behind him and a client willing to build, shipped the platform that a Forbes 30 Under 30 company now runs its order flow on.

The official case study is live at [Majorlinkx](https://majorlinkx.io/case-studies/13), and you can see the company itself at [strawfish.co](https://strawfish.co/). If you're wondering whether the forward-deployed path is real engineering or a rebrand of consulting, or you want to compare notes on EDI, pallet math, or agentic pipelines, reach out. I'm always happy to talk shop.`,
    tags: ["Forward Deployed Engineering", "ERP", "EDI", "AWS", "Agentic Development"],
    readTime: "10 min read",
  },
  {
    title: "Writing Code Isn't Enough Anymore, Part II: I Bought a DGX Spark",
    slug: "i-bought-an-nvidia-dgx-spark",
    date: "2026-06-17",
    excerpt:
      "128GB of unified memory, a Grace Blackwell superchip, and the honest truth about running 70B models in your apartment.",
    mediumUrl: "https://medium.com/@jaruejohnson/writing-code-isnt-enough-anymore-part-ii-i-bought-a-dgx-spark-66ef8b8da796",
    content: `"A lot of people are selling dreams about local AI. I wanted to find out what's real."

I've been watching the local AI space closely for the past year. Every week there's a new post about someone running models locally like it's trivial. "Just run Llama on your Mac!" "Local AI is free!" And yeah, technically you can. But nobody talks about the 4.7 tokens per second. Nobody talks about the memory ceiling. Nobody shows you the benchmarks that don't match the marketing.

This is the article where I show the receipts.

I'd been running AI agents through OpenClaw against cloud APIs for months. The setup worked great until April 2026, when [Anthropic](https://anthropic.com) changed their policy to block third-party harnesses from Claude Pro and Max subscriptions. That killed my workflow overnight. But the policy change was just the push. The real motivation was simpler: I wanted to know the truth about local inference. What actually works. What doesn't. Where the limits are.

So I bought a $5,000 [NVIDIA](https://nvidia.com) DGX Spark and plugged it into my home lab network. I pulled the most popular open models, ran real workloads, and measured what actually happened. Some of it was great. Some of it was humbling. All of it was real.

If you haven't read the first article in this series, [Writing Code Isn't Enough Anymore](/blog/writing-code-isnt-enough-anymore/), that covers how I built the segmented network this machine sits on. This article covers what I put ON that network: the AI hardware, the models, and the reality of running local inference.

## The Thesis

Running models locally isn't free: it's a different kind of cost. Hardware upfront instead of tokens per month. The question is whether it's worth it, and the answer is more nuanced than the hype suggests.

The DGX Spark isn't replacing my cloud AI subscriptions. I'm paying $420/month across [Cursor](https://cursor.com) Pro, [Claude Code](https://anthropic.com) Max, and Claude Pro. Those tools work. They're fast. They're reliable. The Spark is adding a capability: local inference that I control, on hardware I own. Whether that capability is production-ready is exactly what this article explores.

## The Hardware: What You're Actually Getting

| Component | Spec |
|-----------|------|
| GPU | NVIDIA GB10 Grace Blackwell Superchip |
| Memory | 128GB unified LPDDR5X (shared CPU/GPU) |
| Storage | 4TB NVMe Gen5 SSD |
| CPU | ARM64 (Grace) |
| OS | Ubuntu 24.04 (Noble) |
| Pre-installed | Python 3.12, Docker 29.2.1, CUDA 13.0, Claude Code |
| Price | ~$4,999 ([PNY](https://pny.com) Founders Edition) |

The key phrase here is "unified memory." The CPU and GPU share the same 128GB pool. This is different from datacenter GPUs like the [H100](https://nvidia.com/en-us/data-center/h100/), where the GPU has its own dedicated HBM. The upside: no copying data between CPU and GPU memory. The downside: that 128GB is ALL you get for everything. The model, the OS, your tools, and inference overhead all share the same pool.

## AI Models: A Crash Course for Software Engineers

If you're a software engineer who's curious about local AI but hasn't tried it yet, this section is for you. I'm going to explain the fundamentals using programming analogies, because that's the mental model that actually stuck for me.

**What is a model?** A massive file of numbers called parameters or weights, learned during training. A 70 billion parameter model is literally a file with 70 billion tuned numbers. Running it means loading those numbers into memory and doing matrix math against them for every prompt. That's it. No magic. Just math at scale.

**Tokens.** Models don't read words. They read tokens, which are chunks of text, roughly three-quarters of a word. "cat" is 1 token. "understanding" is 2 tokens ("under" + "standing"). Code tokenizes less efficiently than prose, which matters because everything in AI is measured in tokens: context windows, input, output, speed.

**Context window.** How many tokens the model can see at once. Think of it as working memory. A 128K context window means roughly 96,000 words in a single conversation. Anything outside the window doesn't exist to the model. It's gone.

**Quantization.** This is where it gets practical. Quantization reduces the precision of each parameter to shrink the memory footprint. Think Java's \`double\` (64-bit) versus \`float\` (32-bit). Same concept, applied to model weights:

- **FP16 (16-bit):** ~2 bytes per parameter. Essentially lossless quality.
- **INT8 (8-bit):** ~1 byte per parameter. Very close to original quality.
- **INT4 (4-bit):** ~0.5 bytes per parameter. Noticeable quality loss on reasoning tasks.

The math is simple: parameter count multiplied by bytes per parameter equals memory needed. So 70B parameters at INT8 (1 byte each) equals roughly 70GB. But real-world [Ollama](https://ollama.com) pulls use efficient GGUF quantization, so the actual \`llama3.3:70b\` Q8 pull was only 42GB on disk.

**Ollama.** This is the runtime that serves models. It is NOT a model itself. Ollama is to models what Node.js is to Express: the runtime that loads and serves them. You can download multiple models to disk, but only run one large model in memory at a time. Swapping means unloading from memory and reloading from disk, roughly 30 to 60 seconds. No re-downloading required.

**Mixture of Experts (MoE).** A single model with internal subnetworks that only partially activate per token. A 120B MoE model with 30B active parameters runs at 30B speed but needs the full 120B loaded in memory. It's one model, not multiple. This matters when you're calculating memory requirements.

## The Network: Where the Spark Lives

I covered the full network build in [the previous article](/blog/writing-code-isnt-enough-anymore/): three VLANs, inter-VLAN traffic blocked at the firewall, wired-only isolation for sensitive workloads. The Spark goes on Sentinel (VLAN 30), plugged directly into Port 4 of the [USW Enterprise 8 PoE](https://ui.com) at 2.5 GbE. WiFi disabled, fixed IP: 10.10.30.100. It sits next to the Mac Mini (10.10.30.244) which runs OpenClaw. The only path to these machines from the rest of my network is through [Tailscale](https://tailscale.com).

## The Setup: From Unboxing to First Inference

**1. Physical Setup and VLAN Assignment**

Plug into Port 4 of the switch. Skip WiFi during the DGX initial setup wizard. In the UniFi controller: go to the port manager, select Port 4, set Virtual Network Override to Sentinel. Assign fixed IP 10.10.30.100. Reboot to pick up the new address.

Then kill WiFi permanently:

\`\`\`bash
nmcli radio wifi off
\`\`\`

**2. Ollama Network Configuration**

By default, Ollama only listens on localhost. To make it accessible from other machines on the network:

\`\`\`bash
sudo mkdir -p /etc/systemd/system/ollama.service.d
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_KEEP_ALIVE=24h"
EOF
sudo systemctl daemon-reload
sudo systemctl restart ollama
\`\`\`

Now Ollama is accessible at http://10.10.30.100:11434 from any machine on the Sentinel network. The \`OLLAMA_KEEP_ALIVE=24h\` setting keeps the model loaded in memory for 24 hours instead of unloading after 5 minutes of inactivity. Loading a 42GB model takes 30 to 60 seconds. You don't want that happening between every prompt.

**3. Tailscale**

\`\`\`bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
\`\`\`

Tailscale IP: 100.113.104.82. Now the Spark is reachable from ANY machine on the Tailscale mesh, not just local Sentinel devices. My laptop on Tank, my phone on Zion, a machine at a coffee shop: all can reach the Spark securely through the WireGuard tunnel.

**A note on open source alternatives.** Tailscale works well, but it's not open source. The more I build critical infrastructure on proprietary tools, the more I think about what happens if the company changes their terms. [NetBird](https://netbird.io) is the open source alternative I'm migrating to: [WireGuard](https://wireguard.com)-based mesh networking, peer-to-peer connections, and a self-hosted coordination server. Being able to see the code, audit it, fork it if you need to, and self-host the control plane is the right foundation when you're building something you depend on daily.

**4. Dev Tool Bootstrap**

The Spark runs [Ubuntu](https://ubuntu.com) 24.04 on ARM64. That architecture matters because some tools need aarch64-specific builds. Here's what I installed:

- nvm with Node.js v24 LTS
- pyenv with Python 3.12
- rbenv with Ruby 3.3
- Go 1.23.4 (ARM64 binary)
- AWS CLI (ARM64)
- Terraform
- Hermes AI, Codex CLI, OpenCode

The architecture decision: keep the Spark lean. Its primary job is inference. CLI tools and harnesses are fine because they're lightweight when idle. No heavy IDEs. The MacBook stays the dev workstation. The Mac Mini runs OpenClaw. The Spark runs the model. Each machine has a job.

**5. Pull the Models**

\`\`\`bash
ollama pull llama3.3:70b      # Meta Llama 3.3, 42GB on disk (Q8)
ollama pull qwen3:32b          # Alibaba Qwen3, 20GB on disk
\`\`\`

Both fit on the 4TB SSD simultaneously.

**6. Verify from the Mac Mini**

\`\`\`bash
curl http://10.10.30.100:11434
# "Ollama is running"

curl -s http://10.10.30.100:11434/api/generate -d '{
  "model": "qwen3:32b",
  "prompt": "Say hello from the DGX Spark",
  "stream": false
}'
\`\`\`

First response came back in about 8 seconds. The Spark was live.

## The Reality Check: Performance Benchmarks

This is the most important section of this article. Here are the real numbers.

| Scenario | Model | tok/s |
|----------|-------|-------|
| Solo | qwen3:32b | ~10 tok/s |
| Solo | llama3.3:70b Q8 | ~4.7 tok/s |
| Solo | llama3.3:70b Q4 | ~4.5 tok/s |
| Both loaded | memory exceeded | degraded |

My target for production agent workflows is 30 to 50 tok/s. I'm at 10 tok/s on the best case. That's a 3x to 5x gap.

**Why the gap exists.** The GB10 uses LPDDR5X unified memory with roughly 546 GB/s bandwidth. That's not HBM. For a 32B Q4 model (about 20GB in memory), the theoretical maximum is around 27 tok/s. Getting 10 means I'm running at roughly 37% of theoretical. There's room to optimize, but there's a hard ceiling set by the memory bandwidth.

**What this means in practice.** At 10 tok/s, a 200-token response takes 20 seconds. For interactive use, that's noticeable. For an agent loop with 500 steps, that's roughly 3 hours. For overnight batch work like code review, refactoring passes, or test generation, that's acceptable. For real-time interactive coding where you need sub-second responses, it's not there yet.

**The memory wall.** I tried loading both models simultaneously. Combined memory: roughly 133GB. The 128GB pool couldn't hold both. Performance collapsed as the system started swapping. One model at a time. Period.

**Optimizations still to explore:** reduced context window (\`num_ctx: 8192\` instead of 131K), \`OLLAMA_FLASH_ATTENTION=1\`, smaller and faster models like \`qwen3:14b\`, running [llama.cpp](https://github.com/ggerganov/llama.cpp) directly to bypass Ollama overhead, and further quantization tuning.

## Should You Docker Your Inference Server?

No.

The Spark is a dedicated inference machine chasing a performance target it hasn't hit yet. [Docker](https://docker.com) adds overhead. Even small overhead matters when every bit of throughput counts. Native Ollama has direct GPU and memory access. There's nothing to isolate from on a single-purpose machine.

Docker makes sense for services around Ollama: web UIs, vector databases, API gateways. Not for the inference layer itself. Keep the model serving as close to the metal as possible until you hit your performance targets. Then you can afford the convenience tax.

## OpenClaw: Pointing the Agent at Local Inference

Here's the OpenClaw configuration that connects to the Spark:

\`\`\`json5
{
  models: {
    mode: "merge",
    providers: {
      ollama: {
        baseUrl: "http://10.10.30.100:11434/v1",
        api: "openai-completions",
        injectNumCtxForOpenAICompat: true,
        models: [
          {
            id: "qwen3:32b",
            name: "Qwen3 32B (Spark)",
            contextWindow: 32768,
            maxTokens: 4096,
          },
          {
            id: "llama3.3:70b",
            name: "Llama 3.3 70B (Spark)",
            contextWindow: 128000,
            maxTokens: 4096,
          },
        ],
      },
    },
  },
}
\`\`\`

Two things to note. First, append \`/v1\` to the Ollama URL for the OpenAI-compatible endpoint. Without it, the client can't communicate with Ollama. Second, set \`injectNumCtxForOpenAICompat: true\` or Ollama silently ignores your context window settings and uses its default.

This is the full circle moment. The same agent framework that was running against cloud APIs is now pointing at hardware in my apartment.

I want to give [OpenCode](https://opencode.ai) a serious shoutout here. Their tool was pivotal in validating everything in this article. For $5 the first month ($10/month after), you get a cohesive AI coding harness that lets you test different open models side by side. I ran the same prompts through Qwen3.7 Max, Kimi K2.7 Code, and even Big Pickle to compare against my local Spark results. If you're a developer who wants to get into AI, start with OpenCode. Not Claude, not Codex. OpenCode. You learn so much more because you're exposed to the full range of open models and how they actually behave. Full disclosure: this isn't a sponsorship. I'm not affiliated with OpenCode in any way. I just think their product is genuinely great.

## What's Next

The Spark is live, but the home office isn't done. Three more pieces complete the picture. Here's where things stand today:

[DIAGRAM:current-lab]

And here's what the full build looks like once everything is in place:

[DIAGRAM:future-lab]

**Mini Rack.** A MiniRack8 from [MiniRackHQ.com](https://minirackhq.com) ($1,500). This is a 10" server rack that ships with a Raspberry Pi 5 (8GB RAM, 512GB NVMe, PoE+ Hat), a 12-port patch panel, its own network switch, an LCD touchscreen, a 4-outlet PDU, 10 Cat6 cables, and a toolkit. It goes right next to my existing network rack. The Pi handles lightweight infrastructure services: self-hosted NetBird (replacing Tailscale), monitoring, DNS, and whatever else needs to run 24/7 without burning compute on the Spark or Mac Mini.

**Laptop Rack.** Organizes the three worker machines (Linux laptop, Windows HP Omen, old MacBook Pro) into one clean spot. All three are on the Tailscale mesh, all three can run agent harnesses pointed at the Spark. Right now they're scattered around the office. That changes.

**[ZimaCube](https://zimaspace.com) 2 NAS (~$1,182).** This is the missing storage layer. 8TB usable in RAID 1 (two mirrored WD Red Plus drives), 10GbE networking, Thunderbolt 4, running [ZimaOS](https://zimaspace.com) with Docker and SMB built in. Every machine on the network mounts it as a shared drive. Obsidian vaults, project files, model snapshots, media, backups: all centralized. A rclone container pushes critical files to S3 with a lifecycle rule that tiers them down to Glacier Deep Archive after 30 days. Cloud backup cost: roughly $1 to $3 per month.

Once those three pieces are in place, the home office has every layer covered: network (UniFi), compute (DGX Spark + Mac Mini), storage (ZimaCube), infrastructure automation (Raspberry Pi), mesh connectivity (NetBird), and AI agents (OpenClaw + harnesses on every machine).

Beyond the hardware, here's what I'm working on:

- **Performance tuning.** Context window reduction, flash attention, quantization experiments. Target: 30 tok/s on qwen3:32b. I'll publish the results.
- **Second DGX Spark.** Two Sparks linked via ConnectX-7 DAC cable gives 256GB combined memory. That opens the door to Qwen3-Coder 480B or two concurrent 70B workstreams.
- **Model comparisons.** Running the same prompts against hosted open models and local models side by side. I want to quantify exactly what you gain and lose running locally.
- **More models.** The open model space moves fast. New releases every few weeks. I'll keep pulling, testing, and sharing what actually performs.

## The Honest Answer

Is the DGX Spark worth $5,000? For learning, absolutely. For overnight batch work, probably. For replacing cloud APIs in real-time workflows, not yet. 10 tok/s isn't 50. But "not yet" is a better answer than "I don't know," and that's what running your own hardware gives you.

I plugged it in, ran the models, and measured. The numbers are in this article because I wish someone had published theirs before I bought mine. Real hardware, real limits, real data. That's all I wanted when I started looking into local inference, and it's what I hope this gives you.

The engineers who will thrive in the next five years aren't just the ones who can write code. They're the ones who understand the full stack: the network it runs on, the hardware underneath, and the models on top of it. You don't need to master it all on day one. You just need to start building.

If you've got questions about the setup, want to compare benchmarks, or want to tell me I'm wrong about something, reach out. I'm always happy to talk shop.`,
    tags: ["AI", "Infrastructure", "Home Lab", "DGX Spark", "Local Inference"],
    readTime: "12 min read",
  },
  {
    title: "Writing Code Isn't Enough Anymore: Build Skills That Always Mattered",
    slug: "writing-code-isnt-enough-anymore",
    date: "2026-03-12",
    excerpt:
      "The cost to build software is rapidly approaching zero. The infrastructure needed to maintain it hasn't changed: it's only getting more expensive.",
    content: `"The cost to build software is rapidly approaching zero. The infrastructure needed to maintain it hasn't changed: it's only getting more expensive."

I got into tech at 16 because of my dad: he's a systems engineer. Since then I've been a help desk tech, a Tier I technician, a Tier II technician, a sysadmin, a platform engineer, AWS developer, a software engineer, a lead software engineer, a senior software engineer, and now a staff engineer. I say all that not to gloat, but to say: I've touched every layer of the stack, and the one thing that's stayed true through all of it is there is no software without networking.

Outside of work, I do a lot of prototyping on my own and I've been experimenting with running local models. That's what led me here.

Then I started running AI agents locally on a Mac Mini: OpenClaw, local models, the works. And I realized everything was sitting on the same flat WiFi network as my work laptop, my guests' phones, and my smart TV. That's not a lab. That's a security incident waiting to happen.

So I built a proper segmented network in my apartment. Here's exactly how I did it, step by step, so you can too.

## The Thesis: Why This Matters Now

Local AI is about to change everything. Models are getting smaller, hardware is getting cheaper, and running inference locally is becoming the default for engineers who care about privacy, latency, and cost. But here's what nobody's talking about: the people who will be employed in five years aren't just the ones who can write code: they're the ones who can set up the infrastructure to run it.

Networking has always mattered. But before, as a software engineer, you could abstract it away. Someone else handled the network. Someone else configured the firewall. You just wrote code and shipped it. That's not the case anymore. Deploying and maintaining AI models, running local inference, managing secure environments: these require you to understand networking intimately. It's not a nice-to-have. It's becoming the same kind of fundamental requirement as understanding request/response, or knowing the difference between authentication and authorization. It's just another layer of the stack you need to own.

If you're a software engineer running local models, building side projects, or working remotely, you need to understand how to segment, secure, and manage a network. This isn't optional anymore. It's table stakes.

## What You Need (It's Cheaper Than You Think)

You need three things: a router/gateway, a managed switch, and an access point. That's it.

I use UniFi. You don't have to. TP-Link Omada, Mikrotik: they all work. The concepts are identical. I chose UniFi because the controller software is clean, the ecosystem is cohesive, and it's what MSPs deploy in real offices. The point isn't the brand: it's understanding how the pieces connect.

**My Setup (~$1,200)**

- Gateway: Cloud Gateway Max (1TB) - $349. Router, firewall, IDS/IPS, built-in controller + storage
- Switch: USW-Enterprise-8-PoE - $479. Managed switch, PoE for APs, Layer 3 routing, 802.1X
- Primary AP: U7 Pro - $189. WiFi 7, scanning radio for RF planning
- Secondary AP: U7 Lite - $99. Extended coverage (added later: not needed day one)
- Cables + Mount: GEARit Cat6 + 3M Command Strips - $80. Color-coded cables, renter-friendly AP mounting

**Budget Alternative (~$360)**

- Gateway: Cloud Gateway Ultra ~$130
- Switch: USW Lite 8 PoE ~$110
- AP: U7 Lite ~$99
- Cables: Cat6 5-pack from Amazon ~$20

Same VLAN segmentation. Same firewall rules. Same network isolation. You just get fewer ports and one AP instead of two. For a one-bedroom apartment, that's plenty.

## The Plan: Three VLANs, Matrix Style

I set up three completely isolated networks. And because life's too short for boring SSID names, I went with a Matrix theme.

- **Tank (VLAN 10): Career/Work.** Subnet: 10.10.10.0/24. WiFi enabled, SSID broadcast. Use: Work laptop, career stuff.
- **Zion (VLAN 20): Personal/Guest.** Subnet: 10.10.20.0/24. WiFi enabled, SSID broadcast. Use: Phones, guests, personal devices.
- **Sentinel (VLAN 30): AI Lab.** Subnet: 10.10.30.0/24. No WiFi, wired only, zero WiFi exposure. Use: Mac Mini running OpenClaw, hardwired only.

Why 10.x.x.x instead of 192.168.x.x? Because 192.168.1.0/24 is the default on every consumer router on the planet. Using 10.x.x.x avoids VPN conflicts and is what you'll see in enterprise environments. The VLAN ID in the third octet (VLAN 10 = 10.10.10.0) means you can look at any IP and instantly know which network it belongs to.

Why no WiFi for Sentinel? Because the Mac Mini doesn't need it. It's plugged directly into the switch via ethernet on a dedicated port tagged to VLAN 30. No wireless signal means no wireless attack surface. The only way onto that VLAN is to physically plug into that specific switch port. That's how you isolate sensitive workloads.

## The Build: Step by Step (UniFi Specific)

**Step 1: Cable Everything**

Modem into the gateway's WAN port. Gateway LAN port to the switch. Mac Mini into its own dedicated switch port. APs into PoE ports on the switch (the switch powers them through the ethernet cable: no separate power adapter needed). That's the full topology.

[DIAGRAM:network-topology]

**Step 2: Adopt Devices**

Open unifi.ui.com or the UniFi app. Each device will appear as "pending adoption." Adopt the gateway first, then the switch, then the APs. Let firmware updates finish: the switch took about 15 minutes on first boot. Don't unplug anything while it's updating.

**Step 3: Create Your VLANs**

In the UniFi controller: Settings > Networks > New Virtual Network

For each VLAN:

Tank (Career/Work): Network Name: Tank, Auto-Scale Network: Unchecked, Host Address: 10.10.10.1, Netmask: /24, VLAN ID: 10, Allow Internet Access: Yes

Zion (Personal/Guest): Network Name: Zion, Host Address: 10.10.20.1, Netmask: /24, VLAN ID: 20, Isolate Network: Yes (auto-creates rules preventing guest devices from reaching other VLANs), Allow Internet Access: Yes

Sentinel (AI Lab): Network Name: Sentinel, Host Address: 10.10.30.1, Netmask: /24, VLAN ID: 30, Isolate Network: No, Allow Internet Access: Yes (Mac Mini needs internet for pulling models and updates)

**Step 4: Create WiFi Networks**

Settings > WiFi > Create New

Create two SSIDs (not three: Sentinel is wired only):

- SSID "Tank" > Map to network: Tank > Set a strong password
- SSID "Zion" > Map to network: Zion > Set a strong password

**Step 5: Assign the Mac Mini's Switch Port**

This is the critical step that locks the Mac Mini onto its isolated VLAN.

Go to Devices > USW Enterprise 8 PoE > Port Manager. Find the port your Mac Mini is plugged into. Change the Native VLAN to Sentinel. Set Tagged VLAN Management to Block All. Apply.

The Mac Mini will grab a new IP from the 10.10.30.x range. It's now physically and logically isolated from Tank and Zion.

**Step 6: Firewall Rules: "You Shall Not Pass"**

This is where segmentation becomes real. Without firewall rules, VLANs can still talk to each other through the gateway. You need to explicitly block that.

Go to Settings > Firewall & Security > Firewall Rules and create two rules. That's it. Two.

Rule 1: "Block Inter-VLAN (you shall not pass)". Action: Block, Type: Local, Source: All Devices, Destination: All 4 Networks (Default, Tank, Zion, Sentinel), Schedule: Always.

This is the hammer. It blocks all inter-VLAN traffic. Tank can't talk to Zion. Zion can't talk to Sentinel. Sentinel can't talk to Tank. Done.

Rule 2: "Allow Default to All VLANs (phone home)". Action: Allow, Type: Local, Source: Default (VLAN 0), Destination: 3 Networks (Tank, Zion, Sentinel), Schedule: Always.

This is the exception. The Default network is your management network: it's how your UniFi devices communicate with the controller. Without this rule, your gateway can't manage your switch and APs. So you allow Default to reach all three VLANs, but the three VLANs still can't reach each other.

That's the entire firewall config. Two rules. Clean, simple, and if you're scrolling through your config at 2am, "you shall not pass" is going to make you smile.

[DIAGRAM:block-inter-vlan]

[DIAGRAM:allow-default-to-all]

**Step 7: Kill the Modem WiFi**

Log into your modem's admin page (usually 192.168.1.1: check the sticker on the modem). Disable the built-in WiFi radio. If your ISP supports it, enable bridge mode or IP passthrough so the modem just passes the internet connection to your gateway. This ensures the Cloud Gateway Max handles all routing, DHCP, and firewall duties: exactly how an office deployment works.

For AT&T modems, look for "IP Passthrough" in the firewall settings. Set it to passthrough mode with DHCPS-fixed and select your Cloud Gateway Max's MAC address.

**Step 8: Verify Your Isolation (The Fun Part)**

This is the step most tutorials skip. Don't skip it. Open your terminal and prove your segmentation works.

Test 1: Connect your laptop to the Tank WiFi network, then try to ping a device on Zion.

\`\`\`bash
# From your laptop on Tank (10.10.10.x):
ping 10.10.20.1
# Expected output:
# Request timeout for icmp_seq 0
# Request timeout for icmp_seq 1
# Request timeout for icmp_seq 2
# 3 packets transmitted, 0 packets received, 100.0% packet loss
\`\`\`

100% packet loss. That's what you want to see. Tank can't reach Zion.

Test 2: From your laptop on Tank, try to ping the Mac Mini on Sentinel.

\`\`\`bash
# From your laptop on Tank (10.10.10.x):
ping 10.10.30.1
# Expected: 100% packet loss
\`\`\`

Test 3: From a phone on Zion, try to access the gateway admin panel. Open a browser on a device connected to the Zion WiFi. Navigate to https://10.10.20.1. It should time out. Your guests can't touch your router config.

Test 4: From the Mac Mini on Sentinel, verify internet works.

\`\`\`bash
# From the Mac Mini (10.10.30.x):
ping 8.8.8.8
# Expected: replies from Google DNS: internet works
# Then try:
ping 10.10.10.1
# Expected: 100% packet loss: can't reach the work network
\`\`\`

If all four tests pass, congratulations. You have a production-grade segmented network running in your apartment.

## Why I Hardwired the AI Lab

When you run AI agents locally (OpenClaw, Ollama, local LLMs), those processes are making outbound API calls, downloading model weights, processing data, and listening on open ports. On a flat WiFi network:

- Anyone on the same WiFi can see it. ARP scanning, port scanning: trivially easy.
- Your work traffic shares the same broadcast domain. That's a compliance problem.
- WiFi is inherently less secure than ethernet. Wireless signals can be intercepted. Ethernet requires physical access.

By hardwiring the Mac Mini on an isolated VLAN with no WiFi SSID, the attack surface is effectively zero for remote attackers. This is the same principle used in data centers: sensitive workloads go on isolated segments with strict access controls. I'm just applying it to my apartment.

## My Background (Why I Care About This)

My dad deploys these systems professionally: he's the one who told me to go modular instead of buying an all-in-one router. That advice alone made this project ten times more educational.

With AI adoption accelerating and local models becoming the norm, the gap is clear: engineers who can write code are everywhere. Engineers who can write code and set up the infrastructure to run it securely? That's a much smaller group. That's where the value is.

## What's Next (Maybe)

The network is live and segmented, but there's more to build:

- WireGuard VPN: secure remote access to my home network from anywhere
- IDS/IPS deep dive: what the Cloud Gateway Max actually catches and how to read the logs
- DNS filtering: content-level security policies per VLAN

Thank you for taking the time to read this. If you've got questions about the setup or want to compare notes on your own lab, drop a comment.`,
    mediumUrl: "https://medium.com/@jaruejohnson",
    tags: ["Networking", "Infrastructure", "AI", "Home Lab"],
    readTime: "9 min read",
  },
  {
    title: "8 Days with Ruby on Rails: A TypeScript Dev's Crash Course",
    slug: "8-days-with-ruby-on-rails",
    date: "2026-01-31",
    excerpt:
      "I've been writing TypeScript for about 5 years. Recently accepted a role where Rails is the primary stack. What better way to learn than to build an LMS yourself?",
    content: `I've been writing TypeScript for about 5 years. React, Next.js, Node, NestJS, the whole ecosystem. Recently accepted a role at an LMS company where Ruby on Rails is the primary stack.

My background is full-stack, but Rails wasn't part of my day-to-day. I wanted to get ahead of the learning curve before starting, and what better way to understand an LMS than to build one yourself?

So I did. Eight days later, I deployed Decypher, a gamified personal development platform with AI integration, habit tracking, and a progression system.

Here's what I learned.

## Day 1-2: Convention Over Configuration

Coming from TypeScript where you configure everything explicitly, Rails works differently.

The mental shift: Your database columns automatically become model attributes. No decorators, no explicit mappings. If your missions table has a title column, @mission.title just works.

\`\`\`ruby
class Mission < ApplicationRecord
  # That's it. title, description, status, all accessible
  # No attr_accessor, no type definitions
end
\`\`\`

Compare that to TypeORM or Prisma where you're writing schemas, decorators, and type definitions. Rails trades explicit control for speed.

The routing was intuitive. One line generates seven RESTful routes:

\`\`\`ruby
resources :missions
# GET /missions, POST /missions, GET /missions/:id, etc.
\`\`\`

I kept a cheat sheet mapping the flow: URL > Route > Controller > Model > View. Once that clicked, everything else fell into place.

## Day 3: ERB Is Just JSX Without the Build Step

If you know React, ERB templates feel familiar. The biggest adjustment? Partials (Rails components) are named with underscores (_mission_card.html.erb), but you reference them without the underscore (render "mission_card"). Caught me a few times.

Form helpers were a pleasant surprise. Rails generates CSRF tokens automatically, no manual protection needed:

\`\`\`erb
<%= form_with model: @mission do |f| %>
  <%= f.text_field :title %>
  <%= f.submit "Save" %>
<% end %>
\`\`\`

## Day 4: The Model Layer

Coming from the "services everywhere" pattern in Node/NestJS, Rails' "fat model, thin controller" approach is a different philosophy.

Associations are declarative and powerful:

\`\`\`ruby
class Mission < ApplicationRecord
  belongs_to :user
  belongs_to :domain
  has_many :objectives, dependent: :destroy
end
\`\`\`

That dependent: :destroy means deleting a mission automatically cleans up its objectives. No orphaned records, no manual cascade logic.

The bang (!) convention was new to me: update returns false on failure, update! raises an exception. This lets you write cleaner conditional logic:

\`\`\`ruby
if @mission.commence!
  redirect_to @mission
else
  render :show, alert: "Failed to start"
end
\`\`\`

## Modules vs Classes: The Mental Model That Clicked

This one tripped me up. In TypeScript, I'm used to thinking of shared code as packages in a monorepo, @shared/utils that gets imported wherever needed.

Rails has modules for that. But here's the key difference: classes can be instantiated, hold state, and create objects. Modules cannot be instantiated, hold no state, and exist to share behavior as mixins.

Modules are like your packages/shared/ folder. You include them in classes that need that behavior:

\`\`\`ruby
module MissionsHelper
  def status_color(status)
    case status
    when "active" then "bg-blue-400"
    when "completed" then "bg-emerald-400"
    end
  end
end
\`\`\`

Then any controller or view can use status_color(). No imports, no setup, Rails auto-loads helpers into views.

Once I mapped "module = shared package" in my head, the architecture made way more sense.

## Day 5: Hotwire Changed How I Think About Interactivity

I went in expecting to bolt on a React frontend. Instead, I discovered Hotwire (Turbo + Stimulus), which is Rails' approach to interactivity.

The mental model is different. In React, you're managing state client-side and the UI reacts to changes. With Turbo Streams, the server sends back HTML fragments and you target specific DOM elements by ID to update them.

\`\`\`ruby
# Controller
respond_to do |format|
  format.turbo_stream
end
\`\`\`

\`\`\`erb
<%= turbo_stream.replace "mission_header" do %>
  <%= render "mission_header", mission: @mission %>
<% end %>
\`\`\`

Click an objective complete? The server responds with the updated HTML and Turbo swaps out just that element. No fetch calls, no client-side state management.

Stimulus controllers handle the JavaScript I did need: sidebar toggles, confirmation modals, loading states. About 150 lines of JS total for the entire app.

It's a different pattern. You're way more dependent on the server to give you hydrated data instead of doing that work client-side. Not better or worse, just different. It's going to take some getting used to, but I can see how it simplifies certain types of apps.

## Day 6: Service Objects for AI Integration

When I integrated the Anthropic API for "The Operator" (the app's AI assistant), I extracted the logic into service objects, a pattern that felt familiar from NestJS:

\`\`\`ruby
# app/services/operator/domain_setup.rb
module Operator
  class DomainSetup < Base
    def generate_plan(user, domain, goals_input)
      response = call_api(system_prompt, user_prompt)
      parse_json_response(response)
    end
  end
end
\`\`\`

The service handles API calls, JSON parsing, and error handling. The controller stays thin, just coordination:

\`\`\`ruby
def generate
  result = Operator::DomainSetup.new.generate_plan(@user, @domain, params[:goals])
  # Handle result
end
\`\`\`

## Day 7: Deployment

Rails 8 ships with Solid Queue (background jobs) and Solid Cable (WebSockets) built in. No Redis required for basic deployments.

Docker multi-stage builds kept the image lean. GitHub Actions handled CI (RuboCop, Brakeman security scans, bundle-audit).

Total time from "works locally" to "live at decypher.life": about 4 hours.

## Day 8: Polish and Surprises

Stuff I didn't expect:

- Chart.js just works via importmap. No npm, no bundler. One line in importmap.rb and it's available everywhere.
- Tailwind v4 integration is seamless. bin/dev runs the CSS watcher alongside the Rails server.
- The generators save hours. rails generate model Mission title:string status:string creates the model, migration, and test files.
- Database commands are intuitive. rails db:reset drops, creates, migrates, and seeds. One command to rebuild everything.

What I'd do differently:

- Use scaffolds earlier for standard CRUD, then customize
- Set up RuboCop from day one. I had 300+ linting offenses to fix at the end. Not fun.
- Lean into Turbo Streams more. Wrote some JavaScript I didn't need.

## The Final Stats

- Days to MVP: 8
- Models: 16
- Controllers: 12
- View templates: 51
- Lines of custom JS: ~150
- Linting errors fixed last minute: 300+
- External JS frameworks: 0

## Would I Use Rails Again?

I'm about to use it every day, so yeah.

After 8 days, I can see why people have strong opinions about Rails in both directions. The conventions speed things up when you follow them. The "magic" can be frustrating when you don't understand what's happening.

Ruby itself feels different coming from TypeScript. No explicit types, symbols everywhere, blocks instead of arrow functions. It's an adjustment.

The patterns do transfer though. Fat models, thin controllers, service objects for complex logic. These ideas aren't Rails-specific. Working through this made me think differently about how I structure Node apps too.

Building an LMS to prep for a job at an LMS company was probably overkill. But I learned more in 8 days of building than I would've in weeks of tutorials.

Decypher is live at decypher.life if you want to check it out.`,
    mediumUrl: "https://medium.com/@jaruejohnson",
    tags: ["Ruby on Rails", "TypeScript", "Web Development", "Learning"],
    readTime: "12 min read",
  },
  {
    title: "Why I'm Learning Go in 2026",
    slug: "why-im-learning-go-in-2026",
    date: "2026-03-15",
    excerpt:
      "After years of TypeScript and a detour through Rails, I'm picking up Go. Here's why it's the right move for where I'm headed.",
    content: `After years of TypeScript and a recent deep dive into Ruby on Rails, I'm adding Go to my toolkit. This isn't about chasing trends. It's about aligning my skills with the kind of systems I want to build.

## The Why

TypeScript is great for web applications. Rails is great for rapid prototyping. But when I look at the infrastructure and platform-level work I'm gravitating toward (CLI tools, distributed systems, high-performance APIs), Go keeps showing up.

The language is intentionally simple. The concurrency model is built-in. The binaries are small and fast. And the ecosystem around DevOps and cloud-native tooling is dominated by Go: Docker, Kubernetes, Terraform, Prometheus. If you're building infrastructure tools, Go is the lingua franca.

## Learning by Building: Cerebro

I didn't learn Go from tutorials. I built a real tool called **Cerebro**: a CLI that wraps the Datadog API for fast incident diagnosis. Instead of clicking through dashboards in a browser, you type a command and get a color-coded health check across all your services. That project taught me more about Go in a few weeks than months of reading docs would have.

Here's what I picked up along the way.

## Package Main and the Entry Point

Every Go program starts with \`package main\` and a \`main()\` function. That's it. No framework, no bootstrap file, no dependency injection container. Compare that to a NestJS app where you need a module, a bootstrap function, and a decorator-heavy setup.

\`\`\`go
package main

import "github.com/EDU-20/cerebro/cmd"

func main() {
    cmd.Execute()
}
\`\`\`

Three lines. The entire application entry point. The \`cmd\` package handles everything else. This is one of Go's core principles: simplicity at the top level, complexity pushed down into packages.

## Structs Instead of Classes

Go doesn't have classes. It has structs. If you're coming from TypeScript or Java, this feels limiting at first. But structs with methods give you everything you need without inheritance hierarchies.

\`\`\`go
type Client struct {
    Ctx       context.Context
    APIClient *datadog.APIClient
    Config    *config.Config
}

func NewClient(cfg *config.Config) (*Client, error) {
    if cfg.APIKey == "" {
        return nil, fmt.Errorf("DD_API_KEY is required")
    }

    ctx := context.WithValue(context.Background(),
        datadog.ContextAPIKeys, map[string]datadog.APIKey{
            "apiKeyAuth": {Key: cfg.APIKey},
            "appKeyAuth": {Key: cfg.AppKey},
        })

    configuration := datadog.NewConfiguration()
    apiClient := datadog.NewAPIClient(configuration)

    return &Client{
        Ctx:       ctx,
        APIClient: apiClient,
        Config:    cfg,
    }, nil
}
\`\`\`

No \`class\`, no \`constructor\`, no \`this\`. You define a struct, then write a \`NewXxx\` function that returns a pointer to it. That's the constructor pattern in Go. Validation happens before construction: if the API key is missing, you get an error back immediately.

## Custom Types and Enums with iota

Go doesn't have enums the way TypeScript does. Instead, you create a custom type and use \`iota\` to auto-increment constants. Then you attach a \`String()\` method so the type can describe itself.

\`\`\`go
type ServiceStatus int

const (
    StatusGreen  ServiceStatus = iota  // 0
    StatusYellow                        // 1
    StatusRed                           // 2
)

func (s ServiceStatus) String() string {
    switch s {
    case StatusGreen:
        return "GREEN"
    case StatusYellow:
        return "YELLOW"
    case StatusRed:
        return "RED"
    default:
        return "UNKNOWN"
    }
}
\`\`\`

In Cerebro, this powers the health check output. Each service gets evaluated against thresholds, and the status drives the terminal color: green, yellow, or red.

## Error Handling: Verbose, but Honest

This is the one that trips up every developer coming from try/catch languages. Go doesn't have exceptions. Every function that can fail returns an error as its last return value, and you check it immediately.

\`\`\`go
func Load() (*Config, error) {
    home, err := os.UserHomeDir()
    if err != nil {
        return nil, fmt.Errorf("finding home directory: %w", err)
    }

    viper.SetConfigName(".cerebro")
    viper.SetConfigType("yaml")
    viper.AddConfigPath(home)

    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return nil, fmt.Errorf("reading config: %w", err)
        }
    }

    var cfg Config
    if err := viper.Unmarshal(&cfg); err != nil {
        return nil, fmt.Errorf("parsing config: %w", err)
    }

    return &cfg, nil
}
\`\`\`

The \`%w\` verb wraps the original error with context so you get error chains like "reading config: file is corrupt." The type assertion (\`err.(viper.ConfigFileNotFoundError)\`) lets you check for specific error types and handle them differently. A missing config file is fine (use defaults). A corrupt config file is not.

Yes, it's verbose. But after working with it, I started to appreciate how explicit it is. Every failure path is visible. There's no hidden exception that bubbles up three layers and crashes your program at 2am.

## Goroutines and Concurrency

This is where Go really shines. Concurrency is a first-class citizen, not a library you bolt on. When Cerebro checks the health of all services, it fans out the requests in parallel using goroutines and a WaitGroup.

\`\`\`go
results := make([]result, len(svcNames))
var wg sync.WaitGroup

for i, name := range svcNames {
    wg.Add(1)
    go func(idx int, svcName string) {
        defer wg.Done()
        svc, err := services.GetService(cfg, svcName)
        if err != nil {
            results[idx] = result{name: svcName, err: err}
            return
        }
        // ... query metrics, evaluate thresholds
        overall := services.OverallStatus(metricStatuses)
        results[idx] = result{name: svcName, status: overall}
    }(i, name)
}

wg.Wait()
\`\`\`

Each goroutine writes to its own index in the results slice, so no mutex is needed. But when multiple goroutines append to a shared slice, you need a mutex to prevent race conditions:

\`\`\`go
var mu sync.Mutex
var wg sync.WaitGroup

for metricName, metric := range svc.Metrics {
    wg.Add(1)
    go func(mName string, m config.Metric) {
        defer wg.Done()
        ms := services.EvaluateMetric(mName, m, res)
        mu.Lock()
        metricStatuses = append(metricStatuses, ms)
        mu.Unlock()
    }(metricName, metric)
}

wg.Wait()
\`\`\`

In TypeScript, you'd use \`Promise.all()\` for parallel execution. In Go, you spawn goroutines with \`go\`, wait with \`sync.WaitGroup\`, and protect shared state with \`sync.Mutex\`. The patterns map to each other conceptually, but Go gives you lower-level control.

## The internal/ Convention

Go has a built-in access control mechanism that I wish TypeScript had. Any package under an \`internal/\` directory cannot be imported by code outside your module. In Cerebro, the structure looks like:

\`\`\`
cerebro/
  main.go
  cmd/
    root.go
    status.go
    metrics.go
    alerts.go
    logs.go
  internal/
    config/config.go
    datadog/client.go
    datadog/metrics.go
    datadog/monitors.go
    datadog/logs.go
    output/formatter.go
    services/registry.go
\`\`\`

Everything under \`internal/\` is private to the module. The \`cmd\` package orchestrates, the \`internal\` packages do the actual work. This is enforced by the Go compiler, not by convention or a linter rule. If someone tries to import \`internal/datadog\` from outside the module, it won't compile.

## CLI Tooling with Cobra

Building CLI tools is where Go feels most natural. The Cobra framework (used by kubectl, Hugo, and GitHub CLI) gives you subcommands, flags, and help text generation.

\`\`\`go
var rootCmd = &cobra.Command{
    Use:   "cerebro",
    Short: "Datadog CLI for rapid incident diagnosis",
}

func Execute() {
    if err := rootCmd.Execute(); err != nil {
        fmt.Fprintln(os.Stderr, err)
        os.Exit(1)
    }
}

func init() {
    rootCmd.PersistentFlags().StringVarP(&flagEnv, "env", "e", "", "environment")
    rootCmd.PersistentFlags().StringVarP(&flagFormat, "format", "f", "table", "output format")
}
\`\`\`

The \`init()\` function is a Go-specific concept: it runs automatically when the package is loaded. No explicit registration needed. And \`PersistentFlags\` means those flags are inherited by every subcommand. So \`cerebro status --env prod\` and \`cerebro alerts --env staging\` both work without duplicating flag definitions.

## HTTP Without a Framework

Go's standard library includes a production-ready HTTP server. No Express, no Fastify, no framework required.

\`\`\`go
package main

import (
    "encoding/json"
    "net/http"
)

type HealthResponse struct {
    Status  string \`json:"status"\`
    Version string \`json:"version"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    resp := HealthResponse{Status: "ok", Version: "1.0.0"}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/health", healthHandler)
    http.ListenAndServe(":8080", nil)
}
\`\`\`

That's a complete HTTP server with JSON responses. No dependencies. The struct tags (\`json:"status"\`) control serialization, similar to decorators in NestJS but built into the language.

## What I'd Tell a TypeScript Developer Starting Go

- **Stop looking for the framework.** Go's standard library covers HTTP, JSON, testing, and concurrency. You don't need an Express equivalent.
- **Embrace the verbosity.** The \`if err != nil\` pattern feels repetitive, but it makes every failure explicit. After a few weeks, you stop fighting it.
- **Think in packages, not classes.** Go organizes code by package, not by class hierarchy. Group by responsibility, not by type.
- **Start with a CLI tool.** Go compiles to a single binary with zero dependencies. No node_modules, no runtime. Build a small CLI tool and experience the deployment story firsthand.
- **Concurrency is not parallelism.** Goroutines are lightweight, but shared state still needs protection. Learn WaitGroup and Mutex before reaching for channels.

## What's Next

Go is becoming a permanent part of my toolkit alongside TypeScript. For web applications and frontends, TypeScript is still my first choice. For CLI tools, infrastructure automation, and high-performance backend services, Go is the better fit.

I'll be writing more about specific patterns as I go deeper. The goal is to build production-quality tools, not just toy projects. Cerebro was the first one. More to come.`,
    tags: ["Go", "CLI Tools", "Backend Development", "Systems Programming"],
    readTime: "10 min read",
  },
  {
    title: "Building for Mobile Without Losing Your Mind",
    slug: "building-for-mobile-without-losing-your-mind",
    date: "2026-04-01",
    excerpt:
      "Observations on navigating the mobile development landscape as a web-first engineer, and why React Native earned its spot in my stack.",
    content: `As a web-first engineer, mobile development always felt like a different world. Native iOS and Android development have their own languages, paradigms, build systems, and deployment pipelines. For years, I avoided it.

Then I started building products that needed to be on phones. Real products, not just responsive websites.

## The Cross-Platform Question

The first decision is always: native or cross-platform? After evaluating the options (Swift/Kotlin, Flutter, React Native), I landed on React Native. Not because it's perfect, but because the tradeoffs made sense for my situation:

- I already think in React. The mental model transfers directly.
- The ecosystem is mature enough that most common problems have solutions.
- Hot reloading and Expo make the development cycle fast.
- One codebase for iOS and Android means I can actually ship to both platforms.

## Getting Started: It Feels Like React (Until It Doesn't)

If you know React, your first React Native component will feel familiar:

\`\`\`tsx
import { View, Text, StyleSheet } from "react-native"

export default function WelcomeCard({ name }: { name: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome, {name}</Text>
      <Text style={styles.subtitle}>Let's build something.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#8892b0",
    marginTop: 8,
  },
})
\`\`\`

No \`div\`, no \`p\`, no CSS files. \`View\` replaces \`div\`, \`Text\` replaces \`p\` and \`span\`, and \`StyleSheet.create\` replaces your stylesheet. The properties look like CSS but use camelCase and accept only a subset of what the web supports. That's the first adjustment: you can't just copy your Tailwind classes over.

## Navigation: The Biggest Mental Shift

On the web, routing is URL-based. You navigate to \`/dashboard\` and a component renders. In React Native, navigation is stack-based. Screens push onto a stack, and you pop back. It's closer to how native iOS and Android apps work.

\`\`\`tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
\`\`\`

Then inside any screen, you navigate by name, not by URL:

\`\`\`tsx
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Profile", { userId: "123" })}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </Pressable>
    </View>
  )
}
\`\`\`

No \`<Link href="/profile/123">\`. You call \`navigation.navigate()\` with the screen name and params. Getting used to stacks, tabs, and drawers takes time, but once it clicks, the pattern is clean.

## Platform-Specific Code

Even with cross-platform code, iOS and Android behave differently in places. React Native gives you a clean way to handle this:

\`\`\`tsx
import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 44 : 24,
    backgroundColor: Platform.select({
      ios: "#1a1a2e",
      android: "#0f0f23",
    }),
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
})
\`\`\`

iOS uses shadow properties. Android uses elevation. Status bar heights differ. Keyboard behavior differs. These are small things individually, but they accumulate. Having \`Platform.select()\` built into the framework makes it manageable.

## Lists and Performance

On the web, you render a list with \`.map()\` and call it a day. In mobile, long lists need virtualization out of the box because you're working with constrained memory and smaller screens.

\`\`\`tsx
import { FlatList, View, Text } from "react-native"

interface Project {
  id: string
  title: string
  status: string
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text style={styles.empty}>No projects yet.</Text>
      }
    />
  )
}
\`\`\`

\`FlatList\` only renders what's visible on screen. It handles scroll performance, recycling views, and memory management. On the web, you'd need to bring in react-window or react-virtualized. Here, it's a core component.

## Expo: The Build System That Makes It Possible

Expo is what makes React Native approachable for a web developer. Without it, you're managing Xcode, Android Studio, Gradle configs, and CocoaPods. With Expo, the development loop looks like:

\`\`\`bash
# Start the dev server
npx expo start

# Build for both platforms
eas build --platform all

# Deploy an over-the-air update (no app store review)
eas update --branch production
\`\`\`

The over-the-air updates via EAS are a game changer. You push a JS bundle update and users get it without downloading a new version from the App Store. For bug fixes and small changes, you skip the review process entirely.

## What Surprised Me

- **Navigation is its own beast.** React Navigation works, but the mental model is different from web routing. Stacks, tabs, drawers. It takes time to internalize.
- **Platform differences are real.** Even with cross-platform code, you'll hit moments where iOS and Android behave differently. Keyboard handling, status bars, gestures. The details matter.
- **Performance is good enough.** For the majority of applications, React Native performance is not the bottleneck. Your architecture decisions matter more than the framework choice.
- **Debugging is different.** React DevTools work, but you'll also use Flipper, platform-specific logs, and occasionally Xcode's console. The tooling ecosystem is more fragmented than the web.

## My Approach

I'm not trying to become a mobile specialist. I'm building a toolkit that lets me ship to mobile when the product requires it. That means:

- Keeping shared business logic in TypeScript packages
- Using Expo for build and deployment tooling
- Leaning on well-maintained community libraries instead of building from scratch
- Writing platform-specific code only when the default behavior isn't right

## The Takeaway

Mobile development doesn't have to be a separate career path. With the right tools and the right expectations, a web engineer can build quality mobile experiences. The key is being honest about what you know, what you don't, and where the framework can carry you.

If you're a React developer considering mobile, start with Expo and build something small. The gap between web and mobile is smaller than it's ever been.`,
    tags: ["React Native", "Mobile Development", "Cross-Platform", "Expo"],
    readTime: "8 min read",
  },
]
