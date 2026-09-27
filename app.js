// app.js — Main Application Logic for StoryForge AI

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('generator-form');
  const generateBtn = document.getElementById('generate-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Extract form values
    const topic = document.getElementById('prompt-input').value.trim();
    const platform = document.getElementById('platform-select').value;
    const tone = document.getElementById('tone-select').value;
    const duration = document.getElementById('duration-select').value;

    if (!topic) {
      alert('Please enter a video topic or concept!');
      return;
    }

    // 2. Update UI Loading State
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Forging Production Kit...`;

    try {
      // 3. Call Backend/API (Replace URL with your serverless endpoint/API route)
      const kitData = await generateProductionKit({ topic, platform, tone, duration });

      // 4. Populate Output Dashboard
      renderScriptTab(kitData.script);
      renderStoryboardTab(kitData.storyboard);
      renderPromptsTab(kitData.visualPrompts);
      renderCaptionsTab(kitData.captions);
      renderSocialTab(kitData.socialCopy);

      alert('Production kit generated successfully!');
    } catch (error) {
      console.error('Generation Error:', error);
      alert('An error occurred while generating content. Check the console.');
    } finally {
      // Restore Button State
      generateBtn.disabled = false;
      generateBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Generate Production Kit`;
    }
  });
});

// --- API Request Handler ---
async function generateProductionKit(payload) {
  // SYSTEM PROMPT FOR STRUCTURED OUTPUT
  const systemPrompt = `You are StoryForge AI, an expert director and video producer. 
  Generate a complete production kit in strict JSON format.

  JSON Response Schema:
  {
    "script": "Full voice-over script formatted with timestamps e.g. [00:00 - 00:05]",
    "storyboard": [
      { "scene": "01", "shotType": "Wide Shot", "description": "Visual scene description...", "textOnScreen": "TEXT" }
    ],
    "visualPrompts": ["/imagine prompt: Midjourney/Flux prompt 1", "/imagine prompt: Midjourney/Flux prompt 2"],
    "captions": "1\\n00:00:00,000 --> 00:00:03,000\\nSRT formatted captions here",
    "socialCopy": {
      "title": "Catchy YouTube/Shorts Title",
      "description": "Video description...",
      "hashtags": "#Hashtag1 #Hashtag2"
    }
  }`;

  // NOTE: Replace this mock implementation with your actual serverless API endpoint (e.g. /api/generate)
  // that passes systemPrompt & user payload to OpenAI / Anthropic / Gemini API.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        script: `[00:00 - 00:05] HOOK: What if I told you time literally stands still inside a black hole?\n\n[00:05 - 00:15] BODY: Near the event horizon, gravitational time dilation reaches its extreme. To an outside observer, you'd freeze forever right before crossing.\n\n[00:15 - 00:30] CALL TO ACTION: Subscribe to dive deeper into the mysteries of our universe!`,
        storyboard: [
          { scene: "01", shotType: "Extreme Wide", description: "Deep space glowing singularity event horizon bending light.", textOnScreen: "TIME STOPS HERE" },
          { scene: "02", shotType: "Medium Close-up", description: "Astronaut floating near accretion disk, distortion effect.", textOnScreen: "GRAVITATIONAL TIME DILATION" }
        ],
        visualPrompts: [
          "/imagine prompt: Hyperrealistic view of a supermassive black hole bending spacetime, cosmic dust, cinematic lighting, 8k --ar 9:16",
          "/imagine prompt: Astronaut approaching event horizon, glowing accretion disk, photorealistic Sci-Fi style --ar 9:16"
        ],
        captions: `1\n00:00:00,000 --> 00:00:05,000\nWhat if I told you time literally stands still inside a black hole?\n\n2\n00:00:05,000 --> 00:00:15,000\nNear the event horizon, gravitational time dilation reaches its extreme.`,
        socialCopy: {
          title: "The Mind-Bending Reality of Black Holes 🌌",
          description: "Explore how intense gravity distorts time and space at the edge of an event horizon.",
          hashtags: "#Space #Astrophysics #ScienceFacts #StoryForgeAI"
        }
      });
    }, 2000);
  });
}

// --- DOM Rendering Helpers ---
function renderScriptTab(scriptText) {
  const scriptContainer = document.querySelector('#tab-script .font-mono');
  if (scriptContainer) scriptContainer.innerText = scriptText;
}

function renderStoryboardTab(scenes) {
  const tbody = document.querySelector('#tab-storyboard tbody');
  if (!tbody) return;
  tbody.innerHTML = scenes.map(s => `
    <tr>
      <td class="p-3 font-bold text-indigo-400">${s.scene}</td>
      <td class="p-3">${s.shotType}</td>
      <td class="p-3">${s.description}</td>
      <td class="p-3 text-amber-400">${s.textOnScreen}</td>
    </tr>
  `).join('');
}

function renderPromptsTab(prompts) {
  const promptsContainer = document.querySelector('#tab-prompts div');
  if (promptsContainer) {
    promptsContainer.innerHTML = prompts.map(p => `<p class="mb-2 pb-2 border-b border-slate-800 last:border-0">${p}</p>`).join('');
  }
}

function renderCaptionsTab(srtText) {
  const textarea = document.querySelector('#tab-captions textarea');
  if (textarea) textarea.value = srtText;
}

function renderSocialTab(social) {
  const socialContainer = document.querySelector('#tab-social div');
  if (socialContainer) {
    socialContainer.innerHTML = `
      <div>
        <span class="text-slate-500 uppercase font-bold block mb-1">Title:</span>
        <p class="font-semibold text-white">${social.title}</p>
      </div>
      <div>
        <span class="text-slate-500 uppercase font-bold block mb-1">Description:</span>
        <p class="text-slate-300 mb-2">${social.description}</p>
        <span class="text-slate-500 uppercase font-bold block mb-1">Hashtags:</span>
        <p class="text-indigo-400">${social.hashtags}</p>
      </div>
    `;
  }
}
