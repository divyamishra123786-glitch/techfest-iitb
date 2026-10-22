/**
 * Techfest IIT Bombay - Interactive Cyber Terminal Emulator
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalForm = document.getElementById('terminal-form');
  const chipCmds = document.querySelectorAll('.chip-cmd');

  if (!terminalBody || !terminalInput) return;

  const COMMANDS = {
    help: `[COMMAND MATRIX]
  • <span style="color:#00f0ff">theme</span>      : Unveil the core concept of 'An Aetherial Renaissance'
  • <span style="color:#00f0ff">events</span>     : List premier festival verticals and challenges
  • <span style="color:#00f0ff">robowars</span>   : Status & telemetry of the International Robowars Arena
  • <span style="color:#00f0ff">prizes</span>     : Total prize pool & reward distribution
  • <span style="color:#00f0ff">schedule</span>   : Multi-day roadmap & schedule highlights
  • <span style="color:#00f0ff">stats</span>      : Live festival metrics & reach
  • <span style="color:#00f0ff">ca</span>         : Campus Ambassador details & perks
  • <span style="color:#00f0ff">matrix</span>     : Ascii art & system status
  • <span style="color:#00f0ff">clear</span>      : Purge terminal console buffer`,

    theme: `[THEME ARCHIVE // 2026]
  TECHFEST IIT BOMBAY PRESENTS: "AN AETHERIAL RENAISSANCE"
  -------------------------------------------------------------
  A philosophical and technological rebirth bridging Da Vinci's
  visionary polymath blueprints with cutting-edge Generative AI,
  Autonomous Neural Robotics, Quantum Computation, and Interplanetary
  Engineering. Welcome to where imagination meets empirical mastery.`,

    events: `[ACTIVE VERTICALS & FLAGSHIP CHALLENGES]
  [01] ROBOWARS INTERNATIONAL       : ₹10,00,000 Prize Pool | Combat Robotics
  [02] ZEROCODE AI PROMPT SPRINT   : ₹3,50,000 Prize Pool  | LLM Architecture
  [03] DRONE RACING GRAND PRIX      : ₹5,00,000 Prize Pool  | High Speed FPV
  [04] COZMOCLENCH & MESHMERIZE     : ₹4,00,000 Prize Pool  | Gripper & Micromouse
  [05] TECH EXPO & HUMANOID SUMMIT  : 45+ Global Innovators | Exhibition
  [06] TECHNOHOLIX TECH-ART SPECTACLE: Drone swarm shows, laser art & EDM`,

    robowars: `[ROBOWARS 2026 // STATUS: COMBAT ENGAGED]
  Arena Type   : Bulletproof 12mm Polycarbonate Octagon
  Categories   : 60kg Heavyweight, 15kg Featherweight, 8kg Beetleweight
  Weapons      : High-RPM Hardox Spinners, Pneumatic Flippers, Crusher Claws
  Arena Hazard : Floor spikes, pneumatic pitflaps, flame jets`,

    prizes: `[PRIZE VALUATION]
  Total Prize Pool    : ₹45,00,000+ (INR)
  Incubation Grants   : Up to ₹25,00,000 via IITB E-Cell & Partners
  Certificates        : Verified IIT Bombay Credential for all finalists`,

    schedule: `[TIMELINE OVERVIEW]
  DAY 01 (Genesis)     : Grand Inauguration, Keynote Lectures, Robowars Prelims
  DAY 02 (Zenith)      : AI Hackathons, International Tech Expo, Drone GP
  DAY 03 (Transcendence): Grand Finals, Robowars Championship, Technoholix Night`,

    stats: `[TELEMETRY & IMPACT METRICS]
  • Total Footfall     : 1,75,000+ Attendees
  • Academic Outreach  : 2,500+ Engineering Colleges
  • International Span : 60+ Participating Nations
  • Digital Impressions: 4.8 Million+ Global Reach`,

    ca: `[CAMPUS AMBASSADOR INITIATIVE]
  Represent Techfest, IIT Bombay in your college.
  Perks: Verified Certificate, Free Festival Accommodation, Exclusive VIP Passes,
  internship opportunities with partner tech giants!`,

    matrix: `
    .---.  .-.   .-. .----. .----. .----. .----. .---.
   {_   _} | |   | | | {_   | |--' | {__  { {__  {_   _}
     | |   | |--.| | | {__  | |    | {__  .-} }    | |  
     \`-'   \`----'\`-' \`----' \`-'    \`----' \`----'   \`-'  
   [IIT BOMBAY // SYSTEM OPERATIONAL // LATENCY 12ms]`,

    easteregg: `✨ [TRANSCENDENCE UNLOCKED]
   "Simplicity is the ultimate sophistication." — Leonardo da Vinci
   You have unlocked secret festival badge: #AetherPioneer`
  };

  function appendLine(htmlContent, isUser = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isUser) {
      line.innerHTML = `<span class="terminal-prompt-sym">tf-guest@aether:~$</span> <span style="color:#fff">${htmlContent}</span>`;
    } else {
      line.innerHTML = htmlContent;
    }
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    appendLine(cmd, true);

    if (window.TechfestAudio) window.TechfestAudio.playClick();

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      appendLine(`Terminal buffer refreshed. Type <span style="color:#00f0ff">help</span> for available commands.`);
      return;
    }

    if (COMMANDS[cmd]) {
      setTimeout(() => {
        appendLine(COMMANDS[cmd]);
      }, 100);
    } else {
      setTimeout(() => {
        appendLine(`<span style="color:#ff5f56">Command not recognized: '${cmd}'. Type <span style="color:#00f0ff">help</span> to list subroutines.</span>`);
      }, 100);
    }
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = terminalInput.value;
    terminalInput.value = '';
    handleCommand(val);
  });

  chipCmds.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });
});
