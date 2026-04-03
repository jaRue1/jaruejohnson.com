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

If anyone finds this useful, then all of this work was worth it. Thank you for taking the time out of your day to read this, I really appreciate it.

If you've got questions about the setup or want to compare notes on your own lab, drop a comment.`,
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
