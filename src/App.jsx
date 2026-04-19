import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BatteryWarning,
  Butterfly,
  CalendarHeart,
  CompassRose,
  DoorOpen,
  EnvelopeSimple,
  Eye,
  FlowerLotus,
  Footprints,
  HandHeart,
  HeartBreak,
  List,
  Pulse,
  Signpost,
  X,
} from "@phosphor-icons/react";

const supportItems = [
  {
    icon: "loss",
    title: "Grief & loss",
    copy: (
      <>
        A person, a relationship, a season, a role, a version of yourself, or
        <strong> the life you thought you would have by now</strong>.
      </>
    ),
  },
  {
    icon: "transition",
    title: "Midlife & perimenopause",
    copy: (
      <>
        Changes in your body, family, faith, work, identity, or direction that
        have left you wondering <em>who you are becoming</em>.
      </>
    ),
  },
  {
    icon: "restore",
    title: "Burnout & overwhelm",
    copy: (
      <>
        The quiet exhaustion that comes from being capable for everyone else
        while having <strong>very little room for yourself</strong>.
      </>
    ),
  },
];

const approachItems = [
  {
    icon: "honor",
    copy: (
      <>
        We <strong>honor grief</strong> instead of trying to rush past it.
      </>
    ),
  },
  {
    icon: "signal",
    copy: (
      <>
        We notice emotions as <strong>signals</strong>, not problems to erase.
      </>
    ),
  },
  {
    icon: "presence",
    copy: (
      <>
        We stay present with what is <em>true right now</em>.
      </>
    ),
  },
  {
    icon: "steps",
    copy: (
      <>
        We look for <strong>steady next steps</strong> that feel possible.
      </>
    ),
  },
];

const processItems = [
  {
    icon: "arrive",
    number: "01",
    title: "Arrive",
    copy: (
      <>
        You bring what feels present. You do not need the perfect words or a
        polished version of your story.
      </>
    ),
  },
  {
    icon: "notice",
    number: "02",
    title: "Notice",
    copy: (
      <>
        Together we slow down, name what is happening, and make space for
        emotions without letting them take over.
      </>
    ),
  },
  {
    icon: "move",
    number: "03",
    title: "Move gently",
    copy: (
      <>
        We choose a next step that supports your real life, your capacity, and
        the goal you want to move toward.
      </>
    ),
  },
];

const navItems = [
  { label: "Who I Help", href: "#support" },
  { label: "Coaching", href: "#coaching" },
  { label: "About", href: "#about" },
];

const iconShapes = {
  arrive: DoorOpen,
  honor: HandHeart,
  loss: HeartBreak,
  move: Signpost,
  notice: Eye,
  presence: FlowerLotus,
  restore: BatteryWarning,
  signal: Pulse,
  steps: Footprints,
  transition: Butterfly,
};

function TextIcon({ name, className = "text-icon" }) {
  const Icon = iconShapes[name] || FlowerLotus;

  return (
    <span className={className} aria-hidden="true">
      <Icon weight="duotone" focusable="false" />
    </span>
  );
}

function ButtonIcon({ icon: Icon, className = "button-icon", weight = "regular" }) {
  return <Icon className={className} weight={weight} aria-hidden="true" focusable="false" />;
}

function SectionSymbol({ name, className = "" }) {
  return (
    <span className={`section-symbol ${className}`} aria-hidden="true">
      <TextIcon name={name} className="section-symbol-icon" />
    </span>
  );
}

function BrandLogo({ assetBase }) {
  return (
    <span className="brand-logo" aria-hidden="true">
      <img
        className="brand-mark"
        src={`${assetBase}sg-mark.png`}
        alt=""
        width="292"
        height="306"
      />
      <span className="brand-wordmark">
        <span className="brand-name">Sacred Grove</span>
        <span className="brand-subtitle">Coaching</span>
      </span>
    </span>
  );
}

export default function App() {
  const assetBase = import.meta.env.BASE_URL;
  const pageRef = useRef(null);
  const aboutPhotos = [
    {
      src: `${assetBase}karissa-coaching-outfit-1.jpg`,
      alt: "Karissa Yeremin in coaching outfit",
      focalPoint: "center 18%",
      width: 640,
      height: 800,
    },
    {
      src: `${assetBase}karissa-portrait.jpeg`,
      alt: "Karissa Yeremin smiling outdoors",
      focalPoint: "center 34%",
      width: 400,
      height: 400,
    },
  ];
  const [aboutPhotoIndex, setAboutPhotoIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showPreviousPhoto = () => {
    setAboutPhotoIndex((currentIndex) =>
      currentIndex === 0 ? aboutPhotos.length - 1 : currentIndex - 1
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("nav-open", isMenuOpen);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("nav-open");
    };
  }, [isMenuOpen]);

  return (
    <div className="page" ref={pageRef}>
      <div className="site-shell">
        <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
          <a className="brand" href="#top" aria-label="Sacred Grove Coaching home">
            <BrandLogo assetBase={assetBase} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="primary-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
            {isMenuOpen ? (
              <ButtonIcon icon={X} className="menu-toggle-icon" />
            ) : (
              <ButtonIcon icon={List} className="menu-toggle-icon" />
            )}
          </button>
          <nav className="site-nav" id="primary-menu" aria-label="Primary">
            <div className="site-nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>
            <a className="nav-cta" href="#connect" onClick={closeMenu}>
              <span>Start Here</span>
              <ButtonIcon icon={ArrowRight} className="button-arrow" />
            </a>
          </nav>
          <button
            className="menu-scrim"
            type="button"
            aria-label="Close navigation menu"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={closeMenu}
          />
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-atmosphere" aria-hidden="true">
              <img
                className="hero-background-image"
                src={`${assetBase}hero-background.svg`}
                alt=""
                width="1600"
                height="700"
                fetchpriority="high"
              />
              <div className="hero-light-field" />
              <div className="hero-grain" />
            </div>

            <div className="hero-inner">
              <div className="hero-copy">
                <p className="eyebrow">Grief, transition, and burnout coaching</p>
                <h1>
                  You can come <span className="title-accent">exactly as you are.</span>
                </h1>
                <p className="hero-body">
                  I offer a <strong>gentle, grounded coaching space</strong> for
                  women in midlife who are carrying grief, loss, transition, or
                  burnout and want support finding their next steady step.
                  Sessions are available virtually by Zoom.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#connect">
                    <ButtonIcon icon={CalendarHeart} weight="duotone" />
                    <span className="button-label">Book a conversation</span>
                    <ButtonIcon icon={ArrowRight} className="button-arrow" />
                  </a>
                  <a className="button button-secondary" href="#coaching">
                    <ButtonIcon icon={CompassRose} weight="duotone" />
                    <span className="button-label">Learn how coaching works</span>
                    <ButtonIcon icon={ArrowRight} className="button-arrow" />
                  </a>
                </div>
              </div>
              <aside className="hero-note">
                <p>
                  Grief is <strong>not something to fix</strong>. It is
                  something to honor, make room for, and learn how to live with.
                </p>
              </aside>
            </div>
          </section>

          <section className="section support-section" id="support" data-reveal>
            <div className="section-kicker">Who I support</div>
            <div className="support-lead">
              <h2>
                This is for the woman who looks like she is holding it together,
                but inside feels <span className="title-accent">tender, tired, or changed</span>.
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
                  <div className="support-item-header">
                    <TextIcon name={item.icon} className="support-icon" />
                    <div>
                      <span className="support-index">0{index + 1}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section belief-section" data-reveal>
            <div className="belief-heading">
              <SectionSymbol name="signal" />
              <p className="eyebrow">What I believe</p>
              <h2>Your emotions are <span className="title-accent">not the enemy</span>.</h2>
            </div>
            <div className="belief-copy">
              <p>
                I believe there are no <strong>“bad” emotions</strong>. Emotions
                are <strong>signals</strong>. They help us notice what is
                happening in our inner world, and they are often connected to how
                we are experiencing life in our bodies, relationships, and choices.
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
              <SectionSymbol name="presence" className="section-symbol-calm" />
              <p className="eyebrow">How I support you</p>
              <h2>
                A safe space to be <span className="title-accent">present</span>,
                tell the truth, and choose what comes next.
              </h2>
            </div>
            <ul className="approach-list">
              {approachItems.map((item, index) => (
                <li
                  key={`approach-${index}`}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <TextIcon name={item.icon} className="list-icon" />
                  <span>{item.copy}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="section boundary-section">
            <article data-reveal>
              <div className="boundary-heading">
                <TextIcon name="honor" className="boundary-icon" />
                <div>
                  <p className="eyebrow">What coaching is</p>
                  <h3>A partnership.</h3>
                </div>
              </div>
              <p>
                Coaching is <strong>client-led and present-focused</strong>. You
                bring what you are struggling with or working toward, and
                together we create a plan that supports the goal you want to move
                toward.
              </p>
            </article>
            <article data-reveal style={{ "--reveal-delay": "90ms" }}>
              <div className="boundary-heading">
                <TextIcon name="notice" className="boundary-icon" />
                <div>
                  <p className="eyebrow">What coaching is not</p>
                  <h3>Therapy.</h3>
                </div>
              </div>
              <p>
                I am <strong>not a therapist</strong>, and this work is not
                diagnosis, trauma treatment, or clinical mental health care. If
                therapy is the right support, coaching can sit alongside that
                care with <strong>clear boundaries</strong>.
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
                  <div className="process-meta">
                    <span className="process-number">{item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section about-section" id="about">
            <div className="about-copy" data-reveal>
              <p className="eyebrow">Why Karissa</p>
              <h2>
                I know what it means to walk with grief and
                <span className="title-accent"> still keep living</span>.
              </h2>
              <p>
                My own experiences with grief are part of why I care so deeply
                about this work. I am empathetic, steady, and a good listener.
                Years of mentoring in school and church settings have shaped the
                way I sit with people, ask questions, and help them feel less
                alone in hard seasons.
              </p>
              <blockquote>
                “Karissa helped me feel <strong>grounded</strong>. She helped
                me identify what I was feeling without letting those feelings
                overwhelm me.”
              </blockquote>
            </div>
            <figure className="about-photo" data-reveal style={{ "--reveal-delay": "110ms" }}>
              <div className="about-photo-slider" aria-live="polite">
                <div
                  className="about-photo-track"
                  style={{ transform: `translateX(-${aboutPhotoIndex * 100}%)` }}
                >
                  {aboutPhotos.map((photo) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      style={{ objectPosition: photo.focalPoint }}
                    />
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
              <h2>
                You do not have to know <span className="title-accent">exactly
                what to say</span> before you reach out.
              </h2>
              <p>
                If you are carrying <strong>grief, transition, or burnout</strong>
                and want a steady place to begin, I would be honored to meet you
                there. You do not have to have the perfect words before we start.
              </p>
              <a className="button button-primary button-wide" href="mailto:karissa@example.com">
                <ButtonIcon icon={EnvelopeSimple} weight="duotone" />
                <span className="button-label">Book a conversation</span>
                <ButtonIcon icon={ArrowRight} className="button-arrow" />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
