import {r as t, j as e} from "./index-i3HP4oCF.js";
function p() {
    let l = t.useRef()
      , o = t.useRef()
      , i = t.useRef()
      , s = t.useRef()
      , [n,c] = t.useState("");
    function d(a) {
        navigator.clipboard.writeText(a).then( () => {
            alert("Text copied to clipboard!")
        }
        ).catch(r => {
            console.error("Error copying text: ", r)
        }
        )
    }
    const u = async a => {
        a.preventDefault();
        let r = `${window.location.origin}/?ui=meeting&inviteID=${btoa(l.current.value)}&mode=${i.current.checked ? "frameless" : "widget"}&author=${o.current.value}`;
        c(r),
        d(r),
        alert("Copied invite link")
    }
    ;
    return e.jsxs("div", {
        className: "space-y-3",
        children: [e.jsx("h3", {
            className: "font-semibold text-lg",
            children: "Meet"
        }), e.jsxs("form", {
            className: "space-y-4",
            onSubmit: u,
            children: [e.jsx("input", {
                ref: l,
                className: "px-4 py-2 rounded w-full bg-[#ebebeb] dark:text-black dark:bg-white block dark:placeholder:text-black",
                placeholder: "Enter Email Of Invitee",
                required: !0
            }), e.jsx("input", {
                ref: o,
                className: "px-4 py-2 rounded w-full bg-[#ebebeb] dark:text-black dark:bg-white block dark:placeholder:text-black ",
                placeholder: "Enter Your Company name",
                required: !0
            }), e.jsx("input", {
                ref: i,
                type: "checkbox",
                id: "mode",
                className: "p-4"
            }), e.jsx("label", {
                htmlFor: "mode px-4",
                children: "Frameless Mode"
            }), e.jsx("button", {
                type: "submit",
                className: "bg-[#7f85f5] w-full py-4 text-white rounded font-semibold",
                children: "Book Meeting Via Teams"
            })]
        }), n && e.jsx("textarea", {
            ref: s,
            className: "w-full bg-[#ebebeb] dark:text-black dark:bg-white rounded ",
            cols: 6,
            rows: 20,
            value: `${n}`
        })]
    })
}
export {p as default};
