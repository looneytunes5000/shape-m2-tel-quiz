---
name: Technology Enhanced Learning at VTC — SHAPE Module M2
description: Flat tangerine editorial design system for the no-login VTC CLT video quiz
colors:
  tangerine-ground: "#ffe3c2"
  tangerine-fill: "#ffd2a5"
  field-paper: "#fff8ee"
  warm-ink: "#2b1a0c"
  soft-umber: "#6b4f34"
  true-orange: "#d9480f"
  burnt-orange: "#a53a08"
  route-brown: "#a5702f"
  verdict-green: "#22663a"
  verdict-red: "#a02c1e"
typography:
  display:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  score:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 800
    lineHeight: 1.3
  caption:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.45
  meta:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.4
  badge:
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: 0.9rem
    fontWeight: 800
    lineHeight: 1
rounded:
  field: "4px"
  video: "6px"
  marker: "2px"
spacing:
  xs: "0.55rem"
  sm: "0.9rem"
  md: "1.4rem"
  lg: "2.25rem"
components:
  button-primary:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.tangerine-fill}"
    rounded: "{rounded.field}"
    padding: "0.85rem 1.7rem"
  button-primary-hover:
    backgroundColor: "{colors.burnt-orange}"
    textColor: "#ffffff"
  button-primary-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.soft-umber}"
    rounded: "{rounded.field}"
  option:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.95rem"
  option-selected:
    backgroundColor: "{colors.burnt-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.95rem"
---

# Design System: Technology Enhanced Learning at VTC (SHAPE M2)

## Overview

**Creative North Star: "The departmental poster"**

The page IS light orange: one saturated tangerine field carries everything,
and warm near-black typography does the structural work — flat as a
departmental poster pinned to the wall. No cards float, nothing casts a
shadow, no element is rounded into softness. Authority comes from weight
(800-weight display), strong 1.5px ink borders, and one bold color gesture:
the selected answer row.

**Key Characteristics:**
- A saturated tangerine ground (#ffe3c2) covers the entire page; content sits directly on it.
- One family (system sans), weight-driven hierarchy up to 800.
- Flat editorial geometry: square 2px markers, 4px fields, a 6px orange masthead rule.
- Zero elevation — no shadows anywhere; borders and fills do all separation.

## Colors

**Color strategy: Drenched.** The surface is the color — a committed
light-orange field, as the product brief pins. Ink and one true-orange
accent do the rest.

### Primary
- **True Orange** (#d9480f): the 6px masthead rule, active route underline, done-connector, hover borders. Large flat accents only — never small chips.
- **Burnt Orange** (#a53a08): fills that carry white text — selected answer rows, active route badge, submit hover.

### Secondary
- **Tangerine Fill** (#ffd2a5): hover fill on answer rows; the submit button's text color at rest.
- **Field Paper** (#fff8ee): the one paper tone — answer fields and nothing else.

### Neutral
- **Warm Ink** (#2b1a0c): all primary text, borders, route markers, the submit fill.
- **Soft Umber** (#6b4f34): secondary text and the disabled submit's dashed outline.
- **Route Brown** (#a5702f): untraveled connector line.

### Named Rules
**The Verdict Quarantine Rule.** Green and red appear only as the live
reveal on a selected answer (correct = solid green, incorrect = solid red).
Everything else on the surface stays orange/ink.

**The Flat Field Rule.** No shadows, ever. Separation is borders (1.5px ink), fills, and spacing. If an element seems to need a shadow, it needs a border instead.

## Typography

**Display Font:** 'Segoe UI', system-ui, -apple-system, sans-serif
**Body Font:** same family — one family for everything

**Character:** Ink-heavy workhorse sans, pushed to 800 for display. Hierarchy
is weight and size only — no second family, no italics, no uppercase
tracking.

### Hierarchy
- **Display** (800, clamp(2.1→2.75rem), 1.08, −0.025em): the page title, straight on the ground.
- **Score line** (800, 1.5rem, −0.015em): the result statement.
- **Headline** (800, 1.35rem): section headings.
- **Label** (800, 1.02rem): route stop names, sentence case, underline-marked when active.
- **Control** (600, 1rem): option labels.
- **Body** (400, 1.0625rem, 1.6): instructions, note, explanations.
- **Meta** (700, 0.95rem): the count line and masthead meta.
- **Caption** (400, 0.9rem): video caption, route details, hints.
- **Badge** (800, 0.9rem): letter squares and route numerals.

### Named Rules
**The One Family Rule.** Every element is the system sans. Serif faces, italics, uppercase tracked labels, and second families are out of world.

## Layout

A centered shell, max-width 1320px, 1.25rem side padding, with the activity
itself held to ~1000px beside the briefing panel. Order: masthead (title
over a 6px orange rule) → guide panel + workspace → colophon. The shell
splits into a 15rem guide column and the activity column ≥1201px; below that
the guide becomes a disclosure above the activity (collapsed by default on
phones, so the video keeps the top of the screen), and it hides entirely in
expanded video mode.
The workspace is a two-column grid ≥1001px (video 3fr / answers 2fr, 2.25rem
gap, top-aligned); the two route stops live atop their own columns — badge 1
above the video, badge 2 above the answers — and travel with that content at
every size, adjacent on mobile with no connecting line. Options are
full-width single-column rows at every size. Rhythm: 0.55rem inside groups,
1.4rem between control groups, 2.25rem between sections; more space above a
heading than below.

## Elevation & Depth

None. The system is flat by identity: depth is expressed only through fill
(rest paper → hover tangerine fill → selected burnt orange) and border
weight. No box-shadow token exists in this world.

### Named Rules
**The Flat Field Rule.** (See Colors.) Elevation is refused; if a design
seems to need a shadow, redraw it with a border or a fill step.

## Shapes

Square editorial geometry: 2px markers, 4px fields and buttons, 6px video
frame. Borders are 1.5px warm ink at rest. The page's only decorative rule
is the 6px masthead rule; the colophon closes with a 2px ink rule.

## Components

### Button (start again)
- **Rest:** transparent with a 1.5px ink outline, ink label, 800 weight,
  4px radius — quiet, so the verdict rows stay the loudest thing on the page.
- **Hover:** tangerine fill (#ffd2a5), burnt border.
- Reloads the page: a fresh shuffle, a clean slate.

### Option rows
- **Rest:** field paper (#fff8ee), 1.5px ink border, square letter marker (ink-on-tangerine).
- **Hover:** tangerine fill (#ffd2a5), burnt border.
- **Selected — correct:** solid verdict green (#22663a), white label, white
  letter square — the page's one loud gesture.
- **Selected — incorrect:** solid verdict red (#a02c1e), same anatomy.
- Selection reveals the verdict immediately; deselect returns the row to
  rest. Nothing is revealed before selection (amended 14 Sep at facilitator
  request).

### Route stop (signature)
- Two stops only — Watch, Identify — each living atop its own column (the
  stop's label is that column's heading). Numeral in a 1.9rem ink square
  (2px radius); active = burnt orange with white numeral and an underlined
  label; done = soft umber label. No connector: with the label beside the
  badge there is no clean line lane, so the numerals carry the sequence.
- The cue: the stop asking for action pulses its badge (ink ↔ burnt orange,
  1.4s) until the person does what it asks — stop 1 until playback starts,
  stop 2 until the first selection. Under reduced motion the cueing badge
  holds burnt orange instead of pulsing.

### Guide panel (briefing)
- Sticky left column beside the activity: the "How this works" heading, three
  numbered steps in the same square markers as the route stops, and the QR
  code as a bordered field under step 1.
- Flat like everything else: no card, no fill — separation is a 1.5px ink
  column rule. On phones the whole panel collapses to a bordered
  "How this works" disclosure row (▸/▾) above the video.

### Completion celebration
- When the seventh answer lands, a short confetti burst (~2.5s, then gone)
  fires from the completion line, in the page's own palette — true orange,
  burnt orange, tangerine fill, warm ink, verdict green, field paper. It is
  the one place motion runs on its own; everything else answers an action.
- The line itself reads "All 7 identified 🎉" in bold ink.
- Nothing at all runs under `prefers-reduced-motion: reduce` — the line and
  the emoji carry the moment on their own.

### Expand control
- Small outline button at the right of the Watch header. Turns the page into
  a theater: the player spans the full content width on top and the answers
  scroll in their own region beneath (three columns on desktop) — so the
  video keeps playing while people answer. Layout only: the iframe never
  moves, playback never restarts. Expanded state tints the button tangerine
  and relabels it "Collapse video".

## Do's and Don'ts

### Do:
- **Do** let the tangerine ground own the page — content sits on the color, not on white cards.
- **Do** keep everything flat: borders and fill steps, never shadows.
- **Do** keep the selected row as the boldest element on the page.
- **Do** keep route states live (cue pulse → active underline → done umber).

### Don't:
- **Don't** reintroduce the generated-card kit: white rounded cards, soft shadows, pill chips, or circular badges.
- **Don't** use uppercase tracked labels, gradient text, or side-stripe borders.
- **Don't** lighten the ground toward cream (#faf3e9 territory) — the drench is the identity.
- **Don't** add a second type family or serif display.