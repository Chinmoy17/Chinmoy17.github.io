UI Psychology — What To Do & Why (Per Section)
Here's a clean, prescriptive breakdown for each chapter. Format:
Principle → What to do → Why it works → What breaks it.

1. Pre-attentive Vision
What to do:

Differentiate primary CTAs by color, not just label or size.
Use saturation as a budget — only ~5% of the screen should be saturated; the rest muted.
For status (online dot, unread count, error state), use color + shape + position redundantly.
Reserve motion for genuinely critical events (new message, error).
Run a 5-second test: if a stranger can't identify the primary action, your pre-attentive design has failed.
Why it works:
The visual cortex processes color, motion, and size in parallel within ~50ms — before conscious attention. If your CTA pops pre-attentively, the user finds it without "thinking." If it requires reading or scanning, you've burned 1–2 seconds of attention you'll never get back.

What breaks it:

Toolbars of 12 monochrome icons (forces serial scanning).
Three "primary" buttons of equal weight (no salience signal).
Decorative animated gradients that consume the user's involuntary attention budget.
2. Gestalt Principles
What to do:

Proximity rule: distance from a label to its input must be smaller than distance to anything else (~8px).
2× spacing rule: if items inside a group are 8px apart, groups should be 16–24px apart. The 2× ratio is what the brain reads as "different group."
Use cards to enforce common region when unrelated content shares a screen.
Reuse style for same function: all destructive actions = same red; all primaries = same blue. Similarity is a contract.
Align everything to a grid — alignment creates invisible rails the eye follows.
Why it works:
The brain performs grouping before you become conscious of it. You don't see "8 dots" — you see "two rows of 4." Once you understand grouping is involuntary, you stop fighting the brain and start exploiting it.

What breaks it:

Equidistant labels (belong to neither field).
Same action styled differently across screens (breaks similarity contract).
Misalignment by 1–3px — the brain notices subliminally and the page "feels off."
Borders everywhere when whitespace would suffice (over-bordering is anti-closure).
3. Cognitive Load Theory
What to do:

Recognition over recall. Surface relevant info; never make users remember between screens.
Chunk long forms into sections of ≤6 fields each.
Progressive disclosure. Show the 80% case; hide advanced behind "More options."
Auto-fill, auto-detect, auto-format anything you can. Every avoided keystroke is working memory recovered.
One primary action per screen. Multiple primaries fragment attention.
Reuse familiar patterns (hamburger = menu, magnifier = search). Schema reuse = zero learning load.
Why it works:
Working memory holds ~4 chunks (Cowan, 2001). Every cryptic icon, jargon term, or context switch spends from this finite budget. Once depleted, users abandon, retry, or make errors.

What breaks it:

Wizards with no progress indicator ("what step am I on?").
Modal-on-modal (stacks context to remember).
Cryptic error codes like Error 0x80070005 — pure extraneous load.
Re-asking known information (email, name, address from previous step).
Verification codes that don't autofill.
4. Visual Hierarchy
What to do:

On every screen, explicitly assign roles: dominant element, 1–2 secondaries, the rest body.
Use a typographic scale (1.25× or 1.333× ratio). Pick 4–5 sizes max.
Combine weight + size, not just size. A 24px bold beats 32px regular.
Whitespace amplifies importance. Isolate your primary CTA.
One "loud" color per screen. If the CTA is saturated purple, everything else is grayscale.
Why it works:
The eye is drawn to the highest visual weight first. Without intentional hierarchy, the brain has no shortcut and falls back to slow left-to-right scanning. Three levels (dominant/secondary/tertiary) is the sweet spot — more flattens into noise.

What breaks it:

"Save" and "Cancel" both bold blue (no hierarchy between primary/secondary).
Hero illustration the size of the screen, CTA tiny in corner.
5+ font sizes (hierarchy collapses into noise).
Bold body text everywhere — if everything is emphasized, nothing is.
5. The Squint Test
What to do:

Apply filter: blur(6px) (or literally squint) to every screen before shipping.
The dominant element should remain visible when blurred.
If two elements pop equally → demote one.
Test it in both light and dark mode — hierarchy can collapse in one even if the other works.
If your logo dominates the squint test, your branding is louder than your value prop (usually wrong on landing pages).
Why it works:
Squinting strips away high-frequency detail (text, icons, fine borders) and leaves only luminance blobs. This simulates peripheral vision and the first 50ms of perception. If hierarchy works at low resolution, it works at full resolution. The reverse isn't true.

What breaks it:

Hero image dominates while CTA disappears under blur.
Logo + nav + hero + CTA all visible at squint = no anchor for the user.
"Sign up" link in body text matches CTA button weight.
6. Fitts's Law
What to do:

Touch targets ≥ 44×44px (iOS) or 48×48dp (Material). Minimum, not goal.
Place primary actions where the cursor already is. "Save" follows the form; modal "Confirm" lives near the modal content.
Use screen edges for global actions — they have effectively infinite size because the cursor stops there.
Mobile: bottom-thumb zone for primaries (bottom 25% of screen).
Pad icon buttons. A 16×16px icon should have a 44×44px clickable area via padding.
Why it works:
Time to acquire a target = a + b·log₂(D/W + 1). Doubling target size reduces acquisition time more than halving distance. This isn't a guideline — it's a measured law of motor control that applies to mouse, finger, and gaze alike.

What breaks it:

Tiny "X" close buttons (12px = 4× the error rate of 24px).
"Confirm" button placed far from the dialog content.
Important navigation at the top of long mobile screens.
Icon-only buttons with no padding (visually AND functionally small).
7. Hick's Law
What to do:

Top-level nav: 5–7 items. More than 7 = group under categories.
Pricing tiers: 3 (max 4). Three allows anchoring without overwhelm.
Pre-select smart defaults. Default = decision avoided.
Use "Recommended" / "Most Popular" badges to collapse decisions to "accept or override?"
Progressive disclosure for advanced options.
One decision per onboarding screen.
Long lists: add search + categories to break flat choice into chunked choice.
Why it works:
Decision time grows logarithmically with options. But chunking changes the math: 20 items in 4 groups of 5 costs log₂(4) + log₂(5) ≈ 4.3 bits — same total as flat, but feels easier because each step is small. Sheena Iyengar's Jam Study showed 24 options got 10× fewer sales than 6.

What breaks it:

30-item flat dropdown with no search or grouping.
8 pricing tiers (paralysis).
Onboarding form asking 10 questions on one screen.
"Choose your plan" with no recommended option highlighted.
8. Typography
What to do:

Body text: 16px minimum on web; 17–18px is better for long-form reading.
Line height: 1.4–1.6× for body. Tight headlines (1.1–1.2) for display.
Line length: 50–75 characters per line. Beyond 75, the eye loses its place; below 50, saccades become inefficient.
One typeface family for product UI. Use weight (400/500/600/700) for hierarchy, not multiple fonts.
Match font personality to context: geometric sans-serifs (Inter, Geist) for tech; serifs (Georgia, Merriam) for editorial/authoritative; humanist sans (Open Sans) for friendly.
ALL CAPS only for ≤2 words with increased letter-spacing. Long all-caps text destroys word-shape recognition.
Why it works:
Reading isn't linear scanning of letters — the eye performs saccades (rapid jumps) and fixations (~250ms pauses), recognizing word shapes. Bad typography forces extra fixations and re-scans. The Baskerville Effect (Errol Morris, NYT) showed identical text in Baskerville was rated more believable than the same text in Comic Sans. Typography signals authority before content is read.

What breaks it:

Body text below 14px (causes eye strain after 1–2 paragraphs).
Line length over 100 characters (return-saccade fails; users skip lines).
5 different fonts on one page (signals amateurism).
Centered body text (each line starts in a different x-position; saccades fail).
Justified text on narrow columns (creates "rivers" of whitespace).
9. Color & Contrast
What to do:

Body text: 4.5:1 contrast minimum (WCAG AA). Headings: 3:1 minimum.
Test in grayscale. If your UI works without color, color is enhancement; if it fails, you're relying on color alone.
Pair color with shape/icon for state (error = red + ⚠ icon, not just red).
Reserve hue for meaning: red = error/destructive, green = success, blue = primary action, yellow = warning. Don't use red for branding if your app has error states.
Use a muted palette by default; saturated colors only for accents/CTAs.
Test on real devices — monitor calibration varies wildly.
Why it works:
The eye has ~6M cones (color) and ~120M rods (luminance). Luminance contrast matters far more than hue contrast. This is why WCAG measures contrast ratio, not "color difference." Also: ~8% of men have some form of color blindness — color-only signaling excludes them.

What breaks it:

"Designer gray" #999 on white (fails WCAG, unreadable for many).
Red-on-green text (similar luminance = invisible).
Brand color = error red (functional signals get lost in branding).
Color-only state indication (excludes colorblind users).
Pure black (#000) on pure white — too high contrast causes eye strain; use #1a1a1a or similar.
10. F-Pattern (Scanning)
What to do:

Front-load important words. First 2–3 words of a heading must convey the value.
Left-align body text and bullets — right-aligned content is invisible.
Use descriptive H2s, not clever ones. Users scan headings; the heading must convey meaning standalone.
Bullet lists beat paragraphs for skim-able content.
Critical CTAs: top-left or top-right for above-the-fold; mid-left for in-content.
Bold the first 3–4 words of long paragraphs — that's all most users will read.
Why it works:
Eye-tracking (Nielsen Norman Group) shows users read the first line, scan partway down the second, then trail down the left edge in an "F" shape. They don't read — they scan, then zoom into anything that looks valuable. The "layer-cake pattern" (heading-only scanning) means clever headlines lose to descriptive ones.

What breaks it:

Centered hero text with the value prop in the middle of a sentence.
Left-side decorative imagery, right-side critical content.
Walls of paragraph text with no headings or bullets.
"Click here" or "Learn more" buttons (zero info; users skip them).
11. Affordance & Signifiers
What to do:

Buttons must look pressable — use depth cues: gradient, shadow, border-radius, hover state.
Links must look clickable — underline or distinct color (don't rely on color alone).
Hover states are non-negotiable on interactive elements.
Disabled states must look disabled (reduced opacity + tooltip explaining why).
Cursor changes (cursor: pointer) on every clickable.
Don't make non-interactive elements look interactive — purely decorative borders/shadows confuse users.
Why it works:
Affordance = what an object can do. Signifier = the visual cue that communicates it. The flat design movement (~2013–2018) over-corrected by removing signifiers, killing affordance perception. Users couldn't tell what was clickable. If users hover to discover clickability, you've already failed.

What breaks it:

Flat text-only "buttons" with no border or background.
Plain blue text that's not a link (and links that aren't blue/underlined).
Disabled buttons with no explanation of why.
Cards that look clickable but aren't (or vice versa).
Hover-only revealed actions on touch devices (no hover exists).
12. Feedback Latency
What to do:

<100ms: feels instant. Hover states, button presses must respond here.
<1s: feels responsive. Page transitions, simple operations.
1–10s: show a spinner or progress indicator immediately. Indeterminate is fine if you can't predict.
>10s: show progress percentage + estimated time + cancel option.
Optimistic UI: assume success, update instantly, roll back on failure. Used by Linear, Twitter likes, etc.
Skeleton screens beat spinners for content loading — they hint at structure.
Always confirm destructive actions completed (toast: "Deleted" with undo).
Why it works:
Without feedback, users assume failure and retry — leading to duplicate submissions, frustration, abandonment. The brain needs closure on every action-perception loop to feel agency. A 3-second wait with a spinner feels shorter than a 3-second wait with nothing — same time, vastly different perceived wait.

What breaks it:

Buttons with no pressed state.
Loading with no spinner (users click again, double-submit).
Slow operations with no progress indication.
Destructive actions with no confirmation (Save? Delete? Did it work?).
Spinners that never end (no timeout, no error message).
13. Anchoring Bias
What to do:

Show the most expensive tier first (or featured-middle) so the cheaper feels like a deal.
Strike through original prices ("$99 $149"). The crossed-out anchor makes the new price feel cheaper.
Use a "Most Popular" badge on the middle tier — collapses decision + exploits social proof.
Anchor with quantities, not just prices: "10,000+ teams use this" anchors trust.
Use ethical anchoring. Manufactured urgency ("only 2 left!" when it's not true) destroys trust when discovered.
Why it works:
The first number you see calibrates how every subsequent number feels. This is a hardwired cognitive bias (Tversky & Kahneman). $99 first → $29 feels cheap. $29 first → $99 feels expensive. The brain doesn't have an absolute price scale; it builds one from context.

What breaks it:

Showing cheapest plan first (anchors low; everything else feels expensive).
8 pricing tiers with no featured option (paralysis + no anchor).
Fake countdown timers that reset (kills trust permanently).
Bait-and-switch anchoring ($299 prominent, but you can only get $999).
14. Halo Effect
What to do:

Invest in polish proportional to trust requirements. A fintech app needs 10× the polish of a hobby tool.
Consistent spacing, typography, colors signal deliberateness.
Polish error states — anyone can design the happy path; trustworthy products design failure beautifully.
Hover states, micro-interactions, smooth transitions — they're not decoration, they're trust signals.
Real photos > stock photos. Named testimonials > anonymous.
Avoid clichés (handshake stock photos, "synergy" copy) — they signal "generic" which the halo effect transfers to "untrustworthy."
Why it works:
A single positive trait colors perception of unrelated traits. A beautifully designed UI is rated as more functional, more secure, and more trustworthy — even when it isn't. The reverse is also true: clunky UI on a banking app makes users doubt the encryption, even though visual design is unrelated to security. Polish ROI compounds across all perceived attributes.

What breaks it:

Comic Sans on a banking page (instant trust collapse).
Inconsistent button styles, spacing, font sizes.
Sloppy error states ("ERROR: undefined").
Stock photos of diverse-people-pointing-at-laptops.
Broken links, lorem ipsum left in production.
Spelling mistakes (one typo can erase 1000 hours of polish).
15. Synthesis — Mental Models
Three Questions Test — Every screen must answer in <5 seconds:

Where am I?
What can I do here?
What should I do next?
If any answer requires more than a glance, the screen is failing.

The "Why?" Stack — For every design decision, ask "why?" five times. If you can't answer, delete it.

Effort Audit — For each user goal, count: clicks, decisions, fields, things to remember. Reduce each. The cheapest UX win is almost always removing, not adding.

The Cooperative Brain Principle — The user's brain is a fast, lazy, biased pattern-matcher with a 4-slot working memory operating on 200ms reflexes. Every principle in this lab — Gestalt, Fitts, Hick, hierarchy, typography, color, feedback, halo — is a way of cooperating with that brain. They are not aesthetic preferences. They are engineering constraints derived from neuroscience.

When you internalize this, you stop decorating and start engineering cognition. That's the leap from frontend developer to interface engineer.