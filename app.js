/* ==========================================================================
   Toro.ai Interactive Demo Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ── Controlled Smooth Scrolling ──
    const NAVBAR_HEIGHT = 80; // px offset for fixed navbar
    const SCROLL_DURATION = 900; // ms

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo(0, startY + diff * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash === '#') return;

            const target = document.querySelector(hash);
            if (!target) return;

            e.preventDefault();
            const targetY = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            smoothScrollTo(targetY, SCROLL_DURATION);

            // Update URL hash without jumping
            history.pushState(null, null, hash);
        });
    });

    // Simulator Samples Data
    const samples = {
        "1": {
            spoken: '"as per the rfc this function takes an optional callback and handles edge cases where input is null"',
            formatted: `As per the RFC, this function takes an optional callback and handles edge cases where the input is null.`,
            lines: ["1", "2"]
        },
        "2": {
            spoken: '"select user id and email from users table where active is true and order by created at descending"',
            formatted: `SELECT user_id, email FROM users WHERE active = TRUE ORDER BY created_at DESC;`,
            lines: ["1", "2"]
        },
        "3": {
            spoken: '"git commit message fix typo in websocket client error handling and bump version to zero point three point two"',
            formatted: `git commit -m "fix: typo in websocket client error handling and bump version to 0.3.2"`,
            lines: ["1", "2"]
        }
    };

    let currentSampleKey = "1";
    let isSimulating = false;
    let timerInterval = null;

    // DOM Elements
    const tabs = document.querySelectorAll(".sim-tab");
    const spokenTextDisplay = document.getElementById("spoken-text-display");
    const playBtn = document.getElementById("play-sample-trigger");
    const visualizer = document.getElementById("visualizer-waves");
    const durationDisplay = document.getElementById("audio-duration");
    const resultTextDisplay = document.getElementById("editor-result-text");
    const pasteStatus = document.getElementById("paste-status-indicator");


    // Initialize View
    function resetSimulator() {
        clearInterval(timerInterval);
        isSimulating = false;
        playBtn.disabled = false;
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i> Play Voice Recording`;
        playBtn.style.background = "";

        visualizer.classList.remove("playing");
        durationDisplay.textContent = "00:00";
        pasteStatus.textContent = "Idle";
        pasteStatus.className = "copy-status";

        // Clear output editor
        resultTextDisplay.textContent = "// Ready for dictation. Click Play on the left panel...";
        resultTextDisplay.className = "editor-pasted-text";


    }

    // Switch active tab
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            if (isSimulating) return; // Prevent clicking during playback

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            currentSampleKey = tab.getAttribute("data-sample");
            spokenTextDisplay.textContent = samples[currentSampleKey].spoken;
            resetSimulator();
        });
    });

    // Start Simulation Flow
    playBtn.addEventListener("click", () => {
        if (isSimulating) return;
        runSimulation();
    });

    function runSimulation() {
        isSimulating = true;
        playBtn.disabled = true;
        playBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dictating...`;
        playBtn.style.background = "rgba(255, 255, 255, 0.05)";

        // 1. Play Voice & Wave Visualizer
        visualizer.classList.add("playing");
        resultTextDisplay.textContent = "// Capturing audio stream...";
        resultTextDisplay.className = "editor-pasted-text active";
        pasteStatus.textContent = "Recording...";
        pasteStatus.classList.add("active");

        // Start Timer
        let seconds = 0;
        durationDisplay.textContent = "00:00";
        timerInterval = setInterval(() => {
            seconds++;
            durationDisplay.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);

        // Step 1: Speak for 3 seconds, then stop visualizer and begin processing
        setTimeout(() => {
            clearInterval(timerInterval);
            visualizer.classList.remove("playing");
            playBtn.innerHTML = `<i class="fa-solid fa-check"></i> Recorded`;

            pasteStatus.textContent = "Transcribing...";
            resultTextDisplay.textContent = `Raw Text Captured:\n${samples[currentSampleKey].spoken.replace(/"/g, "")}`;

            // Step 2: After 1 second, transition to formatting
            setTimeout(() => {
                pasteStatus.textContent = "AI Formatting...";
                resultTextDisplay.textContent = `Polishing...\n- Punctuation & casing\n- Technical vocabulary parsing\n- Technical code syntax`;

                // Step 3: After 1.2 seconds, trigger pasting typewriter
                setTimeout(() => {
                    pasteStatus.textContent = "Pasting...";

                    // Typewriter output
                    const finalOutput = samples[currentSampleKey].formatted;
                    resultTextDisplay.textContent = "";
                    resultTextDisplay.className = ""; // code highlighting look

                    let charIndex = 0;
                    const typingSpeed = 15; // ms per char

                    function typeCharacter() {
                        if (charIndex < finalOutput.length) {
                            resultTextDisplay.textContent += finalOutput.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeCharacter, typingSpeed);
                        } else {
                            // Finish Pipeline
                            pasteStatus.textContent = "Pasted Success!";
                            pasteStatus.className = "copy-status active";



                            // Re-enable button after cool-down
                            setTimeout(() => {
                                isSimulating = false;
                                playBtn.disabled = false;
                                playBtn.innerHTML = `<i class="fa-solid fa-arrow-rotate-right"></i> Try Again`;
                                playBtn.style.background = "";
                            }, 1000);
                        }
                    }

                    typeCharacter();

                }, 1200);

            }, 1000);

        }, 3200);
    }

    // ── Speed Visual: Scroll-Triggered Bar Animation ──
    const speedSection = document.getElementById('speed-visual');
    if (speedSection) {
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    const bars = speedSection.querySelectorAll('.speed-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.getAttribute('data-width') + '%';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(speedSection);
    }
});
