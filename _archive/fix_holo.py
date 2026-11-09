content = open(r'c:\Users\07ara\Downloads\portfolio\files(5)\index.html', encoding='utf-8').read()

# Find and replace by detecting the distinctive start/end markers
start_marker = '  <!-- HOLO -->'
end_marker = '  </section>\n\n  <!-- NOW WIDGET -->'

si = content.find(start_marker)
ei = content.find(end_marker)

if si == -1 or ei == -1:
    print(f'Markers not found: si={si} ei={ei}')
else:
    replacement = '''  <!-- COMMAND DECK (Projects) -->
  <section class="cmd-deck-sec" id="work">
    <div class="sh" data-reveal>
      <span class="shn">003</span>
      <h2>command <span class="gw c">deck</span></h2>
      <div class="shl"></div>
    </div>
    <div class="cmd-deck-grid">
      <div class="cmd-panel" data-reveal>
        <div class="cmd-panel-id">MISSION-01 // AI</div>
        <div class="cmd-panel-title">YourBuddy<br>AI Tutor</div>
        <div class="cmd-panel-sub">Gemini API &middot; Multilingual NLP</div>
        <ul class="cmd-panel-bullets">
          <li>Gemini API integration for real-time Q&amp;A across multiple languages</li>
          <li>Multilingual architecture supporting regional language learners</li>
          <li>Adaptive response depth based on user progress signals</li>
        </ul>
        <div class="cmd-panel-stack">
          <span class="cmd-stack-tag">Python</span><span class="cmd-stack-tag">Gemini API</span>
          <span class="cmd-stack-tag">NLP</span><span class="cmd-stack-tag">Flask</span>
        </div>
        <div class="cmd-panel-actions">
          <a href="https://github.com/" target="_blank" class="cmd-btn">[ GitHub ]</a>
          <a href="#" class="cmd-btn">[ Live ]</a>
        </div>
      </div>
      <div class="cmd-panel" data-reveal style="transition-delay:.1s">
        <div class="cmd-panel-id">MISSION-02 // HARDWARE</div>
        <div class="cmd-panel-title">Drishti<br>Smart Cane</div>
        <div class="cmd-panel-sub">Ultrasonic &middot; GPS &plusmn;2m</div>
        <ul class="cmd-panel-bullets">
          <li>Ultrasonic obstacle detection &mdash; lean C++, no ML overhead</li>
          <li>GPS tracking with &plusmn;2m precision, caretaker real-time alerts</li>
          <li>Engineered for battery life and real-world durability</li>
        </ul>
        <div class="cmd-panel-stack">
          <span class="cmd-stack-tag">C++</span><span class="cmd-stack-tag">Arduino</span>
          <span class="cmd-stack-tag">GPS</span><span class="cmd-stack-tag">Ultrasonic</span>
        </div>
        <div class="cmd-panel-actions">
          <a href="https://github.com/" target="_blank" class="cmd-btn">[ GitHub ]</a>
          <a href="#" class="cmd-btn">[ Demo ]</a>
        </div>
      </div>
      <div class="cmd-panel" data-reveal style="transition-delay:.2s">
        <div class="cmd-panel-id">MISSION-03 // WEB</div>
        <div class="cmd-panel-title">Govt. Finance<br>Portal</div>
        <div class="cmd-panel-sub">Responsive UI &middot; SQL Backend</div>
        <ul class="cmd-panel-bullets">
          <li>Fully responsive dashboard for public financial data</li>
          <li>Portable SQL &mdash; MySQL or PostgreSQL compatible</li>
          <li>Role-based access: citizen view vs. admin control panel</li>
        </ul>
        <div class="cmd-panel-stack">
          <span class="cmd-stack-tag">JavaScript</span><span class="cmd-stack-tag">SQL</span>
          <span class="cmd-stack-tag">HTML/CSS</span><span class="cmd-stack-tag">PHP</span>
        </div>
        <div class="cmd-panel-actions">
          <a href="https://github.com/" target="_blank" class="cmd-btn">[ GitHub ]</a>
          <a href="#" class="cmd-btn">[ Live ]</a>
        </div>
      </div>
    </div>
  </section>'''

    new_content = content[:si] + replacement + content[ei + len('  </section>'):]
    open(r'c:\Users\07ara\Downloads\portfolio\files(5)\index.html', 'w', encoding='utf-8').write(new_content)
    print('REPLACED OK')
