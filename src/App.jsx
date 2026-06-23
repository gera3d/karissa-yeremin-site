import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BatteryWarning,
  CalendarHeart,
  DownloadSimple,
  DoorOpen,
  Eye,
  FilePdf,
  FlowerLotus,
  Footprints,
  HandHeart,
  HeartBreak,
  List,
  Play,
  Pulse,
  Signpost,
  Waveform,
  X,
} from "@phosphor-icons/react";

const supportItems = [
  {
    icon: "loss",
    title: "Grief & loss",
    copy: (
      <>
        A person, a relationship, a season, a role, a version of yourself, or
        <strong> the life you thought you would have</strong>.
      </>
    ),
  },
  {
    icon: "restore",
    title: "Burnout & overwhelm",
    copy: (
      <>
        A quiet, steady exhaustion from holding so much for so long, without a
        place to put it down.
      </>
    ),
  },
];

const bookingLinks = {
  coachingSession:
    "https://calendar.google.com/appointments/schedules/AcZssZ2NjsBa_Xbe8TJ4o-TgdMMwBD42MLL6iLg52GhdyJLTapMPzDdsvQSPOPa0_ivsR-KdQDDiybng",
  connectionCall: "https://calendar.app.google/vfEKVHeU9U3e1Bca9",
};

const paymentLinks = {
  individualSession: import.meta.env.VITE_STRIPE_INDIVIDUAL_SESSION_LINK || "",
  sixSessionPackage: "https://buy.stripe.com/6oU7sE7DVfGy493bZX3cc04",
  twelveSessionPackage: "https://buy.stripe.com/28E14g4rJgKC20VbZX3cc05",
  customAmount: "https://buy.stripe.com/5kQ00c4rJgKC9tnbZX3cc03",
};

const resourceLinks = {
  hiddenFormsOfGrief: "5-hidden-forms-of-grief.pdf",
};

const sessionOptions = [
  {
    icon: "notice",
    label: "Start here",
    title: "Connection call",
    duration: "20 minutes",
    href: bookingLinks.connectionCall,
    action: "Book a Connection Call",
    copy:
      "This complimentary 20-minute call is a chance for us to connect and explore what's bringing you here. You don't need to have the right words; just come as you are. There's no pressure to move forward, just space to feel into what you need and how I might be able to support you.",
  },
  {
    icon: "steps",
    label: "Continue",
    title: "One-on-one coaching session",
    duration: "60 minutes",
    href: bookingLinks.coachingSession,
    action: "Book a full session",
    copy:
      "This 60-minute coaching session is a space to pause, reflect, and reconnect with yourself, and then move forward in a way that feels grounded and aligned with who you are.",
  },
];

const paymentOptions = [
  {
    icon: "presence",
    label: "Single session",
    title: "Individual coaching session",
    price: "$120",
    detail: "One 60-minute virtual coaching session with Karissa.",
    href: paymentLinks.individualSession,
    action: "Pay for one session",
  },
  {
    icon: "honor",
    label: "Package",
    title: "Six-session package",
    price: "$650",
    detail: "Six 60-minute virtual sessions for steady continuity.",
    href: paymentLinks.sixSessionPackage,
    action: "Pay for six sessions",
  },
  {
    icon: "steps",
    label: "Package",
    title: "Twelve-session package",
    price: "$1,100",
    detail: "Twelve 60-minute virtual sessions for deeper long-term support.",
    href: paymentLinks.twelveSessionPackage,
    action: "Pay for twelve sessions",
  },
  {
    icon: "restore",
    label: "Custom",
    title: "Custom package",
    price: "Custom",
    detail:
      "Use this after Karissa has agreed to a custom package or adjusted amount.",
    href: paymentLinks.customAmount,
    action: "Pay for custom package",
  },
].filter((option) => option.href);

const navigatingGriefLinks = {
  application: "https://forms.gle/VguGezB2AardaaZd8",
  connectionCall: "https://calendar.app.google/Y4qhhxcPmCiwfF1o6",
  email: "karissa@thesacredgrovecoach.com",
};

const griefExpectations = [
  "Six 90-minute virtual sessions, held weekly via Google Meet",
  "A small, intimate group - no more than 8 participants",
  "A guided participant workbook with weekly reflections, exercises, and journal space",
  "A space rooted in compassion, confidentiality, and zero pressure to be “further along” than you are",
  "Between-session support via email for brief questions or reflections",
];

const griefWeeks = [
  {
    week: "Week 1",
    title: "Understanding Grief",
    focus: "Why Yours Counts",
  },
  {
    week: "Week 2",
    title: "The Many Faces of Grief",
    focus: "Body, Mind, and Behavior",
  },
  {
    week: "Week 3",
    title: "Ambiguous Loss",
    focus: "Grief Without Closure",
  },
  {
    week: "Week 4",
    title: "Chronic Sorrow",
    focus: "Living With Ongoing Loss",
  },
  {
    week: "Week 5",
    title: "Identity Grief",
    focus: "Who You Are Now",
  },
  {
    week: "Week 6",
    title: "Finding Meaning",
    focus: "Honoring Grief & Moving Forward",
  },
];

function PaymentButton({ href, children }) {
  if (!href) {
    return (
      <span className="button button-primary button-disabled" aria-disabled="true">
        <ButtonIcon icon={HandHeart} className="button-icon" weight="duotone" />
        <span className="button-label">Payment link pending</span>
      </span>
    );
  }

  return (
    <a className="button button-primary" href={href} target="_blank" rel="noreferrer">
      <ButtonIcon icon={HandHeart} className="button-icon" weight="duotone" />
      <span className="button-label">{children}</span>
      <ButtonIcon icon={ArrowRight} className="button-arrow" />
    </a>
  );
}

const testimonials = [
  {
    takeaway: "Care that feels safe",
    quote: (
      <>
        Karissa shows up with{" "}
        <strong className="testimonial-emphasis">so much care, presence, and intention</strong>.
        She creates a space that feels{" "}
        <strong className="testimonial-emphasis">genuinely safe</strong>, where I can unpack my
        deepest thoughts and feelings without hesitation. Every session with her feels like{" "}
        <strong className="testimonial-emphasis">a breath of fresh air</strong>, like a weight I
        didn't even realize I was carrying, gets lifted and helps me find my way through it. She is
        an incredible coach.
      </>
    ),
    name: "Avital",
    date: "March 30, 2026",
    dateTime: "2026-03-30",
  },
  {
    takeaway: "Grounded, judgment-free support",
    quote: (
      <>
        Working with Karissa has been such a{" "}
        <strong className="testimonial-emphasis">grounding experience</strong>. She creates a space
        that feels{" "}
        <strong className="testimonial-emphasis">safe, supportive, and completely free of judgment</strong>.
        Karissa is deeply empathetic and has a real gift for helping me process intense feelings in
        a way that feels{" "}
        <strong className="testimonial-emphasis">manageable rather than overwhelming</strong>. She is
        caring, skilled, and has a steady presence that makes it feel like I'm talking to a friend. I
        leave our conversations feeling{" "}
        <strong className="testimonial-emphasis">calmer and more confident</strong> in my next steps.
      </>
    ),
    name: "Stacey",
    date: "April 12, 2026",
    dateTime: "2026-04-12",
  },
  {
    takeaway: "Breakthroughs with clarity",
    quote: (
      <>
        Karissa combines{" "}
        <strong className="testimonial-emphasis">deep compassion with exceptional skill</strong>,
        creating a space where{" "}
        <strong className="testimonial-emphasis">genuine transformation and healing</strong> can
        unfold. Working with her has led to{" "}
        <strong className="testimonial-emphasis">profound breakthroughs</strong> for me, helping me
        move forward with{" "}
        <strong className="testimonial-emphasis">clarity, confidence, and renewed direction</strong>{" "}
        in both my business and my personal life.
      </>
    ),
    name: "Alyx",
    date: "April 15, 2026",
    dateTime: "2026-04-15",
  },
  {
    takeaway: "Dreams made actionable",
    quote: (
      <>
        Karissa reignited a fire for my goals in a whole new way. Her energy is{" "}
        <strong className="testimonial-emphasis">magnetic</strong>, instantly making you feel
        supported throughout your journey. She helped me get excited about what's possible for
        myself. She has a gift for breaking big dreams down into{" "}
        <strong className="testimonial-emphasis">real, actionable steps</strong> that feel
        manageable and fun! Her warm, bright presence makes the whole process feel both inspiring and
        approachable. I left each session feeling{" "}
        <strong className="testimonial-emphasis">motivated and clear</strong> on what my next steps
        were. Thank you Karissa!
      </>
    ),
    name: "Mary",
    date: "June 5, 2026",
    dateTime: "2026-06-05",
  },
];

const navItems = [
  { label: "Who This Space Holds", href: "/#support" },
  { label: "Coaching", href: "/#scope" },
  { label: "Navigating Grief", href: "/navigating-grief" },
  { label: "About", href: "/#about" },
  { label: "Free Resource", href: "/#resources" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Book a Session", href: "/booking" },
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
};

function TextIcon({ name, className = "text-icon", weight = "duotone" }) {
  const Icon = iconShapes[name] || FlowerLotus;

  return (
    <span className={className} aria-hidden="true">
      <Icon weight={weight} focusable="false" />
    </span>
  );
}

function ButtonIcon({ icon: Icon, className = "button-icon", weight = "regular" }) {
  return <Icon className={className} weight={weight} aria-hidden="true" focusable="false" />;
}

function HeroAudioButton({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    const markPlaying = () => setIsPlaying(true);
    const markPaused = () => setIsPlaying(false);
    const handleEnded = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
    };

    audio.addEventListener("play", markPlaying);
    audio.addEventListener("pause", markPaused);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", markPlaying);
      audio.removeEventListener("pause", markPaused);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" src={src} />
      <button
        className={`button button-secondary${isPlaying ? " is-playing" : ""}`}
        type="button"
        onClick={togglePlayback}
      >
        <ButtonIcon icon={isPlaying ? Waveform : Play} weight={isPlaying ? "duotone" : "fill"} />
        <span className="button-label">
          {isPlaying ? "Pause message" : "Hear a message from Karissa"}
        </span>
      </button>
    </>
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
  const location = useLocation();
  const pageRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.slice(1));
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
        return;
      }

      window.scrollTo({ top: 0, left: 0 });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.hash, location.pathname]);

  return (
    <div className="page" ref={pageRef}>
      <div className="site-shell">
        <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
          <a className="brand" href="/" aria-label="Sacred Grove Coaching home">
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
            <a
              className="nav-cta"
              href={bookingLinks.connectionCall}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <span>Start Here</span>
              <ButtonIcon icon={ArrowRight} className="button-arrow" />
            </a>
          </nav>
        </header>
        <button
          className={`menu-scrim${isMenuOpen ? " is-visible" : ""}`}
          type="button"
          aria-label="Close navigation menu"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
        />
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <div className="site-shell" style={{ paddingTop: 0 }}>
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
                <p className="eyebrow">Grief, Life Transitions, and Burnout Coaching</p>
                <h1>
                  You can come{" "}
                  <span className="title-accent">exactly as you are.</span>
                </h1>
                <p className="hero-body">
                  I create a <strong>grounded, supportive coaching space</strong>{" "}
                  where individuals can feel seen, heard, and held as they
                  navigate life's challenges. Sessions are available virtually
                  through Google Meet.
                </p>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href={bookingLinks.connectionCall}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ButtonIcon icon={CalendarHeart} weight="duotone" />
                    <span className="button-label">Book a Connection Call</span>
                    <ButtonIcon icon={ArrowRight} className="button-arrow" />
                  </a>
                  <HeroAudioButton src={`${assetBase}honoring-grief-living-with-intention.mp3`} />
                </div>
              </div>
              <div className="hero-side">
                <figure className="hero-portrait">
                  <img
                    src={`${assetBase}karissa-ponytail.jpg`}
                    alt="Karissa Yeremin smiling with a colorful ponytail"
                    width="844"
                    height="1125"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>

          <section className="section support-section" id="support">
            <div className="section-kicker">Who This Space Holds</div>
            <div className="support-lead">
              <h2>You're holding so much.</h2>
              <p>
                Responsibilities, expectations, a grief you haven't had time to
                sit with. You've looked for help in all the right places &mdash;
                and still, something isn't shifting.
              </p>
              <p>
                Not because you haven't done enough. But because what's waiting
                for you isn't in a book or a podcast. It's in turning toward
                yourself &mdash; with honesty, with tenderness, with curiosity
                &mdash; and finding your way back to who you are.
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

          <section className="section boundary-section" id="scope" data-reveal>
            <div className="boundary-compare">
              <article className="boundary-card boundary-card-is">
                <div className="boundary-heading">
                  <div className="boundary-meta">
                    <span className="boundary-index" aria-hidden="true">01</span>
                    <p className="eyebrow">What coaching is</p>
                  </div>
                  <h3>A partnership for your next step.</h3>
                </div>
                <p>
                  Coaching is a compassionate partnership that helps you feel
                  seen, understood, and supported as you navigate life. Together,
                  we focus on your present experiences and future goals, helping
                  you create meaningful change at your own pace.
                </p>
              </article>
              <article className="boundary-card boundary-card-not">
                <div className="boundary-heading">
                  <div className="boundary-meta">
                    <span className="boundary-index" aria-hidden="true">02</span>
                    <p className="eyebrow">What coaching is not</p>
                  </div>
                  <h3>Not therapy or clinical care.</h3>
                </div>
                <p>
                  I am <strong>not a therapist</strong>. Coaching is not a space
                  for diagnosis, treatment, or clinical mental health care. It is
                  not a replacement for therapy, but coaching can work alongside
                  therapy.
                </p>
              </article>
            </div>
          </section>

          <section className="section resource-section" id="resources" data-reveal>
            <div className="resource-copy">
              <p className="eyebrow">Free resource</p>
              <h2>
                5 Hidden Forms of{" "}
                <span className="title-accent">Grief</span>
              </h2>
              <p>
                A gentle guide for noticing the kinds of grief that can live under
                the surface of everyday life.
              </p>
            </div>
            <a
              className="resource-download"
              href={`${assetBase}${resourceLinks.hiddenFormsOfGrief}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="resource-download-icon" aria-hidden="true">
                <FilePdf weight="duotone" focusable="false" />
              </span>
              <span>
                <span className="resource-download-label">Download PDF</span>
                <strong>5 Hidden Forms of Grief</strong>
              </span>
              <ButtonIcon icon={DownloadSimple} className="button-arrow" />
            </a>
          </section>

          

          <section className="section about-section" id="about">
            <div className="about-copy" data-reveal>
              <p className="eyebrow">About Me</p>
              <h2>
                I didn't come to this work through theory alone
                <span className="title-accent">—I came through lived experience.</span>
              </h2>
              <p>
                I'm Karissa Yeremin, and for over six years, I taught in the public school system, holding space for growth, struggle, and resilience. Alongside that, I've spent nearly two decades mentoring and walking with people through the complexities of their lives as a community leader. I'm also a graduate of UC Berkeley and a former PAC-10 All-Academic collegiate gymnast—experiences that shaped both my discipline and my ability to stay steady through challenge.
              </p>
              <p>
                I'm trained in the International Coaching Federation (ICF) core competencies and Code of Ethics, which means I hold this work with care, integrity, and deep respect for the people I sit with.
              </p>
              <p>
                But the most meaningful parts of what I offer were shaped outside of titles.
              </p>
              <p>
                I've navigated my own seasons of grief and transition—becoming a divorced mom of two boys, navigating a Type 1 diabetes diagnosis with my son, and walking through a profound shift in my belief system. These experiences didn't give me all the answers, but they taught me how to stay present in the questions. They taught me how to sit in the dark without rushing it, and how to find a way forward that feels honest and sustainable.
              </p>
              <p>That's the space I offer now.</p>
              <p>
                A steady, grounded place where you don't have to have it all figured out. Where you can bring what's real—grief, change, uncertainty—and we can gently begin to make sense of it together. Not by forcing a path, but by listening for what's already within you and helping you take one meaningful step at a time.
              </p>
              <p>Because a full and meaningful life isn't something you arrive at all at once.</p>
            </div>
            <figure className="about-photo" data-reveal style={{ "--reveal-delay": "110ms" }}>
              <div className="about-photo-slider">
                <img
                  src={`${assetBase}karissa-ponytail.jpg`}
                  alt="Karissa Yeremin smiling with a colorful ponytail"
                  width={844}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "center center" }}
                />
              </div>
              <div className="about-photo-footer">
                <figcaption>
                  Coaching with Karissa is gentle, client-led, and grounded in
                  honest presence.
                </figcaption>
              </div>
            </figure>
          </section>

          <section className="section testimonials-section" id="testimonials" data-reveal>
            <div className="testimonials-heading">
              <p className="eyebrow">Real client words</p>
              <h2>
                People leave feeling{" "}
                <span className="title-accent">
                  calmer, clearer, and less alone
                </span>
                .
              </h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <figure
                  key={`${testimonial.name}-${testimonial.dateTime}`}
                  className="testimonial-card"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <span className="testimonial-number">0{index + 1}</span>
                  <p className="testimonial-takeaway">{testimonial.takeaway}</p>
                  <blockquote>
                    <p>{testimonial.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span>
                      <strong>{testimonial.name}</strong>
                      <span>Dated client note</span>
                    </span>
                    <time dateTime={testimonial.dateTime}>{testimonial.date}</time>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
              </main>
            </div>

      <section className="closing-section" id="connect" data-reveal>
        <div className="closing-inner">
          <p className="eyebrow">Start here</p>
          <h2>
            You don’t need to have the{" "}
            <span className="title-accent">right words</span>{" "}
            before you reach out.
          </h2>
          <p>
            If you’re carrying grief, moving through a life transition, or feeling the
            weight of burnout, there is a steady place for you to begin. I would
            be honored to meet you there—exactly as you are.
          </p>
          <div className="booking-actions" aria-label="Booking options">
            <a
              className="button button-white"
              href={bookingLinks.connectionCall}
              target="_blank"
              rel="noreferrer"
            >
              <ButtonIcon icon={CalendarHeart} weight="duotone" />
              <span className="button-label">Book a Connection Call</span>
              <ButtonIcon icon={ArrowRight} className="button-arrow" />
            </a>
          </div>
        </div>
      </section>
        
              </>
            } />
            <Route path="/booking" element={
              <>
                <div className="site-shell" style={{ paddingTop: 0 }}>
                  <main id="top">
                    <div className="client-page-header">
                      <h1>Book a Session</h1>
                      <p>Book your next session or manage payments.</p>
                    </div>

                    <section className="section sessions-section" id="sessions" data-reveal>
                      <div className="session-options" aria-label="Session options">
                        {sessionOptions.map((option, index) => (
                          <article
                            className="session-option"
                            key={option.title}
                            data-reveal
                            style={{ "--reveal-delay": `${index * 90}ms` }}
                          >
                            <div className="session-option-top">
                              <TextIcon name={option.icon} className="session-option-icon" />
                              <div>
                                <p className="session-label">{option.label}</p>
                                <h3>{option.title}</h3>
                              </div>
                              <span className="session-duration">{option.duration}</span>
                            </div>
                            <p>{option.copy}</p>
                            <a
                              className="button button-secondary"
                              href={option.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ButtonIcon icon={CalendarHeart} weight="duotone" />
                              <span className="button-label">{option.action}</span>
                              <ButtonIcon icon={ArrowRight} className="button-arrow" />
                            </a>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="section payment-section" id="payment" data-reveal>
                      <div className="payment-heading">
                        <p className="eyebrow">Payment options</p>
                        <h2>
                          Choose the session or package that matches what you and Karissa
                          <span className="title-accent"> have decided together</span>.
                        </h2>
                      </div>
                      <div className="payment-grid" aria-label="Payment options">
                        {paymentOptions.map((option, index) => (
                          <article
                            className="payment-card"
                            key={option.title}
                            data-reveal
                            style={{ "--reveal-delay": `${index * 70}ms` }}
                          >
                            <div className="payment-card-top">
                              <TextIcon name={option.icon} className="payment-icon" />
                              <div>
                                <p className="payment-label">{option.label}</p>
                                <h3>{option.title}</h3>
                              </div>
                            </div>
                            <p className="payment-price">{option.price}</p>
                            <p>{option.detail}</p>
                            <PaymentButton href={option.href}>{option.action}</PaymentButton>
                          </article>
                        ))}
                      </div>
                    </section>
                  </main>
                </div>
              </>
            } />
            <Route path="/navigating-grief" element={
              <>
                <div className="site-shell" style={{ paddingTop: 0 }}>
                  <main id="top">
                    <section className="grief-hero" data-reveal>
                      <div className="grief-hero-copy">
                        <div className="grief-hero-intro">
                          <p className="eyebrow">Virtual small group gathering</p>
                          <p className="grief-start-date">Begins October 1, 2026</p>
                          <p className="grief-start-time">Thursdays, 6 - 8:30pm PT</p>
                        </div>
                        <h1>
                          Navigating{" "}
                          <span className="title-accent">Grief</span>
                        </h1>
                        <p>
                          Navigating Grief is a six-week virtual small group coaching experience for anyone carrying a loss the world doesn’t always recognize &mdash; divorce, estrangement, chronic illness, a faith that no longer fits, a friendship that faded, a version of yourself you’ve had to let go of.
                        </p>
                        <p className="grief-hero-statement">
                          If you’ve ever wondered whether your grief “counts” &ndash; it does. And this is a space built specifically for it.
                        </p>
                        <div className="grief-hero-actions">
                          <a
                            className="button button-primary"
                            href={navigatingGriefLinks.application}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ButtonIcon icon={HandHeart} weight="duotone" />
                            <span className="button-label">Apply to reserve your spot</span>
                            <ButtonIcon icon={ArrowRight} className="button-arrow" />
                          </a>
                        </div>
                      </div>
                      <aside className="grief-hero-card" aria-label="Navigating Grief details">
                        <TextIcon name="presence" className="grief-hero-icon" />
                        <p className="grief-card-label">Founding Cohort Rate</p>
                        <p className="grief-card-price">$497</p>
                        <p>
                          This rate is offered for this first cohort only. Space is limited to 8 participants.
                        </p>
                      </aside>
                    </section>

                    <section className="section grief-expect-section" data-reveal>
                      <div className="grief-section-heading">
                        <p className="eyebrow">What to expect</p>
                        <h2>A steady, intimate container for grief that doesn’t need to be explained away.</h2>
                      </div>
                      <div className="grief-expect-list">
                        {griefExpectations.map((item, index) => (
                          <article
                            className="grief-expect-item"
                            key={item}
                            data-reveal
                            style={{ "--reveal-delay": `${index * 70}ms` }}
                          >
                            <span className="grief-list-number">0{index + 1}</span>
                            <p>{item}</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="section grief-weeks-section" data-reveal>
                      <div className="grief-section-heading">
                        <p className="eyebrow">What we explore together</p>
                        <h2>Six weeks of naming, tending, and finding your way forward.</h2>
                      </div>
                      <div className="grief-week-grid">
                        {griefWeeks.map((week, index) => (
                          <article
                            className="grief-week-card"
                            key={week.week}
                            data-reveal
                            style={{ "--reveal-delay": `${index * 70}ms` }}
                          >
                            <p className="grief-week-label">{week.week}</p>
                            <h3>{week.title}</h3>
                            <p>{week.focus}</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="section grief-investment-section" data-reveal>
                      <div className="grief-investment-copy">
                        <p className="eyebrow">Investment</p>
                        <h2>
                          Founding Cohort Rate:{" "}
                          <span className="title-accent">$497</span>
                        </h2>
                        <p>
                          This rate is offered for this first cohort only. Space is limited to 8 participants &mdash; apply to reserve your spot.
                        </p>
                        <p>
                          Have questions? Email Karissa at{" "}
                          <a href={`mailto:${navigatingGriefLinks.email}`}>
                            {navigatingGriefLinks.email}
                          </a>{" "}
                          or set up a short connection call.
                        </p>
                      </div>
                      <div className="grief-investment-actions" aria-label="Navigating Grief actions">
                        <a
                          className="button button-primary"
                          href={navigatingGriefLinks.application}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ButtonIcon icon={HandHeart} weight="duotone" />
                          <span className="button-label">Apply to reserve your spot</span>
                          <ButtonIcon icon={ArrowRight} className="button-arrow" />
                        </a>
                        <a
                          className="button button-secondary"
                          href={navigatingGriefLinks.connectionCall}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ButtonIcon icon={CalendarHeart} weight="duotone" />
                          <span className="button-label">Set up a connection call</span>
                          <ButtonIcon icon={ArrowRight} className="button-arrow" />
                        </a>
                      </div>
                    </section>

                    <section className="section grief-host-section" data-reveal>
                      <TextIcon name="honor" className="grief-host-icon" />
                      <p>
                        Taught and hosted by Karissa Yeremin, ICF-Certified Professional Coach and Grief Practitioner, founder of Sacred Grove Coaching.
                      </p>
                    </section>
                  </main>
                </div>
              </>
            } />
            <Route path="/clients" element={<Navigate to="/booking" replace />} />
          </Routes>
    </div>
  );
}
