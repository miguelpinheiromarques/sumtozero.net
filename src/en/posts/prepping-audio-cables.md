---
title: Prepping audio cables
description: When it comes to building custom audio cables, soldering gets all the glory. But a reliable, lifetime-guaranteed cable is born before the iron is even turned on. Proper cable prepping—specifically stripping and sleeving—is the unsung hero that dictates mechanical strength and longevity.
date: 2026-05-10
author: Miguel Pinheiro Marques
translationKey: "cableprepping"
permalink: "/en/posts/prepping-audio-cables/"
tags: ["Studio Design"]
---

Soldering gets all the glory in cable building. Everyone obsesses over solder alloys, iron temperatures, and shiny joints. But a cable that lasts a lifetime is built before the iron even gets turned on. No amount of soldering skill fixes sloppy prep work.

How you strip the conductors and sleeve the assemblies is what actually determines whether a cable holds up for years or fails in six months. Here's how I prep my cables, why certain materials matter, and why I use mechanical sleeving instead of heat shrink.

{% image "src/static/img/cable_prepped.png", "A stripped audio cable, before & after being prepped.", "100vw", "article-image", "lazy" %}
#### Image 1. A stripped audio cable, before & after being prepped.

---

## 1. Selecting the right raw materials

A good cable starts well before you touch a wire. It starts with sourcing decent components and understanding what you're actually buying.

### Regional brands and sourcing
I source locally or regionally whenever I can. Shipping costs and import fees add up fast. In Europe, two brands do the job well:

- **Sommer Cable:** Made in Germany. My go-to choices are the **SC-Isopod SO-F22** and the **SC-Mistral MCF** multipair.
- **Van Damme:** A UK brand, though several models are manufactured in the EU. The **Blue Series Studio Grade** range is solid for general wiring, and the **Van Damme White Line AES/EBU 1 pair LSZH Ecoflex** works great for interconnects. Post-Brexit logistics make them a bit harder to get in the EU, but they're still worth tracking down.

### Conductor choice: purity and diameter
Before you look at the jacket, look at the copper.

**Purity (OFC):** Go for **OFC (Oxygen-Free Copper)**. The sonic argument for OFC is debated endlessly in hi-fi circles. The mechanical argument isn't. OFC oxidises much more slowly, so your cable won't go green and brittle inside the jacket five years from now.

**Diameter/Cross-Section:** For line-level studio interconnects, you want conductors around **0.22mm² to 0.25mm² (24 AWG to 23 AWG)**. Thick enough to keep resistance low and hold up mechanically. Thin enough to actually fit into standard connector solder cups.

**Stranded vs. Solid Core:** Always stranded for studio work. Solid core is fine for permanent in-wall runs. But anything that gets flexed, coiled, or handled needs stranded copper. No exceptions.

### Capacitance
When reading spec sheets, **capacitance** (pF/m) is the number to pay attention to. A cable behaves like a capacitor. Combined with the output impedance of your gear, it creates an RC low-pass filter. Longer runs and higher capacitance mean more high-frequency rolloff. If a manufacturer doesn't publish capacitance specs, move on.

### Jacketing materials and LSZH
The jacket affects flexibility, durability, and safety.

- **PVC:** The standard. Flexible, affordable, easy to strip. Works fine for most studio applications.
- **PUR (Polyurethane):** Tough, abrasion-resistant, and cut-proof. Overkill for permanent studio installs, but great on stage where cables get stepped on constantly.

LSZH is worth understanding because it gets misused a lot. It's not a material. It's a classification. PVC contains chlorine, which is a halogen. LSZH jackets use alternative compounds, usually flame-retardant polyolefins, with no halogens. In a fire, they won't put out toxic gases or thick black smoke.

### The "unshielded" approach
Heavy braided shields are durable, but they add bulk, stiffness, and a lot of capacitance.

For short studio runs with balanced connections, I use what people call the "unshielded" approach. To be clear, truly unshielded bulk audio wire barely exists. When studio techs say unshielded for interconnects, they mean **foil shield with a drain wire**.

The foil gives you full RFI coverage. But structurally the cable acts like it has no shield at all. Prep is fast. You just tear off the foil, isolate the drain wire, and solder. Capacitance drops significantly, the cable stays flexible, and it's perfect for racks and permanent installs.

---

## 2. Precision stripping

Consistency matters more than speed here. Nick the inner copper strands while stripping and you've created a weak point that will fail eventually. It always does.

### The tools
No affiliate links here. The tools I use are from **Knipex**, and the reason is simple: they're consistent. They make a tool for every part of the job. Cutting, stripping fine inner conductors, stripping thicker individual cables, stripping heavy outer jackets. Whatever diameter you're working with, there's a Knipex tool for it. The photo below gives you a good idea of the range I keep on the bench.

{% image "src/static/img/knipex_tools.png", "Several stripping tools from Knipex.", "100vw", "article-image", "lazy" %}
#### Image 2. A bunch of my stripping tools, all from Knipex, for inner jacketing and outer jacketing, for different diameter cables (from thin single cables to multicore looms).

### Stripping lengths
- **Outer jacket:** Strip back **15mm to 20mm**. The connector's internal clamp needs to grip the thick outer jacket, not the thin inner wires.
- **Inner conductors:** Strip back **3mm to 4mm**. Just enough bare copper to fill the solder cup.

---

## 3. Professional sleeving: the Hellermann system

I've never been a fan of heat shrink. It needs heat that can soften the conductor insulation, and it covers up the solder joint completely. If something goes wrong later, you can't see it. Using heat shrink on a joint is like painting over a crack in the wall. You're not fixing anything, just hiding it.

Instead I use the **Hellermann mechanical sleeving system**. The sleeve goes over the transition where the outer jacket ends. It gives the cable proper mechanical support right where it needs it.

### Tools, sleeves, and lubrication
You need the <a href="https://www.hellermanntyton.com/products/application-tools-for-sleeves/ss/621-80008" target="_blank">Hellermann SS tool</a> to apply them. It's a three-pronged expansion tool that stretches the sleeve open so you can slide it over the cable end.

{% image "src/static/img/hellerman_tool.png", "Hellerman SS tool inserting a sleeve on an audio cable.", "100vw", "article-image", "lazy" %}
#### Image 3. Hellerman SS tool inserting a sleeve on an audio cable.

I use **H20** sleeves (model PRSH20X20BK) for most applications. They're not pre-lubricated, so you need a drop of <a href="https://www.hellermanntyton.com/products/chemicals/hellerine-m-284-ml/625-00001" target="_blank">Hellerine M oil</a> to get them on cleanly. The **A1** sleeves are slightly larger and come pre-lubricated. No oil needed. They fit most multipairs up to 4 channels, sometimes 8, and they come in a range of colours which is handy for labelling runs in a complex loom.

### Ground isolation
In a lot of low-capacitance cables, the drain wire has no insulation jacket. Leave it bare and it can touch the connector chassis and cause a short. I slip a short <a href="https://pt.rs-online.com/web/p/fundas-para-cables/0399401?gb=a" target="_blank">1mm silicone sleeve</a> over it to keep it isolated all the way to the solder pin. The H20 sleeve holds it in place.

---

## Prep hard, solder easy

Building your own cables is satisfying work. But the ones that last aren't built around expensive solder. They're built around good prep.

Get the materials right, understand what you're working with, and use proper mechanical sleeving. Do that and the soldering becomes the easy part.

Take your time, measure twice, strip cleanly, and sleeve properly.