'use client';
import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useEffect, useMemo, useContext, createContext } from 'react';
import delegate from 'delegate-it';
import { useRouter, usePathname } from 'next/navigation';
import NextLink from 'next/link';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
const TransitionRouterContext = /*#__PURE__*/ createContext({
    stage: "none",
    navigate: ()=>{},
    isReady: false
});
function TransitionRouter({ children, leave = /*#__PURE__*/ _async_to_generator(function*(next) {
    return next();
}), enter = /*#__PURE__*/ _async_to_generator(function*(next) {
    return next();
}), auto = false }) {
    const router = useRouter();
    const pathname = usePathname();
    const [stage, setStage] = useState("none");
    const leaveRef = useRef(null);
    const enterRef = useRef(null);
    const navigate = useCallback(/*#__PURE__*/ _async_to_generator(function*(href, pathname, method = "push", options) {
        setStage("leaving");
        let callback = ()=>router[method](href, options);
        if (method === "back") callback = ()=>router.back();
        leaveRef.current = yield leave(callback, pathname, href);
    }), [
        leave,
        router
    ]);
    const handleClick = useCallback((event)=>{
        const anchor = event.delegateTarget;
        const href = anchor == null ? void 0 : anchor.getAttribute("href");
        const ignore = anchor == null ? void 0 : anchor.getAttribute("data-transition-ignore");
        if (!ignore && (href == null ? void 0 : href.startsWith("/")) && href !== pathname && anchor.target !== "_blank" && !href.includes("#")) {
            event.preventDefault();
            navigate(href, pathname);
        }
    }, [
        navigate,
        pathname
    ]);
    useEffect(()=>{
        if (!auto) return;
        const controller = new AbortController();
        delegate("a[href]", "click", handleClick, {
            signal: controller.signal
        });
        return ()=>{
            controller.abort();
        };
    }, [
        auto,
        handleClick
    ]);
    useEffect(()=>{
        if (stage === "entering") {
            if (typeof leaveRef.current === "function") leaveRef.current();
            leaveRef.current = null;
            const runEnter = /*#__PURE__*/ _async_to_generator(function*() {
                enterRef.current = yield Promise.resolve(enter(()=>setStage("none")));
            });
            runEnter();
        }
    }, [
        stage,
        enter
    ]);
    useEffect(()=>{
        return ()=>{
            if (stage === "leaving") {
                if (typeof enterRef.current === "function") enterRef.current();
                enterRef.current = null;
                setStage("entering");
            }
        };
    }, [
        stage,
        pathname
    ]);
    const value = useMemo(()=>({
            stage,
            navigate,
            isReady: stage !== "entering"
        }), [
        stage,
        navigate
    ]);
    return /*#__PURE__*/ jsx(TransitionRouterContext.Provider, {
        value: value,
        children: children
    });
}
function useTransitionState() {
    return useContext(TransitionRouterContext);
}

function _extends$1() {
    _extends$1 = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends$1.apply(this, arguments);
}
function useTransitionRouter() {
    const router = useRouter();
    const pathname = usePathname();
    const { navigate } = useTransitionState();
    const push = useCallback((href, options)=>{
        navigate(href, pathname, "push", options);
    }, [
        pathname,
        navigate
    ]);
    const replace = useCallback((href, options)=>{
        navigate(href, pathname, "replace", options);
    }, [
        pathname,
        navigate
    ]);
    const back = useCallback(()=>{
        navigate(undefined, pathname, "back");
    }, [
        pathname,
        navigate
    ]);
    return useMemo(()=>_extends$1({}, router, {
            push,
            replace,
            back
        }), [
        router,
        push,
        replace,
        back
    ]);
}

function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function Link(props) {
    const router = useTransitionRouter();
    const { href, as, replace, scroll } = props;
    const onClick = useCallback((e)=>{
        if (props.onClick) props.onClick(e);
        if (!e.defaultPrevented) {
            e.preventDefault();
            const navigate = replace ? router.replace : router.push;
            navigate(as || href, {
                scroll: scroll != null ? scroll : true
            });
        }
    }, [
        props.onClick,
        href,
        as,
        replace,
        scroll
    ]);
    return /*#__PURE__*/ jsx(NextLink, _extends({}, props, {
        onClick: onClick
    }));
}

export { Link, TransitionRouter, useTransitionRouter, useTransitionState };
