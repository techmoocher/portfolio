export const projectsData = {
    "homelab": {
        title: "Homelab",
        overview: "A self-hosted cloud infrastructure hosting services for my family.",
        description: "Initially, inspired by my father's sticker shock and my passion for tinkering, I set up the homelab to help my family save money from cloud service subscriptions and to explore deeper the tech world. The server is mainly made up of containerized services running on energy-efficient hardware. Moreover, I created scripts to automate system maintenance (e.g, updates, health check). Currently, I'm integrating AI agents to streamline system administration using n8n.",
        liveUrl: "https://www.youtube.com/watch?v=UzMPf7gWfvw",
        githubUrl: "https://github.com/techmoocher/homelab",
        images: [
            { src: "assets/images/projects/homelab/homelab.jpg", alt: "My homelab setup" },
            { src: "assets/images/projects/homelab/glance-dashboard.png", alt: "Glance Dashboard for basic system monitor"}
        ],
        features: [
            "Proxmox VE orchestrates virtual machines and lightweight containers.",
            "Cloudflare Tunnel provides secure remote access without exposing ports.",
            "Nextcloud handles family document sharing.",
            "Navidrome streams music to devices inside and outside the home (data is fetched from a container running FileBrowser).",
            "Adguard Home blocks ads and trackers network-wide.",
            "Vaultwarden keeps credentials safe and accessible.",
            "Jellyfin serves as a media server for movies and TV shows.",
            "Grafana and Prometheus dashboards track uptime, resource usage, and backup health.",
            "Automated system maintenance with custom scripts and cron jobs.",
            "n8n workflows to integrate AI agents for system administration tasks."
        ],
        challenges: [
            {
                title: "Continuous uptime increases risk of hardware failure and electricity bill",
                challenge: "Running 24/7 services on single-board computers and old laptop risked thermal throttling and drive failures.",
                solution: [
                    "Implemented <b>health checks</b>, <b>smartctl monitoring</b>, and <b>alerts for critical warnings and errors</b>. (log and alerts are sent to a Slack channel)",
                    "Scheduled <b>regular downtimes and reboots</b>.",
                    "Implemented <b>Wake-on-LAN to remotely power on devices</b> at desired time, or after downtimes or power outages.",
                ]
            },
            {
                title: "Private access without exposing ports",
                challenge: "Residential internet lacks static IPs and makes port forwarding unreliable.",
                solution: [
                    "Tunneled ingress through Cloudflare and automated dynamic DNS updates, keeping everything reachable without opening raw ports.",
                ]
            }
        ],
        impacts: [
            "Hosting 14 services (and still counting) for daily use and learning purpose, saved my family over $300 monthly.",
            "Providing intuitive, ready-to-use file storage, photo backup, media streaming, and password manager.",
            "Provided a safe sandbox for experimenting with networking, virtualization, and DevOps tooling."
        ],
        techStack: ["Proxmox", "Docker", "Cloudflare Tunnel", "Grafana", "Prometheus", "Python", "Bash", "Torrent"]
    },

    "Karu-the-Fox": {
        title: "Karu the Fox",
        overview: "An interactive desktop companion that brings micro-breaks into long and hardworking days.",
        description: "The project focuses on playful animations and lightweight interactions so classmates can keep a friendly, unobtrusive pet on their screens. I refined sprite timing and mood logic so the character feels responsive without stealing attention.",
        liveUrl: "https://www.youtube.com/watch?v=LDVFWf0XFPM",
        githubUrl: "https://github.com/techmoocher/Karu-the-Fox",
        images: [
            { src: "assets/images/projects/Karu-the-Fox/techmoocher.png", alt: "Karu the Fox mascot" },
            { src: "assets/images/projects/Karu-the-Fox/preview-1.png", alt: "Karu the Fox demo (1)" },
            { src: "assets/images/projects/Karu-the-Fox/preview-2.png", alt: "Karu the Fox demo (2)" },
        ],
        features: [
            "Animation engine with idle, sleep, surprise, and celebration states.",
            "Customizable hotkeys to feed, move, or calm the companion from anywhere on the desktop.",
            "Mood tracker that nudges users to stretch or hydrate after long focus streaks."
        ],
        challenges: [
            {
                title: "Smooth animation without burning CPU",
                challenge: "Early prototypes relied on dense interval timers that spiked CPU usage during long running sessions.",
                solution: "Rebuilt the loop with requestAnimationFrame-style timing utilities so frames align with the display refresh and idle gracefully."
            },
            {
                title: "Keeping the pet out of the way",
                challenge: "Users wanted a visible companion but not one that blocked UI components or grabbed focus unexpectedly.",
                solution: "Added smart positioning rules, transparency controls, and pointer-through regions that keep clicks on the underlying window."
            }
        ],
        impacts: [
            "Gave friends an easy way to lighten intense study sessions with playful feedback.",
            "Sparked design discussions about balancing delight and productivity in desktop tools.",
            "Showcased polish in presentation demos thanks to the character driven UI."
        ],
        techStack: ["Python", "PyQt6", "Gemini API"]
    },

    "will-you-date-me": {
        title: "Will you date me?",
        overview: "Interactive microsite that playfully invited my crush on a date while teaching me front-end fundamentals.",
        description: "This was my first HTML/CSS/JS build, so I leaned into fun animations and charming copy. The page guides visitors through a series of prompts, gradually revealing the invite with delightful micro-interactions.",
        liveUrl: "https://for-her.techmoocher.com/will-you-date-me",
        githubUrl: "https://github.com/techmoocher/will-you-date-me",
        images: [
            { src: "assets/images/projects/will-you-date-me/ask-her-out.PNG", alt: "Will you date me landing page screenshot" }
        ],
        features: [
            "Responsive layout that adapts the invitation experience from phones to desktops.",
            "Playful button animations that encourage the user to say yes (and make it hard to say no).",
            "Custom illustration and typography inspired by handwritten notes."
        ],
        challenges: [
            {
                title: "Making the experience feel personal",
                challenge: "Static text felt cold and generic for something as personal as an invitation.",
                solution: "Scripted branching copy, emoji, and subtle CSS animations so every interaction feels handcrafted."
            },
            {
                title: "Keeping the UI responsive for the big reveal",
                challenge: "My first attempts used fixed positioning that broke on small screens.",
                solution: "Refactored to flexbox and relative units, then tested across devices until the layout held up."
            }
        ],
        impacts: [
            "Successfully asked someone out and captured the story in code.",
            "Kick-started my love for front-end development with immediate feedback.",
            "Motivated friends to learn the basics of HTML/CSS to build their own fun projects."
        ],
        techStack: ["HTML", "CSS", "JavaScript", "EmailJS"]
    },

    "chuoi-man-coi": {
        title: "Chuoi Man Coi",
        overview: "Interactive rosary web app that guides students through each mystery with visuals, audio, and progress cues.",
        description: "Built for my Binh Hung church students, the app combines catechesis with modern UX. Learners can track prayers, read reflections, and follow along even if they are new to the rosary.",
        liveUrl: "https://chuoi-man-coi.techmoocher.com",
        githubUrl: "https://github.com/techmoocher/Chuoi-Man-Coi",
        images: [
            { src: "assets/images/projects/Chuoi-Man-Coi/Chuoi-Man-Coi.png", alt: "Chuoi Man Coi logo" },
            { src: "assets/images/projects/Chuoi-Man-Coi/demo.jpg", alt: "Chuoi Man Coi demo" },
        ],
        features: [
            "Step-by-step rosary guide with visuals, current mystery context, and gentle audio cues.",
            "Localized content for students with notes, prayers, and progress tracking.",
            "Mobile-first interface so catechists can lead prayers directly from their phones."
        ],
        challenges: [
            {
                title: "Designing for all ages",
                challenge: "Young students needed simple affordances while catechists requested deeper explanations.",
                solution: "Introduced dual layers—concise prompts on the main screen with expandable cards for additional context."
            },
            {
                title: "Reliability in low-connectivity environments",
                challenge: "Parish halls do not always have strong Wi-Fi, so the app had to degrade gracefully.",
                solution: "Optimized assets, cached the liturgical content, and preloaded audio snippets so sessions continue offline."
            }
        ],
        impacts: [
            "Helped students memorize and appreciate the rosary structure faster.",
            "Enabled catechists to run interactive sessions without flipping through booklets.",
            "Sparked interest from nearby parishes that now reuse the content."
        ],
        techStack: ["HTML", "CSS", "JavaScript"]
    },

    "hyprland-dotfiles": {
        title: "Hyprland Dotfiles",
        overview: "Wayland rice centered on Hyprland with smooth tiling, animations, and shortcut ergonomics.",
        description: "I keep a reproducible Hyprland setup so laptops and desktops feel identical: tuned gaps and animations, predictable workspaces, and consistent keybinds across Waybar, Wofi, Kitty, and Neovim.",
        githubUrl: "https://github.com/techmoocher/hyprland-dotfiles",
        images: [
            { src: "assets/images/projects/hyprland-dotfiles/desktop.png", alt: "Hyprland desktop layout" },
            { src: "assets/images/projects/hyprland-dotfiles/plan-sketch-v1.png", alt: "Layout sketch for the Hyprland setup" }
        ],
        features: [
            "Curated Hyprland rules for floating apps, scratchpads, and multi-monitor docking.",
            "Waybar, Wofi, and Kitty themed for legibility with matching accent colors and nerd-font icons.",
            "Session scripts to bootstrap wallpapers, services, and key remaps on login."
        ],
        challenges: [
            {
                title: "Keeping animations smooth on low-power laptops",
                challenge: "Wayland effects can stutter when the iGPU is throttled or on battery saver profiles.",
                solution: "Trimmed blur/radius defaults, lowered Hyprland animation damping, and added power-aware toggles for effects."
            },
            {
                title: "Reliable multi-monitor layout",
                challenge: "Docking and undocking would reshuffle workspaces and bar modules.",
                solution: "Scripted monitor rules and startup hooks that pin workspaces and reapply Waybar outputs after hotplug events."
            }
        ],
        impacts: [
            "Predictable shortcuts and visuals across all machines, reducing context switching.",
            "Faster cold boot into a ready-to-work session with preloaded services and terminals.",
            "Shared repo helps friends reuse the config with minimal tweaks."
        ],
        techStack: ["Hyprland", "Waybar", "Wofi", "Kitty", "Neovim", "Bash"]
    }
};