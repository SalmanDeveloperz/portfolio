(function () {
    "use strict";

    var header = document.querySelector(".site-header");
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("navToggle");

    /* ----- Header background once scrolled ----- */
    function onScroll() {
        header.classList.toggle("scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ----- Mobile menu ----- */
    function setMenu(open) {
        nav.classList.toggle("open", open);
        header.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", function () {
        setMenu(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });

    /* ----- Active nav link ----- */
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var sections = links
        .map(function (link) { return document.querySelector(link.getAttribute("href")); })
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (link) {
                    link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach(function (s) { spy.observe(s); });

        /* ----- Reveal on scroll ----- */
        var revealer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    revealer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

        document.querySelectorAll(".reveal").forEach(function (el) {
            // Stagger siblings in grids slightly
            var parent = el.parentElement;
            var siblings = parent ? parent.querySelectorAll(":scope > .reveal") : [];
            var index = Array.prototype.indexOf.call(siblings, el);
            if (index > 0) el.style.transitionDelay = Math.min(index, 5) * 70 + "ms";
            revealer.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    /* ----- Footer year & tool count ----- */
    document.getElementById("year").textContent = new Date().getFullYear();
    var toolCount = document.getElementById("toolCount");
    if (toolCount) toolCount.textContent = document.querySelectorAll(".toolkit .chip").length + " tools";

    /* ----- Contact form (Netlify Forms, submitted in place) ----- */
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    var submit = document.getElementById("formSubmit");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        submit.disabled = true;
        status.className = "form-status";
        status.textContent = "Sending…";

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(form)).toString()
        })
            .then(function (res) {
                if (!res.ok) throw new Error(res.status);
                form.reset();
                status.className = "form-status ok";
                status.textContent = "✓ Message sent. Thank you, I'll be in touch.";
            })
            .catch(function () {
                status.className = "form-status err";
                status.textContent = "Couldn't send. Please email farwaramzan734@gmail.com instead.";
            })
            .finally(function () {
                submit.disabled = false;
            });
    });
})();
