import { useEffect, useRef, useState } from "react";

const supportItems = [
  {
    title: "Grief & loss",
    copy: "A person, a relationship, a season, a role, a version of yourself, or the life you thought you would have by now.",
  },
  {
    title: "Midlife & perimenopause",
    copy: "Changes in your body, family, faith, work, identity, or direction that have left you wondering who you are becoming.",
  },
  {
    title: "Burnout & overwhelm",
    copy: "The quiet exhaustion that comes from being capable for everyone else while having very little room for yourself.",
  },
];

const approachItems = [
  "We honor grief instead of trying to rush past it.",
  "We notice emotions as signals, not problems to erase.",
  "We stay present with what is true right now.",
  "We look for steady next steps that feel possible.",
];

const processItems = [
  {
    number: "01",
    title: "Arrive",
    copy: "You bring what feels present. You do not need the perfect words or a polished version of your story.",
  },
  {
    number: "02",
    title: "Notice",
    copy: "Together we slow down, name what is happening, and make space for emotions without letting them take over.",
  },
  {
    number: "03",
    title: "Move gently",
    copy: "We choose a next step that supports your real life, your capacity, and the goal you want to move toward.",
  },
];

function CalendarIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5.6 3.2v2.4" />
      <path d="M14.4 3.2v2.4" />
      <path d="M4.1 7.4h11.8" />
      <rect x="3.3" y="4.8" width="13.4" height="12" rx="2.2" />
      <path d="m7.2 12.2 1.7 1.7 3.7-4" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="6.8" />
      <path d="m12.6 7.4-1.4 4-3.8 1.2 1.4-3.8 3.8-1.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="3.2" y="5.2" width="13.6" height="9.6" rx="2" />
      <path d="m4.2 6.5 5.8 4.3 5.8-4.3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="button-arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4.8 10h9.4" />
      <path d="m10.8 6.2 3.8 3.8-3.8 3.8" />
    </svg>
  );
}

export default function App() {
  const assetBase = import.meta.env.BASE_URL;
  const pageRef = useRef(null);
  const aboutPhotos = [
    {
      src: `${assetBase}karissa-coaching-outfit-1.jpg`,
      alt: "Karissa Yeremin in coaching outfit",
    },
    {
      src: `${assetBase}karissa-portrait.jpeg`,
      alt: "Karissa Yeremin smiling outdoors",
    },
  ];
  const [aboutPhotoIndex, setAboutPhotoIndex] = useState(0);
  const showPreviousPhoto = () => {
    setAboutPhotoIndex((currentIndex) =>
      currentIndex === 0 ? aboutPhotos.length - 1 : currentIndex - 1
    );
  };
  const showNextPhoto = () => {
    setAboutPhotoIndex((currentIndex) =>
      currentIndex === aboutPhotos.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return undefined;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return undefined;
    }

    const hero = page.querySelector(".hero");
    const revealTargets = page.querySelectorAll("[data-reveal]");
    page.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12%",
        threshold: 0.16,
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    let frameId = 0;

    const updateHeroDepth = () => {
      if (!hero) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty("--hero-bg-y", `${progress * -28}px`);
      hero.style.setProperty("--hero-light-y", `${progress * 34}px`);
      hero.style.setProperty("--hero-note-y", `${progress * -16}px`);
      hero.style.setProperty("--hero-depth-scale", `${1 + progress * 0.035}`);
      frameId = 0;
    };

    const requestHeroDepth = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateHeroDepth);
      }
    };

    const updatePointerLight = (event) => {
      if (!hero) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
      hero.style.setProperty("--cursor-x", `${Math.min(100, Math.max(0, x))}%`);
      hero.style.setProperty("--cursor-y", `${Math.min(100, Math.max(0, y))}%`);
    };

    updateHeroDepth();
    window.addEventListener("scroll", requestHeroDepth, { passive: true });
    window.addEventListener("resize", requestHeroDepth);
    hero?.addEventListener("pointermove", updatePointerLight, { passive: true });

    return () => {
      page.classList.remove("motion-ready");
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestHeroDepth);
      window.removeEventListener("resize", requestHeroDepth);
      hero?.removeEventListener("pointermove", updatePointerLight);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="page" ref={pageRef}>
      <div className="site-shell">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Sacred Grove Coaching home">
            <img
              className="brand-logo"
              src={`${assetBase}sg-logo-horizontal.svg`}
              alt="Sacred Grove Coaching"
            />
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a href="#support">Who I Help</a>
            <a href="#coaching">Coaching</a>
            <a href="#about">About</a>
            <a href="#connect">Start Here</a>
          </nav>
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-atmosphere" aria-hidden="true">
              <img
                className="hero-background-image"
                src={`${assetBase}hero-background.svg`}
                alt=""
              />
              <div className="hero-leaf-veil" />
              <div className="hero-light-field" />
              <div className="hero-sunbeam" />
              <div className="hero-grain" />
            </div>

            <div className="hero-inner">
              <div className="hero-copy">
                <p className="eyebrow">Grief, transition, and burnout coaching</p>
                <h1>
                  You can come exactly as you are.
                </h1>
                <p className="hero-body">
                  I offer a gentle, grounded coaching space for women in midlife
                  who are carrying grief, loss, transition, or burnout and want
                  support finding their next steady step. Sessions are available
                  virtually by Zoom.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#connect">
                    <CalendarIcon />
                    <span className="button-label">Book a conversation</span>
                    <ArrowRightIcon />
                  </a>
                  <a className="button button-secondary" href="#coaching">
                    <CompassIcon />
                    <span className="button-label">Learn how coaching works</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
              <aside className="hero-note">
                <p>
                  Grief is not something to fix. It is something to honor, make
                  room for, and learn how to live with.
                </p>
              </aside>
            </div>
          </section>

          <section className="section support-section" id="support" data-reveal>
            <div className="section-kicker">Who I support</div>
            <div className="support-lead">
              <h2>
                This is for the woman who looks like she is holding it together,
                but inside feels tender, tired, or changed.
              </h2>
              <p>
                You may not even know exactly what to call what you are going
                through. You just know something has shifted, and you need a
                safe place to be honest about it.
              </p>
            </div>
            <div className="support-grid">
              {supportItems.map((item, index) => (
                <article
                  key={item.title}
                  className="support-item"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section belief-section" data-reveal>
            <div>
              <p className="eyebrow">What I believe</p>
              <h2>Your emotions are not the enemy.</h2>
            </div>
            <div className="belief-copy">
              <p>
                I believe there are no “bad” emotions. Emotions are signals.
                They help us notice what is happening in our inner world, and
                they are often connected to how we are experiencing life in our
                bodies, relationships, and choices.
              </p>
              <p>
                In coaching, we make room for those emotions without treating
                them like something shameful or broken. We listen, get curious,
                and look for what support might help you feel more grounded.
              </p>
            </div>
          </section>

          <section className="section approach-section" id="coaching" data-reveal>
            <div className="approach-copy">
              <p className="eyebrow">How I support you</p>
              <h2>A safe space to be present, tell the truth, and choose what comes next.</h2>
            </div>
            <ul className="approach-list">
              {approachItems.map((item, index) => (
                <li
                  key={item}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="section boundary-section">
            <article data-reveal>
              <p className="eyebrow">What coaching is</p>
              <h3>A partnership.</h3>
              <p>
                Coaching is client-led and present-focused. You bring what you
                are struggling with or working toward, and together we create a
                plan that supports the goal you want to move toward.
              </p>
            </article>
            <article data-reveal style={{ "--reveal-delay": "90ms" }}>
              <p className="eyebrow">What coaching is not</p>
              <h3>Therapy.</h3>
              <p>
                I am not a therapist, and this work is not diagnosis, trauma
                treatment, or clinical mental health care. If therapy is the
                right support, coaching can sit alongside that care with clear
                boundaries.
              </p>
            </article>
          </section>

          <section className="section process-section" data-reveal>
            <div className="section-kicker">How coaching works</div>
            <div className="process-grid">
              {processItems.map((item, index) => (
                <article
                  key={item.number}
                  className="process-item"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section about-section" id="about">
            <div className="about-copy" data-reveal>
              <p className="eyebrow">Why Karissa</p>
              <h2>I know what it means to walk with grief and still keep living.</h2>
              <p>
                My own experiences with grief are part of why I care so deeply
                about this work. I am empathetic, steady, and a good listener.
                Years of mentoring in school and church settings have shaped the
                way I sit with people, ask questions, and help them feel less
                alone in hard seasons.
              </p>
              <blockquote>
                “Karissa helped me feel grounded. She helped me identify what I
                was feeling without letting those feelings overwhelm me.”
              </blockquote>
            </div>
            <figure className="about-photo" data-reveal style={{ "--reveal-delay": "110ms" }}>
              <div className="about-photo-slider" aria-live="polite">
                <div
                  className="about-photo-track"
                  style={{ transform: `translateX(-${aboutPhotoIndex * 100}%)` }}
                >
                  {aboutPhotos.map((photo) => (
                    <img key={photo.src} src={photo.src} alt={photo.alt} />
                  ))}
                </div>
              </div>
              <div className="about-photo-footer">
                <figcaption>
                  Coaching with Karissa is gentle, client-led, and grounded in
                  honest presence.
                </figcaption>
                <div className="photo-controls" aria-label="Karissa photo controls">
                  <button
                    className="photo-arrow"
                    type="button"
                    aria-label="Show previous Karissa photo"
                    onClick={showPreviousPhoto}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                      <path d="M12.8 4.6 7.4 10l5.4 5.4" />
                    </svg>
                  </button>
                  <span className="photo-count">
                    {aboutPhotoIndex + 1}/{aboutPhotos.length}
                  </span>
                  <button
                    className="photo-arrow"
                    type="button"
                    aria-label="Show next Karissa photo"
                    onClick={showNextPhoto}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                      <path d="m7.2 4.6 5.4 5.4-5.4 5.4" />
                    </svg>
                  </button>
                </div>
              </div>
            </figure>
          </section>

          <section className="section closing-section" id="connect" data-reveal>
            <div>
              <p className="eyebrow">Start here</p>
              <h2>You do not have to know exactly what to say before you reach out.</h2>
              <p>
                If you are carrying grief, transition, or burnout and want a
                steady place to begin, I would be honored to meet you there.
                You do not have to have the perfect words before we start.
              </p>
              <a className="button button-primary button-wide" href="mailto:karissa@example.com">
                <MailIcon />
                <span className="button-label">Book a conversation</span>
                <ArrowRightIcon />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
