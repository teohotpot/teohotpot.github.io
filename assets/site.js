(function () {
  const header = document.querySelector("[data-header]");
  const drawer = document.querySelector("[data-nav-drawer]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const isMenuPage = document.body.classList.contains("page-menu");
  const isHomePage = document.body.classList.contains("page-home");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const cutTargets = document.querySelectorAll("[data-cut-key]");
  const cutPanel = document.querySelector("[data-cut-panel]");

  const beefCuts = {
    "ox-cheek": {
      name: "Ox cheek",
      cn: "脸颊肉",
      summary: "Collagen-rich and deeply savoury, ox cheek gives a rounded, almost slow-cooked depth after a little longer in the broth.",
      fat: "Medium, about 20-24%",
      texture: "Supple, silky, collagen-rich",
      cocktail: "Plum Spritz",
      broth: "Wild mushroom soup"
    },
    "ox-tongue": {
      name: "Ox tongue",
      cn: "牛舌",
      summary: "Thin, savoury and gently bouncy. It has a clean beef flavour with a distinctive snap.",
      fat: "Medium-low, about 14-18%",
      texture: "Supple, savoury, lightly chewy",
      cocktail: "Jasmine Sour",
      broth: "Mooli clear beef broth"
    },
    "chuck-flap": {
      name: "Chuck flap",
      cn: "脖仁",
      summary: "A prized shoulder cut with fine marbling and a rounded beef aroma. It stays soft after a short swish.",
      fat: "Medium-high, about 28-32%",
      texture: "Silky, rich, full-bodied",
      cocktail: "Chilli Margarita",
      broth: "TEO's satay beef broth"
    },
    "crispy-fat": {
      name: "Crispy fat",
      cn: "胸口朥",
      summary: "A Teochew favourite with a crisp, elastic bite. It brings texture first, then a clean beef sweetness.",
      fat: "High, about 45-55%",
      texture: "Crisp, springy, lightly gelatinous",
      cocktail: "Chilli Margarita",
      broth: "Spicy broth with Szechuan peppercorn"
    },
    "wagyu-marbling": {
      name: "British Wagyu Marbling King",
      cn: "和牛雪花",
      summary: "The richest slice on the map: heavy marbling, a buttery finish and a soft, luxurious mouthfeel.",
      fat: "High, about 40-45%",
      texture: "Buttery, soft, deeply marbled",
      cocktail: "Plum Spritz",
      broth: "Mooli clear beef broth"
    },
    "boneless-ribs": {
      name: "Boneless ribs",
      cn: "吊龙伴",
      summary: "Juicy and rounded, with enough fat to stay tender without overwhelming the broth.",
      fat: "Medium-high, about 30-36%",
      texture: "Juicy, tender, full-flavoured",
      cocktail: "Lychee Highball",
      broth: "Tomato, soy bean beef broth"
    },
    "flat-iron": {
      name: "Flat iron",
      cn: "匙柄",
      summary: "Lean but not dry, with a clean bite and a gentle mineral note. Best for guests who like clarity over richness.",
      fat: "Medium, about 18-22%",
      texture: "Smooth, clean, tender",
      cocktail: "Jasmine Sour",
      broth: "Wild mushroom soup"
    },
    "rib-eye": {
      name: "Rib eye",
      cn: "吊龙",
      summary: "Marbled, juicy and deeply beefy. A classic first order when you want a tender slice with a rounded finish.",
      fat: "Medium-high, about 30-35%",
      texture: "Tender, juicy, lightly springy",
      cocktail: "Plum Spritz",
      broth: "Mooli clear beef broth"
    },
    "hanger-steak": {
      name: "Hanger steak",
      cn: "封门柳",
      summary: "Loose-grained, beefy and expressive. It takes on broth beautifully while keeping a satisfying bite.",
      fat: "Medium-low, about 14-18%",
      texture: "Beefy, tender, lightly fibrous",
      cocktail: "Jasmine Sour",
      broth: "Wild mushroom soup"
    },
    "brisket": {
      name: "Brisket",
      cn: "肥牛",
      summary: "A richer cut with more visible fat. It brings body to the pot and works especially well with bigger broths.",
      fat: "High, about 38-45%",
      texture: "Rich, soft, melting",
      cocktail: "Chilli Margarita",
      broth: "Spicy broth with Szechuan peppercorn"
    },
    "flank": {
      name: "Flank (14 days dry aged)",
      cn: "干式熟成双层肉",
      summary: "Layered, lightly chewy and more concentrated from dry ageing. It rewards a little patience in the broth.",
      fat: "Medium-low, about 15-20%",
      texture: "Layered, elastic, savoury",
      cocktail: "Plum Spritz",
      broth: "Mooli clear beef broth"
    },
    "picanha": {
      name: "Picanha",
      cn: "嫩肉",
      summary: "A rump-cap style cut with a sweet beef flavour and a soft finish. Quick cooking keeps it bright.",
      fat: "Medium, about 22-26%",
      texture: "Tender, rounded, gently juicy",
      cocktail: "Lychee Highball",
      broth: "Tomato, soy bean beef broth"
    },
    "fore-shin": {
      name: "Fore shin",
      cn: "三花趾",
      summary: "Lean, structured and springy. Fore shin is all about clean texture and a crisp finish.",
      fat: "Low, about 8-12%",
      texture: "Springy, lean, crisp-edged",
      cocktail: "Jasmine Sour",
      broth: "Bitter melon beef broth"
    },
    "hind-shin": {
      name: "Hind shin",
      cn: "五花趾",
      summary: "Slightly fuller than fore shin, with a satisfying snap and a clean, beef-forward finish.",
      fat: "Low-medium, about 10-15%",
      texture: "Springy, structured, clean",
      cocktail: "Jasmine Sour",
      broth: "Mooli clear beef broth"
    }
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const updateMenuBackground = () => {
    if (!isMenuPage) return;
    const progress = Math.min(window.scrollY / 850, 1);
    const dim = 0.32 + progress * 0.48;
    document.body.style.setProperty("--menu-dim", dim.toFixed(3));
  };

  const updateOnScroll = () => {
    updateHeader();
    updateMenuBackground();
  };

  const setDrawer = (isOpen) => {
    if (!drawer || !toggle) return;
    drawer.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("drawer-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen && !isHomePage ? "Go to homepage" : isOpen ? "Close navigation" : "Open navigation");
  };

  const initReveals = () => {
    if (!revealItems.length) return;
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    });

    revealItems.forEach((item) => observer.observe(item));
  };

  const initBeefMap = () => {
    if (!cutTargets.length || !cutPanel) return;
    const fields = {
      name: cutPanel.querySelector("[data-cut-name]"),
      summary: cutPanel.querySelector("[data-cut-summary]"),
      fat: cutPanel.querySelector("[data-cut-fat]"),
      texture: cutPanel.querySelector("[data-cut-texture]"),
      cocktail: cutPanel.querySelector("[data-cut-cocktail]"),
      broth: cutPanel.querySelector("[data-cut-broth]")
    };
    let cutPanelTimer;

    const updateCutFields = (cut) => {
      fields.name.textContent = cut.name;
      fields.summary.textContent = cut.summary;
      fields.fat.textContent = cut.fat;
      fields.texture.textContent = cut.texture;
      fields.cocktail.textContent = cut.cocktail;
      fields.broth.textContent = cut.broth;
    };

    const setCut = (key) => {
      const cut = beefCuts[key];
      if (!cut) return;

      cutTargets.forEach((target) => {
        const isActive = target.dataset.cutKey === key;
        target.classList.toggle("is-active", isActive);
        if (target.hasAttribute("aria-pressed")) {
          target.setAttribute("aria-pressed", String(isActive));
        }
      });

      window.clearTimeout(cutPanelTimer);
      cutPanel.classList.add("is-changing");
      cutPanelTimer = window.setTimeout(() => {
        updateCutFields(cut);
        cutPanel.classList.add("is-visible");
        cutPanel.classList.remove("is-changing");
      }, cutPanel.classList.contains("is-visible") ? 220 : 0);
    };

    cutTargets.forEach((target) => {
      target.addEventListener("click", () => setCut(target.dataset.cutKey));
      target.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        setCut(target.dataset.cutKey);
      });
    });

  };

  updateOnScroll();
  initReveals();
  initBeefMap();
  window.addEventListener("scroll", updateOnScroll, { passive: true });
  window.addEventListener("resize", updateMenuBackground);

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      if (isOpen && !isHomePage) {
        window.location.href = "index.html";
        return;
      }
      setDrawer(!isOpen);
    });

    drawer.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        setDrawer(false);
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setDrawer(false);
      }
    });
  }
})();
