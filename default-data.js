/**
 * Default Data Seed Dictionary for Aranya's Portfolio
 * Contains all current text, projects, interests, games, songs, and notes
 * used to pre-populate Supabase with 1 click.
 */

window.SITE_DEFAULT_DATA = {
  // ── SITE CONTENT (Key-Value Texts) ─────────────────────────
  site_content: {
    // HOME: Hero & Scrub
    'hero_greeting': "hi i'm",
    'hero_name': 'aranya',
    'hero_subtitle': 'second-year cse student building games, interactive experiments, and software from scratch.',
    'hero_swap_words': 'building things 🔨, solving problems 🧩, making games 🎮, grinding DSA 📊, learning everything 📚, shipping code 🚀',
    'welcome_scrub_text': 'welcome to my profile, <br> a journey awaits you to explore!',

    // The Workbench (Interactive About)
    'workbench_speedcube_pb': '12.06s',
    'workbench_status_location': 'Pune, India (VIT CSE)',
    'workbench_status_balance': '50% code · 50% life',

    // HOME: About Bento Cards
    'about_card1_kicker': '01 / THE BUILDER',
    'about_card1_heading': 'I like making software you can reach out and touch.',
    'about_card1_bio': "I’m Aranya, a second-year CSE student at VIT Pune. I’m drawn to the little details that make an experience feel real: a camera that moves just right, a gesture that registers instantly, or a sensor that turns a physical motion into play. I often rebuild a small version from scratch to understand what’s happening under the hood.",
    'about_card1_location': 'currently based in Pune, India',

    'about_card2_kicker': '02 / MY TOOLBELT',
    'about_card2_heading': 'Tools I reach for',
    'about_card2_languages': 'C#, C++, Python, TypeScript',
    'about_card2_tools': 'Unity, Pygame, OpenCV, Git',
    'about_card2_hardware': 'ESP32, Arduino, sensor I/O',

    'about_card3_kicker': '03 / HOW I THINK',
    'about_card3_heading': 'Things building has taught me',
    'about_card3_p1_title': 'Understand the black box.',
    'about_card3_p1_desc': 'I like rebuilding a small version of a system once, just to see how the pieces work.',
    'about_card3_p2_title': 'Feel matters.',
    'about_card3_p2_desc': 'My gesture game taught me that smoothing noisy input can matter more than tracking every raw movement.',
    'about_card3_p3_title': 'Make it tangible.',
    'about_card3_p3_desc': 'A quick playable prototype or sensor demo teaches me more than an idea left on paper.',

    'about_card4_kicker': '04 / IN THE LAB',
    'about_card4_heading': 'A snapshot of what’s on my mind',
    'about_card4_building': 'Small vision games and microcontroller experiments',
    'about_card4_learning': 'Unity 2D, game loops, state machines, trees & graphs',
    'about_card4_offscreen': 'Guitar, badminton, and getting out with my camera',
    'about_card4_note': 'always tinkering with the next idea',

    // PERSONAL PAGE
    'personal_hero_eyebrow': 'the clumsy yet chaotic guy',
    'personal_hero_h1': 'the real aranya',
    'personal_hero_sub': 'beyond the code: games, guitar, goals, and everything that keeps me alive.',
    'personal_hero_pills': '🎮 gamer, 🎸 guitarist, 🏸 shuttler, 📸 photographer, ⚽ footballer, 🌍 traveller',
    'personal_ticker': 'second-year CSE, VIT Pune, codes for fun, plays guitar, football fanatic, shuttler, photographer, traveller, night owl builder',

    'personal_stack_eyebrow': 'through the lens',
    'personal_stack_title': 'life beyond the screen',
    'personal_stack_desc': 'i love taking photos when i travel and of nature. these photos are some of my favorites. from sunsets in goa to city lights.',
    'personal_stack_btn': '📸 view my photos',

    'personal_who_card1': "i'm aranya — second-year cse student at vit pune. i build software and games because it's genuinely fun. outside of code, i play badminton, practice guitar, shoot photos, and talk about game design.",
    'personal_who_card2': 'currently living in pune, getting used to college life, hanging out with friends, and finding good food spots around the city.',
    'personal_who_card3': 'curious first, practical second. i get hooked on an idea, build a quick prototype, break it, figure out why it broke, and rebuild it better.',
    'personal_who_card4': 'learning unity, building random side projects, practicing guitar chords, taking street photos, and playing football and games with friends.',

    'personal_music_label': "🎵 aranya's rotation — my current favourites!",
    'personal_spotify_profile': 'https://open.spotify.com/user/31qomjj2yspgvf2c3jafmxmdpihq?si=2f6a0a5e31334487',

    'guitar_model': 'Fender Squier Sonic Stratocaster',
    'guitar_specs': 'Black • HSS Configuration',
    'guitar_bio': "Playing guitar eases my mind by ten fold. Nothing beats the feeling of mastering a new riff or learning a song I've loved for years.",
    'guitar_can_play': 'Do I Wanna Know, 505, Tum Hi Ho, Raabta, Here With Me, Freaks, All of Me, Perfect, Khairiyat, Wish You Were Here, Choo Lo',
    'guitar_wanna_learn': 'Hotel California, Free Bird, Sweater Weather',

    // PROFESSIONAL PAGE
    'prof_hero_badge': 'open to opportunities',
    'prof_hero_h1': 'my work & journey',
    'prof_hero_sub': "second-year cse student building a foundation, one project at a time. here's what i've made so far.",
    'prof_bio_h2': 'who i am professionally.',
    'prof_bio_text': "I'm Aranya, second-year cse at VIT Pune. Passionate about DSA, game development, and building real software. I learn by building things, breaking them, and figuring out why.",
    'prof_resume_url': 'resume.pdf',
    'prof_skill_chips': 'Python, JavaScript, TypeScript, C#, HTML/CSS, React, Unity, OpenCV, Data Structures, Algorithms',

    'prof_story1_title': 'CSE Fundamentals',
    'prof_story1_desc': 'Building a solid base — data structures to OS theory. Fundamentals are everything.',
    'prof_story2_title': 'Problem Solving & Game Development',
    'prof_story2_desc': 'Daily grind on Leetcode and Codeforces. Love creating and breaking game engines.',
    'prof_story3_title': 'Projects & Software',
    'prof_story3_desc': 'From games to tools i build things and crash them too. Building is where theory meets reality.',
    'prof_story4_title': 'Clubs & Collaboration',
    'prof_story4_desc': 'Joined XRGF, a game development club at VIT Pune, where i get to work with people with the same interest as mine.',

    // FOOTER & SOCIALS
    'footer_brand': 'ara.',
    'footer_subtitle': 'CSE student · gamer · Pune, IN',
    'footer_copyright': 'built with ♥ by aranya · 2026',
    'social_github': 'https://github.com/07aranya',
    'social_linkedin': 'https://www.linkedin.com/in/07aranya/',
    'social_email': '07aranya@gmail.com'
  },

  // ── ALL 6 PROJECTS (WITH CASE STUDIES) ──────────────────────
  projects: [
    {
      title: 'Gesture Fruit Ninja',
      category_badge: '01 / CASE STUDY · COMPUTER VISION',
      lead_description: 'a real-time fruit ninja remake in python where your hands act as blades in front of your webcam — no keyboard, mouse, or controller.',
      tech_tags: ['python', 'opencv', 'mediapipe', 'pygame', 'real-time tracking'],
      github_url: 'https://github.com/07aranya/python-fruit-ninja',
      live_url: '',
      thumbnail_url: 'images/projects/fruitninja.jpg',
      the_idea: 'recreating fruit ninja’s tactile slicing mechanic using computer vision. the goal was zero extra hardware — no special gloves or depth sensors, just raw webcam frames turned into snappy sword slashes.',
      how_i_built_it: 'the pipeline runs frame-by-frame: opencv pulls the video feed, mediapipe hands extracts 21 3d landmarks, and custom smoothing vectors calculate hand blade velocity. when blade velocity exceeds threshold, it calculates line-segment intersection with flying fruit physics.',
      the_tricky_part: 'fast hand slashes caused tracking skips between frames. solved by implementing continuous collision detection with sub-frame interpolation between consecutive landmark coordinates.',
      what_i_learned: 'game feel in gesture input is entirely about forgiveness and latency. players forgive slightly loose tracking if visual feedback is immediate and slicing audio connects on the exact frame of contact.',
      is_featured: true,
      page_visibility: 'both',
      display_order: 1
    },
    {
      title: 'AI Educational Vernacular Chatbot',
      category_badge: '02 / CASE STUDY · FULL-STACK & AI',
      lead_description: 'an interactive multilingual learning companion breaking regional language barriers for students across 9+ indian vernacular languages.',
      tech_tags: ['typescript', 'react', 'gemini api', '9+ languages', 'cbse / state board'],
      github_url: 'https://github.com/07aranya/VernacularChatbot',
      live_url: 'https://ai-vernacular-chatbot.vercel.app/',
      thumbnail_url: 'images/projects/chatbot.png',
      the_idea: 'many students in regional schools struggle when technical and scientific concepts are taught purely in standard english. this chatbot bridges the comprehension gap.',
      how_i_built_it: 'built with react and typescript, featuring dual-persona switching (friendly peer vs concise tutor). calls google’s gemini api with customized system prompts grounded in ncert curriculum standards.',
      the_tricky_part: 'direct literal machine translations often corrupted mathematical symbols, code snippets, and chemical equations. resolved by tokenizing formula blocks before translation.',
      what_i_learned: 'evaluating llm outputs for non-english languages requires contextual cultural grounding, not just high bleu scores.',
      is_featured: true,
      page_visibility: 'both',
      display_order: 2
    },
    {
      title: 'VR Horror Experience',
      category_badge: '03 / CASE STUDY · GAME ENGINE & SPATIAL VR',
      lead_description: 'a tension-driven virtual reality escape sequence engineered in unity and c# for vit pune’s annual college tech fest.',
      tech_tags: ['unity', 'c#', 'meta quest', 'spatial 3d audio', 'lighting physics'],
      github_url: '',
      live_url: '',
      thumbnail_url: 'images/projects/vrgame.jpeg',
      the_idea: 'designing a compact, sensory-rich horror game that used physical head-tracking and binaural audio rather than cheap jumpscares to build dread.',
      how_i_built_it: 'developed in unity using c# scripting, oculus integration sdk, baked occlusion culling for steady 90fps, and custom raycast flashlight mechanics.',
      the_tricky_part: 'preventing motion sickness in a claustrophobic indoor map. implemented snap-turning options and dynamic tunneling vignette whenever angular velocity spiked.',
      what_i_learned: 'in vr, audio does 70% of the world-building work. subtle spatial creaks behind the player created ten times more engagement than visual monster models.',
      is_featured: true,
      page_visibility: 'both',
      display_order: 3
    },
    {
      title: 'CBSE Portal Redesign',
      category_badge: '04 / WEB',
      lead_description: 'a clean redesign of the cbse website to make notifications, syllabus links, and results much easier to navigate.',
      tech_tags: ['javascript', 'html5', 'css3', 'ui/ux'],
      github_url: 'https://github.com/07aranya/CBSE-Website',
      live_url: 'https://cbse-website-new.vercel.app/',
      thumbnail_url: 'images/projects/cbse_new.png',
      is_featured: false,
      page_visibility: 'both',
      display_order: 4
    },
    {
      title: 'ASeP2: Haptic Navigation',
      category_badge: '05 / HARDWARE & IOT',
      lead_description: 'an assistive navigation prototype that alerts visually impaired users to nearby obstacles using ultrasonic sensors and vibration motors.',
      tech_tags: ['python', 'sensors', 'haptics', 'embedded'],
      github_url: 'https://github.com/07aranya/haptic-helmet-nav',
      live_url: 'https://haptic-helmet-nav.onrender.com',
      thumbnail_url: 'images/projects/asep.png',
      is_featured: false,
      page_visibility: 'both',
      display_order: 5
    },
    {
      title: 'Gyro Ball Controller',
      category_badge: '06 / EMBEDDED SYSTEMS',
      lead_description: 'a real-time balance game controlled by tilting a physical esp32 microcontroller wired to an mpu6050 gyroscope.',
      tech_tags: ['esp32', 'mpu6050', 'c++', 'physics'],
      github_url: 'https://github.com/07aranya/gyro-ball-controller',
      live_url: '',
      thumbnail_url: 'images/projects/aem.jpg',
      is_featured: false,
      page_visibility: 'both',
      display_order: 6
    }
  ],

  // ── INTERESTS (8 ITEMS) ────────────────────────────────────
  interests: [
    { name: 'Game Development', tagline: 'building', emoji: '🎮', display_order: 1 },
    { name: 'DSA & Algorithms', tagline: 'grinding', emoji: '🧩', display_order: 2 },
    { name: 'Badminton', tagline: 'competing', emoji: '🏸', display_order: 3 },
    { name: 'Guitar', tagline: 'strumming', emoji: '🎸', display_order: 4 },
    { name: 'Photography', tagline: 'shooting', emoji: '📸', display_order: 5 },
    { name: 'Music', tagline: 'listening', emoji: '🎵', display_order: 6 },
    { name: 'Travel', tagline: 'exploring', emoji: '✈️', display_order: 7 },
    { name: 'Football', tagline: 'playing', emoji: '⚽', display_order: 8 }
  ],

  // ── FAVOURITE GAMES (6 GAMES) ──────────────────────────────
  games: [
    { item_type: 'game', title: 'Red Dead Redemption 2', subtitle: 'Story/Open World', rating: 5, image_url: 'images/games/rdr2.jpeg', display_order: 1 },
    { item_type: 'game', title: 'God of War', subtitle: 'Gameplay/Story', rating: 5, image_url: 'images/games/gow.jpeg', display_order: 2 },
    { item_type: 'game', title: 'Ghost of Tsushima', subtitle: 'Visuals/Combat', rating: 4, image_url: 'images/games/got.jpeg', display_order: 3 },
    { item_type: 'game', title: 'GTA IV', subtitle: 'Story/Open World', rating: 5, image_url: 'images/games/gta4.jpeg', display_order: 4 },
    { item_type: 'game', title: 'Spiderman 2', subtitle: 'Web-slinging/Combat', rating: 4, image_url: 'images/games/spiderman2.jpeg', display_order: 5 },
    { item_type: 'game', title: 'COD MW Series', subtitle: 'Action', rating: 5, image_url: 'images/games/mw2.jpeg', display_order: 6 }
  ],

  // ── SPOTIFY TRACKS (6 TRACKS) ──────────────────────────────
  songs: [
    { item_type: 'song', title: 'Nights - Frank Ocean', subtitle: 'https://open.spotify.com/track/7eqoqGkKwgOaWNNHx90uEZ', spotify_url: 'https://open.spotify.com/track/7eqoqGkKwgOaWNNHx90uEZ', display_order: 1 },
    { item_type: 'song', title: 'Wish You Were Here - Pink Floyd', subtitle: 'https://open.spotify.com/track/4t5joZkdlXlvzLXJbkgppJ', spotify_url: 'https://open.spotify.com/track/4t5joZkdlXlvzLXJbkgppJ', display_order: 2 },
    { item_type: 'song', title: '505 - Arctic Monkeys', subtitle: 'https://open.spotify.com/track/3QaPy1KgI7nu9FJEQUgn6h', spotify_url: 'https://open.spotify.com/track/3QaPy1KgI7nu9FJEQUgn6h', display_order: 3 },
    { item_type: 'song', title: 'Creep - Radiohead', subtitle: 'https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC', spotify_url: 'https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC', display_order: 4 },
    { item_type: 'song', title: 'Choo Lo - The Local Train', subtitle: 'https://open.spotify.com/track/4qW3BbQAwZsrnu8a3ZRdyT', spotify_url: 'https://open.spotify.com/track/4qW3BbQAwZsrnu8a3ZRdyT', display_order: 5 },
    { item_type: 'song', title: 'Butterflies - Skrillex', subtitle: 'https://open.spotify.com/track/0WQiDwKJclirSYG9v5tayI', spotify_url: 'https://open.spotify.com/track/0WQiDwKJclirSYG9v5tayI', display_order: 6 }
  ],

  // ── PERSONAL WINS (4 ITEMS) ────────────────────────────────
  personal_wins: [
    { item_type: 'personal_win', title: 'Runner up in Maharashtra State Level Football-Tennis', subtitle: 'this was a major achievement for me as i love playing and competing in sports', year: '2019', display_order: 1 },
    { item_type: 'personal_win', title: 'Guitar Milestone', subtitle: 'Tum Hi Ho was the first song i learnt to play on guitar. was a great feeling to play a song flawlessly for the first time', year: '2020', display_order: 2 },
    { item_type: 'personal_win', title: 'Trips', subtitle: 'Goa trip with friends and Nainital, Hampi trip with family are some of my favorite trips', year: '2023–26', display_order: 3 },
    { item_type: 'personal_win', title: 'Personal Challenge', subtitle: 'Learnt to solve 3x3 Rubik’s cube in under 30 seconds. my personal best is 12.06 seconds.', year: '2026', display_order: 4 }
  ],

  // ── 122 LOCAL IMAGES IN /images/ ──────────────────────
  local_images: [
  {
    "path": "images\\10th, 12th\\12th(1).jpeg",
    "name": "12th(1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\10th, 12th\\farewell.jpeg",
    "name": "farewell.jpeg",
    "category": "general"
  },
  {
    "path": "images\\10th, 12th\\highschool.jpeg",
    "name": "highschool.jpeg",
    "category": "general"
  },
  {
    "path": "images\\album covers\\butterflies.webp",
    "name": "butterflies.webp",
    "category": "general"
  },
  {
    "path": "images\\album covers\\creep.jpg",
    "name": "creep.jpg",
    "category": "general"
  },
  {
    "path": "images\\album covers\\nights.jpg",
    "name": "nights.jpg",
    "category": "general"
  },
  {
    "path": "images\\album covers\\raindance.jpg",
    "name": "raindance.jpg",
    "category": "general"
  },
  {
    "path": "images\\album covers\\wish you were here.jpg",
    "name": "wish you were here.jpg",
    "category": "general"
  },
  {
    "path": "images\\art dance and olympiads\\allmedals.jpeg",
    "name": "allmedals.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\born in 2007\\ara1.jpeg",
    "name": "ara1.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\born in 2007\\ara2.jpeg",
    "name": "ara2.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\born in 2007\\WhatsApp Image 2026-05-01 at 15.13.33.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.13.33.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\born in 2007\\WhatsApp Image 2026-05-01 at 15.13.34.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.13.34.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\college\\vitp.jpeg",
    "name": "vitp.jpeg",
    "category": "general"
  },
  {
    "path": "images\\college\\WhatsApp Image 2026-05-01 at 15.11.34.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.11.34.jpeg",
    "category": "general"
  },
  {
    "path": "images\\college\\WhatsApp Image 2026-05-01 at 15.12.17 (1).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.12.17 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\college\\WhatsApp Image 2026-05-01 at 15.12.17 (2).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.12.17 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\college\\WhatsApp Image 2026-05-01 at 15.12.17.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.12.17.jpeg",
    "category": "general"
  },
  {
    "path": "images\\favicon.png",
    "name": "favicon.png",
    "category": "general"
  },
  {
    "path": "images\\games\\got.jpeg",
    "name": "got.jpeg",
    "category": "general"
  },
  {
    "path": "images\\games\\gow.jpeg",
    "name": "gow.jpeg",
    "category": "general"
  },
  {
    "path": "images\\games\\gta4.jpeg",
    "name": "gta4.jpeg",
    "category": "general"
  },
  {
    "path": "images\\games\\mw2.jpeg",
    "name": "mw2.jpeg",
    "category": "general"
  },
  {
    "path": "images\\games\\rdr2.jpeg",
    "name": "rdr2.jpeg",
    "category": "general"
  },
  {
    "path": "images\\games\\spiderman2.jpeg",
    "name": "spiderman2.jpeg",
    "category": "general"
  },
  {
    "path": "images\\guitar1.jpg",
    "name": "guitar1.jpg",
    "category": "guitar"
  },
  {
    "path": "images\\guitar2.jpg",
    "name": "guitar2.jpg",
    "category": "guitar"
  },
  {
    "path": "images\\icon.jpg",
    "name": "icon.jpg",
    "category": "general"
  },
  {
    "path": "images\\icon.png",
    "name": "icon.png",
    "category": "general"
  },
  {
    "path": "images\\my years in school\\12th.jpeg",
    "name": "12th.jpeg",
    "category": "general"
  },
  {
    "path": "images\\my years in school\\compteam.jpeg",
    "name": "compteam.jpeg",
    "category": "general"
  },
  {
    "path": "images\\my years in school\\cricteam.jpeg",
    "name": "cricteam.jpeg",
    "category": "general"
  },
  {
    "path": "images\\my years in school\\school1.jpeg",
    "name": "school1.jpeg",
    "category": "general"
  },
  {
    "path": "images\\my years in school\\WhatsApp Image 2026-05-01 at 15.15.27.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 15.15.27.jpeg",
    "category": "general"
  },
  {
    "path": "images\\neww\\WhatsApp Image 2026-05-02 at 11.18.55.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.18.55.jpeg",
    "category": "general"
  },
  {
    "path": "images\\neww\\WhatsApp Image 2026-05-02 at 11.19.23.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.23.jpeg",
    "category": "general"
  },
  {
    "path": "images\\neww\\WhatsApp Image 2026-05-02 at 11.28.00.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.00.jpeg",
    "category": "general"
  },
  {
    "path": "images\\og-image.jpg",
    "name": "og-image.jpg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.18.54 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.18.54 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.18.54.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.18.54.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.18.55 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.18.55 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.18.55.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.18.55.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.17.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.17.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.18.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.18.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.20 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.20 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.20.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.20.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.22 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.22 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.23 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.23 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.23.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.23.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.24.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.24.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.25.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.25.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.27 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.27 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.27 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.27 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.27.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.27.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.28 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.28 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.30 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.30 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.31 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.31 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.31 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.31 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.31.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.31.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.32 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.32 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.32.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.32.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.33 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.33 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.33.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.33.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.34.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.34.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.35 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.35 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.35.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.35.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.36.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.36.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.37 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.37 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.37.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.37.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.39 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.39 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.39 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.39 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.39.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.39.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.40 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.40 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.40.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.40.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.19.41.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.19.41.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.54 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.54 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.54.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.54.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.55 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.55 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.55 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.55 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.55 (3).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.55 (3).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.55.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.55.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.57 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.57 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.57.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.57.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.58 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.58 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.58.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.58.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.59 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.59 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.27.59.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.27.59.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.00.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.00.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.05.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.05.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.06 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.06 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.06.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.06.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.07 (1).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.07 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.07.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.07.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.08 (2).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.08 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.08 (3).jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.08 (3).jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.08.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.08.jpeg",
    "category": "general"
  },
  {
    "path": "images\\photography\\WhatsApp Image 2026-05-02 at 11.28.09.jpeg",
    "name": "WhatsApp Image 2026-05-02 at 11.28.09.jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\goa1.jpeg",
    "name": "goa1.jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.55.27 (1).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.55.27 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.55.27 (2).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.55.27 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.55.27.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.55.27.jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.55.28 (1).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.55.28 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.55.28.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.55.28.jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.42 (1).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.42 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.42 (2).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.42 (2).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.42 (3).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.42 (3).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.42.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.42.jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.43 (1).jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.43 (1).jpeg",
    "category": "general"
  },
  {
    "path": "images\\places\\WhatsApp Image 2026-05-01 at 14.59.43.jpeg",
    "name": "WhatsApp Image 2026-05-01 at 14.59.43.jpeg",
    "category": "general"
  },
  {
    "path": "images\\projects\\aem.jpg",
    "name": "aem.jpg",
    "category": "general"
  },
  {
    "path": "images\\projects\\asep.png",
    "name": "asep.png",
    "category": "general"
  },
  {
    "path": "images\\projects\\cbse.png",
    "name": "cbse.png",
    "category": "general"
  },
  {
    "path": "images\\projects\\cbse_new.png",
    "name": "cbse_new.png",
    "category": "general"
  },
  {
    "path": "images\\projects\\chatbot.png",
    "name": "chatbot.png",
    "category": "general"
  },
  {
    "path": "images\\projects\\fruitninja.jpg",
    "name": "fruitninja.jpg",
    "category": "general"
  },
  {
    "path": "images\\projects\\vrgame.jpeg",
    "name": "vrgame.jpeg",
    "category": "general"
  },
  {
    "path": "images\\state level\\football medal.jpeg",
    "name": "football medal.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\state level\\footballteam.jpeg",
    "name": "footballteam.jpeg",
    "category": "timeline"
  },
  {
    "path": "images\\vr1.jpeg",
    "name": "vr1.jpeg",
    "category": "general"
  },
  {
    "path": "images\\vr2.jpeg",
    "name": "vr2.jpeg",
    "category": "general"
  },
  {
    "path": "images\\vr3.jpeg",
    "name": "vr3.jpeg",
    "category": "general"
  },
  {
    "path": "images\\vr4.jpeg",
    "name": "vr4.jpeg",
    "category": "general"
  }
]
};