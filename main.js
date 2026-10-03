(function () {
    "use strict";

    var root = document.documentElement;
    var header = document.querySelector(".site-header");
    var nav = document.getElementById("nav");
    var navToggle = document.getElementById("navToggle");
    var progress = document.getElementById("progress");

    /* ----- Theme switch (saved per visitor, defaults to system) ----- */
    var themeToggle = document.getElementById("themeToggle");
    var themeColor = document.getElementById("themeColor");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        themeColor.setAttribute("content", theme === "dark" ? "#0b0b0d" : "#f8f7f4");
    }
    applyTheme(root.getAttribute("data-theme") || "dark");

    themeToggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.classList.add("theme-anim");
        applyTheme(next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        setTimeout(function () { root.classList.remove("theme-anim"); }, 400);
    });

    // Follow the OS setting until the visitor picks a theme themselves
    if (window.matchMedia) {
        var mq = window.matchMedia("(prefers-color-scheme: light)");
        var onSystemChange = function (e) {
            var saved = null;
            try { saved = localStorage.getItem("theme"); } catch (err) {}
            if (!saved) applyTheme(e.matches ? "light" : "dark");
        };
        if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    }

    /* ----- Header state + reading progress ----- */
    function onScroll() {
        var y = window.scrollY;
        header.classList.toggle("scrolled", y > 12);
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ----- Mobile menu ----- */
    function setMenu(open) {
        nav.classList.toggle("open", open);
        header.classList.toggle("menu-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    navToggle.addEventListener("click", function () {
        setMenu(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });

    /* ----- Active nav link + reveal on scroll ----- */
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

        var revealer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    revealer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });

        document.querySelectorAll(".reveal").forEach(function (el) {
            var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
            var index = Array.prototype.indexOf.call(siblings, el);
            if (index > 0) el.style.transitionDelay = Math.min(index, 5) * 60 + "ms";
            revealer.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    /* ----- Footer year & tool count ----- */
    document.getElementById("year").textContent = new Date().getFullYear();
    var toolCount = document.getElementById("toolCount");
    if (toolCount) toolCount.textContent = document.querySelectorAll(".toolkit .chip").length + " tools";

    /* ----- Copy email ----- */
    var copyBtn = document.getElementById("copyEmail");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            var text = copyBtn.getAttribute("data-copy");
            var label = copyBtn.querySelector(".copy-text");
            var done = function () {
                copyBtn.classList.add("copied");
                label.textContent = "Copied";
                setTimeout(function () {
                    copyBtn.classList.remove("copied");
                    label.textContent = "Copy";
                }, 1800);
            };
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done, function () { window.location.href = "mailto:" + text; });
            } else {
                window.location.href = "mailto:" + text;
            }
        });
    }

    /* ----- Contact form → Formspree (emails farwaramzan734@gmail.com) ----- */
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    var submit = document.getElementById("formSubmit");
    var success = document.getElementById("formSuccess");
    var again = document.getElementById("formAgain");
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(input) {
        var value = input.value.trim();
        var ok = value.length > 0 && (input.type !== "email" || EMAIL_RE.test(value));
        input.closest(".field").classList.toggle("invalid", !ok);
        input.setAttribute("aria-invalid", String(!ok));
        return ok;
    }

    var inputs = Array.prototype.slice.call(form.querySelectorAll("input[required], textarea[required]"));
    inputs.forEach(function (input) {
        var err = form.querySelector('.field-error[data-for="' + input.id + '"]');
        if (err) {
            err.id = input.id + "-error";
            input.setAttribute("aria-describedby", err.id);
        }
        input.addEventListener("blur", function () { if (input.value) validateField(input); });
        input.addEventListener("input", function () {
            if (input.closest(".field").classList.contains("invalid")) validateField(input);
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var firstBad = null;
        inputs.forEach(function (input) {
            if (!validateField(input) && !firstBad) firstBad = input;
        });
        if (firstBad) {
            firstBad.focus();
            return;
        }

        var data = new FormData(form);
        // Honeypot: real people never fill this in
        if (data.get("_gotcha")) {
            showSuccess();
            return;
        }

        // Unique subject per sender so Gmail doesn't fold every message into one thread
        var sender = String(data.get("name") || "").trim().slice(0, 60);
        var stamp = new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
        data.set("_subject", "Portfolio message from " + sender + " (" + stamp + ")");

        submit.disabled = true;
        submit.querySelector(".btn-label").textContent = "Sending…";
        status.className = "form-status";
        status.textContent = "";

        fetch(form.action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: data
        })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (body) {
                    if (!res.ok) {
                        var msg = body && body.errors && body.errors.length
                            ? body.errors.map(function (er) { return er.message; }).join(" ")
                            : "Server error " + res.status;
                        throw new Error(msg);
                    }
                });
            })
            .then(function () {
                form.reset();
                inputs.forEach(function (input) { input.closest(".field").classList.remove("invalid"); });
                showSuccess();
            })
            .catch(function (err) {
                if (window.console) console.warn("Contact form:", err && err.message);
                status.className = "form-status err";
                status.innerHTML = "Couldn't send right now. Please email <a href=\"mailto:farwaramzan734@gmail.com\">farwaramzan734@gmail.com</a>.";
            })
            .finally(function () {
                submit.disabled = false;
                submit.querySelector(".btn-label").textContent = "Send message";
            });
    });

    function showSuccess() {
        success.hidden = false;
        again.focus();
    }
    again.addEventListener("click", function () {
        success.hidden = true;
        document.getElementById("f-name").focus();
    });
})();
