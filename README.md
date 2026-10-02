# Countdown Timer — Project Documentation

A lightweight, responsive Countdown Timer web application built with vanilla **HTML5**, **CSS3**, and **JavaScript**, adhering to the project brief from **Veda Technology**.

---

## 1. Project Overview

The objective is to implement a real-time event timer displaying days, hours, minutes, and seconds remaining until a specified target date. This project demonstrates core JavaScript fundamentals:
* Manipulating native JavaScript `Date` objects and epoch timestamps.
* Conducting temporal mathematics with the modulo and floor operations.
* Managing recurring execution loops with `setInterval` and halting them with `clearInterval`.
* Applying dynamic DOM updates and managing conditional UI states.

---

## 2. Technical Approach

### Temporal Arithmetic
The remaining duration is computed by taking the difference between the target date timestamp and the current system timestamp:

$$\Delta t = t_{\text{target}} - t_{\text{current}}$$

Where:
* $t_{\text{target}} = \text{Date.parse(targetDate)}$ (in milliseconds since epoch)
* $t_{\text{current}} = \text{Date.now()}$ (in milliseconds since epoch)

### Unit Conversions & Derivations
Using the standard SI base conversions for time:
* $1\text{ s} = 1{,}000\text{ ms}$
* $1\text{ min} = 60 \times 1{,}000\text{ ms} = 60{,}000\text{ ms}$
* $1\text{ hr} = 60 \times 60{,}000\text{ ms} = 3{,}600{,}000\text{ ms}$
* $1\text{ day} = 24 \times 3{,}600{,}000\text{ ms} = 86{,}400{,}000\text{ ms}$

The individual date units are isolated using integer division ($\lfloor \cdot \rfloor$) and remainder modulo operations ($\%$):

$$\text{Days} = \left\lfloor \frac{\Delta t}{86{,}400{,}000} \right\rfloor$$

$$\text{Hours} = \left\lfloor \frac{\Delta t \pmod{86{,}400{,}000}}{3{,}600{,}000} \right\rfloor$$

$$\text{Minutes} = \left\lfloor \frac{\Delta t \pmod{3{,}600{,}000}}{60{,}000} \right\rfloor$$

$$\text{Seconds} = \left\lfloor \frac{\Delta t \pmod{60{,}000}}{1{,}000} \right\rfloor$$

### Execution & Lifecycle Strategy
1. **Immediate Initial Invocation**: `updateCountdown()` runs synchronously on page load to eliminate the 1-second blank flash common in naive timer scripts.
2. **Periodic Interval**: `setInterval(updateCountdown, 1000)` executes every second to keep the clock synchronous with the system clock.
3. **Graceful Teardown**: When $\Delta t \le 0$, the interval is terminated via `clearInterval(timerInterval)` to conserve CPU resources and prevent negative countdown values.
4. **Number Formatting**: All computed values are passed through string padding (`String.prototype.padStart(2, '0')`) to ensure consistent two-digit displays (`09`, `08`, etc.).

---

## 3. Project Outcomes & Deliverables

| Deliverable | Verification & Outcome |
| :--- | :--- |
| **Real-Time DOM Updates** | Days, hours, minutes, and seconds update at a steady 1-second cadence without DOM thrashing. |
| **Configurable Target Date** | Easily configurable in `script.js` via the `TARGET_DATE` variable, with dynamic recalculation upon update. |
| **Zero-State Handling** | Counters lock to `"00"`, the active grid dims, and an event completion banner is revealed dynamically. |
| **Clean Separation of Concerns** | Structural layout (`index.html`), presentation and glassmorphism styling (`style.css`), and business logic (`script.js`) remain cleanly decoupled. |
| **Responsive Design** | Uses CSS Grid to adjust from a 4-column layout on desktop to a 2x2 layout on mobile devices. |

---

## 4. Setup and Execution

1. Ensure `index.html`, `style.css`, and `script.js` reside in the same directory.
2. Open `index.html` in any modern web browser.