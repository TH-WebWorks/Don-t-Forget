Don’t Forget – Wireframe Flow

This document is the authoritative behavioral description of the Don’t Forget PWA.

It exists to translate the visual wireframe into a clear, non-ambiguous flow that the system must follow.

This app is not a chat app.
It is a daily orientation ritual with clear start and end points.

Global Principles

The app is opened, used briefly, and closed.

Every interaction has a clear stopping point.

Silence is intentional and valid.

The system closes interactions. The user does not linger.

Memory is minimal and explicit.

No evaluation, praise, or advice.

Daily Structure Overview

A single day is divided into four possible phases:

Onboarding (one time only)

Morning orientation

Midday resurfacing

Evening reflection

Not all phases must occur every day.

Onboarding Flow

Images:

wireframe/onboarding.png

wireframe/onboarding2.png

wireframe/onboarding3.png

Purpose:

Establish tone

Establish safety

Capture a high-level sense of direction

Introduce the idea that the system will remember on the user’s behalf

Behavior rules:

Sequential screens, top to bottom

One question per screen

User input is text only

No validation, no praise, no interpretation

The system mirrors or acknowledges, then advances

Memory rules:

Early onboarding inputs are considered candidates only

Final onboarding screen commits:

intention

value or theme

Emotional language is not stored

Exit:

Final screen explicitly closes the interaction

No input field remains

The system communicates that it will remember this

Morning Orientation

Image:

wireframe/morning.png

Trigger:

First app open of the day

Purpose:

Orient the user before the day takes over

Decide what is worth holding in mind today

Behavior:

One primary prompt

Single text input

No follow-up questions

No conversation continuation

Memory rules:

On submit, write:

today’s intention

optional practical items if explicitly stated

Do not store emotional framing

Closure:

After submission, the UI becomes read-only

Keyboard is dismissed

The system signals completion

The user is implicitly encouraged to leave

Midday Resurfacing

Image:

wireframe/midday.png

Trigger:

User returns after approximately 30–60 minutes

Or user opens the app again later the same day

Purpose:

Re-orient without demanding engagement

Surface what the user already decided mattered

Behavior:

Default state is read-only

The system shows:

“Here’s what you said mattered today”

No prompt by default

Optional interaction:

An explicit “Add a thought” action may appear

Input only appears if the user opts in

Memory rules:

Reading does not modify memory

Optional added thoughts may be appended

No rewriting or reinterpreting previous input

Closure:

After reading, nothing else is required

The user can leave without action

Evening Reflection

Image:

wireframe/evening.png

Trigger:

Later in the day

Or user explicitly opens the app in the evening

Purpose:

Close the loop

Allow reflection without judgment

Preserve continuity, not performance

Behavior:

One reflection prompt

Single text input

No evaluation

No advice

No encouragement

Memory rules:

Reflection may be stored as:

pattern signals

short summary

Do not store self-criticism or emotional spikes

Closure:

After submission, interaction ends

No further prompts

The system does not ask questions

The UI clearly indicates completion

Next-Day Carry Forward

Occurs automatically on the next day.

Behavior:

The system may surface:

yesterday’s intention

unresolved practical items

The system does not comment on progress

User choice:

“Keep in mind”

“Not today”

Memory rules:

“Keep in mind” retains the item

“Not today” suppresses it without guilt

Suppressed items are not repeatedly resurfaced

Silence and Non-Interaction States

The system must remain silent when:

The user is typing

The user submits an entry

The user skips a phase

The system has nothing useful to add

Silence is a valid outcome.

Explicit Non-Goals

This app does not include:

Continuous chat

Message history

Feeds or timelines

Scores, streaks, or metrics

Optimization language

Accountability framing

Final Rule

If the system is unsure whether to speak, it must not speak.