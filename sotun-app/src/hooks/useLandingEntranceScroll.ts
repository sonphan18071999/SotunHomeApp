'use client';

import type { RefObject } from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SCROLL_TRIGGER_START_REVEAL = 'top 85%';
const SCROLL_TRIGGER_START_3D = 'top 90%';
const SCROLL_TRIGGER_END_3D = 'top 35%';
const SCROLL_SCRUB_SMOOTHING = 0.65;
const REVEAL_STAGGER = 0.07;
const REVEAL_DURATION = 0.85;
const IMAGE_PARALLAX_START_PERCENT = 6;
const IMAGE_PARALLAX_END_PERCENT = -6;

/**
 * Scroll choreography for the guest landing: reveal copy as each “room” enters,
 * rotateperspective / scrub on the hero frame, and subtle image parallax.
 */
export function useLandingEntranceScroll(
  rootRef: RefObject<HTMLElement | null>,
  dependencyKey: string
): void {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root == null) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = Array.from(root.querySelectorAll<HTMLElement>('.landing-scroll-section'));

      sections.forEach((section) => {
        const stage = section.querySelector<HTMLElement>('.landing-3d-stage');
        const reveals = section.querySelectorAll<HTMLElement>('.landing-reveal');
        const img = section.querySelector<HTMLImageElement>('.landing-3d-img');

        if (reveals.length > 0) {
          gsap.set(reveals, { y: 40, opacity: 0 });
          gsap.to(reveals, {
            y: 0,
            opacity: 1,
            duration: REVEAL_DURATION,
            stagger: REVEAL_STAGGER,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: SCROLL_TRIGGER_START_REVEAL,
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          });
        }

        if (stage != null) {
          gsap.fromTo(
            stage,
            {
              rotateX: 16,
              rotateY: -14,
              y: 72,
              opacity: 0,
              scale: 0.94,
              transformOrigin: 'center center',
            },
            {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: SCROLL_TRIGGER_START_3D,
                end: SCROLL_TRIGGER_END_3D,
                scrub: SCROLL_SCRUB_SMOOTHING,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (img != null && stage != null) {
          gsap.fromTo(
            img,
            { yPercent: IMAGE_PARALLAX_START_PERCENT },
            {
              yPercent: IMAGE_PARALLAX_END_PERCENT,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, dependencyKey]);
}
